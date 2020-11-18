import json
from django.test import TestCase, Client
from user.models import User, Coder, CodingStyle


class UserModelTest(TestCase):
    def setUp(self):
        self.client = Client()

    def not_allowed_get(self, url):
        return self.client.get(url)

    def not_allowed_post(self, url):
        return self.client.post(url, {})

    def signUp(self):
        return self.client.post("/api/user/signup/",
                                json.dumps({"username": "test", "password": "test", "email": "test@test.co.kr", "role": 1}), content_type="application/json")

    def login(self):
        return self.client.post("/api/user/login/", json.dumps(
            {"username": "test", "password": "test"}), content_type="application/json")

    def test_create_model(self):
        User.objects.create_user(
            username="test", password="123", email="test@test.com", salt="123", role=1)
        self.assertEqual(len(User.objects.all()), 1)

    def test_create_superuser(self):
        user = User.objects.create_superuser(
            username="admin", password="admin")
        self.assertEqual(user.is_superuser, True)
        self.assertEqual(user.is_staff, True)

        with self.assertRaisesMessage(TypeError, "Superusers must have a password."):
            user = User.objects.create_superuser(
                username="admin", password=None)

    def test_signup_view(self):
        res = self.signUp()

        self.assertEqual(res.status_code, 201)
        self.assertEqual(len(User.objects.filter(username="test")), 1)

        res = self.not_allowed_get('/api/user/signup/')
        self.assertEqual(res.status_code, 405)

        res = self.client.post('/api/user/signup/', {},
                               content_type="application/json")
        self.assertEqual(res.status_code, 400)

        res = self.signUp()

        self.assertEqual(res.status_code, 409)

    def test_signin_view(self):
        self.signUp()

        res = self.login()
        self.assertEqual(res.status_code, 200)
        expected_response = {"token": User.objects.get(
            username='test').auth_token.key}
        self.assertEqual(res.content.decode(), json.dumps(expected_response))

        res = self.client.get("/api/user/login/")
        self.assertEqual(res.status_code, 405)

        res = self.client.post("/api/user/login/", json.dumps(
            {"username": "invalid user", "password": "invalid password"}),
            content_type="application/json")
        self.assertEqual(res.status_code, 401)

    def test_signout_view(self):
        res = self.client.get("/api/user/logout/")

        self.assertEqual(res.status_code, 401)

        self.signUp()
        self.login()

        res = self.client.get("/api/user/logout/")

        self.assertEqual(res.status_code, 204)

        res = self.client.post("/api/user/logout/", {})

        self.assertEqual(res.status_code, 405)

    def test_token_view(self):
        res = self.client.get('/api/user/token/')

        self.assertEqual(res.status_code, 204)

        res = self.not_allowed_post('/api/user/token/')

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

        expected_response = [{"user_id":user1.pk, "style":8},
        {"user_id":user2.pk, "style":8},
        {"user_id":user3.pk, "style":8}
        ]

        client = Client()
        res = client.get("/api/user/8/")
        self.assertEqual(res.content.decode(), json.dumps(expected_response))

    def test_get_coders_by_style_exception(self):
        client = Client()
        res = client.post("/api/user/8/",{})
        self.assertEqual(res.status_code, 405)


