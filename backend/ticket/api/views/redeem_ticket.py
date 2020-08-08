from rest_framework import generics

from ticket.api.serializers import TicketSerializer


class RedeemTicketApiView(generics.UpdateAPIView):
    http_method_names = ["PATCH", ]
    serializer_class = TicketSerializer
