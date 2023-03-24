import "./cadastro.css";
// import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import api from "../../../../database/api";

export function CadastroPaciente({ token }) {
  const [patient, setPatient] = useState({
    name: "",
    email: "",
    gender: "",
    age: 0,
    phone: "",
    attempts: 0,
    pregnant: false,
    children: false,
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    api
      .post("/patient", patient, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Patient created:", response.data);
        setPatient(response.data);
      })
      .catch((error) => {
        console.error("Error creating patient:", error);
      });
  };
  function validateBoolean(value) {
    return typeof value === "boolean";
  }

  const validateForm = () => {
    const errors = {};

    if (patient.name.length < 3 || patient.name.length > 50) {
      errors.name = "Name must be between 3 and 50 characters";
    }

    if (!/\S+@\S+\.\S+/.test(patient.email)) {
      errors.email = "Email is not valid";
    }

    if (!["Masculino", "Feminino", "Outro"].includes(patient.gender)) {
      errors.gender = "Gender must be Masculino, Feminino or Outro";
    }
    patient.age = parseInt(patient.age);
    console.log(patient.age);
    if (!patient.age > 0) {
      errors.age = "Age must be between 0 and 120";
    }

    if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(patient.phone)) {
      errors.phone = "Phone number is not valid";
    }

    patient.attempts = parseInt(patient.attempts);
    if (!patient.attempts > 0 &&  !patient.attempts == 0) {
      errors.attempts = "Attempts must be between 0 and 99";
    }
    if (!validateBoolean(patient.pregnant)) {
      errors.pregnant = "Pregnant must be a boolean value";
    }

    if (!validateBoolean(patient.children)) {
      errors.children = "Children must be a boolean value";
    }

    return errors;
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
  <div className="CadastroPaciente">
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={patient.name}
          onChange={handleInputChange}
        />
         {errors.name && <span class="form-error">{errors.name}</span>}
      </div>
      <div className="form-row">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={patient.email}
          onChange={handleInputChange}
        />
       {errors.email && <span className="form-error">{errors.email}</span>}

      </div>
      <div className="form-row">
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={patient.gender}
          onChange={handleInputChange}
        >
          <option value>-- Select --</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
        </select>
        {errors.gender && <span className="form-error">{errors.gender}</span>}

      </div>
      <div className="form-row">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={patient.age}
          onChange={handleInputChange}
        />
      {errors.age && <span className='form-error'>{errors.age}</span>}
     
      </div>
      <div className="form-row">
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={patient.phone}
          onChange={handleInputChange}
        />
       {errors.phone && <span className="form-error">{errors.phone}</span>}

      </div>
      <div className="form-row">
        <label htmlFor="attempts">Attempts:</label>
        <input
          type="number"
          id="attempts"
          name="attempts"
          value={patient.attempts}
          onChange={handleInputChange}
        />
      {errors.attempts && <span className="form-error">{errors.attempts}</span>}

      </div>
      <div className="form-row1">
        <label htmlFor="children">Children:</label>
        <input
          type="checkbox"
          id="children"
          name="children"
          value={patient.children}
          onChange={handleInputChange}
        />
        <label htmlFor="pregnant">Pregnant:</label>
        <input
          type="checkbox"
          id="pregnant"
          name="pregnant"
          onChange={handleInputChange}
          className="form-checkbox"
          
        />
      </div>
      <div className="form-rowButoon">
        <button type="submit">Create</button>
      </div>
    </form>
  </div>
  );
}
