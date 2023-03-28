import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistroDoctor from './doctor/pages/register/index';
import LoginDoctor from './doctor/pages/auth/index';
import { Dashboard } from './doctor/pages/dashboard/dashboard';
import { SearchPage } from './doctor/pages/dashboard/buscar-paciente/buscar-paciente';
import { CadastroPaciente } from './doctor/pages/dashboard/cadastroPaticiente/cadastro';
import { TodosPacientes } from './doctor/pages/dashboard/listaPaciente/listaPaciente';
import { ListaChat } from './doctor/pages/dashboard/lista-chat/listaChat';
import { InformaçõesPaciente } from './paciente/informações-paciente/informações-paciente';
import { EditarPaciente } from './paciente/upadatePaciente/edite';
import Header from './doctor/components/header/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<RegistroDoctor />} />
        <Route path='dashboard' element={<><Header /><Dashboard /></>} />
        <Route path='login' element={<LoginDoctor />} />
        <Route path='pesquisa' element={<><Header /><SearchPage /></>} />
        <Route path='cadastro-paciente' element={<><Header /><CadastroPaciente /></>} />
        <Route path='todos-pacientes' element={<><Header /><TodosPacientes /></>} />
        <Route path='lista-chats' element={<><Header /><ListaChat /></>} />
        <Route path='/paciente/:id' element={<><Header /><InformaçõesPaciente /></>} />
        <Route path='/editar-paciente/:id' element={<><Header /><EditarPaciente /></>} />
      </Routes>
    </Router>
  );
}

export default App;
