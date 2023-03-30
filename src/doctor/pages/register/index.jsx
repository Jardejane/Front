import './registre.css'
import { useState } from "react";
import { Link } from 'react-router-dom';
import { App } from '../../../route/api-helpers'
import { validEmail, validPassword } from "../../components/regex/regex";
import { useNavigate } from "react-router-dom";

function RegistroDoctor() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [crp, setCrp] = useState("")
  const [phone, setPhone] = useState("")
  const [name, setUsername] = useState("")

  const [inputEmailErr, setInputEmailErr] = useState(false);
  const [inputPassordErr, setInputPasswordErr] = useState(false);
  const [inputConfirmPasswordErr, setInputConfirmPasswordErr] = useState(false);
  const [inputCrrErr, setInputCrrErr] = useState(false)
  const [inputPhoneErr, setInputPhoneErr] = useState(false)
  const [inputUserErr, setInputUserErr] = useState("")


  const validate = (e) => {
    e.preventDefault();
    if (!validEmail.test(email)) {
      setInputEmailErr(true);
      return
    } else {
      setInputEmailErr(false);
    }

    if (!phone.match(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/)) {
      setInputPhoneErr(true)
      return
    } else {
      setInputPhoneErr(false)
    }

    if (!crp.match(/^[0-9]{2}\/[0-9]{5,6}$/)) {
      setInputCrrErr(true)
      return
    } else {
      setInputCrrErr(false)
    }

    if (!validPassword.test(password)) {
      setInputPasswordErr(true);
      return
    } else {
      setInputPasswordErr(false);
    }
    if (password !== confirmPassword) {
      setInputConfirmPasswordErr(true);
      return;
    } else {
      setInputConfirmPasswordErr(false);
    }
    const register = { email, phone, crp, password, name, confirmPassword }
    App.postDoctor(register)
    navigate("/dashboard")
  };

  return (
    <div className='RegistroDoctor' >
      <div >
        <form onSubmit={validate}>
          <h1>    Registro</h1>

          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={event => setUsername(event.target.value)}
          />
          {inputUserErr && <p >Por favor digite um name!</p>}

          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          {inputEmailErr && <p>Por favor digite um email valido!</p>}

          <input
            type="text"
            placeholder='Telefone'
            value={phone}
            onChange={event => setPhone(event.target.value)}
          />
          {inputPhoneErr && <p>Por favor digite um telefone valido!</p>}

          <input
            type="text"
            placeholder='CRP'
            value={crp}
            onChange={event => setCrp(event.target.value)}
          />
          {inputCrrErr && <p>Por favor digite um CRP valido!</p>}

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {inputPassordErr && <p >Por favor digite uma senha mais segura</p>}

          <input
            type="password"
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
          />
          {inputConfirmPasswordErr && <p>As senhas não coincidem.</p>}

          <button className='CadastroButton' onClick={validate}>Cadastar</button>
          <Link to="/">
            <button className='LoginButton' >Login</button>
          </Link>

        </form>
      </div>
    </div>
  );
}

export default RegistroDoctor;