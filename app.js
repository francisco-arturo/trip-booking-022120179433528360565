import {
  assistantReply,
  destinations,
  flights,
  formatCardNumber,
  formatDate,
  formatMoney,
  getDestination,
  getFlight,
  getStay,
  makeBookingReference,
  nightsBetween,
  searchFlights,
  searchStays,
  stays,
  validatePayment,
  validateTraveler
} from "./core.mjs";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const state = {
  mode: "stays",
  destinationId: "lisbon",
  checkIn: "",
  checkOut: "",
  travelers: 2
};

let activeBooking = null;
let lastBooking = null;
let typingTimer = null;
let toastTimer = null;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isoDateFromOffset(days) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function setDefaultDates() {
  const checkIn = $("#check-in");
  const checkOut = $("#check-out");
  state.checkIn = isoDateFromOffset(28);
  state.checkOut = isoDateFromOffset(33);
  checkIn.value = state.checkIn;
  checkOut.value = state.checkOut;
  checkIn.min = isoDateFromOffset(1);
  checkOut.min = isoDateFromOffset(2);
}

function renderDestinations() {
  const grid = $("#destination-grid");
  grid.innerHTML = destinations
    .map((destination) => {
      const cityStays = searchStays(destination.id);
      const lowest = Math.min(...cityStays.map((stay) => stay.nightly));
      return `
        <article class="destination-card">
          <button type="button" class="destination-hit" data-destination="${escapeHtml(destination.id)}" aria-label="Search stays in ${escapeHtml(destination.city)}">
            <span class="destination-image-wrap">
              <img class="destination-image" src="${escapeHtml(destination.photo)}" alt="${escapeHtml(destination.city)}, ${escapeHtml(destination.country)}" width="900" height="700" loading="lazy">
            </span>
            <span class="destination-body">
              <span>
                <strong class="destination-name">${escapeHtml(destination.city)}</strong>
                <span class="destination-meta">${escapeHtml(destination.country)} · stays from ${formatMoney(lowest)}</span>
              </span>
              <span class="destination-price">Flights from ${formatMoney(destination.flightFrom)}<small>Round trip</small></span>
            </span>
          </button>
        </article>`;
    })
    .join("");
}

function stayCard(stay) {
  const destination = getDestination(stay.cityId);
  return `
    <article class="stay-card" data-stay-card="${escapeHtml(stay.id)}">
      <img class="stay-photo" src="${escapeHtml(stay.photo)}" alt="${escapeHtml(stay.name)} in ${escapeHtml(destination.city)}" width="900" height="620" loading="lazy">
      <div class="stay-body">
        <div class="stay-top">
          <div>
            <h3 class="stay-name">${escapeHtml(stay.name)}</h3>
            <p class="stay-area">${escapeHtml(stay.area)}, ${escapeHtml(destination.city)}</p>
          </div>
          <span class="stay-score" aria-label="Sample guest score ${stay.score} out of 5">
            <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z"/></svg>
            ${stay.score}
          </span>
        </div>
        <p class="stay-details">${escapeHtml(stay.details)}</p>
        <ul class="stay-perks">
          ${stay.perks.map((perk) => `<li>${escapeHtml(perk)}</li>`).join("")}
        </ul>
        <div class="stay-foot">
          <p class="stay-price">${formatMoney(stay.nightly)}<small>per night, sample rate</small></p>
          <button type="button" class="select-button" data-book-type="stay" data-book-id="${escapeHtml(stay.id)}">Reserve</button>
        </div>
      </div>
    </article>`;
}

