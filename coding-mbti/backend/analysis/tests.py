from django.test import TestCase, Client
from user.models import User
from problem.models import Problem, Solution
from analysis.models import SolutionReport, GlobalReport
from user.models import User, Coder, CodingStyle, Researcher
from utils.utils import to_dict

import json


class AnalysisTestCase(TestCase):
    def test_my_report_view(self):
        client = Client()

        User.objects.create_user(
            username="test", password="123", email="test@test.com", salt="123", role=1
        )
        client.login(username="test", password="123")

        problem1 = Problem(desc="For test", input_desc="For test",
                           output_desc="Fore test", pid="ITP1_6_B", objective=1)
        problem1.save()
        problem1_id = problem1.to_dict()['id']

        problem2 = Problem(desc="For test", input_desc="For test",
                           output_desc="Fore test", pid="ALDS1_4_B", objective=3)
        problem2.save()
        problem2_id = problem2.to_dict()['id']

        problem3 = Problem(desc="For test", input_desc="For test",
                           output_desc="Fore test", pid="ITP1_7_B", objective=2)
        problem3.save()
        problem3_id = problem3.to_dict()['id']

        solution1_body = {
            "erase_cnt": 12,
            "elapsed_time": 30,
            "evaluation": 66.0,
            "code": "n=int(input())\na=[[0 for i in range(13)]for j in range(4)]\nfor k in range(n):\ncard=input().split()\np=5\nif (card[0]=='S'):\np=0\nelif (card[0]=='H':\np=1\nelif (card[0]=='C'):\np=2\nelse:\np=3\nq=int(card[1])-1\na[p][q]=1\nfor i in range(4):\nfor j in range(13):\nif a[i][j]==0:\ntype=''\nif i==0 :\ntype='S'\nelif i==1:\ntype='H'\nelif i==2:\ntype='C'\nelse:\ntype='D'\nprint('{0} {1}'.format(type,j+1))",
        }

        response = client.post(
            f"/api/problem/{problem1_id}/solution/",
            json.dumps(solution1_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)

        solution2_body = {
            "erase_cnt": 12,
            "elapsed_time": 30,
            "evaluation": 66.0,
            "code": "n=int(input())\na=[[0 for i in range(13)]for j in range(4)]\nfor k in range(n):\ncard=input().split()\np=5\nif (card[0]=='S'):\np=0\nelif (card[0]=='H':\np=1\nelif (card[0]=='C'):\np=2\nelse:\np=3\nq=int(card[1])-1\na[p][q]=1\nfor i in range(4):\nfor j in range(13):\nif a[i][j]==0:\ntype=''\nif i==0 :\ntype='S'\nelif i==1:\ntype='H'\nelif i==2:\ntype='C'\nelse:\ntype='D'\nprint('{0} {1}'.format(type,j+1))",
        }

        response = client.post(
            f"/api/problem/{problem2_id}/solution/",
            json.dumps(solution2_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)

        solution3_body = {
            "erase_cnt": 12,
            "elapsed_time": 30,
            "evaluation": 66.0,
            "code": "n=int(input())\na=[[0 for i in range(13)]for j in range(4)]\nfor k in range(n):\ncard=input().split()\np=5\nif (card[0]=='S'):\np=0\nelif (card[0]=='H':\np=1\nelif (card[0]=='C'):\np=2\nelse:\np=3\nq=int(card[1])-1\na[p][q]=1\nfor i in range(4):\nfor j in range(13):\nif a[i][j]==0:\ntype=''\nif i==0 :\ntype='S'\nelif i==1:\ntype='H'\nelif i==2:\ntype='C'\nelse:\ntype='D'\nprint('{0} {1}'.format(type,j+1))",
        }

        response = client.post(
            f"/api/problem/{problem3_id}/solution/",
            json.dumps(solution3_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)

        response = client.post("/api/analysis/my/report/")

        self.assertEqual(response.status_code, 204)

        response = client.get("/api/analysis/my/report/")

        self.assertEqual(response.status_code, 400)

    def test_my_report_view_exception(self):
        client = Client()

        User.objects.create_user(
            username="test", password="123", email="test@test.com", salt="123", role=1
        )
        client.login(username="test", password="123")

        res = client.put("/api/analysis/my/report/", {})

        self.assertEqual(res.status_code, 405)

        client = Client()

        User.objects.create_user(
            username="test2", password="123", email="test2@test.com", salt="123", role=1
        )
        client.login(username="test2", password="123")

        response = client.get("/api/analysis/my/report/")

        self.assertEqual(response.status_code, 400)

        response = client.post("/api/analysis/my/report/")

        self.assertEqual(response.status_code, 400)

    def test_other_report_view(self):
        client = Client()

        user = User.objects.create_user(
            username="test", password="123", email="test@test.com", salt="123", role=1
        )
        user_id = User.objects.filter(email="test@test.com").first().id

        client.login(username="test", password="123")

        problem1 = Problem(desc="For test", input_desc="For test",
                           output_desc="Fore test", pid="ITP1_6_B", objective=1)
        problem1.save()
        problem1_id = problem1.to_dict()['id']

        problem2 = Problem(desc="For test", input_desc="For test",
                           output_desc="Fore test", pid="ALDS1_4_B", objective=3)

        problem2.save()
        problem2_id = problem2.to_dict()['id']

        problem3 = Problem(desc="For test", input_desc="For test",
                           output_desc="Fore test", pid="ITP1_7_B", objective=2)

        problem3.save()
        problem3_id = problem3.to_dict()['id']

        solution1_body = {
            "erase_cnt": 12,
            "elapsed_time": 30,
            "evaluation": 66.0,
            "code": "n=int(input())\na=[[0 for i in range(13)]for j in range(4)]\nfor k in range(n):\ncard=input().split()\np=5\nif (card[0]=='S'):\np=0\nelif (card[0]=='H':\np=1\nelif (card[0]=='C'):\np=2\nelse:\np=3\nq=int(card[1])-1\na[p][q]=1\nfor i in range(4):\nfor j in range(13):\nif a[i][j]==0:\ntype=''\nif i==0 :\ntype='S'\nelif i==1:\ntype='H'\nelif i==2:\ntype='C'\nelse:\ntype='D'\nprint('{0} {1}'.format(type,j+1))",
        }

        response = client.post(
            f"/api/problem/{problem1_id}/solution/",
            json.dumps(solution1_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)

        solution2_body = {
            "erase_cnt": 12,
            "elapsed_time": 30,
            "evaluation": 66.0,
            "code": "n=int(input())\na=[[0 for i in range(13)]for j in range(4)]\nfor k in range(n):\ncard=input().split()\np=5\nif (card[0]=='S'):\np=0\nelif (card[0]=='H':\np=1\nelif (card[0]=='C'):\np=2\nelse:\np=3\nq=int(card[1])-1\na[p][q]=1\nfor i in range(4):\nfor j in range(13):\nif a[i][j]==0:\ntype=''\nif i==0 :\ntype='S'\nelif i==1:\ntype='H'\nelif i==2:\ntype='C'\nelse:\ntype='D'\nprint('{0} {1}'.format(type,j+1))",
        }

        response = client.post(

            f"/api/problem/{problem2_id}/solution/",
            json.dumps(solution2_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)

        solution3_body = {
            "erase_cnt": 12,
            "elapsed_time": 30,
            "evaluation": 66.0,
            "code": "n=int(input())\na=[[0 for i in range(13)]for j in range(4)]\nfor k in range(n):\ncard=input().split()\np=5\nif (card[0]=='S'):\np=0\nelif (card[0]=='H':\np=1\nelif (card[0]=='C'):\np=2\nelse:\np=3\nq=int(card[1])-1\na[p][q]=1\nfor i in range(4):\nfor j in range(13):\nif a[i][j]==0:\ntype=''\nif i==0 :\ntype='S'\nelif i==1:\ntype='H'\nelif i==2:\ntype='C'\nelse:\ntype='D'\nprint('{0} {1}'.format(type,j+1))",
        }

        response = client.post(

            f"/api/problem/{problem3_id}/solution/",
            json.dumps(solution3_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)

        response = client.post("/api/analysis/my/report/")

        self.assertEqual(response.status_code, 204)

        User.objects.create_user(
            username="test2", password="123", email="test2@test.com", salt="123", role=1
        )

        client = Client()

        client.login(username="test2", password="123")

        response = client.get(f"/api/analysis/other/{user_id}/report/")

        self.assertEqual(response.status_code, 200)

    def test_other_report_view_exception(self):
        client = Client()

        User.objects.create_user(
            username="test", password="123", email="test@test.com", salt="123", role=1
        )
        client.login(username="test", password="123")

        res = client.put("/api/analysis/other/1/report/", {})

        self.assertEqual(res.status_code, 405)

        response = client.get("/api/analysis/other/1/report/")

        self.assertEqual(response.status_code, 400)

    def test_get_coders_by_style(self):
        user1 = User.objects.create_user(
            username="test1", password="123", email="test1@test.com", salt="123", role=1)
        user2 = User.objects.create_user(
            username="test2", password="123", email="test2@test.com", salt="123", role=1)
        user3 = User.objects.create_user(
            username="test3", password="123", email="test3@test.com", salt="123", role=1)

        coding_style1 = CodingStyle(
            style=CodingStyle.Style.UITC, UM_value=0.0, TI_value=0.0, RT_value=0.0, JC_value=0.0)
        coding_style1.save()
        coding_style2 = CodingStyle(
            style=CodingStyle.Style.UITC, UM_value=0.0, TI_value=0.0, RT_value=0.0, JC_value=0.0)
        coding_style2.save()
        coding_style3 = CodingStyle(
            style=CodingStyle.Style.UITC, UM_value=0.0, TI_value=0.0, RT_value=0.0, JC_value=0.0)
        coding_style3.save()

        coder1 = Coder(user=user1, style=coding_style1)
        coder1.save()
        coder2 = Coder(user=user2, style=coding_style2)
        coder2.save()
        coder3 = Coder(user=user3, style=coding_style3)
        coder3.save()

        expected_response = [{"user_id": user1.pk, "username": "test1", "style": to_dict(coding_style1), "group": None},
                             {"user_id": user2.pk, "username": "test2",
                                 "style": to_dict(coding_style2), "group": None},
                             {"user_id": user3.pk, "username": "test3",
                                 "style": to_dict(coding_style3), "group": None}
                             ]

        client = Client()

        res = client.get("/api/analysis/style/8/")
        self.assertEqual(res.content.decode(), json.dumps(expected_response))

    def test_get_coders_by_style_exception(self):
        client = Client()
        res = client.post("/api/analysis/style/8/", {})
        self.assertEqual(res.status_code, 405)

    def test_my_solutions(self):

        client = Client()

        user = User.objects.create_user(
            username="test", password="123", email="test@test.com", salt="123", role=1
        )
        user_id = User.objects.filter(email="test@test.com").first().id

        client.login(username="test", password="123")

        problem1 = Problem(desc="For test", input_desc="For test",
                           output_desc="Fore test", pid="ITP1_6_B", objective=1)
        problem1.save()
        problem1_id = problem1.to_dict()['id']

        problem2 = Problem(desc="For test", input_desc="For test",
                           output_desc="Fore test", pid="ALDS1_4_B", objective=3)

        problem2.save()
        problem2_id = problem2.to_dict()['id']

        problem3 = Problem(desc="For test", input_desc="For test",
                           output_desc="Fore test", pid="ITP1_7_B", objective=2)

        problem3.save()
        problem3_id = problem3.to_dict()['id']

        solution1_body = {
            "erase_cnt": 12,
            "elapsed_time": 30,
            "evaluation": 66.0,
            "code": "n=int(input())\na=[[0 for i in range(13)]for j in range(4)]\nfor k in range(n):\ncard=input().split()\np=5\nif (card[0]=='S'):\np=0\nelif (card[0]=='H':\np=1\nelif (card[0]=='C'):\np=2\nelse:\np=3\nq=int(card[1])-1\na[p][q]=1\nfor i in range(4):\nfor j in range(13):\nif a[i][j]==0:\ntype=''\nif i==0 :\ntype='S'\nelif i==1:\ntype='H'\nelif i==2:\ntype='C'\nelse:\ntype='D'\nprint('{0} {1}'.format(type,j+1))",
        }

        response = client.post(
            f"/api/problem/{problem1_id}/solution/",
            json.dumps(solution1_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)

        solution2_body = {
            "erase_cnt": 12,
            "elapsed_time": 30,
            "evaluation": 66.0,
            "code": "n=int(input())\na=[[0 for i in range(13)]for j in range(4)]\nfor k in range(n):\ncard=input().split()\np=5\nif (card[0]=='S'):\np=0\nelif (card[0]=='H':\np=1\nelif (card[0]=='C'):\np=2\nelse:\np=3\nq=int(card[1])-1\na[p][q]=1\nfor i in range(4):\nfor j in range(13):\nif a[i][j]==0:\ntype=''\nif i==0 :\ntype='S'\nelif i==1:\ntype='H'\nelif i==2:\ntype='C'\nelse:\ntype='D'\nprint('{0} {1}'.format(type,j+1))",
        }

        response = client.post(

            f"/api/problem/{problem2_id}/solution/",
            json.dumps(solution2_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)

        solution3_body = {
            "erase_cnt": 12,
            "elapsed_time": 30,
            "evaluation": 66.0,
            "code": "n=int(input())\na=[[0 for i in range(13)]for j in range(4)]\nfor k in range(n):\ncard=input().split()\np=5\nif (card[0]=='S'):\np=0\nelif (card[0]=='H':\np=1\nelif (card[0]=='C'):\np=2\nelse:\np=3\nq=int(card[1])-1\na[p][q]=1\nfor i in range(4):\nfor j in range(13):\nif a[i][j]==0:\ntype=''\nif i==0 :\ntype='S'\nelif i==1:\ntype='H'\nelif i==2:\ntype='C'\nelse:\ntype='D'\nprint('{0} {1}'.format(type,j+1))",
        }

        response = client.post(

            f"/api/problem/{problem3_id}/solution/",
            json.dumps(solution3_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)

        response = client.get("/api/analysis/my/solutions/")

        self.assertEqual(response.status_code, 200)

    def test_my_solutions_exception(self):

        client = Client()

        User.objects.create_user(
            username="test", password="123", email="test@test.com", salt="123", role=1
        )
        client.login(username="test", password="123")

        response = client.get("/api/analysis/my/solutions/")

        self.assertEqual(response.status_code, 400)

        response = client.put("/api/analysis/my/solutions/", {})

        self.assertEqual(response.status_code, 405)

    def test_other_solutions(self):
        client = Client()

        user = User.objects.create_user(
            username="test", password="123", email="test@test.com", salt="123", role=1
        )
        user_id = User.objects.filter(email="test@test.com").first().id

        client.login(username="test", password="123")

        problem1 = Problem(desc="For test", input_desc="For test",
                           output_desc="Fore test", pid="ITP1_6_B", objective=1)
        problem1.save()
        problem1_id = problem1.to_dict()['id']

        problem2 = Problem(desc="For test", input_desc="For test",
                           output_desc="Fore test", pid="ALDS1_4_B", objective=3)

        problem2.save()
        problem2_id = problem2.to_dict()['id']

        problem3 = Problem(desc="For test", input_desc="For test",
                           output_desc="Fore test", pid="ITP1_7_B", objective=1)

        problem3.save()
        problem3_id = problem3.to_dict()['id']

        solution1_body = {
            "erase_cnt": 12,
            "elapsed_time": 30,
            "evaluation": 66.0,
            "code": "n=int(input())\na=[[0 for i in range(13)]for j in range(4)]\nfor k in range(n):\ncard=input().split()\np=5\nif (card[0]=='S'):\np=0\nelif (card[0]=='H':\np=1\nelif (card[0]=='C'):\np=2\nelse:\np=3\nq=int(card[1])-1\na[p][q]=1\nfor i in range(4):\nfor j in range(13):\nif a[i][j]==0:\ntype=''\nif i==0 :\ntype='S'\nelif i==1:\ntype='H'\nelif i==2:\ntype='C'\nelse:\ntype='D'\nprint('{0} {1}'.format(type,j+1))",
        }

        response = client.post(
            f"/api/problem/{problem1_id}/solution/",
            json.dumps(solution1_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)

        solution2_body = {
            "erase_cnt": 12,
            "elapsed_time": 30,
            "evaluation": 66.0,
            "code": "n=int(input())\na=[[0 for i in range(13)]for j in range(4)]\nfor k in range(n):\ncard=input().split()\np=5\nif (card[0]=='S'):\np=0\nelif (card[0]=='H':\np=1\nelif (card[0]=='C'):\np=2\nelse:\np=3\nq=int(card[1])-1\na[p][q]=1\nfor i in range(4):\nfor j in range(13):\nif a[i][j]==0:\ntype=''\nif i==0 :\ntype='S'\nelif i==1:\ntype='H'\nelif i==2:\ntype='C'\nelse:\ntype='D'\nprint('{0} {1}'.format(type,j+1))",
        }

        response = client.post(

            f"/api/problem/{problem2_id}/solution/",
            json.dumps(solution2_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)

        solution3_body = {
            "erase_cnt": 12,
            "elapsed_time": 30,
            "evaluation": 66.0,
            "code": "n=int(input())\na=[[0 for i in range(13)]for j in range(4)]\nfor k in range(n):\ncard=input().split()\np=5\nif (card[0]=='S'):\np=0\nelif (card[0]=='H':\np=1\nelif (card[0]=='C'):\np=2\nelse:\np=3\nq=int(card[1])-1\na[p][q]=1\nfor i in range(4):\nfor j in range(13):\nif a[i][j]==0:\ntype=''\nif i==0 :\ntype='S'\nelif i==1:\ntype='H'\nelif i==2:\ntype='C'\nelse:\ntype='D'\nprint('{0} {1}'.format(type,j+1))",
        }

        response = client.post(

            f"/api/problem/{problem3_id}/solution/",
            json.dumps(solution3_body),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)

        response = client.post("/api/analysis/my/report/")

        self.assertEqual(response.status_code, 204)

        User.objects.create_user(
            username="test2", password="123", email="test2@test.com", salt="123", role=1
        )

        client = Client()

        client.login(username="test2", password="123")

        response = client.get(f"/api/analysis/other/{user_id}/solutions/")

        self.assertEqual(response.status_code, 200)

    def test_other_solutions_exceptions(self):
        client = Client()

        user = User.objects.create_user(
            username="test", password="123", email="test@test.com", salt="123", role=1
        )
        user_id = User.objects.filter(email="test@test.com").first().id

        client.login(username="test", password="123")

        User.objects.create_user(
            username="test2", password="123", email="test2@test.com", salt="123", role=1
        )

        client = Client()

        client.login(username="test2", password="123")

        response = client.get(f"/api/analysis/other/{user_id}/solutions/")

        self.assertEqual(response.status_code, 400)

        response = client.put(f"/api/analysis/other/{user_id}/solutions/", {})

        self.assertEqual(response.status_code, 405)

    def test_report_view(self):
        client = Client()

        user = User.objects.create_user(
            username="test", password="123", email="test@test.com", salt="123", role=User.Role.Manager)
        researcher = Researcher(user=user)
        researcher.save()

        client.login(username="test", password="123")

        CodingStyle(style=1, UM_value=1.0, TI_value=1.0,
                    RT_value=1.0, JC_value=1.0).save()
        CodingStyle(style=2, UM_value=1.0, TI_value=1.0,
                    RT_value=1.0, JC_value=1.0).save()
        CodingStyle(style=3, UM_value=1.0, TI_value=1.0,
                    RT_value=1.0, JC_value=1.0).save()
        CodingStyle(style=4, UM_value=1.0, TI_value=1.0,
                    RT_value=1.0, JC_value=1.0).save()
        CodingStyle(style=5, UM_value=1.0, TI_value=1.0,
                    RT_value=1.0, JC_value=1.0).save()

        response = client.post("/api/analysis/global/report/", json.dumps(
            {"title": "test", "content": "For test"}), content_type="application/json")

        self.assertEqual(response.status_code, 201)
