import { Table, Button, Modal, Form, Input} from 'antd';
import "../pages/assets/Table.css"
import axios from 'axios';
import { useEffect, useState } from 'react'
import "../pages/assets/servico.css";
const baseUrl = 'http://localhost:3333/services';
const {Item}= Form;

const TableServicos = () =>{
  const [data, setData] = useState([]);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Data de registro',
      dataIndex: 'date_register',
      key: 'date_register',
    },
  
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Ação',
      key: 'action',
      render: (fila) => (
        <> 
        <Button type="primary">Editar</Button>{" "}
        <Button type="primary" danger>
          Deletar
        </Button>
        
        </>
      ),
    },
  ];
  
  const [modalService,setmodalService]= useState(false);
  const [services, setService] = useState({
  id: '',
  name:'',
  price:'',
  date_register:'',
  description:'',
  })
  const openModalServico = () => {
    setmodalService(!modalService);
  }
  const handleChange=e=>{
    const {name, value}=e.target;
    setService({...services,
    [name]:value});
    console.log(services)
  }
  const dataGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data)
    }).catch(error=>{
      console.log(error);
    })
  }
  const dataPost=async()=>{
    delete services.id;
    await axios.post(baseUrl,services)
    .then(response=>{
      setData(data.concat(response.data));
      openModalServico();
    }).catch(error=>{
      console.log(error);
    })
  }
  useEffect(()=>{
    dataGet();
  },[])
  return(
 
    <>
    <div>
      <br/>
    <div><Button style={{padding:'19px', display:'flex', alignItems:'center', margin:'auto'}} onClick={openModalServico}  type="primary">Adicionar serviços</Button>

<Modal
visible={modalService}
title="Inserir Serviço"
destroyOnClose={true}
onCancel={openModalServico}
centered
footer={[
 <Button onClick={openModalServico}>Cancelar </Button>,
 <Button type="primary" onClick={dataPost}>Adicionar</Button>
]}
>
<Form>
 <Item>
   <Input name="name" placeholder="Nome" onChange={handleChange} />
 </Item>
 <Item>
 <Input name="price" prefix="R$" placeholder="Preço" onChange={handleChange} />
 </Item>
 <Item>
 <Input name="date_register" type="Date" placeholder="Data de Cadastro" onChange={handleChange} />
 </Item>
 <Item>
 <Input name="description" showCount maxLength={100} placeholder="Descrição" onChange={handleChange} />
 </Item>
 
 
</Form>
</Modal>
</div>
      <h1 className="centralizar">Serviços</h1>
      <Table columns={columns} pagination={{position:['bottomCenter']}} dataSource={data} />
      </div>
  
  </>
  )
}

export default TableServicos