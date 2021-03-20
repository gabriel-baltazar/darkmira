import { Layout, Menu} from 'antd';
import '../pages/assets/Home.css';
import { Link } from 'react-router-dom';
const { Header } = Layout;


function Nav(){
  return(
  <Layout className="layout">
  <Header>
    <div className="logo" />
    <Menu theme="dark" mode="horizontal">
      
        <Menu.Item key="1"> <Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="2"> <Link to="/agendamento">Agendar serviço</Link></Menu.Item>
        <Menu.Item key="3"> <Link to="/adm">Administração</Link></Menu.Item>
       
        
    </Menu>
  </Header>
  </Layout>
  );
  
}
export default Nav