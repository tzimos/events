from django.contrib import admin

from ticket.models import Ticket


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    """The event admin class for django admin panel."""
