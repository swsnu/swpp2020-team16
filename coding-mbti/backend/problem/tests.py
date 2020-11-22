import json
from django.test import TestCase, Client
from user.models import User
from problem.models import Problem, Solution, ProblemInput, ProblemOutput
from utils.utils import get_dicts_with_filter
from django.core import management


class CommandTest(TestCase):
    def call_command(self):
        management.call_command("seed", {"mode": "init"})
        self.assertEqual(len(Problem.objects.all()), 2)

        management.call_command("seed", {"mode": "clean"})
        self.assertEqual(len(Problem.objects.all()), 0)


class ProblemTest(TestCase):
    def setUp(self):
        self.client = Client()

        User.objects.create_user(
            username="test", password="123", email="test@test.com", salt="123", role=1
        )
        self.client.login(username="test", password="123")

    def test_problem_create(self):

        problem = Problem(desc="For test", input_desc="For test",
                          output_desc="Fore test", pid="ITP1_6_B", objective=1)
        problem.save()

        self.assertEqual(len(Problem.objects.all()), 1)

    def test_problem_view(self):
        response = self.client.get("/api/problem/")
        self.assertEqual(response.status_code, 200)

        response = self.client.post("/api/problem/", {})
        self.assertEqual(response.status_code, 405)

    def test_problem_by_id_view(self):
        response = self.client.get("/api/problem/1/")
        self.assertEqual(response.status_code, 400)

        response = self.client.post("/api/problem/1/", {})
        self.assertEqual(response.status_code, 405)

    def test_get_problem_by_objective(self):

        problem = Problem(desc="For test", input_desc="For test",
                          output_desc="Fore test", pid="ITP1_6_B",
                          objective=Problem.ProblemObjective.UM)
        problem.save()

        response = self.client.get("/api/problem/objective/1/")
        self.assertEqual(response.status_code, 200)

        response = self.client.post("/api/problem/objective/1/", {})
        self.assertEqual(response.status_code, 405)

    def test_get_problem_input(self):

        problem = Problem(desc="For test", input_desc="For test",
                          output_desc="Fore test", pid="ITP1_6_B", objective=1)
        problem.save()

        problem_input_1 = ProblemInput(problem=problem, content="input str 1")
        problem_input_1.save()
        problem_input_2 = ProblemInput(problem=problem, content="input str 2")
        problem_input_2.save()
        problem_input_3 = ProblemInput(problem=problem, content="input str 3")
        problem_input_3.save()

        problem_output_1 = ProblemOutput(
            problem_input=problem_input_1, content="output str a")
        problem_output_1.save()
        problem_output_2 = ProblemOutput(
            problem_input=problem_input_2, content="output str b")
        problem_output_2.save()
        problem_output_3 = ProblemOutput(
            problem_input=problem_input_3, content="output str c")
        problem_output_3.save()

        problem_id = problem.to_dict()['id']
        response = self.client.get(f"/api/problem/{problem_id}/input/")
        self.assertEqual(response.status_code, 200)
        expected_response = json.dumps(get_dicts_with_filter(
            ProblemInput.objects, problem__id=problem_id))
        self.assertEqual(response.content.decode(), expected_response)

        response = self.client.get("/api/problem/1000/input/")
        self.assertEqual(response.status_code, 400)

        response = self.client.post("/api/problem/1/input/", {})
        self.assertEqual(response.status_code, 405)

    def test_get_problem_output(self):

        problem = Problem(desc="For test", input_desc="For test",
                          output_desc="Fore test", pid="ITP1_6_B", objective=1)
        problem.save()

        problem_input = ProblemInput(problem=problem, content=["1", "2", "3"])
        problem_input.save()

        problem_output = ProblemOutput(
            problem_input=problem_input, content=["1", "2", "3"])
        problem_output.save()

        problem_input_id = problem_input.to_dict()['id']

        response = self.client.get(f"/api/problem/{problem_input_id}/output/")
        self.assertEqual(response.status_code, 200)

        response = self.client.get(f"/api/problem/100/output/")
        self.assertEqual(response.status_code, 400)

        response = self.client.post("/api/problem/1/output/", {})
        self.assertEqual(response.status_code, 405)


class SolutionTest(TestCase):
    def setUp(self):
        self.client = Client()

        User.objects.create_user(
            username="test", password="123", email="test@test.com", salt="123", role=1
        )
        self.client.login(username="test", password="123")

    def test_get_solution(self):

        problem = Problem(desc="For test", input_desc="For test",
                          output_desc="Fore test", pid="ITP1_6_B", objective=1)
        problem.save()
        problem_id = problem.to_dict()['id']

        solution_body = {
            "erase_cnt": 12,
            "elapsed_time": 30.0,
            "code": "n=int(input())\na=[[0 for i in range(13)]for j in range(4)]\nfor k in range(n):\ncard=input().split()\np=5\nif (card[0]=='S'):\np=0\nelif (card[0]=='H':\np=1\nelif (card[0]=='C'):\np=2\nelse:\np=3\nq=int(card[1])-1\na[p][q]=1\nfor i in range(4):\nfor j in range(13):\nif a[i][j]==0:\ntype=''\nif i==0 :\ntype='S'\nelif i==1:\ntype='H'\nelif i==2:\ntype='C'\nelse:\ntype='D'\nprint('{0} {1}'.format(type,j+1))",
        }

        self.client.post(
            f"/api/problem/{problem_id}/solution/",
            json.dumps(solution_body),
            content_type="application/json",
        )
        response = self.client.get(f"/api/problem/{problem_id}/solution/")
        self.assertEqual(response.status_code, 200)

    def test_soltuion_create(self):

        problem = Problem(desc="For test", input_desc="For test",
                          output_desc="Fore test", pid="ITP1_6_B", objective=1)
        problem.save()

        problem_id = problem.to_dict()['id']

        solution_body = {
            "erase_cnt": 12,
            "elapsed_time": 30.0,
            "code": "n=int(input())\na=[[0 for i in range(13)]for j in range(4)]\nfor k in range(n):\ncard=input().split()\np=5\nif (card[0]=='S'):\np=0\nelif (card[0]=='H':\np=1\nelif (card[0]=='C'):\np=2\nelse:\np=3\nq=int(card[1])-1\na[p][q]=1\nfor i in range(4):\nfor j in range(13):\nif a[i][j]==0:\ntype=''\nif i==0 :\ntype='S'\nelif i==1:\ntype='H'\nelif i==2:\ntype='C'\nelse:\ntype='D'\nprint('{0} {1}'.format(type,j+1))",
        }

        response = self.client.post(
            f"/api/problem/{problem_id}/solution/",
            json.dumps(solution_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(Solution.objects.all()), 1)

    def test_solution_create_exception(self):
        problem = Problem(desc="For test", input_desc="For test",
                          output_desc="Fore test", pid="ITP1_6_B", objective=1)
        problem.save()
        problem_id = problem.to_dict()['id']

        response = self.client.post(
            f"/api/problem/{problem_id}/solution/",
            json.dumps({}),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)

        response = self.client.post("/api/problem/2/solution/", {})

        self.assertEqual(response.status_code, 400)

        response = self.client.delete("/api/problem/2/solution/")

        self.assertEqual(response.status_code, 405)
