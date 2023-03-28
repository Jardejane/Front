import "./informaçoes.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { App } from "../../route/api-helpers";

export const InformaçõesPaciente = (token) => {
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState({});
  const { id } = useParams();

  async function getPacienteById(id) {
    const paciente = await App.getPacienteById(token, id);
    setPaciente(paciente);
    console.log("paciente", paciente);
  }

  const LinkUrl = async (id) => {
    const req = await App.getPacienteSalaId(token, id);
    const { patient } = req;
    const doctorConnectionLink = `https://webchat-grupotech.vercel.app/${patient}`;
    window.open(doctorConnectionLink, "_blank");
  };

  const deletePaciente = async (id) => {
    await App.deletePaciente(id);
    navigate("/todos-pacientes");
  };

  const simNao = (value) => {
    return value ? "Sim" : "Não";
  };

  useEffect(() => {
    getPacienteById(id);
  }, [id]);

  return (
    <div>
      <div className="paciente-page-container">
        <div className="informações">
          <p>{paciente?.name}</p>
          <p>Email: {paciente?.email}</p>
          <p>Idade: {paciente?.age}</p>
          <p>Genero: {paciente?.gender}</p>
          <p>Telefone: {paciente?.phone}</p>
          <p>Tentativas de suicidio: {paciente?.attempts}</p>
          <p>Grávida: {simNao(paciente?.pregnant)}</p>
          <p>Filhos: {simNao(paciente?.children)}</p>
        </div>
        <div>
          <Link to={`/editar-paciente/${id}`}>
            <button>Editar Paciente</button>
          </Link>
        </div>
        <div>
          <button onClick={() => deletePaciente(id)}>excluir</button>
        </div>
      </div>
      <div>
        <button onClick={() => LinkUrl(id)}>
          link 
        </button>
      </div>
    </div>
  );
};
