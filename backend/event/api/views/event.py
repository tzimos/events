from rest_framework import viewsets

from event.api.serializers import EventSerializer
from event.models import Event


class EventApiViewset(viewsets.ModelViewSet):
    """The event api view set."""
    serializer_class = EventSerializer
    queryset = Event.objects.include_tickets_aggregations().all()

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
