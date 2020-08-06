"""The Event model module."""
from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Event(models.Model):

    name = models.CharField(
        max_length=100,
        blank=False,
        null=False
    )

    initial_tickets = models.IntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    date = models.DateField()

    created_by = models.ForeignKey(
        User,
        blank=True,
        null=True,
        on_delete=models.SET_NULL
    )
