import json
from django.test import TestCase, Client
from user.models import User, Coder, Manager, CodingStyle
from group.models import Group, Invitation

# Create your tests here.


class GroupModelTest(TestCase):
    def setUp(self):
        self.client = Client()

        user = User.objects.create_user(
            username="test", password="123", email="test@test.com", salt="123", role=User.Role.Manager
        )
        user.save()

        user2 = User.objects.create_user(
            username="test2", password="123", email="test2@test.com", salt="123", role=User.Role.Manager
        )
        user2.save()

        self.manager = Manager(user=user)
        self.manager.save()

        self.manager2 = Manager(user=user2)
        self.manager2.save()

        self.client.login(username="test", password="123")

    def test_group_members_get(self):
        group = Group(name="test_group", manager=self.manager)
        group.save()

        user = User.objects.create_user(
            "test-receiver", "1234", email="", salt="", role=User.Role.Coder)

        coder = Coder(user=user, group=group)
        coder.save()

        response = self.client.get(f"/api/group/{group.pk}/members/")
        self.assertEqual(response.status_code, 200)

        response = self.client.post(f"/api/group/{group.pk}/members/", {})
        self.assertEqual(response.status_code, 405)

        group = Group(name="test2_group", manager=self.manager2)
        group.save()

        response = self.client.get(f"/api/group/{group.pk}/members/")
        self.assertEqual(response.status_code, 400)

        self.client.logout()
        self.client.login(username="test-receiver", password="1234")

        response = self.client.get(f"/api/group/{group.pk}/members/")
        self.assertEqual(response.status_code, 400)

    def test_group_members_delete(self):
        group = Group(name="test_group", manager=self.manager)
        group.save()

        user = User.objects.create_user(
            "test-receiver", "1234", email="", salt="", role=User.Role.Coder)

        coder = Coder(user=user, group=group)
        coder.save()

        response = self.client.delete(
            f"/api/group/{group.id}/members/{user.id}/")
        self.assertEqual(response.status_code, 204)

        coder = Coder.objects.get(user=user)
        self.assertEqual(coder.group, None)

        response = self.client.delete(f"/api/group/{group.id}/members/100/")
        self.assertEqual(response.status_code, 400)

        response = self.client.post(
            f"/api/group/{group.id}/members/{user.id}/", {})
        self.assertEqual(response.status_code, 405)

        group = Group(name="test_group2", manager=self.manager2)
        group.save()

        response = self.client.delete(
            f"/api/group/{group.id}/members/{user.id}/")
        self.assertEqual(response.status_code, 400)

    def test_group_get(self):
        response = self.client.get('/api/group/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content.decode(), '[]')

        self.client.post(
            '/api/group/', json.dumps({"name": "test_group"}), content_type="application/json")
        response = self.client.get('/api/group/')
        self.assertEqual(response.status_code, 200)

    def test_group_create(self):
        response = self.client.post(
            '/api/group/', json.dumps({"name": "test_group"}), content_type="application/json")
        self.assertEqual(response.status_code, 201)

    def test_group_fail(self):
        self.client.post(
            '/api/group/', json.dumps({"name": "test_group"}), content_type="application/json")

        response = self.client.post(
            '/api/group/', json.dumps({"name": "test_group"}), content_type="application/json")
        self.assertEqual(response.status_code, 409)

        response = self.client.post('/api/group/', {})
        self.assertEqual(response.status_code, 400)

        response = self.client.delete("/api/group/")
        self.assertEqual(response.status_code, 405)

        user = User.objects.create_user(
            "test-receiver", "1234", email="", salt="", role=User.Role.Coder)

        self.client.logout()
        self.client.login(username="test-receiver", password="1234")

        response = self.client.get("/api/group/")

        self.assertEqual(response.status_code, 400)

    def test_group_by_id(self):
        group = Group(name="test_group", manager=self.manager)
        group.save()
        response = self.client.get(
            f"/api/group/{group.id}/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content.decode(), json.dumps(
            group.to_dict()))

        response = self.client.delete(f"/api/group/{group.id}/")
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Group.objects.count(), 0)

    def test_group_by_id_fail(self):
        response = self.client.get(
            "/api/group/100/")

        self.assertEqual(response.status_code, 400)

        response = self.client.delete(
            f"/api/group/100/")

        self.assertEqual(response.status_code, 400)

        response = self.client.put(f"/api/group/100/", {})
        self.assertEqual(response.status_code, 405)

    def test_group_invite(self):
        response = self.client.get("/api/group/invite/")
        self.assertEqual(response.status_code, 400)

        user = User.objects.create_user(
            "test-receiver", "1234", email="", salt="", role=User.Role.Coder)

        coder = Coder(user=user)
        coder.save()

        response = self.client.post(
            '/api/group/', json.dumps({"name": "test_group"}), content_type="application/json")

        group_id = json.loads(response.content)["id"]
        response = self.client.post(
            "/api/group/invite/", json.dumps({"receiver": user.pk, "group": group_id}), content_type="application/json")

        self.assertEqual(response.status_code, 201)

        invitation_id = json.loads(response.content)["id"]

        response = self.client.get(
            f"/api/group/invite/accept/{invitation_id}/")

        self.assertEqual(response.status_code, 400)

        self.client.logout()
        self.client.login(username="test-receiver", password="1234")
        response = self.client.get(
            f"/api/group/invite/accept/{invitation_id}/")

        self.assertEqual(response.status_code, 204)

        response = self.client.post(
            f"/api/group/invite/")

        self.assertEqual(response.status_code, 400)

        response = self.client.delete(
            f"/api/group/invite/")

        self.assertEqual(response.status_code, 405)

        response = self.client.get("/api/group/invite/")
        self.assertEqual(response.status_code, 200)

        self.client.logout()
        self.client.login(username="aa", password="11")

        response = self.client.delete(
            f"/api/group/invite/accept/{invitation_id}/")

        self.assertEqual(response.status_code, 400)

        self.client.logout()
        self.client.login(username="test-receiver", password="1234")

        response = self.client.delete(
            f"/api/group/invite/accept/{invitation_id}/")

        self.assertEqual(response.status_code, 204)
        self.assertEqual(Invitation.objects.count(), 0)

        response = self.client.delete(
            f"/api/group/invite/accept/{invitation_id}/")

        self.assertEqual(response.status_code, 400)

        someone_else = User.objects.create_user(
            username="aa", password="11", email="123@112", salt="", role=User.Role.Coder)

        self.client.logout()
        self.client.login(username="test", password="123")

        response = self.client.post(
            "/api/group/invite/", json.dumps({"receiver": user.pk, "group": group_id}), content_type="application/json")

        invitation_id = json.loads(response.content)["id"]

        Group.objects.get(name="test_group").delete()

        self.client.logout()
        self.client.login(username="test-receiver", password="1234")

        response = self.client.get(
            f"/api/group/invite/accept/{invitation_id}/")

        self.assertEqual(response.status_code, 400)

        response = self.client.post(
            f"/api/group/invite/accept/{invitation_id}/", {})

        self.assertEqual(response.status_code, 405)

    def test_group_relations(self):
        group = Group(name="test_group", manager=self.manager)
        group.save()

        group2 = Group(name="test2_group", manager=self.manager2)
        group2.save()

        user = User.objects.create_user(
            "test-receiver", "1234", email="", salt="", role=User.Role.Coder)

        style = CodingStyle(
            style=CodingStyle.Style.MTEJ, UM_value=1.0,
            TI_value=1.0, EF_value=1.0, JC_value=1.0)

        style.save()
        coder = Coder(user=user, style=style, group=group)
        coder.save()

        self.client.logout()
        self.client.login(username="test-receiver", password="1234")

        response = self.client.get(f"/api/group/{group.pk}/find_relation/")
        self.assertEqual(response.status_code, 400)

        self.client.logout()
        self.client.login(username="test", password="123")

        response = self.client.get(f"/api/group/{group.pk}/find_relation/")
        self.assertEqual(response.status_code, 200)

        response = self.client.get(f"/api/group/{group2.pk}/find_relation/")
        self.assertEqual(response.status_code, 400)

        Group.objects.get(name="test_group").delete()

        response = self.client.get(f"/api/group/{group.pk}/find_relation/")

        self.assertEqual(response.status_code, 400)

        response = self.client.delete(f"/api/group/{group.pk}/find_relation/")

        self.assertEqual(response.status_code, 405)
