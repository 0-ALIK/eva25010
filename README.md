# Eva25010

## Description

Eva25010 es una plataforma donde podras publicar tus aplicaciones y las personas podran evaluarlas en base a la norma ISO 25010.

## Installation

```bash
npm install
```

## Como trabajar en el proyecto

Organizar subcarpetas por dominio, por ejemplo:

```
src/
  - pages/
    - evaluaciones/
    - gestion-usuario/
  - components/
    - evaluaciones/
    - gestion-usuario/
  - services/
    - evaluaciones/
    - gestion-usuario/
```

## Environment variables

En la raiz del proyecto crear 2 archivos: `.env.development` y `.env.production` con las siguientes variables:

```bash
VITE_API_URL=http://localhost:3000/api
```
