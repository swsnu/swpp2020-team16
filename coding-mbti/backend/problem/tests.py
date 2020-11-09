from django.test import TestCase, Client
from user.models import User
from problem.models import Problem, Solution
import json


class ProblemTest(TestCase):
    def test_problem_create(self):
        # Do not implement with REST API

        Problem(content="For test", name="ITP1_6_B",
                style=Problem.ProblemStyle.UM).save()
        self.assertEqual(len(Problem.objects.all()), 1)


class SolutionTest(TestCase):
    def test_soltuion_create(self):
        client = Client()

        User.objects.create_user(
            username="test", password="123", email="test@test.com", salt="123", role=1)
        client.login(username='test', password='123')

        Problem(content="For test", name="ITP1_6_B",
                style=Problem.ProblemStyle.UM).save()

        solution_body = {
            "problem": 1,
            "content": "n=int(input())\na=[[0 for i in range(13)]for j in range(4)]\nfor k in range(n):\ncard=input().split()\np=5\nif (card[0]=='S'):\np=0\nelif (card[0]=='H':\np=1\nelif (card[0]=='C'):\np=2\nelse:\np=3\nq=int(card[1])-1\na[p][q]=1\nfor i in range(4):\nfor j in range(13):\nif a[i][j]==0:\ntype=''\nif i==0 :\ntype='S'\nelif i==1:\ntype='H'\nelif i==2:\ntype='C'\nelse:\ntype='D'\nprint('{0} {1}'.format(type,j+1))",
            "erase_cnt": 12
        }

        response = client.post(
            '/api/problem/solution/', json.dumps(solution_body), content_type='application/json')

        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(Solution.objects.all()), 1)
