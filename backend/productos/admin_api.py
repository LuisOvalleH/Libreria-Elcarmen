from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet

from .models import Categoria, Producto
from .serializers import CategoriaAdminSerializer, ProductoAdminSerializer


class AdminCategoriaViewSet(ModelViewSet):
    queryset = Categoria.objects.all().order_by("nombre")
    serializer_class = CategoriaAdminSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]


class AdminProductoViewSet(ModelViewSet):
    queryset = Producto.objects.select_related("categoria").all().order_by("-creado")
    serializer_class = ProductoAdminSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]