function flightCard(flight) {
  return `
    <article class="flight-card" data-flight-card="${escapeHtml(flight.id)}">
      <div class="airline">
        <span class="airline-mark" aria-hidden="true">${escapeHtml(flight.code)}</span>
        <div>
          <strong class="airline-name">${escapeHtml(flight.airline)}</strong>
          <span class="airline-flight">${escapeHtml(flight.flightNo)} · ${escapeHtml(flight.stops)}</span>
        </div>
      </div>
      <div class="flight-times">
        <div class="flight-end">
          <strong>${escapeHtml(flight.depart)}</strong>
          <span>${escapeHtml(flight.fromCode)} · ${escapeHtml(flight.fromCity)}</span>
        </div>
        <div class="flight-path">
          <span>${escapeHtml(flight.duration)}</span>
          <span class="flight-line" aria-hidden="true"></span>
          <span>${escapeHtml(flight.stops)}</span>
        </div>
        <div class="flight-end">
          <strong>${escapeHtml(flight.arrive)}${flight.nextDay ? '<span aria-hidden="true"> +1</span>' : ""}</strong>
          <span>${escapeHtml(flight.toCode)} · ${escapeHtml(flight.toCity)}</span>
        </div>
      </div>
      <p class="flight-fare">${escapeHtml(flight.fare)}</p>
      <div class="flight-buy">
        <span class="flight-price">${formatMoney(flight.price)}</span>
        <button type="button" class="select-button" data-book-type="flight" data-book-id="${escapeHtml(flight.id)}">Select</button>
      </div>
    </article>`;
}

function destinationName() {
  if (state.destinationId === "any") return "your dates";
  return getDestination(state.destinationId)?.city || "your dates";
}

function renderResults() {
  const isStay = state.mode === "stays";
  const items = isStay ? searchStays(state.destinationId) : searchFlights(state.destinationId);
  const place = destinationName();
  const label = isStay ? "Stays" : "Flights";
  const title = state.destinationId === "any" ? `${label} for ${place}` : `${label} in ${place}`;

  $("#results-title").textContent = title;
  $("#results-kicker").textContent = `${formatDate(state.checkIn)} to ${formatDate(state.checkOut)}`;
  $("#results-count").textContent = `${items.length} sample ${items.length === 1 ? "option" : "options"}`;
  $("#results-grid").innerHTML = isStay ? items.map(stayCard).join("") : items.map(flightCard).join("");
  $("#results").hidden = false;
}

