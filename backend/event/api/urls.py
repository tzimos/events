from rest_framework.routers import DefaultRouter

from event.api.views import EventApiViewset

app_name = "event"
router = DefaultRouter()
router.register("", EventApiViewset, basename="event")

urlpatterns = router.urls
