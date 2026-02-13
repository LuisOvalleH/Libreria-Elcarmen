from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),

    # ✅ Monta la API en /api/ (NO /api/health/)
    path("api/", include("api.urls")),

    # ✅ Catálogo bajo /api/productos/
    path("api/productos/", include("productos.urls")),
]

# ✅ Para servir imágenes en desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
