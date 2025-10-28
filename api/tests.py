from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import Activity


class UserAuthTests(APITestCase):
    def test_register_user(self):
        url = reverse('register')
        data = {"username": "testuser", "password": "pass123"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, "testuser")

    def test_login_user(self):
        User.objects.create_user(username="testuser", password="pass123")
        url = reverse('login')
        data = {"username": "testuser", "password": "pass123"}
        response = self.client.post(url, data, format='json')
        # Expect JWT tokens in response
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)


class ActivityTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="pass123")
        self.client.force_authenticate(user=self.user)

    def test_create_activity(self):
        url = reverse('activity-list')
        data = {
            "user": self.user.username,
            "activity_type": "Workout",
            "status": "planned",
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Activity.objects.count(), 1)
        self.assertEqual(Activity.objects.get().activity_type, "Workout")

    def test_get_activities(self):
        Activity.objects.create(user=self.user.username, activity_type="Meal", status="completed")
        url = reverse('activity-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)

    def test_delete_activity(self):
        activity = Activity.objects.create(user="self.user.username", activity_type="Workout", status="planned")
        url = reverse('activity-detail', args=[activity.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Activity.objects.count(), 0)

# def test_update_activity(self):
#     activity = Activity.objects.create(user="self.user.username", activity_type="Workout", status="planned")
#     url = reverse('activity-detail', args=[activity.id])
#     data = {"activity_type": "Meal", "status": "completed"}
#     response = self.client.put(url, data, format='json')
#     self.assertEqual(response.status_code, status.HTTP_200_OK)
#     self.assertEqual(Activity.objects.get().activity_type, "Meal")


