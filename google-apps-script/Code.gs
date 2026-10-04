/**
 * Armonia Online — ricezione questionari dalla landing page.
 *
 * Ogni questionario inviato dal sito:
 *  1. viene aggiunto come riga nel foglio "Questionari" di questo Google Sheet
 *  2. genera un'email di notifica ad Armonia con tutte le risposte
 *
 * Installazione: vedi ISTRUZIONI.md nella stessa cartella.
 */

// Indirizzo che riceve la notifica di ogni nuovo questionario
const EMAIL_NOTIFICA = "armonia.mirandola@gmail.com";
const NOME_FOGLIO = "Questionari";

const COLONNE = [
  ["Data", "data"],
  ["Codice", "codice"],
  ["Pagato su Reservio", null],
  ["Percorso", "percorso"],
  ["Durata", "durata"],
  ["Prezzo", "prezzo"],
  ["Nome", "nome"],
  ["WhatsApp", "whatsapp"],
  ["Email", "email"],
  ["Dove si allena", "dove"],
  ["Obiettivo", "obiettivo"],
  ["Dettagli obiettivo", "obiettivo_dettagli"],
  ["Infortuni / limitazioni", "infortuni"],
  ["Esercizi non graditi", "esercizi_non_graditi"],
  ["Note Armonia", null]
];

function doPost(e) {
  const d = (e && e.parameter) || {};
  // Campo trappola per i bot: se compilato ignoriamo l'invio
  if (d.sito_web) return risposta({ ok: true });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const foglio = preparaFoglio();
    d.data = new Date();
    const riga = COLONNE.map(([, chiave]) => (chiave ? pulisci(d[chiave]) : ""));
    riga[0] = d.data;
    foglio.appendRow(riga);
    const n = foglio.getLastRow();
    foglio.getRange(n, 3).insertCheckboxes();
    inviaNotifica(d, n);
  } finally {
    lock.releaseLock();
  }
  return risposta({ ok: true });
}

// Crea il foglio con intestazioni e formattazione se non esiste ancora.
// Si può anche lanciare a mano una volta dall'editor per vedere il foglio pronto.
function preparaFoglio() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let foglio = ss.getSheetByName(NOME_FOGLIO);
  if (!foglio) foglio = ss.insertSheet(NOME_FOGLIO, 0);
  if (foglio.getLastRow() === 0) {
    foglio.appendRow(COLONNE.map(([titolo]) => titolo));
    foglio.getRange(1, 1, 1, COLONNE.length)
      .setFontWeight("bold").setBackground("#23374C").setFontColor("#ffffff");
    foglio.setFrozenRows(1);
    foglio.setColumnWidths(1, COLONNE.length, 160);
    foglio.setColumnWidths(11, 4, 280);
    foglio.getRange("A:A").setNumberFormat("dd/mm/yyyy hh:mm");
    foglio.getRange("K:N").setWrap(true);
  }
  return foglio;
}

function inviaNotifica(d, riga) {
  const url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  const voce = (t, v) =>
    "<tr><td style='padding:6px 12px 6px 0;color:#6b6b6b;vertical-align:top'>" + t +
    "</td><td style='padding:6px 0'><b>" + esc(v || "—") + "</b></td></tr>";
  const html =
    "<div style='font-family:Arial,sans-serif;font-size:14px;color:#242424'>" +
    "<h2 style='color:#9A5E20;margin:0 0 4px'>Nuovo questionario: " + esc(d.percorso) + " " + esc(d.durata) + "</h2>" +
    "<p style='margin:0 0 16px'>Codice <b style='font-size:18px;color:#23374C'>" + esc(d.codice) +
    "</b>: cercalo nelle note della prenotazione Reservio per verificare il pagamento.</p>" +
    "<table>" +
    voce("Nome", d.nome) + voce("WhatsApp", d.whatsapp) + voce("Email", d.email) +
    voce("Prezzo", d.prezzo) + voce("Dove si allena", d.dove) + voce("Obiettivo", d.obiettivo) +
    voce("Dettagli obiettivo", d.obiettivo_dettagli) + voce("Infortuni / limitazioni", d.infortuni) +
    voce("Esercizi non graditi", d.esercizi_non_graditi) +
    "</table>" +
    "<p style='margin-top:20px'><a href='" + url + "'>Apri il foglio dei questionari</a> (riga " + riga + ")</p></div>";

  MailApp.sendEmail({
    to: EMAIL_NOTIFICA,
    replyTo: d.email || EMAIL_NOTIFICA,
    subject: "[Armonia Online] " + d.codice + " · " + d.percorso + " " + d.durata + " · " + d.nome,
    htmlBody: html
  });
}

function pulisci(v) {
  v = String(v || "").slice(0, 2000);
  // Evita che il foglio interpreti il testo come formula
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function esc(v) {
  return String(v || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function risposta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
