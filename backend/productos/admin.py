from django.contrib import admin
from django.utils.html import format_html
from .models import Categoria, Producto

admin.site.site_header = "Panel de Administración - Librería El Carmen"
admin.site.site_title = "Admin El Carmen"
admin.site.index_title = "Gestión de Catálogo"


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "slug", "activa")
    search_fields = ("nombre", "slug")
    prepopulated_fields = {"slug": ("nombre",)}
    list_filter = ("activa",)
    list_editable = ("activa",)
    ordering = ("nombre",)


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "categoria", "activo", "creado", "imagen_preview")
    list_filter = ("categoria", "activo")
    search_fields = ("nombre", "descripcion")
    list_editable = ("activo",)
    date_hierarchy = "creado"
    prepopulated_fields = {"slug": ("nombre",)}
    readonly_fields = ("creado", "imagen_preview")
    autocomplete_fields = ("categoria",)
    fieldsets = (
        ("Información principal", {"fields": ("categoria", "nombre", "slug", "descripcion")}),
        ("Estado y fechas", {"fields": ("activo", "creado")}),
        ("Imagen", {"fields": ("imagen", "imagen_preview")}),
    )

    def imagen_preview(self, obj):
        if not obj.imagen:
            return "-"
        return format_html(
            '<img src="{}" style="height: 52px; width: 52px; object-fit: cover; border-radius: 8px; border: 1px solid #e2e8f0;" />',
            obj.imagen.url,
        )

    imagen_preview.short_description = "Imagen"
