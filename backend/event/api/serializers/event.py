from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from event.constants import INVALID_INITIAL_TICKETS
from event.models import Event


class EventSerializer(serializers.ModelSerializer):
    total_redeemed_tickets = serializers.IntegerField(read_only=True)
    total_tickets = serializers.IntegerField(read_only=True)
    id = serializers.IntegerField(read_only=True)
    date = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S")

    class Meta:
        model = Event
        fields = [
            "id",
            "name",
            "initial_tickets",
            "created_at",
            "date",
            "created_by",
            "total_redeemed_tickets",
            "total_tickets",
        ]

    def validate(self, attrs):
        attrs = super().validate(attrs)
        pk = attrs.get("id")
        new_tickets = attrs.get("initial_tickets", 0)
        if new_tickets <= 0:
            raise ValidationError(
                INVALID_INITIAL_TICKETS.format(
                    total_tickets_count=new_tickets
                )
            )
        return attrs
