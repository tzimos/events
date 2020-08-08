"""Custom manager for event model."""
from django.db import models
from django.db.models import (
    Count,
    IntegerField,
    Q,
)

from ticket.models import Ticket


class EventTicketsManager(models.QuerySet):
    """Custom manager class that gives aggregations ability to Event model."""

    def include_tickets_aggregations(self):
        """Return the tickets aggregations in order to avoid hitting the db
        multiple times when needed, for example at the API.
        """
        return self.annotate(
            total_tickets=Count("tickets"),
            total_redeemed_tickets=Count(
                "tickets",
                filter=Q(tickets__status__contains=Ticket.StatusChoices.R.name),
                output_field=IntegerField())
        )
