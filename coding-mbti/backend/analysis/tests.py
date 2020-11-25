from django.test import TestCase, Client
from user.models import User
from problem.models import Problem, Solution
from analysis.models import SolutionReport
from user.models import User, Coder, CodingStyle

import json


class AnalysisTestCase(TestCase):
    def test_user_report_view(self):
        client = Client()

        User.objects.create_user(
            username="test", password="123", email="test@test.com", salt="123", role=1
        )
        client.login(username="test", password="123")

        problem1 = Problem(desc="For test", input_desc="For test",
                           output_desc="Fore test", pid="ITP1_6_B", objective=1)
        problem1.save()

        problem2 = Problem(desc="For test", input_desc="For test",
                           output_desc="Fore test", pid="ITP2_3_B", objective=1)
        problem2.save()

        solution1_body = {
            "erase_cnt": 12,
            "elapsed_time": 30,
            "evaluation": 66.0,
            "code": "n=int(input())\na=[[0 for i in range(13)]for j in range(4)]\nfor k in range(n):\ncard=input().split()\np=5\nif (card[0]=='S'):\np=0\nelif (card[0]=='H':\np=1\nelif (card[0]=='C'):\np=2\nelse:\np=3\nq=int(card[1])-1\na[p][q]=1\nfor i in range(4):\nfor j in range(13):\nif a[i][j]==0:\ntype=''\nif i==0 :\ntype='S'\nelif i==1:\ntype='H'\nelif i==2:\ntype='C'\nelse:\ntype='D'\nprint('{0} {1}'.format(type,j+1))",
        }

        response = client.post(
            "/api/problem/1/solution/",
            json.dumps(solution1_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 204)

        solution2_body = {
            "erase_cnt": 12,
            "elapsed_time": 30,
            "evaluation": 66.0,
            "code": "n=int(input())\na=[[0 for i in range(13)]for j in range(4)]\nfor k in range(n):\ncard=input().split()\np=5\nif (card[0]=='S'):\np=0\nelif (card[0]=='H':\np=1\nelif (card[0]=='C'):\np=2\nelse:\np=3\nq=int(card[1])-1\na[p][q]=1\nfor i in range(4):\nfor j in range(13):\nif a[i][j]==0:\ntype=''\nif i==0 :\ntype='S'\nelif i==1:\ntype='H'\nelif i==2:\ntype='C'\nelse:\ntype='D'\nprint('{0} {1}'.format(type,j+1))",
        }

        response = client.post(

            "/api/problem/2/solution/",
            json.dumps(solution2_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 204)

        client.post("/api/analysis/my/report/")

        self.assertEqual(response.status_code, 204)

    def test_user_report_analysis_exception(self):
        client = Client()

        User.objects.create_user(
            username="test", password="123", email="test@test.com", salt="123", role=1
        )
        client.login(username="test", password="123")

        res = client.put("/api/analysis/my/report/", {})

        self.assertEqual(res.status_code, 405)

     
    def test_get_coders_by_style(self):
        user1 = User.objects.create_user(
            username="test1", password="123", email="test1@test.com", salt="123", role=1)
        user2 = User.objects.create_user(
            username="test2", password="123", email="test2@test.com", salt="123", role=1)
        user3 = User.objects.create_user(
            username="test3", password="123", email="test3@test.com", salt="123", role=1)

        coding_style1 = CodingStyle(style=CodingStyle.Style.UIFC, UM_value=0, TI_value=0,EF_value=0,JC_value=0)
        coding_style1.save()
        coding_style2 = CodingStyle(style=CodingStyle.Style.UIFC, UM_value=0, TI_value=0,EF_value=0,JC_value=0)
        coding_style2.save()
        coding_style3 = CodingStyle(style=CodingStyle.Style.UIFC, UM_value=0, TI_value=0,EF_value=0,JC_value=0)
        coding_style3.save()

        coder1 = Coder(user=user1, style=coding_style1) 
        coder1.save()
        coder2 = Coder(user=user2, style=coding_style2)
        coder2.save()
        coder3 = Coder(user=user3, style=coding_style3)
        coder3.save()

        expected_response = [{"user_id":user1.pk, "username": "test1", "style":8,},
        {"user_id":user2.pk,"username": "test2", "style":8,},
        {"user_id":user3.pk,"username": "test3", "style":8, }
        ]

        client = Client()
        res = client.get("/api/analysis/style/8/")
        self.assertEqual(res.content.decode(), json.dumps(expected_response))

    def test_get_coders_by_style_exception(self):
        client = Client()
        res = client.post("/api/analysis/style/8/",{})
        self.assertEqual(res.status_code, 405)


