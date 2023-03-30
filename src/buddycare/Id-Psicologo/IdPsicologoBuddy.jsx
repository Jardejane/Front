import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { App } from '../../route/api-helpers';
import './style.css';

export const BuddyPsicologoPatientsList = () => {
  const [doctor, setDoctor] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchDoctor() {
      const doctor = await App.getIdPsicologoNaBuddy(id);
      console.log('DoctorId',doctor)
      setDoctor(doctor);
    }

    fetchDoctor();
  }, [id]);

  const simNao = (value) => {
    return value ? "Sim" : "Não";
  };
  
  const ativoDesativo = (value) => {
    return value ? "Ativo" : "Desativado";
  };

  const handleDoctorStatusChange = async () => {
    const newStatus = !doctor.isActive;
    await App.deactivateAccountBuddy(id);
    setDoctor(prevState => ({...prevState, isActive: newStatus}));
  }

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="containerPrincipal">
      <h1>Informações</h1>
      <div className="page-container">
        <div className="container2">
          <div className="card">
            <img className="card-image" src={doctor.photo} alt={doctor.name} />
            <div className="card-info">
              <h2>{doctor.name}</h2>
              <p>CRP: {doctor.crp}</p>
              <p>Email: {doctor.email}</p>
              <p>Pacientes: {doctor._count.patients}</p>
              <p>Status: {ativoDesativo(doctor.isActive)}</p>
              <button className="AtivarButton" onClick={handleDoctorStatusChange}>
                {doctor.isActive ? 'Desativar' : 'Ativar'} psicólogo
              </button>
            </div>
          </div>
          <div className="patient-list-container">
            <h3>Lista de Paciente</h3>
            <ul className="patient-list">
              {doctor.patients.map((patient) => (
                <li key={patient.id} onClick={() => {
                  setSelectedPatient(patient);
                }}>
                  {patient.name} ({patient.email}) - {patient.age} anos
                </li>
              ))}
            </ul>
          </div>
        </div>
        {selectedPatient && (
          <div className="patient-details-container">
            <div className="patient-details-card">
              <h3>{selectedPatient.name}</h3>
              <p><strong>Email:</strong> {selectedPatient.email}</p>
              <p><strong>Age:</strong> {selectedPatient.age}</p>
              <p><strong>Gender:</strong> {selectedPatient.gender}</p>
              <p><strong>Phone:</strong> {selectedPatient.phone}</p>
              <p>Tentativas de suicidio: {selectedPatient?.attempts}</p>
              <p>Grávida: {simNao(selectedPatient?.pregnant)}</p>
              <p>Filhos: {simNao(selectedPatient?.children)}</p>
              <button className="FecharButton" onClick={() => {
                setSelectedPatient(null);
              }}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
