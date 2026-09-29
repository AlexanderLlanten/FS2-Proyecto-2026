# KYNEX

Proyecto desarrollado para la asignatura **DSY1104 - Desarrollo Fullstack II**.

## Descripción

KYNEX es una plataforma web orientada al deporte que integra comercio electrónico de suplementos, entrenamiento, alimentación deportiva, seguimiento de suplementación, noticias, eventos y comunidad.

La aplicación busca diferenciarse de una tienda tradicional mediante la personalización de la experiencia según el deporte y los objetivos del usuario.

## Funcionalidades principales

### Tienda

- Catálogo de suplementos.
- Filtros por categoría.
- Filtros por deporte.
- Filtros por objetivo.
- Detalle de producto.
- Carrito de compras.
- Persistencia del carrito mediante LocalStorage.
- Información nutricional.
- Información de alérgenos.
- Información de uso y seguridad.
- Reseñas y preguntas de usuarios.

### Perfil deportivo

El usuario podrá seleccionar su disciplina deportiva para personalizar la experiencia.

Disciplinas iniciales:

- Gym.
- Boxeo.
- Running.
- Trekking.
- Ciclismo.
- Cross Training.

### Entrenamiento

- Exploración de ejercicios.
- Clasificación por grupos musculares.
- Creación de rutinas.
- Almacenamiento local de rutinas.
- Enlaces de apoyo hacia MuscleWiki.

### Seguimiento

- Registro de suplementos.
- Registro de consumo.
- Seguimiento semanal.
- Visualización de adherencia.

### Nutrición

- Recomendaciones generales de alimentos según disciplina deportiva.
- Recetas.
- Contenido relacionado con entrenamiento y alimentación.

### Explore

- Noticias deportivas.
- Eventos.
- Contenido relacionado con las distintas disciplinas disponibles en KYNEX.

### Comunidad

- Contenido organizado mediante hashtags.
- Enlaces hacia redes sociales.
- Experiencia demostrativa de comunidad deportiva.

### Administración

El proyecto contará con una interfaz administrativa independiente que permitirá gestionar:

- Productos.
- Usuarios.
- Noticias.
- Eventos.

Los perfiles definidos inicialmente son:

- Administrador.
- Vendedor.
- Cliente.

## Tecnologías

El Front End de la primera etapa utilizará:

- HTML5.
- CSS3.
- JavaScript.
- Bootstrap 5.
- Bootstrap Icons.
- LocalStorage.
- Git.
- GitHub.

## Arquitectura inicial

```text
KYNEX
│
├── assets
│   ├── css
│   ├── js
│   │   ├── data
│   │   ├── modules
│   │   ├── services
│   │   └── utils
│   └── img
│
├── pages
│   ├── shop
│   ├── training
│   ├── nutrition
│   ├── explore
│   ├── community
│   ├── account
│   └── information
│
├── admin
│
└── docs
