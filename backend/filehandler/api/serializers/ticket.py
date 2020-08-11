from rest_framework import serializers

from ticket.models import Ticket


class TicketSerializer(serializers.ModelSerializer):
    status = serializers.CharField(source="get_status_display")
    event_name = serializers.CharField(source="event.name")

    class Meta:
        model = Ticket
        fields = [
            "id",
            "event_name",
            "status"
        ]
