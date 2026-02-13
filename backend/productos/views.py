from django.http import JsonResponse
from .models import Categoria, Producto

def categorias(request):
    data = list(Categoria.objects.filter(activa=True).values("id", "nombre", "slug"))
    return JsonResponse(data, safe=False)

def productos(request):
    qs = Producto.objects.filter(activo=True).select_related("categoria").order_by("-creado")
    data = []
    for p in qs:
        data.append({
            "id": p.id,
            "nombre": p.nombre,
            "slug": p.slug,
            "descripcion": p.descripcion,
            "categoria": {
                "id": p.categoria.id,
                "nombre": p.categoria.nombre,
                "slug": p.categoria.slug,
            },
            "imagen": p.imagen.url if p.imagen else None,
        })
    return JsonResponse(data, safe=False)
