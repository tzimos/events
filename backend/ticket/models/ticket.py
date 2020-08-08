"""The Ticket model module."""
import uuid
from enum import Enum

from django.db import models
from django.utils.translation import ugettext_lazy as _


class Ticket(models.Model):
    """Definition of the ticket model."""

    class StatusChoices(Enum):
        """Enum sub-class to define the ticket choices."""
        O = _("OK")
        R = _("Redeemed")

        @classmethod
        def get_choices(cls):
            return [
                (attr.name, attr.value)
                for attr in cls
            ]

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_index=True
    )
    event = models.ForeignKey(
        "event.Event",
        on_delete=models.CASCADE,
        related_name="tickets"
    )
    status = models.CharField(
        _("Status"),
        max_length=1,
        default=StatusChoices.O.name,
        choices=StatusChoices.get_choices(),
    )

    def __str__(self):
        return f"Ticket {self.id}"
