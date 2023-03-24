import "./informaçoes.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { App } from "../../../route/api-helpers";

export const InformaçõesPaciente = (token) => {
  const [paciente, setPaciente] = useState({});
  const { id } = useParams();
  console.log(id);
  async function getPacienteById(id) {
    const paciente = await App.getPacienteById(token, id);
    setPaciente(paciente);
    console.log("paciente", paciente);
  }
  const simNao = (value) => {
    return value ? "Sim" : "Não";
  };

  useEffect(() => {
    getPacienteById(id);
  }, [id]);

  return (
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
        
      </div>
    </div>

  );
};
