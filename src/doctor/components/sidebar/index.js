import { useState } from 'react'
import {  Content, Container } from './styles'
import { 
  FaTimes,  
  FaUserAlt, 
  FaRocketchat
} from 'react-icons/fa'
import {FiLogOut,FiUsers, FiRefreshCw, FiSearch,} from 'react-icons/fi'
import SidebarItem from '../sidebaritem/index'
import Modal from '../modal/modal'
import { CardWithData} from '../../pages/dashboard/update/update'
import { useNavigate } from 'react-router-dom';
import { App } from '../../../route/api-helpers'

const Sidebar = ({ active }) => {
  const navigate = useNavigate()
  const [deleteProfileClicked, setDeleteProfileClicked] = useState(false);
  const [editProfileClicked, setEditProfileClicked] = useState(false);
  
  const closeSidebar = () => {
    active(false)
  };
   const handleDelete = async () => {
    await App.deactivateAccount();
    setDeleteProfileClicked(false);
    localStorage.removeItem('token');
    navigate('/')
  };

  const handleEdit = () => {
    setEditProfileClicked(true)
  };

  const handleSearch = () => {
   navigate('/pesquisa')
  };
  const handleSair = () => {
    navigate('/login')
  };

  const ListaChat = () => {
    navigate('/lista-chats')
   };
   const ListaPaciente = () => {
    navigate('/todos-pacientes')
   };
   const CadastrarPaciente = () => {
    navigate('/cadastro-paciente')
   };
   const Dashboard = () => {
    navigate('/dashboard')
   };


  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />  
      <Content>
        <SidebarItem Icon={FaRocketchat} Text="Dashboard" onClick={Dashboard} />
        <SidebarItem Icon={FiSearch} Text="Buscar Pacientes" onClick={handleSearch} />
        <SidebarItem Icon={FaRocketchat} Text="Chats" onClick={ListaChat} />
        <SidebarItem Icon={FiUsers} Text="Cadastrar Paciente" onClick={CadastrarPaciente} />
        <SidebarItem Icon={FiUsers} Text="Todos Pacientes" onClick={ListaPaciente} />
        <SidebarItem Icon={FiRefreshCw} Text="Editar Perfil" onClick={handleEdit}   />
        <SidebarItem Icon={FaUserAlt} Text="Deletar" onClick={() => setDeleteProfileClicked(true)}/>
        <SidebarItem Icon={FiLogOut} Text="Sair" onClick={handleSair} />
      </Content>,
      {editProfileClicked && (
        <Modal show={true} handleClose={() => setEditProfileClicked(false)}>
          <CardWithData/>
        </Modal>
      )} 
      {deleteProfileClicked && (
        <Modal show={true} handleClose={() => setDeleteProfileClicked(false)}>
          <p>Tem certeza que deseja deletar seu perfil?</p>
          <button onClick={handleDelete}>Sim</button>
          <button onClick={() => setDeleteProfileClicked(false)}>Não</button>
        </Modal>
      )}

    </Container>
   
  )
}

export default Sidebar
