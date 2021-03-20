import { Table, Space, Button, Mocal} from 'antd';
import "../pages/assets/Table.css"
import { useEffect, useState } from 'react'
import axios from 'axios';
const baseUrl = 'http://localhost:3333/scheduling';



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
        <Button type="primary">Editar</Button>{" "}
        <Button type="primary" danger>
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
  
  return(
    <>
      <div>
      <h1 className="centralizar">Serviços agendados</h1>
      
        <Table columns={columns} pagination={{position:['bottomCenter']}}dataSource={data} />/
        </div>
   </>
  )
}
export default TableAgenda