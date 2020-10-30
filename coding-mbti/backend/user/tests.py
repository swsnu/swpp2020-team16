from django.test import TestCase
from user.models import User

# Create your tests here.
class UserModelTest(TestCase):
    def test_create_model(self):
        User.objects.create_user(username="test", password="123", email="test@test.com", salt="123", role=1)
        self.assertEqual(len(User.objects.all()), 1)
