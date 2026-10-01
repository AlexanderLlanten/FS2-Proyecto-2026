# KYNEX

KYNEX es una aplicación web Front End orientada a la venta de suplementos deportivos y al apoyo del entrenamiento físico.

La plataforma integra una tienda de productos, carrito de compras, registro e inicio de sesión de usuarios, contenido informativo, biblioteca de ejercicios, creación de rutinas y un módulo administrativo para la gestión de productos, usuarios y pedidos.

---

## Descripción

KYNEX busca ofrecer una experiencia digital que combine comercio electrónico, suplementación deportiva y entrenamiento dentro de una misma plataforma.

El usuario puede explorar productos, consultar información detallada, utilizar un carrito de compras, registrarse en el sistema, iniciar sesión y acceder a contenido relacionado con entrenamiento y suplementación.

Además, la aplicación dispone de una sección de entrenamiento donde se pueden explorar ejercicios y construir una rutina personalizada almacenada localmente.

La plataforma también cuenta con una interfaz administrativa diferenciada según el rol del usuario.

---

## Funcionalidades principales

### Inicio

La página principal presenta:

- Identidad visual de KYNEX.
- Acceso al catálogo de productos.
- Productos destacados.
- Categorías de suplementos.
- Objetivos deportivos.
- Sección de entrenamiento.
- Contenido audiovisual.
- Artículos destacados.
- Navegación hacia las principales secciones del sitio.

---

## Tienda

La tienda permite:

- Visualizar el catálogo de suplementos.
- Buscar productos por nombre, descripción, categoría o código.
- Filtrar productos por categoría.
- Visualizar disponibilidad de stock.
- Consultar el precio de cada producto.
- Acceder al detalle individual de cada producto.

Los productos son administrados mediante JavaScript y almacenados localmente cuando se realizan modificaciones desde el módulo administrativo.

---

## Detalle de producto

Cada producto dispone de una vista individual que presenta información como:

- Nombre.
- Marca.
- Categoría.
- Precio.
- Stock disponible.
- Formato.
- Sabor.
- Descripción.
- Objetivos asociados.
- Ingredientes.
- Beneficios.
- Información nutricional.
- Modo de uso.
- Certificaciones.
- Advertencias.
- Imagen del producto.

Desde esta vista también es posible seleccionar una cantidad y agregar el producto al carrito.

---

## Carrito de compras

El carrito permite:

- Agregar productos.
- Modificar cantidades.
- Eliminar productos.
- Visualizar subtotal y total.
- Mantener los productos almacenados mediante LocalStorage.
- Mostrar la cantidad de productos en el indicador del carrito.

La información permanece disponible mientras se utilice el mismo navegador y no se eliminen los datos almacenados localmente.

---

## Registro de usuarios

La plataforma incluye un formulario de registro con validaciones desarrolladas en JavaScript.

Los datos solicitados incluyen:

- RUN.
- Nombre.
- Apellidos.
- Correo electrónico.
- Fecha de nacimiento.
- Región.
- Comuna.
- Dirección.

Entre las validaciones implementadas se encuentran:

- RUN válido.
- RUN sin puntos ni guion.
- Control de longitud del RUN.
- Nombre obligatorio.
- Apellidos obligatorios.
- Límites máximos de caracteres.
- Validación de correo electrónico.
- Validación de dominios permitidos.
- Detección de RUN duplicado.
- Detección de correo duplicado.
- Región y comuna dependientes.
- Dirección obligatoria.

Los usuarios registrados desde la tienda reciben automáticamente el perfil:

```text
Cliente
```

Para efectos demostrativos de esta versión Front End, la contraseña inicial utilizada es:

```text
1234
```

---

## Inicio de sesión

La plataforma permite iniciar sesión utilizando correo electrónico y contraseña.

El sistema reconoce los siguientes perfiles:

- Administrador.
- Vendedor.
- Cliente.

La navegación posterior al inicio de sesión depende del perfil correspondiente.

### Cliente

El cliente accede a la tienda y a las funcionalidades públicas de KYNEX.

### Vendedor

El vendedor puede acceder a:

- Panel administrativo.
- Listado de productos.
- Detalle de productos.
- Listado de pedidos.
- Detalle de pedidos.

No puede acceder a la gestión de usuarios ni a la creación o edición administrativa de productos.

### Administrador

El administrador dispone de acceso a:

