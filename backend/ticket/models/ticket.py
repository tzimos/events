"""The Ticket model module."""
import uuid
from enum import Enum

from django.db import models
from django.utils.translation import ugettext_lazy as _

from event.models import Event


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
        Event,
        on_delete=models.CASCADE,
        related_name="tickets"
    )
    status = models.CharField(
        _("Status"),
        max_length=1,
        default="R",
        choices=StatusChoices.get_choices(),
    )
