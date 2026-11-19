/*
  CONFIGURACIÓN DEL SITIO
  -----------------------
  Nivel "web sola":     dejá gtmId vacío ("").  No se carga ninguna medición ni aparece el aviso de cookies.
  Nivel "web completa": poné el ID de Tag Manager del cliente (ej. "GTM-ABC1234").
                        Aparece el aviso de cookies y Tag Manager se carga solo si el visitante acepta.
*/
// ADL: nivel "web completa". Falta el ID de Tag Manager: ponerlo acá cuando esté.
window.SITE_CONFIG = {
  gtmId: ""
};
