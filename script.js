let clickCount = localStorage.getItem("clickCount") || 0;
const shareBtn = document.getElementById("shareBtn");
const clickCounter = document.getElementById("clickCounter");
const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");
const messageDiv = document.getElementById("message");

clickCounter.textContent = `Click count: ${clickCount}/5`;

shareBtn.addEventListener("click", () => {
  if (clickCount < 5) {
    const text = encodeURIComponent("Hey Buddy, Join Tech For Girls Community");
    const url = `https://wa.me/?text=${text}`;
    window.open(url, "_blank");

    clickCount++;
    localStorage.setItem("clickCount", clickCount);
    clickCounter.textContent = `Click count: ${clickCount}/5`;

    if (clickCount == 5) {
      alert("Sharing complete. Please continue.");
    }
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (clickCount < 5) {
    alert("Please complete 5 WhatsApp shares before submitting.");
    return;
  }

  const formData = new FormData(form);
  const file = document.getElementById("screenshot").files[0];

  formData.append("screenshot", file);

  submitBtn.disabled = true;
  messageDiv.textContent = "Submitting...";

  // Replace this URL with your Google Apps Script Web App URL
  const scriptURL = "https://script.google.com/macros/s/AKfycby9IQEGlo3IpWJSsNzXDYONZbW5r8tvsVbxGzQDWH2FJwlp8ytJXYiDGeKIbaWjjInH/exec";

  const response = await fetch(scriptURL, {
    method: "POST",
    body: formData
  });

  if (response.ok) {
    form.reset();
    localStorage.setItem("submitted", "true");
    messageDiv.innerHTML = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
    form.querySelectorAll("input, button").forEach(el => el.disabled = true);
  } else {
    messageDiv.textContent = "There was an error. Try again later.";
    submitBtn.disabled = false;
  }
});

// Disable form if already submitted
if (localStorage.getItem("submitted") === "true") {
  form.querySelectorAll("input, button").forEach(el => el.disabled = true);
  messageDiv.innerHTML = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
}
