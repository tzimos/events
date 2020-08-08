from django import forms
from django.core.exceptions import ValidationError

from event.constants import INVALID_INITIAL_TICKETS
from event.models import Event


class EventAdminForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = "__all__"

    def clean(self):
        data = self.cleaned_data
        event = self.instance
        tickets_count, total_count = event.get_tickets_to_be_created_count(
            data.get("initial_tickets", 0)
        )
        if tickets_count < 0:
            raise ValidationError(
                INVALID_INITIAL_TICKETS.format(
                    total_tickets_count=total_count
                )
            )

        return data
