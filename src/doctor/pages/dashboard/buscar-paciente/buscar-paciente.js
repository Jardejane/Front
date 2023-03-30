import "./style.css";
import { useState, useEffect } from "react";
import { App } from "../../../../route/api-helpers";
import { useNavigate } from "react-router-dom";

export const SearchPage = ({ paciente }) => {
  const [getPaciente, setGetPaciente] = useState(paciente || []);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    const filteredPacientes = await App.searchAPI(query);
    setResults(filteredPacientes);
  };

  async function getAllPacientes() {
    const pacientes = await App.getAllPacient();
    setGetPaciente(pacientes);
  }

  useEffect(() => {
    getAllPacientes();
  }, []);

  return (
    <div className="search-page-container">
      <h1>Pesquisar paciente</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </form>
      <div className="results-container">
        {results.length > 0
          ? results.map((patient) => (
              <div
                className="card"
                key={patient.id}
                onClick={() => navigate(`/paciente/${patient.id}`)}
              >
                <img
                  className="card-image"
                  src={patient.photo}
                  alt={patient.name}
                />
                <div className="card-info">
                  <h2>{patient.name}</h2>
                  <p>Idade: {patient.age}</p>
                </div>
              </div>
            ))
          : getPaciente
              .filter((patient) =>
                patient.name.toLowerCase().includes(query.toLowerCase())
              )
              .map((patient, index) => (
                <div
                  className="card"
                  key={index}
                  onClick={() => navigate(`/paciente/${patient.id}`)}
                >
                  <img
                    className="card-image"
                    src={patient.photo}
                    alt={patient.name}
                  />
                  <div className="card-info">
                    <h2>{patient.name}</h2>
                    <p>Idade: {patient.age}</p>
                  </div>
                </div>
              ))}
      </div>
    </div>
  );
};
