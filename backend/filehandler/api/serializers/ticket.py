from rest_framework import serializers

from ticket.models import Ticket


class TicketDownloadSerializer(serializers.ModelSerializer):
    status = serializers.CharField(source="get_status_display")
    ticket_ids = serializers.ListField(
        child=serializers.CharField(default=''),
        write_only=True
    )

    class Meta:
        model = Ticket
        fields = [
            "status",
            "ticket_ids"
        ]
