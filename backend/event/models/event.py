"""The Event model module."""
from django.contrib.auth import get_user_model
from django.db import models

from event.managers import EventTicketsManager
from ticket.models import Ticket

User = get_user_model()


class Event(models.Model):
    name = models.CharField(
        max_length=100,
        blank=False,
        null=False
    )

    initial_tickets = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    date = models.DateTimeField()

    created_by = models.ForeignKey(
        User,
        blank=True,
        null=True,
        on_delete=models.SET_NULL
    )

    def __str__(self):
        return f"Event: {self.name}"

    objects = EventTicketsManager.as_manager()

    def create_tickets_for_event(self, chosen_ticket_num):
        """Create ticket instances given the """
        Ticket.objects.bulk_create([
            Ticket(event=self)
            for _ in range(chosen_ticket_num)
        ])
