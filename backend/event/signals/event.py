from django.db.models.signals import post_save
from django.dispatch import receiver

from event.models import Event


@receiver(post_save, sender=Event)
def create_tickets_for_event(sender, instance, *args, **kwargs):
    instance.create_tickets_for_event(instance.initial_tickets)