function updateMode(mode) {
  state.mode = mode;
  const isStay = mode === "stays";
  $$(".mode-tab").forEach((tab) => {
    const active = tab.dataset.mode === mode;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  $("#search-submit").lastChild.textContent = isStay ? " Search stays" : " Search flights";
  $("#date-start-label").textContent = isStay ? "Check in" : "Departing";
  $("#date-end-label").textContent = isStay ? "Check out" : "Returning";
  $("#search-title").textContent = isStay ? "Where are you going?" : "Where are you flying?";
  if (!$("#results").hidden) renderResults();
}

function search({ scroll = true } = {}) {
  const destination = $("#destination").value;
  const checkIn = $("#check-in").value;
  const checkOut = $("#check-out").value;
  const travelers = Number($("#travelers").value);
  const error = $("#search-error");

  error.hidden = true;
  if (!checkIn || !checkOut) {
    error.textContent = "Choose both dates so I can price the trip.";
    error.hidden = false;
    return;
  }
  if (checkOut <= checkIn) {
    error.textContent = "The return date needs to be after the departure date.";
    error.hidden = false;
    return;
  }

  state.destinationId = destination;
  state.checkIn = checkIn;
  state.checkOut = checkOut;
  state.travelers = travelers;
  renderResults();
  if (scroll) $("#results").scrollIntoView({ behavior: "smooth", block: "start" });
}

function bookingTotals(item, type) {
  if (type === "stay") {
    const nights = Math.max(1, nightsBetween(state.checkIn, state.checkOut));
    const subtotal = item.nightly * nights;
    const fees = Math.round(subtotal * 0.12);
    return { nights, subtotal, fees, total: subtotal + fees };
  }
  const total = item.price * state.travelers;
  return { nights: 0, subtotal: total, fees: 0, total };
}

function openBooking(type, id) {
  const item = type === "stay" ? getStay(id) : getFlight(id);
  if (!item) return;
  const destination = getDestination(item.cityId);
  const totals = bookingTotals(item, type);
  const isStay = type === "stay";

  activeBooking = { type, item, destination, totals };

  $("#summary-kind").textContent = isStay ? `Stay in ${destination.city}` : `Flight to ${destination.city}`;
  $("#booking-title").textContent = isStay ? item.name : `${destination.city} round trip`;
  $("#summary-photo").src = isStay ? item.photo : destination.photo;
  $("#summary-photo").alt = isStay ? item.name : destination.city;
  $("#summary-area").textContent = isStay
    ? `${item.area} · ${item.details}`
    : `${item.airline} · ${item.fromCode} to ${item.toCode}`;

  const facts = isStay
    ? [
        ["Check in", formatDate(state.checkIn)],
        ["Check out", formatDate(state.checkOut)],
        ["Nights", String(totals.nights)],
        ["Travelers", `${state.travelers} ${state.travelers === 1 ? "guest" : "guests"}`],
        ["Sample rate", `${formatMoney(item.nightly)} per night`],
        ["Service fee", formatMoney(totals.fees)]
      ]
    : [
        ["Depart", formatDate(state.checkIn)],
        ["Return", formatDate(state.checkOut)],
        ["Route", `${item.fromCode} to ${item.toCode}`],
        ["Travelers", String(state.travelers)],
        ["Flight", `${item.flightNo} · ${item.duration}`],
        ["Fare", item.fare]
      ];

  $("#summary-facts").innerHTML = facts
    .map(([term, value]) => `<div><dt>${escapeHtml(term)}</dt><dd>${escapeHtml(value)}</dd></div>`)
    .join("");
  $("#summary-total").textContent = formatMoney(totals.total);
  $("#summary-policy").textContent = isStay
    ? "Sample free cancellation up to 48 hours before check-in. The card is not charged in this prototype."
    : "Sample fare held for 15 minutes in a production booking. The card is not charged in this prototype.";
  $("#pay-button").textContent = `Pay ${formatMoney(totals.total)} and confirm`;
  $("#booking-error").hidden = true;
  clearBookingErrors();
  setBookingBusy(false);

  $("#booking-modal").hidden = false;
  document.body.classList.add("is-locked");
  window.setTimeout(() => $("#traveler-first").focus(), 60);
}

function clearBookingErrors() {
  $$(".field-error").forEach((element) => {
    element.hidden = true;
    element.textContent = "";
  });
  $$("#booking-form input").forEach((input) => input.removeAttribute("aria-invalid"));
}

function setFieldError(key, message) {
  const error = $(`#error-${key}`);
  if (!error) return;
  error.textContent = message;
  error.hidden = false;
  const input = {
    firstName: "#traveler-first",
    lastName: "#traveler-last",
    email: "#traveler-email",
    name: "#card-name",
    number: "#card-number",
    expiry: "#card-expiry",
    cvc: "#card-cvc"
  }[key];
  if (input) $(input).setAttribute("aria-invalid", "true");
}

function setBookingBusy(busy) {
  const button = $("#pay-button");
  button.disabled = busy;
  button.textContent = busy
    ? "Processing demo payment..."
    : `Pay ${formatMoney(activeBooking?.totals.total || 0)} and confirm`;
}

function closeModal(id) {
  $(`#${id}`).hidden = true;
  if ($("#booking-modal").hidden && $("#confirmation-modal").hidden) {
    document.body.classList.remove("is-locked");
  }
}

function makeCalendarFile(booking) {
  const start = booking.calendarDate.replaceAll("-", "");
  const endDate = new Date(`${booking.calendarDate}T12:00:00`);
  endDate.setDate(endDate.getDate() + 1);
  const end = endDate.toISOString().slice(0, 10).replaceAll("-", "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Meridian Prototype//Travel Booking//EN",
    "BEGIN:VEVENT",
    `UID:${booking.reference}@meridian.prototype`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${booking.title}`,
    `LOCATION:${booking.city}`,
    `DESCRIPTION:${booking.reference}. Sample prototype booking.`,
    "END:VEVENT",
    "END:VCALENDAR"
  ];
  return lines.join("\r\n");
}

function showConfirmation(booking) {
  lastBooking = booking;
  $("#confirmation-city").textContent = booking.city;
  $("#confirmation-email").textContent = booking.email;
  $("#confirmation-ref").textContent = booking.reference;
  $("#confirmation-facts").innerHTML = booking.facts
    .map(([term, value]) => `<div><dt>${escapeHtml(term)}</dt><dd>${escapeHtml(value)}</dd></div>`)
    .join("");
  $("#booking-modal").hidden = true;
  $("#confirmation-modal").hidden = false;
  document.body.classList.add("is-locked");
  window.setTimeout(() => $("#add-calendar").focus(), 60);
}

function confirmBooking(event) {
  event.preventDefault();
  const traveler = {
    firstName: $("#traveler-first").value,
    lastName: $("#traveler-last").value,
    email: $("#traveler-email").value
  };
  const payment = {
    name: $("#card-name").value,
    number: $("#card-number").value,
    expiry: $("#card-expiry").value,
    cvc: $("#card-cvc").value
  };

  clearBookingErrors();
  const travelerCheck = validateTraveler(traveler);
  const paymentCheck = validatePayment(payment, new Date());
  const errors = { ...travelerCheck.errors, ...paymentCheck.errors };
  const keys = Object.keys(errors);

  if (keys.length) {
    keys.forEach((key) => setFieldError(key, errors[key]));
    $("#booking-error").textContent = "Check the highlighted fields before paying.";
    $("#booking-error").hidden = false;
    const first = $("#booking-form [aria-invalid='true']");
    if (first) first.focus();
    return;
  }

  $("#booking-error").hidden = true;
  setBookingBusy(true);

  window.setTimeout(() => {
    const destination = activeBooking.destination;
    const reference = makeBookingReference(Date.now());
    const facts = [
      ["Trip", activeBooking.title],
      ["Dates", `${formatDate(state.checkIn)} to ${formatDate(state.checkOut)}`],
      ["Travelers", String(state.travelers)],
      ["Total", formatMoney(activeBooking.totals.total)],
      ["Payment", "Demo card ending 4242"]
    ];
    const booking = {
      reference,
      city: destination.city,
      email: traveler.email,
      title: `Meridian: ${activeBooking.title}`,
      calendarDate: state.checkIn,
      facts
    };
    try {
      sessionStorage.setItem("meridian.lastBooking", JSON.stringify(booking));
    } catch {
      // Session storage may be unavailable in a privacy mode; the confirmation still works.
    }
    showConfirmation(booking);
    setBookingBusy(false);
  }, 850);
}

function openTrips() {
  if (lastBooking) {
    showConfirmation(lastBooking);
    return;
  }
  try {
    const saved = sessionStorage.getItem("meridian.lastBooking");
    if (saved) {
      lastBooking = JSON.parse(saved);
      showConfirmation(lastBooking);
      return;
    }
  } catch {
    // Ignore storage errors and fall through to the empty state.
  }
  showToast("No saved trips yet. Reserve a stay to create one.");
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.hidden = true;
  }, 3600);
}

function downloadCalendar() {
  if (!lastBooking) return;
  const blob = new Blob([makeCalendarFile(lastBooking)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "meridian-booking.ics";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("Calendar file downloaded.");
}

function openChat() {
  const panel = $("#chat-panel");
  panel.hidden = false;
  $("#chat-fab").setAttribute("aria-expanded", "true");
  $("#chat-fab").hidden = true;
  window.setTimeout(() => $("#chat-input").focus(), 60);
}

function closeChat() {
  $("#chat-panel").hidden = true;
  $("#chat-fab").hidden = false;
  $("#chat-fab").setAttribute("aria-expanded", "false");
}

function scrollChatToEnd() {
  const log = $("#chat-log");
  log.scrollTop = log.scrollHeight;
}

function addChatMessage(text, who = "bot") {
  const log = $("#chat-log");
  const message = document.createElement("div");
  message.className = `message message--${who}`;
  message.textContent = text;
  log.append(message);
  scrollChatToEnd();
}

function addTyping() {
  const log = $("#chat-log");
  const typing = document.createElement("div");
  typing.className = "message message--bot message--typing";
  typing.id = "chat-typing";
  typing.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
  log.append(typing);
  scrollChatToEnd();
}

function sendChat(text) {
  const clean = String(text || "").trim();
  if (!clean) return;
  addChatMessage(clean, "user");
  addTyping();
  window.clearTimeout(typingTimer);
  typingTimer = window.setTimeout(() => {
    $("#chat-typing")?.remove();
    addChatMessage(assistantReply(clean), "bot");
  }, 520);
}

function wireEvents() {
  $$(".mode-tab").forEach((tab) => {
    tab.addEventListener("click", () => updateMode(tab.dataset.mode));
  });

  $$("[data-mode-link]").forEach((link) => {
    link.addEventListener("click", () => {
      updateMode(link.dataset.modeLink);
      window.setTimeout(() => $("#destination").focus(), 420);
    });
  });

  $("#search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    search();
  });

  $("#destination-grid").addEventListener("click", (event) => {
    const button = event.target.closest("[data-destination]");
    if (!button) return;
    $("#destination").value = button.dataset.destination;
    updateMode("stays");
    search();
  });

  $("#results-grid").addEventListener("click", (event) => {
    const button = event.target.closest("[data-book-type]");
    if (!button) return;
    openBooking(button.dataset.bookType, button.dataset.bookId);
  });

  $$("[data-open-chat]").forEach((button) => button.addEventListener("click", openChat));
  $("#chat-close").addEventListener("click", closeChat);
  $("#chat-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = $("#chat-input");
    sendChat(input.value);
    input.value = "";
  });
  $("#chat-chips").addEventListener("click", (event) => {
    const chip = event.target.closest("[data-prompt]");
    if (chip) sendChat(chip.dataset.prompt);
  });

  $$("[data-close-booking]").forEach((element) => {
    element.addEventListener("click", () => closeModal("booking-modal"));
  });
  $$("[data-close-confirmation]").forEach((element) => {
    element.addEventListener("click", () => closeModal("confirmation-modal"));
  });
  $$("[data-open-trips]").forEach((button) => button.addEventListener("click", openTrips));

  $("#booking-form").addEventListener("submit", confirmBooking);
  $("#add-calendar").addEventListener("click", downloadCalendar);

  $("#card-number").addEventListener("input", (event) => {
    event.target.value = formatCardNumber(event.target.value);
  });
  $("#card-expiry").addEventListener("input", (event) => {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 4);
    event.target.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  });
  $("#card-cvc").addEventListener("input", (event) => {
    event.target.value = event.target.value.replace(/\D/g, "").slice(0, 4);
  });
  $("#check-in").addEventListener("change", () => {
    const checkIn = $("#check-in").value;
    if (!checkIn) return;
    const next = new Date(`${checkIn}T12:00:00`);
    next.setDate(next.getDate() + 1);
    $("#check-out").min = next.toISOString().slice(0, 10);
    if ($("#check-out").value <= checkIn) {
      next.setDate(next.getDate() + 4);
      $("#check-out").value = next.toISOString().slice(0, 10);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!$("#chat-panel").hidden) closeChat();
    if (!$("#booking-modal").hidden) closeModal("booking-modal");
    if (!$("#confirmation-modal").hidden) closeModal("confirmation-modal");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const dialog = !$("#booking-modal").hidden
      ? $("#booking-modal")
      : !$("#confirmation-modal").hidden
        ? $("#confirmation-modal")
        : null;
    if (!dialog) return;
    const focusable = $$(
      "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])",
      dialog
    ).filter((element) => element.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

function init() {
  setDefaultDates();
  updateMode("stays");
  renderDestinations();
  wireEvents();
  renderResults();
  $("#results").hidden = true;

  try {
    const saved = sessionStorage.getItem("meridian.lastBooking");
    if (saved) lastBooking = JSON.parse(saved);
  } catch {
    lastBooking = null;
  }
}

init();
