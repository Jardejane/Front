import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { App } from "../../route/api-helpers";
import { Modal, Button } from "react-bootstrap";

export const ListaTeste = ({ token }) => {
  const [testes, setTestes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [novoAnnotation, setNovoAnnotation] = useState("");
  const [testeSelecionado, setTesteSelecionado] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  async function getTestesPaciente(token, id) {
    const testes = await App.searchTesteGet(token, id);
    setTestes(testes);
  }

  useEffect(() => {
    getTestesPaciente(token, id);
  }, [id]);

  const handleAbrirModal = (teste) => {
    setShowModal(true);
    setTesteSelecionado(teste);
    setNovoAnnotation(teste.annotation);
  };

  const handleFecharModal = () => {
    setShowModal(false);
    setTesteSelecionado(null);
    setNovoAnnotation("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await App.updateTestePatch(testeSelecionado.id, { annotation: novoAnnotation }, token);
      handleFecharModal();
      getTestesPaciente(token, id);
    } catch (error) {
      console.log("Erro ao atualizar o teste", error);
    }
  };

  const handleTesteClick = (testeId) => {
    navigate(`/teste/${testeId}`);
  };

  return (
    <div>
      <h1>Lista de Testes do Paciente</h1>
      <ul>
        {testes.map((teste) => (
          <li key={teste.id}>
            <p>{teste.annotation}</p>
            <p>{teste.bsi}</p>
            <p>{teste.ham_a}</p>
            <p>{teste.ham_d}</p>
            <p>{teste.k10}</p>
            <button onClick={() => handleAbrirModal(teste)}>Editar anotação</button>
            <button onClick={() => handleTesteClick(teste.id)}>Ver detalhes</button>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(-1)}>Voltar</button>
      <Modal show={showModal} onHide={handleFecharModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar anotação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <label htmlFor="nova-anotacao">Nova anotação:</label>
            <input type="text" id="nova-anotacao" value={novoAnnotation} onChange={(event) => setNovoAnnotation(event.target.value)} />
            <Button type="submit">Salvar</Button>
          </form>
        </Modal.Body>
      </Modal>
    
    </div>
  );
};

