"""Development settings module."""
from backend.settings.base import *

DEBUG = True

ALLOWED_HOSTS = ["*", ]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "postgres",
        "USER": "postgres",
        "PASSWORD": "password",
        "HOST": "localhost",
        "PORT": "5429",
    }
}

SESSION_ENGINE = "django.contrib.sessions.backends.cache"
