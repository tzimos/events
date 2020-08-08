"""Development settings module."""
from backend.settings.base import *

DEBUG = True

ALLOWED_HOSTS = ["*", ]
INSTALLED_APPS += [
    "debug_toolbar",
    "django_extensions",
]
INTERNAL_IPS = ["127.0.0.1", ]
MIDDLEWARE += ["debug_toolbar.middleware.DebugToolbarMiddleware", ]

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