- Panel administrativo.
- Productos.
- Creación y edición de productos.
- Usuarios.
- Creación y edición de usuarios.
- Pedidos.
- Detalle de pedidos.

---

## Usuarios demostrativos

Para facilitar la demostración de los distintos roles se encuentran disponibles los siguientes usuarios:

### Cliente

```text
Correo: camila@gmail.com
Contraseña: 1234
Rol: Cliente
```

### Vendedor

```text
Correo: martin@duoc.cl
Contraseña: 1234
Rol: Vendedor
```

### Administrador

```text
Correo: admin@profesor.duoc.cl
Contraseña: 1234
Rol: Administrador
```

> La autenticación implementada corresponde a una simulación Front End y no representa un sistema de seguridad para producción.

---

## Administración de productos

El módulo administrativo permite:

- Listar productos.
- Crear productos.
- Editar productos.
- Eliminar productos.
- Consultar stock.
- Detectar stock crítico.
- Definir categoría.
- Definir precio.
- Definir imagen.
- Validar información antes de guardar.

Entre las reglas implementadas se encuentran:

- Código obligatorio.
- Código mínimo de 3 caracteres.
- Código de producto no duplicado.
- Nombre obligatorio.
- Nombre máximo de 100 caracteres.
- Descripción máxima de 500 caracteres.
- Precio igual o superior a 0.
- Stock entero igual o superior a 0.
- Stock crítico opcional.
- Stock crítico entero igual o superior a 0.
- Categoría obligatoria.

---

## Administración de usuarios

El administrador puede:

- Visualizar usuarios registrados.
- Crear usuarios.
- Editar usuarios.
- Eliminar usuarios.
- Asignar roles.
- Gestionar región y comuna.
- Validar RUN y correo electrónico.

Los roles disponibles son:

```text
Administrador
Cliente
Vendedor
```

---

## Pedidos

El módulo administrativo dispone de una sección para consultar pedidos demostrativos.

Cada pedido permite visualizar información como:

- Número de pedido.
- Fecha.
- Cliente.
- Productos.
- Cantidades.
- Total.
- Estado.

Los perfiles Administrador y Vendedor pueden acceder a esta información.

---

## KYNEX Training

La plataforma incorpora una biblioteca de ejercicios.

Los ejercicios pueden filtrarse según:

- Nombre.
- Grupo muscular.
- Nivel de dificultad.

Cada ejercicio presenta información como:

- Nombre.
- Grupo muscular.
- Dificultad.
- Equipamiento.
- Descripción.
- Series recomendadas.
- Repeticiones recomendadas.
- Imagen demostrativa.

---

## Mi rutina

Los usuarios pueden seleccionar ejercicios de la biblioteca y construir una rutina personalizada.

La rutina permite:

- Agregar ejercicios.
- Evitar ejercicios duplicados.
- Modificar número de series.
- Modificar repeticiones.
- Eliminar ejercicios.
- Vaciar completamente la rutina.
- Visualizar cantidad de ejercicios.
- Visualizar total de series.

La rutina se almacena mediante LocalStorage.

---

## Blog

KYNEX incluye una sección informativa con artículos relacionados con la temática de la tienda.

Actualmente se encuentran disponibles:

- Creatina y rendimiento.
- Recuperación muscular.

Cada artículo dispone de:

- Imagen.
- Categoría.
- Título.
- Descripción.
- Contenido detallado.

---

## Nosotros

La sección Nosotros presenta información corporativa sobre KYNEX, incluyendo:

- Descripción de la tienda.
- Propuesta de valor.
- Experiencia de compra.
- Categorías disponibles.
- Visión.
- Compromisos con los usuarios.

---

## Contacto

La plataforma incluye un formulario de contacto con:

- Nombre.
- Correo electrónico.
- Comentario.

Las principales validaciones son:

- Nombre obligatorio.
- Nombre máximo de 100 caracteres.
- Correo válido.
- Correo máximo de 100 caracteres.
- Validación de dominios permitidos.
- Comentario obligatorio.
- Comentario máximo de 500 caracteres.
- Contador de caracteres.

---

## Persistencia con LocalStorage

La aplicación utiliza LocalStorage para simular persistencia de información en el navegador.

Entre los datos almacenados se encuentran:

```text
kynex_products
kynex_users
kynex_session
kynex_cart
kynex_routine
```

