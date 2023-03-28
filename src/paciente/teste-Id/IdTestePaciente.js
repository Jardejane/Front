import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { App } from "../../route/api-helpers";

export const TesteEspecificoPaciente = ({ token }) => {
  const { id } = useParams();
  const [teste, setTeste] = useState(null);

  useEffect(() => {
    async function getTesteById() {
      try {
        const teste = await App.getTesteById(id, token);
        setTeste(teste);
      } catch (error) {
        console.log("Erro ao buscar o teste", error);
      }
    }

    if (id) {
      console.log(id);
      getTesteById();
    }
  }, [id, token]);

  return (
    <div>
      <h1>Teste Especifico Paciente</h1>
      <div>
        {teste && (
          <>
            <p>Codico do teste: {teste.id}</p>
            <p>Anotação: {teste.annotation}</p>
            <p>BSI: {teste.bsi}</p>
            <p>HAM-A: {teste.ham_a}</p>
            <p>HAM-D: {teste.ham_d}</p>
            <p>K10: {teste.k10}</p>
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
