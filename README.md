# Formulario de Ingreso de Datos para Aplicación Aérea

Este proyecto es un formulario web diseñado para ingresar datos relacionados con la aplicación aérea, incluyendo información de clientes, campos, lotes, y productos con sus respectivas dosis. El formulario permite generar un archivo PDF con los datos ingresados, así como realizar cálculos para el equipo de tierra.

## Tecnologías Utilizadas

- **HTML5**: Estructura y contenido de la página.
- **Bootstrap 4**: Estilos y diseño responsivo.
- **JavaScript**: Lógica de generación de PDF y funciones interactivas.
- **jspdf**: Librería para la creación de PDFs en el navegador.
- **CSS**: Estilos personalizados adicionales.

## Características

- **Ingreso de Datos**: Campos para registrar cliente, campo, lote, cantidad de hectáreas, caudal por hectárea, piloto, equipo de tierra, y productos con sus dosis.
- **Generación de PDF**: Permite al usuario generar un archivo PDF con los datos ingresados.
- **Cálculos para Equipo de Tierra**: Incluye un botón que activa cálculos específicos para el equipo de tierra.
- **Diseño Responsivo**: Gracias a Bootstrap 4, el formulario se adapta a pantallas de diferentes tamaños.

## Instalación

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/usuario/repo.git
    ```

2. Asegúrate de tener una estructura de carpetas como la siguiente:

    ```
    /project-root
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── index.js
    │   └── jspdf.umd.min.js
    └── index.html
    ```

3. Descarga e incluye la librería `jspdf.umd.min.js` en la carpeta `js` si no está presente.

## Uso

1. Abre el archivo `index.html` en un navegador para cargar la página del formulario.
2. Completa todos los campos requeridos en el formulario, incluyendo:
   - Cliente, Campo y Lote
   - Cantidad de hectáreas y caudal por hectárea
   - Selección del piloto y equipo de tierra
   - Hasta 6 productos y sus dosis correspondientes
3. Puedes pegar una imagen en el contenedor de imagen usando `Ctrl + V`.
4. Usa los botones en la parte inferior del formulario para:
   - **Generar PDF**: Crear un archivo PDF con todos los datos ingresados.
   - **Nuevo**: Reiniciar el formulario para un nuevo ingreso de datos.
   - **Cálculos equipo de tierra**: Realizar cálculos específicos para el equipo de tierra.

## Estructura del Código

- **index.html**: Contiene el formulario de ingreso de datos y los botones de interacción.
- **css/style.css**: Estilos personalizados para el formulario.
- **js/index.js**: Lógica de interacción del formulario, como la generación de PDFs y el reinicio del formulario.
- **js/jspdf.umd.min.js**: Librería de jsPDF para la creación de archivos PDF en el navegador.

## Requisitos

- **Navegador compatible**: Cualquier navegador moderno (Chrome, Firefox, Edge).
- **Conexión a Internet** (opcional): Necesaria si deseas cargar Bootstrap 4 desde su CDN. Alternativamente, puedes descargar Bootstrap y agregarlo localmente.

## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama nueva para tus cambios:

    ```bash
    git checkout -b feature/nueva-funcionalidad
    ```

3. Realiza tus modificaciones y haz commit de los cambios:

    ```bash
    git commit -m "Añadir nueva funcionalidad"
    ```

4. Haz push de la rama a tu repositorio:

    ```bash
    git push origin feature/nueva-funcionalidad
    ```

5. Crea un Pull Request en el repositorio original.

## Licencia

Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo `LICENSE` para obtener más información.

## Autor

Desarrollado por Mauri y Fede.

