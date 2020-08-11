from rest_framework import generics

from ticket.api.serializers import BulkTicketCreateSerializer
from ticket.models import Ticket


class BulkTicketCreateApiView(generics.CreateAPIView):
    serializer_class = BulkTicketCreateSerializer
    queryset = Ticket.objects.select_related("event").all()
