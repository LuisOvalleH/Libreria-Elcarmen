import os

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

ADMIN_PATH = os.getenv("DJANGO_ADMIN_PATH", "gestion/")

urlpatterns = [
    path(ADMIN_PATH, admin.site.urls),

    # ✅ Monta la API en /api/ (NO /api/health/)
    path("api/", include("api.urls")),

    # ✅ Catálogo bajo /api/productos/
    path("api/productos/", include("productos.urls")),
]

# ✅ Servir media en este despliegue (Render/Vercel)
# Nota: para alto tráfico conviene migrar a S3/Cloudinary.
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
