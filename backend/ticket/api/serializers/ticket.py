from rest_framework import serializers

from ticket.models import Ticket


class TicketSerializer(serializers.ModelSerializer):
    status = serializers.CharField(source="get_status_display")

    class Meta:
        model = Ticket
        fields = [
            "id",
            "event",
            "status"
        ]
        depth = 1
