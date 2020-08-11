from django.urls import path

from ticket.api.views import (
    BulkTicketCreateApiView,
    EventTicketsView,
    RedeemTicketApiView,
    TicketDetailApiView,
)

app_name = "ticket"

urlpatterns = [
    path("<uuid:pk>/", TicketDetailApiView.as_view(), name="ticket-view"),
    path(
        "redeem/<uuid:pk>/",
        RedeemTicketApiView.as_view(),
        name="redeem-ticket"
    ),
    path(
        "event/<int:event_pk>/",
        EventTicketsView.as_view(),
        name="event-tickets"
    ),
    path(
        "bulk-create/",
        BulkTicketCreateApiView.as_view(),
        name="bulk-create-tickets"
    )
]
