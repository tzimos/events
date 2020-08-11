from rest_framework import serializers

from event.models import Event
from ticket.models import Ticket


class BulkTicketCreateSerializer(serializers.Serializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._created_ticket_ids = []

    event_id = serializers.IntegerField(write_only=True)
    num_of_tickets = serializers.IntegerField(write_only=True)
    created_ticket_ids = serializers.SerializerMethodField()

    def save(self, **kwargs):
        data = self.validated_data
        event = Event.objects.filter(pk=data["event_id"]).first()
        tickets = Ticket.objects.bulk_create([
            Ticket(event=event)
            for _ in range(data["num_of_tickets"])
        ])
        self._created_ticket_ids = [
            str(ticket.id)
            for ticket in tickets
        ]

    def get_created_ticket_ids(self, obj):
        return self._created_ticket_ids
