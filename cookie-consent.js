/*
 * Banner cookie Armonia — conforme alle Linee guida cookie del Garante Privacy (10/06/2021).
 *
 * - Nessun cookie/pixel non tecnico viene caricato prima del consenso (blocco preventivo).
 * - "Rifiuta" e "Accetta" hanno la stessa evidenza; la X chiude rifiutando.
 * - Scelta salvata per 6 mesi, poi il banner viene riproposto.
 * - Le preferenze si riaprono da qualsiasi elemento con attributo [data-cookie-prefs].
 *
 * Per aggiungere uno script soggetto a consenso (es. Meta Pixel, Google Analytics)
 * inserirlo nella pagina così, NON come script normale:
 *
 *   <script type="text/plain" data-cookie-category="marketing"> ...codice pixel... </script>
 *   <script type="text/plain" data-cookie-category="statistiche" data-src="https://..."></script>
 *
 * Verrà eseguito solo dopo il consenso alla relativa categoria.
 */
(function () {
  var KEY = "armonia_cookie_consent";
  var VERSION = 1;
  var MAX_AGE = 1000 * 60 * 60 * 24 * 182; // 6 mesi

  function read() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY));
      if (c && c.v === VERSION && Date.now() - c.t < MAX_AGE) return c;
    } catch (e) {}
    return null;
  }
  function save(stats, marketing) {
    var c = { v: VERSION, t: Date.now(), statistiche: !!stats, marketing: !!marketing };
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
    apply(c);
    close();
  }

  // Attiva solo gli script delle categorie consentite
  function apply(c) {
    document.querySelectorAll('script[type="text/plain"][data-cookie-category]').forEach(function (old) {
      if (!c[old.dataset.cookieCategory] || old.dataset.loaded) return;
      old.dataset.loaded = "1";
      var s = document.createElement("script");
      if (old.dataset.src) s.src = old.dataset.src; else s.text = old.text;
      old.parentNode.insertBefore(s, old.nextSibling);
    });
  }

  var css =
    "#ck{position:fixed;left:12px;right:12px;bottom:12px;z-index:100;max-width:560px;margin:0 auto;background:#FBF8F1;color:#242424;border:1px solid #e2d8c2;border-radius:18px;box-shadow:0 20px 50px -20px rgba(35,55,76,.5);padding:22px 22px 18px;font:14px/1.55 Montserrat,system-ui,sans-serif}" +
    "#ck h2{font:600 18px Lora,Georgia,serif;color:#23374C;margin:0 0 6px}" +
    "#ck p{margin:0 0 14px;color:#5f6368;font-size:13px}#ck a{color:#9A5E20}" +
    "#ck .x{position:absolute;top:10px;right:12px;border:0;background:none;font-size:18px;color:#23374C;cursor:pointer;padding:4px 8px}" +
    "#ck .row{display:flex;gap:8px;flex-wrap:wrap}" +
    "#ck .row button{flex:1 1 140px;padding:11px 14px;border-radius:999px;font:600 13px Montserrat,system-ui,sans-serif;cursor:pointer;border:1px solid #23374C;background:#23374C;color:#fff}" +
    "#ck .row button.alt{background:transparent;color:#23374C}" +
    "#ck .opts{display:none;margin:0 0 14px;border-top:1px solid #e2d8c2;padding-top:12px}#ck.more .opts{display:grid;gap:10px}" +
    "#ck label{display:flex;gap:10px;align-items:flex-start;font-size:13px}#ck label input{margin-top:3px;accent-color:#23374C}" +
    "#ck label b{display:block;color:#23374C}";

  var box;
  function open() {
    if (box) { box.remove(); }
    var c = read() || { statistiche: false, marketing: false };
    if (!document.getElementById("ck-css")) {
      var st = document.createElement("style"); st.id = "ck-css"; st.textContent = css; document.head.appendChild(st);
    }
    box = document.createElement("div");
    box.id = "ck";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Preferenze cookie");
    box.innerHTML =
      '<button class="x" type="button" aria-label="Chiudi e rifiuta">✕</button>' +
      "<h2>Rispettiamo la tua privacy</h2>" +
      "<p>Usiamo solo strumenti tecnici necessari al funzionamento del sito. Con il tuo consenso potremmo usare cookie di statistica e di marketing (es. pixel social) per misurare e migliorare le nostre comunicazioni. Dettagli nella <a href=\"cookie.html\">Cookie Policy</a>.</p>" +
      '<div class="opts">' +
      '<label><input type="checkbox" checked disabled><span><b>Necessari</b>Sempre attivi: servono al funzionamento del sito e a ricordare questa scelta.</span></label>' +
      '<label><input type="checkbox" id="ck-s"' + (c.statistiche ? " checked" : "") + "><span><b>Statistiche</b>Misurano in forma aggregata come viene usato il sito.</span></label>" +
      '<label><input type="checkbox" id="ck-m"' + (c.marketing ? " checked" : "") + "><span><b>Marketing</b>Pixel di social network per mostrarti annunci pertinenti.</span></label>" +
      "</div>" +
      '<div class="row">' +
      '<button type="button" class="alt" data-a="reject">Rifiuta</button>' +
      '<button type="button" class="alt" data-a="custom">Personalizza</button>' +
      '<button type="button" data-a="accept">Accetta tutti</button>' +
      "</div>";
    document.body.appendChild(box);
    box.querySelector(".x").onclick = function () { save(false, false); };
    box.querySelectorAll("[data-a]").forEach(function (b) {
      b.onclick = function () {
        var a = b.dataset.a;
        if (a === "accept") return save(true, true);
        if (a === "reject") return save(false, false);
        if (!box.classList.contains("more")) { box.classList.add("more"); b.textContent = "Salva scelte"; return; }
        save(box.querySelector("#ck-s").checked, box.querySelector("#ck-m").checked);
      };
    });
  }
  function close() { if (box) { box.remove(); box = null; } }

  function init() {
    document.addEventListener("click", function (e) {
      var t = e.target.closest && e.target.closest("[data-cookie-prefs]");
      if (t) { e.preventDefault(); open(); }
    });
    var c = read();
    if (c) apply(c); else open();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
