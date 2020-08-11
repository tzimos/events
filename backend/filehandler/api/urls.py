from django.urls import path

from filehandler.api.views import TicketCsvDownloaderView

app_name = "filehandler"
urlpatterns = [
    path("export/non-redeemed-tickets/",
         TicketCsvDownloaderView.as_view(),
         name="export-non-redeemed-tickets")
]
