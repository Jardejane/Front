import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { App } from "../../route/api-helpers";
import { Button } from "react-bootstrap";
import { format } from "date-fns";
import "./lista-teste.css";

export const ListaTeste = ({ token }) => {
  const [testes, setTestes] = useState([]);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await App.updateTestePatch(
        testeSelecionado.id,
        { annotation: novoAnnotation },
        token
      );
      handleFecharModal();
      getTestesPaciente(token, id);
    } catch (error) {
      console.log("Erro ao atualizar o teste", error);
    }
  };

  const handleTesteClick = (testeId) => {
    navigate(`/teste/${testeId}`);
  };

  const handleAbrirModal = (teste) => {
    setTesteSelecionado(teste);
    setNovoAnnotation(teste.annotation);
  };

  const handleFecharModal = () => {
    setTesteSelecionado(null);
    setNovoAnnotation("");
  };

  return (
    <div className="lista-teste">
      <div className="buttonH1">
        <h1 className="titulo">Testes do Paciente</h1>
        <button className="botao-voltar" onClick={() => navigate(-1)}>
          Voltar
        </button>
      </div>
      <ul className="lista">
        {testes.map((teste) => (
          <li className="item" key={teste.id}>
            <div className="item-conteudo">
              <div className="annotation">
                <p>
                  Horario do teste:{" "}
                  {format(new Date(teste.createdAt), "dd-MM-yyyy HH:mm")}
                </p>
                <p>{`${teste.annotation.substring(0, 60)}... `}</p>
                <button
                  className="botao-ler-mais"
                  onClick={() => handleAbrirModal(teste)}
                >
                  Ler mais
                </button>
              </div>
              <div className="botoes">
                <button
                  className="botao-detalhes"
                  onClick={() => handleTesteClick(teste.id)}
                >
                  Ver detalhes
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {testeSelecionado && (
        <div className="overlay">
          <div className="modal">
            <form onSubmit={handleSubmit}>
              <div className="containerInput">
                <textarea
                  id="nova-anotacao"
                  value={novoAnnotation}
                  onChange={(event) => setNovoAnnotation(event.target.value)}
                />
                <div className="buttonModal">
                  <Button className="botao-salvar" type="submit">
                    Salvar
                  </Button>
                  <Button
                    className="botao-cancelar"
                    variant="secondary"
                    onClick={handleFecharModal}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
