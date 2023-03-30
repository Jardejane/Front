import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from "../../../route/auth";
import { App } from '../../../route/api-helpers'
import './dashboard.css'
export const Dashboard = ({ paciente }) => {
  const [getPaciente, setGetPaciente] = useState(paciente || []);
  const navigate = useNavigate();

  async function getAllPacientes() {
    const pacientes = await App.getAllPacient();
    setGetPaciente(pacientes);
  }

  useEffect(() => {
    getAllPacientes();
  }, []);

  useEffect(() => {
    if (!auth.isLoggedIn()) {
      navigate('/');
    }
  }, [navigate])


  return (
    <div className="page-container3">
      <h1>Pacientes</h1>
      <div className="results-container">
        {getPaciente.map((patient) => (
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
        ))}
      </div>
    </div>
  );
}

// 67