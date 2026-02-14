from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase

from productos.models import Categoria, Producto


class AdminAuthTests(TestCase):
    def setUp(self):
        self.admin = User.objects.create_user(
            username="admin_test",
            password="strong-pass-123",
            is_staff=True,
        )

    def test_admin_login_returns_token(self):
        response = self.client.post(
            "/api/admin/login/",
            data={"username": "admin_test", "password": "strong-pass-123"},
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.json())

    def test_admin_me_with_token(self):
        login = self.client.post(
            "/api/admin/login/",
            data={"username": "admin_test", "password": "strong-pass-123"},
            content_type="application/json",
        )
        token = login.json()["token"]
        response = self.client.get("/api/admin/me/", HTTP_AUTHORIZATION=f"Token {token}")
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()["is_staff"])


class AdminCatalogCrudTests(TestCase):
    def setUp(self):
        self.admin = User.objects.create_user(
            username="catalog_admin",
            password="strong-pass-123",
            is_staff=True,
        )
        login = self.client.post(
            "/api/admin/login/",
            data={"username": "catalog_admin", "password": "strong-pass-123"},
            content_type="application/json",
        )
        self.token = login.json()["token"]

    def test_create_categoria_and_producto(self):
        cat_response = self.client.post(
            "/api/admin/catalogo/categorias/",
            data={"nombre": "Plumas", "slug": "plumas", "activa": True},
            HTTP_AUTHORIZATION=f"Token {self.token}",
        )
        self.assertEqual(cat_response.status_code, 201)
        categoria_id = cat_response.json()["id"]

        image = SimpleUploadedFile("producto.jpg", b"fake-image-bytes", content_type="image/jpeg")
        prod_response = self.client.post(
            "/api/admin/catalogo/productos/",
            data={
                "nombre": "Pluma Azul",
                "slug": "pluma-azul",
                "descripcion": "Pluma de tinta azul",
                "categoria_id": categoria_id,
                "activo": True,
                "imagen": image,
            },
            HTTP_AUTHORIZATION=f"Token {self.token}",
        )
        self.assertEqual(prod_response.status_code, 201)
        self.assertEqual(Producto.objects.count(), 1)
