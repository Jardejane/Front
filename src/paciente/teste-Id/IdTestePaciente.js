import React, { useState, useEffect } from "react";
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
    <div>
      <h1>Teste Especifico Paciente</h1>
      <div>
        {teste && (
          <>
            <EmotionChart record={record} />
            <p>Anotação: {teste.annotation}</p>
          </>
        )}
      </div>

      <div>
        <Link
          to="#"
          onClick={() => {
            window.history.back();
          }}
        >
          Voltar
        </Link>
      </div>
    </div>
  );
};
