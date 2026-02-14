from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase

from .models import Categoria, Producto


class ProductosApiTests(TestCase):
    def setUp(self):
        self.categoria = Categoria.objects.create(nombre="Cuadernos")
        imagen = SimpleUploadedFile("producto.jpg", b"fake-image-bytes", content_type="image/jpeg")
        self.producto = Producto.objects.create(
            categoria=self.categoria,
            nombre="Cuaderno Profesional",
            descripcion="Cuaderno de 100 hojas",
            imagen=imagen,
            activo=True,
        )

    def test_health_endpoint(self):
        response = self.client.get("/api/health/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})

    def test_categorias_endpoint(self):
        response = self.client.get("/api/productos/categorias/")
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(len(payload), 1)
        self.assertEqual(payload[0]["nombre"], self.categoria.nombre)

    def test_productos_endpoint(self):
        response = self.client.get("/api/productos/productos/")
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(len(payload), 1)
        self.assertEqual(payload[0]["nombre"], self.producto.nombre)
        self.assertEqual(payload[0]["categoria"]["slug"], self.categoria.slug)
