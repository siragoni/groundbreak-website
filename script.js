// Mobile nav
const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#nav-links");

if (toggle && navLinks) {
  toggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // close menu on link click (mobile)
  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Reveal on scroll
const els = Array.from(document.querySelectorAll(".reveal"));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("is-visible");
  });
}, { threshold: 0.12 });

els.forEach(el => io.observe(el));

// Footer year
const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

// Contact form: open mailto (no backend needed)
const form = document.querySelector("#contactForm");
const statusEl = document.querySelector("#formStatus");

function encode(s) {
  return encodeURIComponent(s ?? "");
}

if (form) {
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const company = data.get("company");
    const message = data.get("message");

    if (statusEl) statusEl.textContent = "Opening your email client…";

    const subject = `GroundBreak demo request — ${company ? company : "New inquiry"}`;
    const body =
`Name: ${name}
Email: ${email}
Company: ${company || "-"}
---
Message:
${message}
`;

    // TODO: replace hello@groundbreak.example with your email
    const to = "hello@groundbreak.example";
    const mailto = `mailto:${to}?subject=${encode(subject)}&body=${encode(body)}`;

    window.location.href = mailto;

    // small UX update
    setTimeout(() => {
      if (statusEl) statusEl.textContent = "If your email client didn’t open, copy the address on the right and email us.";
    }, 1200);
  });
}
