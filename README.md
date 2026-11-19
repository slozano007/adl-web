# Plantilla base para webs de clientes

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

## Imágenes (`img/`)

| Archivo | Medida | Uso |
| --- | --- | --- |
| `hero.webp` | 1440 × 1080 | Foto principal |
| `servicio-1.webp` ... | 960 × 640 | Una por servicio |
| `og-imagen.jpg` | 1200 × 630 | Vista previa al compartir en WhatsApp/Instagram |
| `apple-touch-icon.png` | 180 × 180 | Ícono en celulares Apple |
| `logo.svg`, `favicon.svg` | vector | Logo y pestaña del navegador |

Reglas: formato WebP (salvo la de vista previa, en JPG), menos de 200 KB cada una, y un texto alternativo (`alt`) que describa la foto. Nunca meter las fotos adentro del HTML.

## Marcadores

- **Negocio:** `NOMBRE`, `NOMBRE_O_RAZON_SOCIAL`, `DOMINIO` (sin https, ej. `adl.com.ar`), `EMAIL`
- **SEO:** `SERVICIO_PRINCIPAL`, `ZONA`, `ZONA_1`, `ZONA_2`, `ZONAS_DETALLE`, `DESCRIPCION_SEO` (máx. 155 caracteres)
- **Contacto:** `TELEFONO_INTERNACIONAL` (ej. `+5492944123456`), `TELEFONO_VISIBLE` (ej. `2944 12-3456`), `WHATSAPP` (solo números, ej. `5492944123456`), `MENSAJE_WA` (codificado para URL, ej. `Hola%2C%20vengo%20de%20la%20web`)
- **Ubicación y horarios:** `DIRECCION`, `LOCALIDAD`, `PROVINCIA`, `HORARIO_VISIBLE`, `HORARIO_SCHEMA` (ej. `Mo-Fr 08:00-18:00`)
- **Links:** `URL_INSTAGRAM`, `URL_GOOGLE_MAPS`
- **Textos:** `TRAYECTORIA_CORTA`, `PROPUESTA_DE_VALOR`, `DATO_CONFIANZA_1..3`, `SERVICIO_1..3`, `DESCRIPCION_SERVICIO_1..3`, `TEXTO_NOSOTROS`, `VENTAJA_1..3_TITULO/TEXTO`, `RESENA_1..3`, `AUTOR_RESENA_1..3`, `PREGUNTA_1..3`, `RESPUESTA_1..3`, `TEXTO_CONTACTO`
- **Textos alternativos:** `ALT_HERO`, `ALT_SERVICIO_1..3`
- **Fechas:** `FECHA_ACTUALIZACION` (ej. `19 de noviembre de 2026`), `FECHA_ISO` (ej. `2026-11-19`)

En el schema de `index.html`, cambiar `LocalBusiness` por el tipo más específico (ej. `WholesaleStore` para una distribuidora). Si el negocio no atiende al público, borrar `address`.

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
