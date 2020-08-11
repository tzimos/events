from django.db import models


class DownLoad(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        "auth.User",
        null=True,
        on_delete=models.SET_NULL
    )
    total_redeemed_tickets = models.IntegerField(default=0)
