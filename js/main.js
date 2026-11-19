/*
  - Medición de clics: cada clic en WhatsApp, teléfono o mail manda un evento a Tag Manager.
    Eventos: clic_whatsapp, clic_telefono, clic_email (con el dato "ubicacion": hero, flotante, contacto...).
    En Tag Manager se crea un activador de "Evento personalizado" con ese nombre y una etiqueta de evento de GA4.
  - Menú en celular y año del pie.
*/
(function () {
  window.dataLayer = window.dataLayer || [];

  document.addEventListener("click", function (e) {
    var link = e.target.closest ? e.target.closest("a[href]") : null;
    if (!link) return;
    var href = link.getAttribute("href") || "";
    var evento = null;
    if (href.indexOf("https://wa.me/") === 0 || href.indexOf("https://api.whatsapp.com/") === 0) evento = "clic_whatsapp";
    else if (href.indexOf("tel:") === 0) evento = "clic_telefono";
    else if (href.indexOf("mailto:") === 0) evento = "clic_email";
    if (!evento) return;
    window.dataLayer.push({
      event: evento,
      ubicacion: link.getAttribute("data-ubicacion") || "sin_dato"
    });
  });

  // Menú en celular
  var boton = document.querySelector(".menu-boton");
  var menu = document.getElementById("menu");
  if (boton && menu) {
    boton.addEventListener("click", function () {
      var abierto = boton.getAttribute("aria-expanded") === "true";
      boton.setAttribute("aria-expanded", String(!abierto));
      menu.classList.toggle("abierto", !abierto);
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        boton.setAttribute("aria-expanded", "false");
        menu.classList.remove("abierto");
      });
    });
  }

  // Año actual en el pie
  document.querySelectorAll("[data-anio]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
