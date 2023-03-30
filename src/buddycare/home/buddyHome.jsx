import './style.css'
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { App } from '../../route/api-helpers';

export const BuddyHome = () => {
    const [doctor, setDoctor] = useState([]);
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();
  
    async function getAllDoctor() {
      const doctors = await App.getAllPsicologoNaBuddy();
      console.log("Doctor",doctors)
      setDoctor(doctors);
      const filteredPatients = patients.filter((patient) => {
        return patient.doctor_id === doctors.id;
      });
      setPatients(filteredPatients);
    }
  
    useEffect(() => {
      getAllDoctor();
    }, []);

    return (
      <div className="page-container3">
        <h1>Doctors</h1>
        <div className="results-container">
          {doctor.map((doctor) => (
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
  
}
