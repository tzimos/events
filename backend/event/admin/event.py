from django.contrib import admin

from event.admin.forms import EventAdminForm
from event.models import Event


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    """The event admin class for django admin panel."""
    form = EventAdminForm
