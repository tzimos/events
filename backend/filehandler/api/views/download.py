import csv

from django.http import HttpResponse
from django.utils import timezone
from rest_framework import generics

from filehandler.api.serializers import TicketDownloadSerializer
from ticket.models import Ticket


class TicketCsvDownloaderView(generics.CreateAPIView):
    serializer_class = TicketDownloadSerializer

    def get_queryset(self):
        filters = {}
        for key, val in self.request.data.items():
            if key == "status":
                filters["status"] = val
            if key == "ticket_ids":
                filters["id__in"] = val

        return Ticket.objects.filter(**filters).all()

    def prepare_response(self):
        """Return the response object ready to stream the csv."""
        response = HttpResponse(content_type="text/csv")
        dt = timezone.now().strftime("%Y_%m_%d_%H_%M_%S")
        name = "non_redeemed_tickets"
        filename = f"{dt}_{name}.csv"
        response["Content-Disposition"] = f"attachment; filename='{filename}'"
        return response

    def write_csv_in_response(self, serializer):
        """Write the csv content to the response."""
        response = self.prepare_response()
        header = self.serializer_class().get_headers()
        writer = csv.DictWriter(response, fieldnames=header)
        writer.writeheader()
        for row in serializer.data:
            writer.writerow(row)
        return response

    def post(self, request, *args, **kwargs):
        """Return the csv to the user for all non redeemed tickets."""
        qs = self.get_queryset()
        serializer = self.get_serializer(qs, many=True)
        return self.write_csv_in_response(serializer)
