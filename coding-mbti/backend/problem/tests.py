from django.test import TestCase, Client
from user.models import User
from problem.models import Problem, Solution, ProblemInput, ProblemOutput
import json
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

        problem = Problem(
            content="For test", name="ITP1_6_B", style=Problem.ProblemStyle.UM
        )
        problem.save()

        problem_input = ProblemInput(problem=problem, content="test")
        problem_input.save()

        problem_output = ProblemOutput(
            problem_input=problem_input, content="test")
        problem_output.save()

    def test_problem_create(self):

        self.assertEqual(len(Problem.objects.all()), 1)

    def test_get_problem_by_style(self):
        response = self.client.get("/api/problem/1/")
        self.assertEqual(response.status_code, 200)

        response = self.client.get("/api/problem/100/")
        self.assertEqual(response.status_code, 400)

        response = self.client.post("/api/problem/1/", {})
        self.assertEqual(response.status_code, 405)

    def test_get_problem_input(self):
        response = self.client.get("/api/problem/1/input/")
        self.assertEqual(response.status_code, 200)

        response = self.client.get("/api/problem/100/input/")
        self.assertEqual(response.status_code, 400)

        response = self.client.post("/api/problem/1/input/", {})
        self.assertEqual(response.status_code, 405)

    def test_get_problem_output(self):
        response = self.client.get("/api/problem/1/output/")
        self.assertEqual(response.status_code, 200)

        response = self.client.get("/api/problem/100/output/")
        self.assertEqual(response.status_code, 400)

        response = self.client.post("/api/problem/1/output/", {})
        self.assertEqual(response.status_code, 405)


class ProblemByStyleIdTest(TestCase):
    def test_problem_create(self):
        # Do not implement with REST API

        Problem(
            content="For test", name="ITP1_6_B", style=Problem.ProblemStyle.UM
        ).save()
        self.assertEqual(len(Problem.objects.all()), 1)


class SolutionTest(TestCase):
    def setUp(self):
        self.client = Client()

        User.objects.create_user(
            username="test", password="123", email="test@test.com", salt="123", role=1
        )
        self.client.login(username="test", password="123")

        Problem(
            content="For test", name="ITP1_6_B", style=Problem.ProblemStyle.UM
        ).save()

    def test_soltuion_create(self):
        solution_body = {
            "content": "n=int(input())\na=[[0 for i in range(13)]for j in range(4)]\nfor k in range(n):\ncard=input().split()\np=5\nif (card[0]=='S'):\np=0\nelif (card[0]=='H':\np=1\nelif (card[0]=='C'):\np=2\nelse:\np=3\nq=int(card[1])-1\na[p][q]=1\nfor i in range(4):\nfor j in range(13):\nif a[i][j]==0:\ntype=''\nif i==0 :\ntype='S'\nelif i==1:\ntype='H'\nelif i==2:\ntype='C'\nelse:\ntype='D'\nprint('{0} {1}'.format(type,j+1))",
            "erase_cnt": 12,
        }

        response = self.client.post(
            "/api/problem/1/solution/",
            json.dumps(solution_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(Solution.objects.all()), 1)

    def test_solution_create_exception(self):
        response = self.client.get("/api/problem/1/solution/")
        self.assertEqual(response.status_code, 405)

        response = self.client.post("/api/problem/2/solution/", {})

        self.assertEqual(response.status_code, 400)
