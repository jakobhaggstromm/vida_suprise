// Mejlet som får en notis när hon svarar ja.
// Byt gärna adressen mot FormSubmit-aliaset (se README) så den inte
// ligger läsbar i koden.
const NOTIFY_ENDPOINT = "https://formsubmit.co/ajax/jakob.haggstromm@gmail.com";
const SENT_KEY = "chans:notified";

const answers = document.querySelector("#answers");
const yesButton = document.querySelector("#yesButton");
const noButton = document.querySelector("#noButton");
const reply = document.querySelector("#reply");

function dodge(event) {
  event.preventDefault();
  // Slide into the free space to the right — never on top of "Ja".
  const room =
    answers.clientWidth - yesButton.offsetWidth - noButton.offsetWidth - 10;
  const x = Math.round(6 + Math.random() * Math.max(0, room - 6));
  const y = Math.round(Math.random() * 10 - 5);

  noButton.style.transform = `translate(${x}px, ${y}px)`;
}

function alreadySent() {
  try {
    return window.localStorage.getItem(SENT_KEY) === "1";
  } catch {
    return false;
  }
}

function markSent() {
  try {
    window.localStorage.setItem(SENT_KEY, "1");
  } catch {
    // Privat läge eller blockerade cookies — strunt samma.
  }
}

async function notify() {
  if (alreadySent()) return;

  try {
    const response = await fetch(NOTIFY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: "Hon tryckte ja",
        Svar: "Ja",
        Tid: new Date().toLocaleString("sv-SE"),
        _template: "table",
        _captcha: "false",
      }),
    });

    // Skicka bara en gång — men låt en misslyckad skickning få nytt försök.
    if (response.ok) markSent();
  } catch {
    // Sidan ska aldrig gå sönder för att mejlet inte gick fram.
  }
}

function accept() {
  answers.hidden = true;
  reply.hidden = false;
  notify();
}

noButton.addEventListener("pointerenter", dodge);
noButton.addEventListener("focus", dodge);
noButton.addEventListener("click", dodge);
yesButton.addEventListener("click", accept);
