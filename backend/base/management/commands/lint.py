import os

from django.conf import settings
from django.core.management import BaseCommand


class Command(BaseCommand):
    """Command to lint the project."""

    help = f"Linting for the project."

    def handle(self, *args, **kwargs):
        """Execute the command."""
        dir_ = settings.BASE_DIR
        command = f"flake8 {dir_}"
        os.system(command)