Esta implementación corresponde a la etapa Front End del proyecto.

Una futura implementación Back End permitirá reemplazar este almacenamiento local por servicios y una base de datos persistente.

---

## Tecnologías utilizadas

El proyecto utiliza:

- HTML5.
- CSS3.
- JavaScript.
- ECMAScript Modules.
- Bootstrap 5.
- Bootstrap Icons.
- LocalStorage.
- Git.
- GitHub.

---

## Estructura principal

```text
FS2-Proyecto-2026/
│
├── index.html
│
├── assets/
│   │
│   ├── css/
│   │   ├── main.css
│   │   ├── components.css
│   │   ├── content.css
│   │   ├── forms.css
│   │   ├── shop.css
│   │   ├── training.css
│   │   └── admin.css
│   │
│   ├── img/
│   │   ├── blog/
│   │   ├── brand/
│   │   ├── products/
│   │   └── training/
│   │
│   └── js/
│       │
│       ├── app.js
│       │
│       ├── data/
│       │   ├── exercises.js
│       │   ├── orders.js
│       │   ├── products.js
│       │   ├── regions.js
│       │   └── users.js
│       │
│       └── modules/
│           ├── admin-auth.js
│           ├── admin-order-detail.js
│           ├── admin-orders.js
│           ├── admin-product-form.js
│           ├── admin-products.js
│           ├── admin-user-form.js
│           ├── admin-users.js
│           ├── auth.js
│           ├── cart.js
│           ├── contact.js
│           ├── image-config.js
│           ├── login.js
│           ├── product-detail.js
│           ├── product-renderer.js
│           ├── product-storage.js
│           ├── register.js
│           ├── routine.js
│           ├── training.js
│           └── validation.js
│
├── pages/
│   │
│   ├── account/
│   │   ├── login.html
│   │   └── register.html
│   │
│   ├── information/
│   │   ├── about.html
│   │   ├── blog.html
│   │   ├── blog-detail-1.html
│   │   ├── blog-detail-2.html
│   │   └── contact.html
│   │
│   ├── shop/
│   │   ├── products.html
│   │   ├── product-detail.html
│   │   └── cart.html
│   │
│   └── training/
│       ├── training.html
│       └── routine.html
│
├── admin/
│   │
│   ├── index.html
│   │
│   ├── products/
│   │   ├── products.html
│   │   └── product-form.html
│   │
│   ├── users/
│   │   ├── users.html
│   │   └── user-form.html
│   │
│   └── orders/
│       ├── orders.html
│       └── order-detail.html
│
├── Informe_ERS_KYNEX_V1.docx
├── README.md
└── .gitignore
```

---

## Ejecución del proyecto

Debido a que la aplicación utiliza módulos JavaScript, se recomienda ejecutarla mediante un servidor local.

Una alternativa es utilizar la extensión:

```text
Live Server
```

en Visual Studio Code.

Posteriormente se debe abrir:

```text
index.html
```

desde Live Server.

Ejemplo:

```text
http://127.0.0.1:5500/index.html
```

El número de puerto puede variar dependiendo de la configuración local.

---

## Consideraciones de esta versión

KYNEX se encuentra actualmente en una etapa Front End.

Por este motivo:

- No existe una base de datos real.
- No existe un servidor Back End.
- La autenticación es demostrativa.
- LocalStorage simula persistencia.
- Los pedidos disponibles son datos demostrativos.
- Las operaciones administrativas funcionan únicamente en el navegador actual.
- Las contraseñas no implementan mecanismos de seguridad de producción.

Estas características podrán migrarse posteriormente a una arquitectura con Back End, servicios y base de datos.

---

## Control de versiones

El proyecto utiliza Git para el control de versiones y GitHub como repositorio remoto.

Los cambios se encuentran organizados mediante commits descriptivos que representan distintas etapas del desarrollo, incluyendo:

- estructura inicial;
- catálogo;
- detalle de productos;
- carrito;
- formularios;
- validaciones;
- usuarios;
- pedidos;
- roles;
- contenido;
- entrenamiento;
- imágenes;
- correcciones funcionales.

---

## Estado del proyecto

La versión actual incluye las funcionalidades principales requeridas para la primera etapa Front End de KYNEX.

Las siguientes etapas pueden incorporar una capa Back End, base de datos, autenticación segura y persistencia centralizada.