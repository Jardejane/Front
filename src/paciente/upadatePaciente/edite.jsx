import './edite.css'
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { App } from "../../route/api-helpers";

export const EditarPaciente = ({ token }) => {
  const [paciente, setPaciente] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { id } = useParams();

  async function getPacienteById(id) {
    const paciente = await App.getPacienteById(token, id);
    setPaciente(paciente);
  }

  useEffect(() => {
    getPacienteById(id);
  }, [id]);

  useEffect(() => {
    if (formSubmitted) {
      window.location.reload();
    }
  }, [formSubmitted]);

  const [errors, setErrors] = useState({});

  const handleEditarPaciente = async (event) => {
    event.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const res = await App.updatePaciente(id, paciente, token);
    console.log(`res`, res);
    setFormSubmitted(true);


  };

  function validateBoolean(value) {
    return typeof value === "boolean";
  }
  const validateForm = () => {
    const errors = {};

    if (paciente.name.length < 3 || paciente.name.length > 50) {
      errors.name = "Name must be between 3 and 50 characters";
    }

    if (!/\S+@\S+\.\S+/.test(paciente.email)) {
      errors.email = "Email is not valid";
    }

    if (!["Masculino", "Feminino", "Outro"].includes(paciente.gender)) {
      errors.gender = "Gender must be Masculino, Feminino or Outro";
    }
    paciente.age = parseInt(paciente.age);
    console.log(paciente.age);
    if (!(paciente.age > 0)) {
      errors.age = "Age must be between 0 and 120";
    }

    if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(paciente.phone)) {
      errors.phone = "Phone number is not valid";
    }

    paciente.attempts = parseInt(paciente.attempts);
    if (!paciente.attempts > 0 && !paciente.attempts == 0) {
      errors.attempts = "Attempts must be between 0 and 99";
    }
    if (!validateBoolean(paciente.pregnant)) {
      errors.pregnant = "Pregnant must be a boolean value";
    }

    if (!validateBoolean(paciente.children)) {
      errors.children = "Children must be a boolean value";
    }

    return errors;
  };


  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setPaciente({
      ...paciente,
      [name]: value,
    });
  };
  return (
    <div className="edit-paciente">
      <h1>Editar Paciente</h1>
      <form onSubmit={handleEditarPaciente}>
        <div className="form-row">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            name="name"
            value={paciente?.name || ""}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={paciente?.email || ""}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-row">
          <label htmlFor="age">Idade</label>
          <input
            type="number"
            name="age"
            value={paciente?.age || ""}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-row">
          <label htmlFor="gender">Gênero</label>
          <select
            name="gender"
            value={paciente?.gender}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="Feminino">Feminino</option>
            <option value="Masculino">Masculino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="phone">Telefone</label>
          <input
            type="tel"
            name="phone"
            value={paciente?.phone || ""}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-row">
          <label htmlFor="attempts">Tentativas de Suicídio</label>
          <input
            type="number"
            name="attempts"
            value={paciente?.attempts || ""}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-row1">
          <div className="ckeck">
            <label htmlFor="pregnant">Grávida</label>
            <input
              type="checkbox"
              name="pregnant"
              checked={paciente?.pregnant || false}
              onChange={handleInputChange}
              className="form-control-checkbox"
            />
          </div>
          <div className="ckeck">
            <label htmlFor="children">Filhos</label>
            <input
              type="checkbox"
              name="children"
              checked={paciente?.children || false}
              onChange={handleInputChange}
              className="form-control-checkbox"
            />
          </div>
        </div>
        <div className="form-row1">
          <button onClick={() => window.history.back()} className="btn-submit">Voltar</button>
          <button type="submit" className="btn-submit">Salvar</button>
        </div>
      </form>
    </div>
  );

};
