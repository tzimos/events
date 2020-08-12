from rest_framework import serializers

from ticket.models import Ticket


class TicketDownloadSerializer(serializers.ModelSerializer):
    event_name = serializers.CharField(read_only=True, source="event.name")
    status = serializers.CharField(source="get_status_display")
    ticket_ids = serializers.ListField(
        child=serializers.CharField(default=''),
        write_only=True
    )

    class Meta:
        model = Ticket
        fields = [
            "id",
            "event_name",
            "status",
            "ticket_ids"
        ]

    def get_headers(self):
        return ["id", "event_name", "status",]
