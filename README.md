# ADL – Alimentos del Lago · grupoadl.com.ar

Web de ADL, distribuidora de alimentos en Bariloche. Armada sobre la plantilla base (abajo), nivel **web completa** (falta el ID de Tag Manager en `js/config.js`).

> **Estado:** estructura y diseño terminados con **textos e imágenes de ejemplo**. Falta cargar el contenido real (ver "Qué reemplazar").

## Páginas

| URL | Archivo | Qué tiene |
| --- | --- | --- |
| `/` | `index.html` | Hero, Quiénes somos, Nuestras marcas, Zonas de reparto (mapa), Clientes, Galería, Contacto |
| `/marcas/` | `marcas/index.html` | Una tarjeta por marca |
| `/marcas/valle-frio/` (y 2 más) | `marcas/<marca>/index.html` | Productos de cada marca, con título y descripción SEO propios |
| `/quiero-ser-cliente/` | `quiero-ser-cliente/index.html` | Formulario de alta de comercios (Web3Forms) |
| `/trabaja-con-nosotros/` | `trabaja-con-nosotros/index.html` | Puestos + espacio para el formulario de Tally |
| `/privacidad.html` | `privacidad.html` | Política de privacidad (incluye los datos de los formularios) |

## Qué reemplazar cuando llegue el contenido

Buscá estos textos en todos los archivos (en VS Code: Ctrl+Shift+F) y reemplazalos:

| Buscar | Qué es |
| --- | --- |
| `5492944000000` | WhatsApp y teléfono (formato internacional, aparece en `wa.me/` y `tel:`) |
| `2944 00-0000` | Teléfono visible |
| `info@grupoadl.com.ar` | Email (confirmar que exista) |
| `Dirección de ejemplo 1234` | Dirección del depósito |
| `Lunes a viernes de 8 a 17 h` y `Mo-Fr 08:00-17:00` | Horario visible y horario para Google (schema en `index.html`) |
| `TU_ACCESS_KEY_DE_WEB3FORMS` | Access key de Web3Forms (`quiero-ser-cliente/index.html`) |
| `TU_ID_DE_TALLY` | ID del formulario de Tally (`trabaja-con-nosotros/index.html`) |
| `razón social a confirmar` | Razón social en `privacidad.html` |
| `EJEMPLO` | Comentarios que marcan cada bloque de texto de ejemplo (títulos, cifras, zonas, testimonio, puestos...) |
| `Valle Frío`, `Cumbre Andina`, `Bosque Nativo` | Las 3 marcas de ejemplo (ver "Marcas") |

Las cifras del hero (`+20 años`, `+500 comercios`...) se cambian en dos lugares: el atributo `data-contar` (el número que anima) y el texto.

## Colores y tipografía

Todos los colores están en variables al principio de `css/styles.css` (son provisorios). Con cambiar `--color-marca`, `--color-marca-oscuro`, `--color-marca-profundo` y `--color-acento` se actualiza toda la web. Si el acento es oscuro, cambiá también `--color-texto-sobre-acento` a `#FFFFFF`.

La tipografía (Manrope) está en `fonts/` y se carga desde el propio sitio (más rápido y sin depender de Google).

## Imágenes (`img/`)

Todas las fotos actuales son ilustraciones de ejemplo con la etiqueta "FOTO DE EJEMPLO". Se reemplazan **con el mismo nombre de archivo** y no hay que tocar el HTML.

| Archivo | Medida | Uso |
| --- | --- | --- |
| `hero.webp` | 1920 × 1080 | Foto principal del inicio (se ve oscurecida, con el texto encima) |
| `nosotros-1.webp`, `nosotros-2.webp` | 1200 × 1500 y 1000 × 1250 (verticales) | Collage de Quiénes somos |
| `marca-<marca>.webp` | 1600 × 900 | Foto de la tarjeta y de la portada de cada marca |
| `marcas/<marca>.svg` | vector (o PNG) | Logo de cada marca |
| `productos/<marca>-1.webp` ... | 700 × 700 (cuadradas) | Fotos de productos |
| `clientes/cliente-1.svg` ... | vector o PNG con fondo transparente | Logos de clientes (se ven en gris y se colorean al pasar el mouse) |
| `galeria-1.webp` ... `galeria-8.webp` | 1200 × 1500 la 1; 1200 × 800 el resto | Galería del inicio (se amplían al tocarlas) |
| `cliente.webp`, `trabaja.webp` | 1600 × 900 | Portadas de "Quiero ser cliente" y "Trabajá con nosotros" |
| `og-imagen.jpg` | 1200 × 630 | Vista previa al compartir en WhatsApp/Instagram |
| `apple-touch-icon.png` | 180 × 180 | Ícono en celulares Apple |
| `logo.svg`, `logo-blanco.svg`, `favicon.svg` | vector | Logo (versión oscura y versión para fondos oscuros) y pestaña del navegador |

Reglas: formato WebP (salvo la de vista previa, en JPG), menos de 200 KB cada una, y un texto alternativo (`alt`) que describa la foto. Nunca meter las fotos adentro del HTML.

