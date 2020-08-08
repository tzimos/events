from django.urls import path
from ticket.api.views import (
    RedeemTicketApiView,
    TicketDetailApiView,
)

app_name = "ticket"

urlpatterns = [
    path("<uuid:pk>/", TicketDetailApiView.as_view(), name="ticket-view"),
    path(
        "redeem/<uuid:ticket_pk>/",
        RedeemTicketApiView.as_view(),
        name="redeem-ticket"
    )
]
