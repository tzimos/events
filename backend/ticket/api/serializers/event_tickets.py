from rest_framework import serializers

from ticket.models import Ticket


class EventTicketsSerializer(serializers.ModelSerializer):
    status = serializers.CharField(source="get_status_display")

    class Meta:
        model = Ticket
        fields = (
            "id",
            "status",
            "event",
        )
        depth = 1
