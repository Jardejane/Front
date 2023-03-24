import './login.css'
import { useState } from 'react';
import { App } from '../../../route/api-helpers'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function LoginDoctor() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit = async  (e) => {
        e.preventDefault();
        try {
           const login = { email, password }
           const token=   await  App.loginDoctor(login);
            
             localStorage.setItem('token',token.accessToken);
             navigate('/dashboard');
        } catch (error) {
        //   setError(error.response.data.message);
            console.log(error)
        }
    };


    return (
            <div className='container1'>
                <div className='teste'>

                <form className='form' onSubmit={handleSubmit}>
                    <h1>Login</h1>

                    <input
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <input 
                        type='password'
                        placeholder='Senha'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <div>
                        {error && <div className='errorMessage'>{error}</div>}
                    </div>

                    <button className='' type='submit'>Entrar</button>
                   <Link to = "/">
                    <button className ='buttonRegisto'>Registro</button>
                    </Link> 
                </form>
                </div>

            </div>
    );
}
export default LoginDoctor