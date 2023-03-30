import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistroDoctor from './doctor/pages/register/index';
import LoginDoctor from './doctor/pages/auth/index';
import { Dashboard } from './doctor/pages/dashboard/dashboard';
import { SearchPage } from './doctor/pages/dashboard/buscar-paciente/buscar-paciente';
import { CadastroPaciente } from './doctor/pages/dashboard/cadastroPaticiente/cadastro';
import { ListaChat } from './doctor/pages/dashboard/lista-chat/listaChat';
import { InformaçoesPaciente } from './paciente/informações-paciente/informações-paciente';
import { EditarPaciente } from './paciente/upadatePaciente/edite';
import {ListaTeste} from './paciente/lista-Teste/lista-teste'
import {TesteEspecificoPaciente} from './paciente/teste-Id/IdTestePaciente'
import Header from './doctor/components/header/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<LoginDoctor />} />
        <Route path='dashboard' element={<><Header /><Dashboard /></>} />
        <Route path='registro' element={<RegistroDoctor />} />
        <Route path='pesquisa' element={<><Header /><SearchPage /></>} />
        <Route path='cadastro-paciente' element={<><Header /><CadastroPaciente /></>} />
        <Route path='lista-chats' element={<><Header /><ListaChat /></>} />
        <Route path='/paciente/:id' element={<><Header /><InformaçoesPaciente /></>} />
        <Route path='/editar-paciente/:id' element={<><Header /><EditarPaciente /></>} />
        <Route path='/lista-teste/:id' element={<><Header /><ListaTeste /></>} />
        <Route path='/teste/:id' element={<><Header /><TesteEspecificoPaciente /></>} />
      </Routes>
    </Router>
  );
}

export default App;
