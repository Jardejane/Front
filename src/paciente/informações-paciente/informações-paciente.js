import React, { useState, useEffect } from "react";
import { BiTrash } from "react-icons/bi";
import { useParams, useNavigate, Link } from "react-router-dom";
import { App } from "../../route/api-helpers";
import QRCode from "qrcode.react";
import "./informaçoes.css";

export const InformaçoesPaciente = ({ token }) => {
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState({});
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [psicologo, setPsicologo] = useState("");
  const { id } = useParams();

  async function getPacienteById(id) {
    const paciente = await App.getPacienteById(token, id);
    setPaciente(paciente);
  }

  const generateQRCode = async (id) => {
    const req = await App.getPacienteSalaId(token, id);
    const { patient } = req;
    const { doctor } = req;
    const doctorLink = `https://webchat-grupotech.vercel.app/${doctor}`;
    const doctorConnectionLink = `https://webchat-grupotech.vercel.app/${patient}`;
    setPsicologo(doctorLink);
    setQrCodeUrl(doctorConnectionLink);
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
    generateQRCode(id);
  }, [id]);

  return (
    <div className="todo-container">
      <div className="paciente-page-container">
        <div className="button-container">
          <Link to={`/editar-paciente/${id}`}>
            <button className="edit-button">Editar Paciente</button>
          </Link>
          <Link to={`/lista-teste/${id}`}>
            <button className="tests-button">Testes do Paciente</button>
          </Link>
          <button className="back-button" onClick={() => navigate(-1)}>
            Voltar
          </button>
        </div>
      </div>
      <div className="infoQrcode">
        <div className="informacoes-container">
          <p>{paciente?.name}</p>
          <p>Email: {paciente?.email}</p>
          <p>Idade: {paciente?.age}</p>
          <p>Genero: {paciente?.gender}</p>
          <p>Telefone: {paciente?.phone}</p>
          <p>Tentativas de suicidio: {paciente?.attempts}</p>
          <p>Grávida: {simNao(paciente?.pregnant)}</p>
          <p>Filhos: {simNao(paciente?.children)}</p>
        </div>
        <div className="qrcode-container">
          <QRCode value={qrCodeUrl} size={150} />
          <a
            className="button"
            href={qrCodeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Link do chat do paciente
          </a>
          <a
            className="button"
            href={psicologo}
            target="_blank"
            rel="noopener noreferrer"
          >
            Link do chat do Psicologo
          </a>

          <button className="delete-button" onClick={() => deletePaciente(id)}>
            <BiTrash />
          </button>
        </div>
      </div>
    </div>
  );
};
