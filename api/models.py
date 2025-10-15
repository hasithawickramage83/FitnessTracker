from django.db import models

class Activity(models.Model):
    user = models.CharField(max_length=100)  # User name
    activity_type = models.CharField(max_length=50)  # e.g., "Workout", "Meal", "Steps"
    status = models.CharField(
        max_length=20,
        choices=[('planned', 'Planned'), ('in progress', 'In Progress'), ('completed', 'Completed')],
        default='planned'
    )
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.activity_type} ({self.status})"
