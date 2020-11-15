import json
from django.test import TestCase, Client
from user.models import User


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

        expected_response = {"id": User.objects.get(username='test').pk}
        self.assertEqual(res.content.decode(), json.dumps(expected_response))

        res = self.client.get("/api/user/login/")

        self.assertEqual(res.status_code, 405)

        res = self.client.post("/api/user/login/", json.dumps(
            {"username": "test", "password": "test1"}), content_type="application/json")

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
