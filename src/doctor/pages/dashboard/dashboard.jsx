import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../../../route/auth";
import './dashboard.css'
export function Dashboard(){
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoggedIn()) {
      navigate('/login');
    }
  }, [navigate])

  return (
    <div className='Geral'>
      <h1>Dashboard</h1>
    </div>
  );
}