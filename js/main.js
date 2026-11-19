/*
  - Medición de clics: cada clic en WhatsApp, teléfono o mail manda un evento a Tag Manager.
    Eventos: clic_whatsapp, clic_telefono, clic_email (con el dato "ubicacion": hero, flotante, contacto...).
    En Tag Manager se crea un activador de "Evento personalizado" con ese nombre y una etiqueta de evento de GA4.
  - Menú en celular, encabezado que cambia al scrollear y año del pie.
  - Animaciones suaves al scrollear (solo opacity/transform, con IntersectionObserver: no hacen lenta la página).
  - Contadores de cifras, título del hero palabra por palabra, parallax suave y visor de la galería.
*/
(function () {
  window.dataLayer = window.dataLayer || [];
  var reducirMovimiento = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Medición de clics ----------
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

  // ---------- Menú en celular ----------
  var boton = document.querySelector(".menu-boton");
  var menu = document.getElementById("menu");
  function cerrarMenu() {
    if (!boton) return;
    boton.setAttribute("aria-expanded", "false");
    menu.classList.remove("abierto");
    document.body.classList.remove("menu-abierto");
  }
  if (boton && menu) {
    boton.addEventListener("click", function () {
      var abierto = boton.getAttribute("aria-expanded") === "true";
      boton.setAttribute("aria-expanded", String(!abierto));
      menu.classList.toggle("abierto", !abierto);
      document.body.classList.toggle("menu-abierto", !abierto);
    });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", cerrarMenu); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrarMenu(); });
  }

  // ---------- Encabezado: sólido al bajar, se esconde al bajar rápido y vuelve al subir ----------
  var encabezado = document.querySelector(".encabezado");
  var ultimoY = window.scrollY;
  var pendiente = false;
  var parallax = reducirMovimiento ? [] : Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));

  function alScrollear() {
    pendiente = false;
    var y = window.scrollY;
    if (encabezado) {
      encabezado.classList.toggle("solido", y > 40);
      var menuAbierto = document.body.classList.contains("menu-abierto");
      encabezado.classList.toggle("oculto", !menuAbierto && y > 500 && y > ultimoY + 4);
      if (y < ultimoY - 4) encabezado.classList.remove("oculto");
    }
    ultimoY = y;
    // Parallax suave (solo en pantallas grandes)
    if (parallax.length && window.innerWidth > 900) {
      var alto = window.innerHeight;
      parallax.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > alto) return;
        var factor = parseFloat(el.getAttribute("data-parallax")) || 0.08;
        var desplazamiento = (r.top + r.height / 2 - alto / 2) * factor;
        el.style.transform = "translate3d(0," + desplazamiento.toFixed(1) + "px,0)";
      });
    }
  }
  window.addEventListener("scroll", function () {
    if (!pendiente) { pendiente = true; window.requestAnimationFrame(alScrollear); }
  }, { passive: true });
  alScrollear();

  // ---------- Título del hero palabra por palabra ----------
  document.querySelectorAll(".titulo-animado").forEach(function (titulo) {
    if (reducirMovimiento) { titulo.classList.add("listo"); return; }
    var i = 0;
    function envolver(nodo) {
      Array.prototype.slice.call(nodo.childNodes).forEach(function (hijo) {
        if (hijo.nodeType === 3) {
          var partes = hijo.textContent.split(/(\s+)/);
          var frag = document.createDocumentFragment();
          partes.forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
            var palabra = document.createElement("span");
            palabra.className = "palabra";
            var interior = document.createElement("span");
            interior.style.setProperty("--i", i++);
            interior.textContent = p;
            palabra.appendChild(interior);
            frag.appendChild(palabra);
          });
          nodo.replaceChild(frag, hijo);
        } else if (hijo.nodeType === 1) {
          envolver(hijo);
        }
      });
    }
    envolver(titulo);
    titulo.classList.add("listo");
  });

  // ---------- Contadores ----------
  function contar(el) {
    var final = parseFloat(el.getAttribute("data-contar")) || 0;
    var prefijo = el.getAttribute("data-prefijo") || "";
    var sufijo = el.getAttribute("data-sufijo") || "";
    if (reducirMovimiento) { el.textContent = prefijo + final + sufijo; return; }
    var inicio = null;
    var duracion = 1600;
    function paso(t) {
      if (!inicio) inicio = t;
      var p = Math.min((t - inicio) / duracion, 1);
      var suave = 1 - Math.pow(1 - p, 3);
      el.textContent = prefijo + Math.round(final * suave) + sufijo;
      if (p < 1) window.requestAnimationFrame(paso);
    }
    window.requestAnimationFrame(paso);
  }

  // ---------- Revelar al scrollear ----------
  var aRevelar = document.querySelectorAll("[data-revelar], [data-cortina], .mapa, [data-contar]");
  if (!("IntersectionObserver" in window) || reducirMovimiento) {
    aRevelar.forEach(function (el) {
      el.classList.add("visible");
      if (el.hasAttribute("data-contar")) contar(el);
    });
  } else {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        var el = entrada.target;
        el.classList.add("visible");
        if (el.hasAttribute("data-contar")) contar(el);
        observador.unobserve(el);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    aRevelar.forEach(function (el) { observador.observe(el); });
  }

  // ---------- Visor de la galería ----------
  var visor = document.getElementById("visor");
  var fotos = Array.prototype.slice.call(document.querySelectorAll("[data-visor]"));
  if (visor && fotos.length && typeof visor.showModal === "function") {
    var imgVisor = visor.querySelector("img");
    var textoVisor = visor.querySelector("p");
    var actual = 0;
    function mostrar(i) {
      actual = (i + fotos.length) % fotos.length;
      var origen = fotos[actual];
      var img = origen.querySelector("img");
      imgVisor.src = origen.getAttribute("data-visor");
      imgVisor.alt = img ? img.alt : "";
      textoVisor.textContent = img ? img.alt : "";
    }
    fotos.forEach(function (f, i) {
      f.addEventListener("click", function () { mostrar(i); visor.showModal(); });
    });
    visor.querySelector(".visor__cerrar").addEventListener("click", function () { visor.close(); });
    visor.querySelector(".visor__nav--ant").addEventListener("click", function () { mostrar(actual - 1); });
    visor.querySelector(".visor__nav--sig").addEventListener("click", function () { mostrar(actual + 1); });
    visor.addEventListener("click", function (e) { if (e.target === visor) visor.close(); });
    visor.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") mostrar(actual - 1);
      if (e.key === "ArrowRight") mostrar(actual + 1);
    });
  }

  // ---------- Año actual en el pie ----------
  document.querySelectorAll("[data-anio]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
