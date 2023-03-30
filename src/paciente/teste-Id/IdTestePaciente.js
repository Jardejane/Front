import "./style.css";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { EmotionChart } from "../components/EmotionChart";
import { App } from "../../route/api-helpers";

export const TesteEspecificoPaciente = ({ token }) => {
  const { id } = useParams();
  const [teste, setTeste] = useState(null);
  const record = {
    bsi: teste?.bsi || 0,
    ham_a: teste?.ham_a || 0,
    ham_d: teste?.ham_d || 0,
    k10: teste?.k10 || 0,
  };

  useEffect(() => {
    async function getTesteById() {
      try {
        const teste = await App.getTesteById(id, token);
        setTeste(teste);
      } catch (error) {
        console.error("Erro ao buscar o teste", error);
      }
    }

    if (id) {
      getTesteById();
    }
  }, [id, token]);

  return (
    <div className="containerTesteId">
      <div className="containerHeader">
        <h1>Teste Especifico Paciente</h1>
        <Link
          to="#"
          onClick={() => {
            window.history.back();
          }}
        >
          Voltar
        </Link>
      </div>

      <div className="ContainerCentro">
        <div className="graficoAnnotation">
          {teste && (
            <>
              <EmotionChart record={record} />
              <div className="p">
                <h2>Anotação</h2>
                <p>{teste.annotation}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
