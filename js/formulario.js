/*
  Formulario "Quiero ser cliente" -> Web3Forms (https://web3forms.com)
  - La access key va en el campo oculto "access_key" del HTML (quiero-ser-cliente/index.html).
  - Anti-spam: campo trampa "botcheck" (honeypot). Las personas no lo ven; si un robot lo completa,
    no se envía nada. Web3Forms además lo revisa de su lado.
  - Al enviar bien: se reemplaza el formulario por el mensaje de "gracias" y se manda el evento
    "formulario_cliente_enviado" a Tag Manager (para medirlo como conversión).
*/
(function () {
  var form = document.getElementById("form-cliente");
  if (!form) return;
  var gracias = document.getElementById("gracias-cliente");
  var mensaje = form.querySelector(".mensaje-form");
  var boton = form.querySelector('button[type="submit"]');
  var MARCADOR = "TU_ACCESS_KEY_DE_WEB3FORMS";

  function mostrarGracias(esDemo) {
    form.hidden = true;
    gracias.hidden = false;
    var nota = gracias.querySelector(".nota-demo");
    if (nota) nota.hidden = !esDemo;
    gracias.setAttribute("tabindex", "-1");
    gracias.focus();
    gracias.scrollIntoView({ behavior: "smooth", block: "center" });
    window.dataLayer = window.dataLayer || [];
    if (!esDemo) window.dataLayer.push({ event: "formulario_cliente_enviado" });
  }

  function error(texto) {
    mensaje.hidden = false;
    mensaje.textContent = texto;
  }

  // CUIT: acepta 20123456789 o 20-12345678-9, y verifica el dígito verificador.
  var cuit = form.querySelector('[name="CUIT"]');
  function cuitValido(valor) {
    var n = valor.replace(/\D/g, "");
    if (n.length !== 11) return false;
    var pesos = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    var suma = 0;
    for (var i = 0; i < 10; i++) suma += parseInt(n[i], 10) * pesos[i];
    var dv = 11 - (suma % 11);
    if (dv === 11) dv = 0;
    if (dv === 10) dv = 9;
    return dv === parseInt(n[10], 10);
  }
  if (cuit) {
    cuit.addEventListener("input", function () {
      cuit.setCustomValidity(cuit.value && !cuitValido(cuit.value) ? "Revisá el CUIT: tiene que tener 11 números." : "");
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    mensaje.hidden = true;
    if (!form.checkValidity()) { form.reportValidity(); return; }

    // Honeypot: si está tildado, es un robot. Simulamos éxito y no enviamos nada.
    if (form.querySelector('[name="botcheck"]').checked) { mostrarGracias(false); return; }

    var clave = form.querySelector('[name="access_key"]').value;
    if (!clave || clave === MARCADOR) {
      // Todavía no se cargó la access key: mostramos el "gracias" en modo prueba.
      console.warn("Web3Forms: falta completar la access key en quiero-ser-cliente/index.html");
      mostrarGracias(true);
      return;
    }

    boton.setAttribute("aria-busy", "true");
    fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form)
    })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (datos) {
        if (datos && datos.success) mostrarGracias(false);
        else error("No pudimos enviar el formulario. Probá de nuevo o escribinos por WhatsApp.");
      })
      .catch(function () {
        error("No hay conexión o hubo un problema. Probá de nuevo o escribinos por WhatsApp.");
      })
      .then(function () { boton.removeAttribute("aria-busy"); });
  });
})();
