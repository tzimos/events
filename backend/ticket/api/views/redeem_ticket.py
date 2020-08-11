from rest_framework import generics

from ticket.api.serializers import TicketSerializer
from ticket.models import Ticket


class RedeemTicketApiView(generics.UpdateAPIView):
    http_method_names = ["patch", ]
    serializer_class = TicketSerializer
    lookup_url_kwarg = "pk"

    def get_queryset(self):
        return Ticket.objects.filter(status=Ticket.StatusChoices.O.name)
