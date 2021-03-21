import { Table, Button, Modal, Form, Input} from 'antd';
import "../pages/assets/Table.css"
import { useEffect, useState } from 'react'
import axios from 'axios';
const baseUrl = 'http://localhost:3333/scheduling';
const {Item}= Form;


const TableAgenda = () =>{
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
      title: 'Placa',
      dataIndex: 'plate',
      key: 'plate',
    },
    {
      title: 'Tipo de Atendimento',
      dataIndex: 'service_type',
      key: 'service-type',
    },
  
    {
      title: 'Data e Hora',
      dataIndex: 'date_time',
      key: 'date_time',
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
        <Button type="primary" onClick={()=>selecionarAgenda(fila, "Editar")}>Editar</Button>{" "}
        <Button type="primary" danger onClick={()=>selecionarAgenda(fila,"Deletar")}>
          Deletar
        </Button>
        
        </>
      ),
    },
  ];
  const dataGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data)
    }).catch(error=>{
      console.log(error);
    })
  }
  useEffect(()=>{
    dataGet();
  },[])
  const [modalEditar,setmodalEditar]= useState(false);
  const [modalDeletar,setmodalDeletar]= useState(false);
  const [agenda, setAgenda] = useState({
    id: '',
    name:'',
    plate:'',
    service_type:'',
    date_time:'',
    description:'',
    status:'',
    })
  const openModalEditar = () => {
    setmodalEditar(!modalEditar);
  }
  const openModalDeletar = () => {
    setmodalDeletar(!modalDeletar);
  }
  const handleChange=e=>{
    const {name, value}=e.target;
    setAgenda({...agenda,
    [name]:value});
    console.log(agenda)
  }
  const selecionarAgenda=(agenda, caso) =>{
    setAgenda(agenda);
    (caso === "Editar")?openModalEditar():openModalDeletar()
  }
  
  const dataPut=async()=>{
    await axios.put(baseUrl+"/"+agenda.id,agenda)
    .then(response=>{
      var dataAuxiliar=data;
      dataAuxiliar.map(elemento=>{
      if(elemento.id === agenda.id){
      elemento.name=agenda.name;
      elemento.plate=agenda.plate;
      elemento.service_type=agenda.service_type;
      elemento.date_time=agenda.date_time;
      elemento.description=agenda.date_time;
      }
      })
      setData(dataAuxiliar)
      openModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }
  const dataDelete=async()=>{
    await axios.delete(baseUrl+"/"+agenda.id)
    .then(response=>{
      setData(data.filter(elemento=>elemento.id!==agenda.id))
      openModalDeletar();
    }).catch(error=>{
      console.log(error);
    })
  }
  return(
    <>
      <div>
      <h1 className="centralizar">Serviços agendados</h1>
      
        <Table columns={columns} pagination={{position:['bottomCenter']}}dataSource={data} />
        <Modal
visible={modalEditar}
title="Editar Agenda"
onCancel={openModalEditar}
centered
footer={[
 <Button onClick={openModalEditar}>Cancelar </Button>,
 <Button type="primary" onClick={dataPut}>Editar</Button>
]}
>
<Form>
 <Item>
   <Input name="name" placeholder="Nome" onChange={handleChange} value={agenda && agenda.name}/>
 </Item>
 <Item>
 <Input name="plate" placeholder="Placa" onChange={handleChange} value={agenda && agenda.plate} />
 </Item>
 <Item>
 <Input name="service_type" placeholder="Tipo de serviço" onChange={handleChange} value={agenda && agenda.service_type} />
 </Item>
 <Item>
 <Input name="date_time" type="datetime-local" placeholder="Data de Cadastro" onChange={handleChange} value={agenda && agenda.date_time} />
 </Item>
 <Item>
 <Input name="description" showCount maxLength={100} placeholder="Descrição" onChange={handleChange} value={agenda && agenda.description} />
 </Item>
</Form>
</Modal>
<Modal
visible={modalDeletar}
title="Deletar Horario agendado"
onCancel={openModalDeletar}
centered
footer={[
 <Button onClick={openModalDeletar}>Não</Button>,
 <Button type="primary" danger onClick={dataDelete}>Sim</Button>
]}
>
Deseja realmente deletar o horario de <b>{agenda&&agenda.name}</b>?
</Modal>
        </div>
   </>
  )
}
export default TableAgenda