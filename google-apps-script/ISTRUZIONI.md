# Questionari Armonia Online — come funziona e come attivarlo

## Come funziona per Armonia

1. Il cliente compila il questionario sulla landing e riceve un **codice** (es. `ARM-7KQ2`).
2. Ad **armonia.mirandola@gmail.com** arriva subito un'email con tutte le risposte e il codice nell'oggetto.
3. La stessa risposta finisce come riga nel Google Sheet **"Questionari Armonia Online"**.
4. Il cliente prenota e paga su Reservio e scrive il codice nelle note della prenotazione.
5. Quando su Reservio arriva un pagamento: si legge il codice nelle note, si cerca nella casella email
   o nel foglio (Ctrl+F) e si spunta la casella **"Pagato su Reservio"**. Nella colonna "Note Armonia"
   si può scrivere chi segue il cliente, data della videochiamata, ecc.

Se il cliente dimentica il codice, si cerca per nome, email o numero WhatsApp: sono tutti nel foglio.

Tutto gratuito, nessun account da creare oltre al Gmail che Armonia ha già.

## Attivazione (una volta sola, circa 5 minuti)

Da fare con l'account **armonia.mirandola@gmail.com**.

1. Vai su <https://sheets.new> e crea un foglio. Chiamalo **Questionari Armonia Online**.
2. Menu **Estensioni → Apps Script**.
3. Cancella il contenuto del file `Code.gs` e incolla tutto il file `Code.gs` di questa cartella. Salva (icona del dischetto).
4. In alto scegli la funzione **preparaFoglio** e premi **Esegui**. Google chiede le autorizzazioni:
   *Rivedi autorizzazioni → scegli l'account → Avanzate → Vai al progetto (non sicuro) → Consenti*.
   È normale: lo script è vostro e scrive solo in questo foglio e invia l'email di notifica.
   Nel foglio compare la scheda "Questionari" con le intestazioni.
5. In alto a destra **Esegui il deployment → Nuovo deployment**.
   - Tipo: **App web**
   - Esegui come: **Me**
   - Chi ha accesso: **Chiunque**
   - Premi **Esegui il deployment** e copia l'**URL dell'app web** (finisce con `/exec`).
6. Nel file `index.html`, nella sezione `CONFIG` in fondo, incolla l'URL:
   ```js
   formEndpoint: "https://script.google.com/macros/s/XXXXXXXX/exec",
   ```
7. Prova: compila un questionario dalla landing e controlla che arrivino l'email e la riga nel foglio.

## Cose utili

- **Più persone avvisate** (es. anche Ale e Valentina): nel codice cambia
  `const EMAIL_NOTIFICA = "armonia.mirandola@gmail.com";` in
  `"armonia.mirandola@gmail.com,alelosciale.trainer@gmail.com"` e rifai *Gestisci deployment → Modifica → Nuova versione*.
- **Condividere il foglio** con trainer e Caterina: pulsante *Condividi* del Google Sheet, come un qualsiasi documento.
- **Limite Gmail gratuito**: 100 email di notifica al giorno, più che sufficienti.
- Se si modifica lo script, bisogna sempre pubblicare una **nuova versione** del deployment
  (l'URL resta lo stesso).
