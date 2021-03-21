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
        <Button type="primary" onClick={()=>selecionarService(fila, "Editar")}>Editar</Button>{" "}
        <Button type="primary" danger onClick={()=>selecionarService(fila,"Deletar")}>
          Deletar
        </Button>
        
        </>
      ),
    },
  ];
  
  const [modalService,setmodalService]= useState(false);
  const [modalEditar,setmodalEditar]= useState(false);
  const [modalDeletar,setmodalDeletar]= useState(false);
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
  const openModalEditar = () => {
    setmodalEditar(!modalEditar);
  }
  const openModalDeletar = () => {
    setmodalDeletar(!modalDeletar);
  }
  const handleChange=e=>{
    const {name, value}=e.target;
    setService({...services,
    [name]:value});
    console.log(services)
  }
  const selecionarService=(services, caso) =>{
  setService(services);
  (caso === "Editar")?openModalEditar():openModalDeletar()
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
  const dataPut=async()=>{
    await axios.put(baseUrl+"/"+services.id,services)
    .then(response=>{
      var dataAuxiliar=data;
      dataAuxiliar.map(elemento=>{
      if(elemento.id === services.id){
      elemento.name=services.name;
      elemento.price=services.price;
      elemento.date_register=services.date_register;
      elemento.description=services.description;
      }
      })
      setData(dataAuxiliar)
      openModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }
  const dataDelete=async()=>{
    await axios.delete(baseUrl+"/"+services.id)
    .then(response=>{
      setData(data.filter(elemento=>elemento.id!==services.id))
      openModalDeletar();
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
<Modal
visible={modalEditar}
title="Editar Serviço"
onCancel={openModalEditar}
centered
footer={[
 <Button onClick={openModalEditar}>Cancelar </Button>,
 <Button type="primary" onClick={dataPut}>Editar</Button>
]}
>
<Form>
 <Item>
   <Input name="name" placeholder="Nome" onChange={handleChange} value={services && services.name}/>
 </Item>
 <Item>
 <Input name="price" prefix="R$" placeholder="Preço" onChange={handleChange} value={services && services.price} />
 </Item>
 <Item>
 <Input name="date_register" type="Date" placeholder="Data de Cadastro" onChange={handleChange} value={services && services.date_register} />
 </Item>
 <Item>
 <Input name="description" showCount maxLength={100} placeholder="Descrição" onChange={handleChange} value={services && services.description} />
 </Item>
</Form>
</Modal>
<Modal
visible={modalDeletar}
title="Deletar Serviço"
onCancel={openModalDeletar}
centered
footer={[
 <Button onClick={openModalDeletar}>Não</Button>,
 <Button type="primary" danger onClick={dataDelete}>Sim</Button>
]}
>
Deseja realmente deletar o serviço de <b>{services&&services.name}</b>?
</Modal>
</div>
      <h1 className="centralizar">Serviços</h1>
      <Table columns={columns} pagination={{position:['bottomCenter']}} dataSource={data} />
      </div>
  
  </>
  )
}

export default TableServicos