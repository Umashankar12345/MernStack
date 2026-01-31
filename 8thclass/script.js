function navigate(page) {
  const content = document.getElementById("content");

  if (page === "home") {
    content.innerHTML = `
      <h2>Home</h2>
      <p>Welcome to the Home page.</p>
    `;
  }

  if (page === "about") {
    content.innerHTML = `
      <h2>About</h2>
      <p>Lovely Professional University (LPU), located in Jalandhar, Punjab, is a top-ranked private university (5th in India, Times Higher Education 2026) renowned for its massive 600-acre campus, diverse student body of 30,000+ students, and NAAC A++ accreditation. It offers 150+ programs in 55 disciplines with a strong focus on industry-oriented teaching, high placement rates (2,225+ recruiters), and 2,900+ patents granted. </p>
    `;
  }

  if (page === "contact") {
    content.innerHTML = `
      <h2>Contact</h2>
      <p>

IconGet Directions <br /> <br />


Phone Number
+91-1824-517000

+91-1824-404404 <br /> <br />

WhatsApp Chat: +91 98525 69000 <br /> <br />

Email
General: info@lpu.co.in <br /> <br />

Admissions: admissions@lpu.co.in <br /> <br />

International Admissions
+91 1824 444019 <br /> <br />

WhatsApp Chat: +91 95011 10413 <br /> <br />

int.admissions@lpu.co.in</p>
    `;
  }
}
