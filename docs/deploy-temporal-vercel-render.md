# Deploy temporal sin dominio (Vercel + Render)

## Arquitectura
- Frontend React/Vite: Vercel (gratis, URL `*.vercel.app`)
- Backend Django: Render (gratis, URL `*.onrender.com`)
- Base de datos: PostgreSQL en Render (free)

## 1) Subir repo a GitHub
- Confirma que estos archivos ya esten en repo:
  - `backend/requirements.txt`
  - `backend/build.sh`
  - `backend/render.yaml`
  - `frontend/vercel.json`

## 2) Publicar backend en Render
- En Render: `New` -> `Blueprint`
- Selecciona tu repo
- Render lee `backend/render.yaml` y crea:
  - web service (API)
  - PostgreSQL
- Espera deploy inicial.

### Variables a completar en Render (servicio API)
- `DJANGO_CORS_ALLOWED_ORIGINS` = `https://TU-FRONTEND.vercel.app`
- `DJANGO_CSRF_TRUSTED_ORIGINS` = `https://TU-FRONTEND.vercel.app`

## 3) Publicar frontend en Vercel
- En Vercel: `Add New Project` -> selecciona repo
- Root directory: `frontend`
- Framework: Vite
- Variable de entorno:
  - `VITE_API_URL` = `https://TU-BACKEND.onrender.com`
- Deploy.

## 4) Crear admin en producción (una vez)
- En Render -> Shell del servicio:
```bash
python manage.py createsuperuser
```

## 5) Verificaciones finales
- `https://TU-FRONTEND.vercel.app` carga home y catálogo.
- Catálogo consume API sin error CORS.
- Admin login funciona en:
  - `https://TU-FRONTEND.vercel.app/admin/login`
- Crear/editar productos funciona.
- WhatsApp abre con mensaje prellenado.

## Notas
- Planes free pueden “dormir” servicios; primera carga puede tardar.
- Sin dominio igual puedes compartir URLs temporales con clientes.
