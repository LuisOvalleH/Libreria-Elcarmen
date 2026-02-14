# Dia 5 - QA y despliegue (sin dominio)

## 1) QA funcional minimo
- Revisar rutas: `/`, `/catalogo`, `/quienes-somos`, `/servicios`, `/contacto`, `404`.
- Revisar admin: login, crear/editar/eliminar, cerrar sesion.
- Probar WhatsApp en navbar y en cards de catalogo.
- Probar responsive en 360px, 768px y desktop.

## 2) Correr por IP en red local
- Ejecutar una sola vez:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-lan.ps1
```

- Script levanta backend + frontend y muestra URL tipo:
  - `http://192.168.x.x:5174`

## 3) Importante sobre "no abrir CMD"
- Con IP local, el sitio funciona solo mientras:
  - tu PC este encendida
  - procesos backend/frontend esten activos
- Si quieres disponibilidad 24/7 sin dominio, usa:
  - VPS con IP publica
  - o hosting (frontend + backend) con URL temporal

## 4) Recomendacion para demo con clientes
- Mientras no haya dominio:
  - usar URL temporal de hosting (mas estable que IP local)
  - mantener dominio para fase final
