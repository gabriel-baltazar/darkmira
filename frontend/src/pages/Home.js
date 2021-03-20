import { Layout} from 'antd';  
import './assets/Home.css';

const { Content, Footer } = Layout;

function Home (){
  return(
  <Layout className="layout">
  <Content style={{ padding: '0' }}>
    <div className="site-layout-content">
      <h1 style={{alignItems:'Center', textAlign:'center'}}>Home</h1>
    </div>
  </Content>
  <Footer style={{ textAlign: 'center',bottom: 0,
        position: 'fixed', width:'100%'}}>Gabriel Baltazar ©2021</Footer>
</Layout>);
}

export default Home


