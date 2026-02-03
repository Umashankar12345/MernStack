import { useState } from "react";

function FormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: " ",
    section: "",
    course: "",

  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    alert("Form submitted!");
  }

  return (
    <>
      <h2>Form Page</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
        />
<br /> <br />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />
        <br /><br />
        <input 
        type="password"
        name="password"
        placeholder="Enter password"
        value={formData.email}
        onChange={handleChange}
         />
<br /> <br />
         <input 
         type="contact"
         name="contact"
         placeholder="Enter contact"
         value={formData.contact}
         onChange={handleChange}
          />
<br /> <br />
          <input 
          type="text"
          name="section"
          placeholder="Enter section"
          value={formData.section}
          onChange={handleChange} 
           />
<br /> <br />
         <input 
          type="text"
          name="course"
          placeholder="Enter course"
          value={formData.course}
          onChange={handleChange}   
           />
    <br /> <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default FormPage;
