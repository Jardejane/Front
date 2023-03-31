import "./style.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { App } from "../../route/api-helpers";

export const BuddyHome = () => {
  const [doctor, setDoctor] = useState([]);
  const [patients, setPatients] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  async function getAllDoctor() {
    const doctors = await App.getAllPsicologoNaBuddy();
    console.log("Doctor", doctors);
    setDoctor(doctors);
    const filteredPatients = patients.filter((patient) => {
      return patient.doctor_id === doctors.id;
    });
    setPatients(filteredPatients);
  }

  function searchDoctors() {
    return doctor.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  useEffect(() => {
    getAllDoctor();
  }, []);

  const filteredDoctors = searchDoctors().filter(doctor => doctor.id !== 'df8e604f-4e82-4c3e-84df-b87621238253');

  return (
    <div className="page-container5">
      <h1>Doctors</h1>
      <div className="search-page-container-Pesquisa">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Pesquisar por nome"
          />
          <button type="submit">Pesquisar</button>
        </form>
      </div>
      <div className="results-container">
        {filteredDoctors.map((doctor) => (
          <div
            className="card1"
            key={doctor.id}
            onClick={() => navigate(`/doctor/${doctor.id}`)}
          >
            <img
              className="card-image"
              src={doctor.photo}
              alt={doctor.name}
            />
            <div className="card-info">
              <h2>{doctor.name}</h2>
              <p>CRP: {doctor.crp}</p>
              <p>Email: {doctor.email}</p>
              <p>Pacientes: {doctor._count.patients}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
