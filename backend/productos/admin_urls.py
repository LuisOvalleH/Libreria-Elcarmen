from rest_framework.routers import DefaultRouter

from .admin_api import AdminCategoriaViewSet, AdminProductoViewSet

router = DefaultRouter()
router.register("categorias", AdminCategoriaViewSet, basename="admin-categorias")
router.register("productos", AdminProductoViewSet, basename="admin-productos")

urlpatterns = router.urls
