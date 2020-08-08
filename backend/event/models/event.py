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

    date = models.DateField()

    created_by = models.ForeignKey(
        User,
        blank=True,
        null=True,
        on_delete=models.SET_NULL
    )

    def __str__(self):
        return f"Event: {self.name}"

    objects = EventTicketsManager.as_manager()

    def get_tickets_to_be_created_count(self, new_tickets):
        """Create new tickets for the given event."""
        if not self.pk:
            return new_tickets, 0
        total_count = self.tickets.count()
        return (new_tickets - total_count), total_count

    def create_tickets_for_event(self, chosen_ticket_num):
        """Create ticket instances given the """
        tickets_count, _ = self.get_tickets_to_be_created_count(
            chosen_ticket_num
        )
        Ticket.objects.bulk_create([
            Ticket(event=self)
            for _ in range(tickets_count)
        ])
