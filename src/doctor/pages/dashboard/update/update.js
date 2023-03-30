import { useState, useEffect } from "react";
import api from "../../../../database/api";
import { Spinner } from "react-bootstrap";
import "./style.css";

export function CardWithData() {
  const [data, setData] = useState({
    name: "",
    id: "",
    crp: "",
    email: "",
    password: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const response = await api.get("/auth/signed", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setData(data);
    }
    fetchData();
  }, [updatedData]);

  async function handleEdit() {
    setIsEditing(true);
  }

  async function handleFinish() {
    setIsEditing(false);
    setIsLoading(true);
    const timestamp = Date.now();
    setUpdatedData(timestamp);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  return (
    <div className="user-profile-container">
      {Object.keys(data).length > 0 ? (
        <div className="user-profile">
          <ul className="user-profile-list">
            <li>
              <strong>Nome:</strong> {data.name}
            </li>
            <li>
              <strong>CRP:</strong> {data.crp}
            </li>
            <li>
              <strong>Email:</strong> {data.email}
            </li>
            <li>
              <strong>Senha:</strong> {"###"}
            </li>
            <li>
              <strong>Telefone:</strong> {data.phone}
            </li>
          </ul>
          <button className="edit-button" onClick={handleEdit}>
            Editar
          </button>
          {isEditing && (
            <EditForm
              id={data.id}
              data={data}
              onFinish={handleFinish}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
        </div>
      ) : (
        <p className="no-data">Nenhum dado encontrado.</p>
      )}
    </div>
  );
}

function EditForm({ id, data, onFinish, isLoading, setIsLoading }) {
  const [formData, setFormData] = useState({
    name: data.name,
    id: data.id,
    crp: data.crp,
    password: data.password,
    email: data.email,
    phone: data.phone,
  });

  async function handleSubmit(event) {
    event.preventDefault();

    const token = localStorage.getItem("token");
    setIsLoading(true);
    const response = await api.patch(`/doctor/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const timestamp = Date.now();
    onFinish();
    setIsLoading(false);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div className="edit-form-container">
      <form onSubmit={handleSubmit}>
        {isLoading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <>
            <div>
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="name">CRP:</label>
              <input
                type="text"
                name="crp"
                id="crp"
                value={formData.crp}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="name">Email:</label>
              <input
                type="text"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="name">Senha:</label>
              <input
                type="text"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="name">Telefone:</label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <button type="submit">Salvar</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
