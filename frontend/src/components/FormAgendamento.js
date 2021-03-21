import { Form, Input, Button, Select,DatePicker } from 'antd';
import "../pages/assets/Form.css"
import axios from 'axios';
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
const { Item }= Form
const { Option } = Select;
const baseUrl = 'http://localhost:3333/scheduling'


const FormAgendamento = () => {
const history = useHistory();
const [data, setData] = useState([]);
const [agendamento, setAgendamento] = useState({
  id: '',
  name: '',
  plate: '',
  service_type: '',
  date_time: '',
  description: '',
  status: 'Em andamento'
})
const handleChange=e=>{
  const {name, value}=e.target;
  setAgendamento({...agendamento,
  [name]:value});
  console.log(agendamento)
}

const dataPost=async()=>{
  delete agendamento.id;
  await axios.post(baseUrl,agendamento)
  .then(response=>{
    setData(data.concat(response.data));
    history.push('/adm')
  }).catch(error=>{
    console.log(error)
  })
}
  return (
    <>
    <br/>
    <div className="form fundo">
    <h1 className="title">Agendamento</h1>
    <Form shouldUpdate>
    <Item>
   <Input  name="name" placeholder="Nome" onChange={handleChange} />
 </Item>
 <Item>
 <Input name="plate" placeholder="Placa do Veiculo" onChange={handleChange} />
 </Item>
 <Item>
 <Select name="service_type" placeholder="Tipo de serviço">
          <Option onChange={handleChange} value="1">Serviço 1</Option>
          <Option value="2" >Serviço 2</Option>
          <Option value="3">Serviço 3</Option>
        </Select>
 </Item>
 <Item>
 <Input onChange={handleChange} type="datetime-local" name="date_time"/>
 </Item>
 <Item>
 <Input name="description" showCount maxLength={100} placeholder="Descrição" onChange={handleChange}/>
 </Item>
 <Button onClick={dataPost} style={{padding:'19px', display:'flex', alignItems:'center', margin:'auto'}} type="primary">Enviar</Button>
</Form>
</div>
</>
  );
};

export default FormAgendamento;