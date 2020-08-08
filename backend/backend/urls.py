from django.conf import settings
from django.contrib import admin
from django.urls import (
    include,
    path,
)

api_urlpatterns = [
    path("events/", include("event.api.urls")),
    path("tickets/", include("ticket.api.urls"))
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(api_urlpatterns))
]

if settings.DEBUG:
    import debug_toolbar

    urlpatterns.insert(0,
                       path("__debug__/", include(debug_toolbar.urls)),
                       )
