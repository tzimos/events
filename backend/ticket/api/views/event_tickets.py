from rest_framework import generics

from ticket.api.serializers import EventTicketsSerializer
from ticket.models import Ticket


class EventTicketsView(generics.ListAPIView):
    serializer_class = EventTicketsSerializer

    def get_queryset(self):
        return Ticket.objects.prefetch_related("event").filter(
            event__pk=self.kwargs["event_pk"]
        ).all()
