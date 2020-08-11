import csv

from django.http import HttpResponse
from django.utils import timezone
from rest_framework import generics

from filehandler.api.serializers import TicketSerializer
from ticket.models import Ticket


class TicketCsvDownloaderView(generics.RetrieveAPIView):
    serializer_class = TicketSerializer

    def get_queryset(self):
        return Ticket.objects.filter(status=Ticket.StatusChoices.O.name).all()

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
        header = self.serializer_class.Meta.fields
        writer = csv.DictWriter(response, fieldnames=header)
        writer.writeheader()
        for row in serializer.data:
            writer.writerow(row)
        return response

    def get(self, request, *args, **kwargs):
        """Return the csv to the user for all non redeemed tickets."""
        qs = self.get_queryset()
        serializer = self.get_serializer(qs, many=True)
        return self.write_csv_in_response(serializer)
