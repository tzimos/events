from rest_framework import generics

from ticket.api.serializers import TicketSerializer
from ticket.models import Ticket


class TicketDetailApiView(generics.RetrieveAPIView):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.select_related("event").all()
