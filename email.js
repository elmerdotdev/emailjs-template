const PUBLIC_KEY = ""; // https://dashboard.emailjs.com/admin/account
const SERVICE_ID = ""; // https://dashboard.emailjs.com/admin - Connect gmail first!
const TEMPLATE_ID = ""; // https://dashboard.emailjs.com/admin/templates

(function () {
  emailjs.init({
    publicKey: PUBLIC_KEY,
  });
})();

const contactForm = document.querySelector("#service-form");
const eventTypeButtons = document.querySelectorAll(".event-types button");
const eventTypeInput = document.querySelector("#event_type");

// Event Type
eventTypeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    eventTypeButtons.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");
    eventTypeInput.value = button.dataset.type;
  });
});

// Submit Form
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(contactForm);

  const message = `
    Event Type: ${formData.get("event_type")}
    Event Date: ${formData.get("event_date") || "Not decided"}
    Event Time: ${formData.get("event_time") || "Not decided"}
    Date Undecided: ${formData.get("date_undecided") ? "Yes" : "No"}
    Time Undecided: ${formData.get("time_undecided") ? "Yes" : "No"}

    Name: ${formData.get("user_name")}
    Phone: ${formData.get("user_phone")}
    Preferred Contact Method: ${formData.get("contact_method")}
  `;

  const templateParams = {
    title: "Web 1 Service Form",
    name: formData.get("user_name"),
    message: message.trim()
  };

  emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams).then(
    () => {
      alert("Message sent successfully!");
      contactForm.reset();
      eventTypeButtons.forEach((btn) => btn.classList.remove("selected"));
    },
    (error) => {
      console.error("FAILED...", error);
      alert("Failed to send message.");
    }
  );
});
