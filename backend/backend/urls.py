from django.conf import settings
from django.contrib import admin
from django.urls import (
    include,
    path,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

authentication_url_patterns = [
    path("", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
api_urlpatterns = [
    path("events/", include("event.api.urls")),
    path("tickets/", include("ticket.api.urls"))
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(api_urlpatterns)),
    path("api/token/", include(authentication_url_patterns))
]

if settings.DEBUG:
    import debug_toolbar

    urlpatterns.insert(
        0, path("__debug__/", include(debug_toolbar.urls)),
    )
