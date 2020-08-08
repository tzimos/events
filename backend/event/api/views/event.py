from django.db.models import (
    Count,
    IntegerField,
    Q,
)
from rest_framework import viewsets

from event.api.serializers import EventSerializer
from event.models import Event
from ticket.models import Ticket


class EventApiViewset(viewsets.ModelViewSet):
    """The event api view set."""
    serializer_class = EventSerializer
    queryset = Event.objects.include_tickets_aggregations().all()
