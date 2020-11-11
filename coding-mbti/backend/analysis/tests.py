from django.test import TestCase, Client
from user.models import User
from problem.models import Problem, Solution
from analysis.models import SolutionReport
import json


class AnalysisTestCase(TestCase):
    def test_analysis(self):
        client = Client()

        User.objects.create_user(
            username="test", password="123", email="test@test.com", salt="123", role=1
        )
        client.login(username="test", password="123")

        problem1 = Problem(content="For test", name="ITP1_6_B", objective=1)
        problem1.save()

        problem2 = Problem(content="For test", name="ITP2_3_B", objective=2)
        problem2.save()

        solution1_body = {
            "content": "n=int(input())\na=[[0 for i in range(13)]for j in range(4)]\nfor k in range(n):\ncard=input().split()\np=5\nif (card[0]=='S'):\np=0\nelif (card[0]=='H':\np=1\nelif (card[0]=='C'):\np=2\nelse:\np=3\nq=int(card[1])-1\na[p][q]=1\nfor i in range(4):\nfor j in range(13):\nif a[i][j]==0:\ntype=''\nif i==0 :\ntype='S'\nelif i==1:\ntype='H'\nelif i==2:\ntype='C'\nelse:\ntype='D'\nprint('{0} {1}'.format(type,j+1))",
            "erase_cnt": 12,
        }

        response = client.post(
            "/api/problem/1/solution/",
            json.dumps(solution1_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 204)

        solution2_body = {
            "content": "n=int(input())\na=[[0 for i in range(13)]for j in range(4)]\nfor k in range(n):\ncard=input().split()\np=5\nif (card[0]=='S'):\np=0\nelif (card[0]=='H':\np=1\nelif (card[0]=='C'):\np=2\nelse:\np=3\nq=int(card[1])-1\na[p][q]=1\nfor i in range(4):\nfor j in range(13):\nif a[i][j]==0:\ntype=''\nif i==0 :\ntype='S'\nelif i==1:\ntype='H'\nelif i==2:\ntype='C'\nelse:\ntype='D'\nprint('{0} {1}'.format(type,j+1))",
            "erase_cnt": 8,
        }

        response = client.post(
            "/api/problem/2/solution/",
            json.dumps(solution2_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 204)

        client.post("/api/analysis/")
        self.assertEqual(response.status_code, 204)

        self.assertEqual(
            response.content, b'{"id": 1, "author:": 1, "title": "ITP1_6_B_report", "status": 2, "style-type": 1, "ml_prediction": 1, "ml_probability": 0.6042886058179022, "style_prediction": 1, "style_probability": 0.5526936177284864, "erase_prediction": 0.0, "erase_probability": 0.0}')

    def test_analysis_exception(self):
        client = Client()

        User.objects.create_user(
            username="test", password="123", email="test@test.com", salt="123", role=1
        )
        client.login(username="test", password="123")

        res = client.put("/api/analysis/", {})

        self.assertEqual(res.status_code, 405)