## Marcas

- **Cambiar una marca de ejemplo:** renombrá la carpeta `marcas/<marca>/`, editá su `index.html` (título, descripción, textos y productos) y actualizá los links en `index.html`, `marcas/index.html`, el pie de todas las páginas, la sección "Otras marcas" de cada marca y `sitemap.xml`.
- **Sumar una marca:** copiá una carpeta de `marcas/`, cambiá su contenido, sumá su tarjeta en `marcas/index.html` (y en el inicio si querés), y agregala a `sitemap.xml` y al `"brand"` del schema de `index.html`.
- Título SEO de cada marca: `Distribuidor de [marca] en Bariloche | ADL Alimentos del Lago`.

## Formularios (sin Netlify Forms)

**Quiero ser cliente (Web3Forms)**
1. Entrar a [web3forms.com](https://web3forms.com), poner el mail donde se quieren recibir las altas y copiar la *Access Key*.
2. Pegarla en `quiero-ser-cliente/index.html`, en `value="TU_ACCESS_KEY_DE_WEB3FORMS"`.
3. Probar el formulario. Mientras no haya access key, al enviar se muestra el "gracias" con un aviso de "vista de prueba" y no se manda nada.

Incluye trampa anti-spam (honeypot `botcheck`), validación de CUIT (dígito verificador) y, al enviar bien, el evento `formulario_cliente_enviado` para Tag Manager (marcarlo como evento clave en Analytics). La lógica está en `js/formulario.js`.

**Trabajá con nosotros (Tally)**
1. Crear el formulario en [tally.so](https://tally.so) con: nombre, teléfono, email, localidad, puesto (Chofer / Preventista / Depósito / Otro) y "Subir archivo" para el CV.
2. Share → Embed → copiar el ID.
3. En `trabaja-con-nosotros/index.html`: borrar el bloque `tally-pendiente` y descomentar el `<iframe>` y el `<script>`, poniendo el ID en lugar de `TU_ID_DE_TALLY`.

## Animaciones

Las animaciones al scrollear se activan con atributos en el HTML: `data-revelar` (aparece subiendo; también `="izquierda"`, `="derecha"`, `="zoom"`), `data-cortina` (foto que se descubre) y `style="--d:.2s"` para el retraso. Solo animan opacidad y movimiento, así que no hacen lenta la página, y se desactivan si el visitante pidió "reducir movimiento" en su dispositivo.

---

# Plantilla base

Sitio estático (HTML, CSS y JS, sin build) listo para Netlify. Ya trae el SEO, la calidad técnica, la conversión y la medición de la checklist.

## Dos niveles

| Nivel | Qué hacer en `js/config.js` | Qué pasa |
| --- | --- | --- |
| Web sola | `gtmId: ""` | No se carga ninguna medición, no aparece el aviso de cookies y se oculta "Configurar cookies". |
| Web completa | `gtmId: "GTM-XXXXXXX"` | Aparece el aviso de cookies y Tag Manager se carga solo si el visitante acepta. |

Para pasar un cliente de "web sola" a "web completa" alcanza con poner su ID de Tag Manager y volver a subir `config.js`.

## Cómo arrancar un cliente nuevo

1. Copiar esta carpeta con el nombre del cliente (ej. `adl-web`).
2. Reemplazar todos los `{{MARCADORES}}` (lista abajo). En Claude Code: "reemplazá los marcadores con estos datos".
3. Cambiar los colores de marca en `css/styles.css` (variables al principio) y el logo y el favicon en `img/`.
4. Agregar, quitar o renombrar bloques (servicios, reseñas, preguntas). Si no hay reseñas reales, borrar esa sección.
5. Si se suman páginas (una por servicio, por ejemplo), agregarlas a `sitemap.xml`.
6. Subir a GitHub y conectar a Netlify (no hace falta configurar build).

## Medición (solo web completa)

`js/main.js` ya manda a Tag Manager estos eventos, cada uno con el dato `ubicacion` (hero, flotante, contacto...):

- `clic_whatsapp`
- `clic_telefono`
- `clic_email`

En Tag Manager:
1. Etiqueta **Google tag** con el ID de Analytics (`G-XXXXXXX`), activador "Initialization - All Pages".
2. Por cada evento: activador **Evento personalizado** con ese nombre y etiqueta **Evento de GA4** con el mismo nombre. Agregar el parámetro `ubicacion` = variable de capa de datos `ubicacion`.
3. Probar en modo Vista previa, tocar los botones y publicar.
4. En Analytics: marcar `clic_whatsapp` y `clic_telefono` como **eventos clave**, poner la retención de datos en 14 meses y excluir el tráfico interno.

Nunca pegar el código de Analytics directo en el HTML: va solo dentro de Tag Manager. Si no, cuenta todo doble.

## Antes de entregar

- Buscar `{{` en todos los archivos: no tiene que quedar ninguno.
- Probar en celular y compu, pasar por PageSpeed Insights y compartir el link por WhatsApp para ver la vista previa.
- La política de privacidad es un modelo general: revisarla con cada cliente.
