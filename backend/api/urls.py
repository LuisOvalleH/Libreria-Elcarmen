from django.urls import include, path
from .views import AdminLoginView, AdminLogoutView, AdminMeView, health

urlpatterns = [
    path("health/", health, name="health"),
    path("admin/login/", AdminLoginView.as_view(), name="admin-login"),
    path("admin/me/", AdminMeView.as_view(), name="admin-me"),
    path("admin/logout/", AdminLogoutView.as_view(), name="admin-logout"),
    path("admin/catalogo/", include("productos.admin_urls")),
]
