let doctors = [];

// Fetch data from doctors.json
fetch("data/doctors.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load doctors.json");
    }
    return response.json();
  })
  .then(data => {
    doctors = data;
  })
  .catch(error => {
    console.error("❌ Error loading JSON:", error);
    document.getElementById("results").innerHTML = `
      <p style="text-align:center; color:red;">Error loading doctors data. Please try again later.</p>
    `;
  });

// Search and display doctors
function searchDoctors() {
  const location = document.getElementById("locationSelect").value;
  const department = document.getElementById("departmentSelect").value;

  const resultDiv = document.getElementById("results");
  resultDiv.innerHTML = "";

  if (doctors.length === 0) {
    resultDiv.innerHTML = `<p style="text-align:center; color:gray;">Loading doctors data... please wait</p>`;
    return;
  }

  const filtered = doctors.filter(doc =>
    (location === "" || doc.location === location) &&
    (department === "" || doc.department === department)
  );

  if (filtered.length === 0) {
    resultDiv.innerHTML = `<p style="text-align:center; font-size:18px; color:#999;">😕 No doctors found matching your search.</p>`;
    return;
  }

  filtered.forEach(doc => {
    const card = document.createElement("div");
    card.className = "doctor-card";
    card.innerHTML = `
      <img src="${doc.image}" alt="${doc.name}" class="doctor-img" />
      <h3>🧑‍⚕️ ${doc.name}</h3>
      <p><strong>Specialization:</strong> ${doc.department}</p>
      <p><strong>Location:</strong> ${doc.location}</p>
      <p><strong>Time:</strong> ${doc.time || "9:00 AM - 2:00 PM"}</p>
      <button onclick="openAppointmentForm('${doc.name}')">Book Appointment</button>
    `;
    resultDiv.appendChild(card);
  });
}

// Appointment modal handling
function openAppointmentForm(doctorName) {
  const modal = document.getElementById("appointmentModal");
  const nameField = document.getElementById("doctorName");
  if (modal && nameField) {
    nameField.value = doctorName;
    modal.style.display = "flex";
  }
}

function closeForm() {
  const modal = document.getElementById("appointmentModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Handle form submit
const appointmentForm = document.getElementById("appointmentForm");
if (appointmentForm) {
  appointmentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("✅ Appointment booked successfully!");
    closeForm();
    appointmentForm.reset();
  });
}
