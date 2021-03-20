import { Form, Input, Button, Select,DatePicker } from 'antd';
import "../pages/assets/Form.css"
import axios from 'axios';
import { useState, useEffect } from 'react'
const { Item }= Form
const { Option } = Select;
const baseUrl = 'http://localhost:3333/scheduling'
const config = {
  rules: [
    {
      type: 'object',
      required: true,
      message: 'Please select time!',
    },
  ],
};

const FormAgendamento = () => {
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
  }).catch(error=>{
    console.log(error)
  })
}


  return (
    <>
    <br/>
    <div className="form fundo">
    <h1 className="title">Agendamento</h1>
    <Form>
    <Item>
   <Input  name="name" placeholder="Nome" onChange={handleChange} />
 </Item>
 <Item>
 <Input name="plate" placeholder="Placa do Veiculo" onChange={handleChange} />
 </Item>
 <Item onChange={handleChange} >
 <Select name="service_type" placeholder="Tipo de serviço">
          <Option value="male">Serviço 1</Option>
          <Option value="female">Serviço 2</Option>
          <Option value="other">Serviço 3</Option>
        </Select>
 </Item>
 <Item>
 <DatePicker onChange={handleChange} name="date_time"{...config} showTime format="DD-MM-YYYY HH:mm" />
 </Item>
 <Item>
 <Input name="description" showCount maxLength={100} placeholder="Descrição" onChange={handleChange}/>
 </Item>
 <Button onClick={dataPost} style={{padding:'19px', display:'flex', alignItems:'center', margin:'auto'}} type="primary">Enviar</Button>
</Form>
</div>
    {/* <section>
    <Layout className="form">   
    <Form {...layout} name="nest-messages" onFinish={onFinish}  >
      <Form.Item
        name='name'
        label="Nome do Proprietario"
        rules={[
          {
            required:true
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='plate'
        label="Placa"
        rules={[
          {
            required:true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="services"
        label="Serviços"
        rules={[
          {
            required:true,
          },
        ]}
      >
        <Select
          allowClear
        >
          <Option value="male">Serviço 1</Option>
          <Option value="female">Serviço 2</Option>
          <Option value="other">Serviço 3</Option>
        </Select>
      </Form.Item>
      <Form.Item name="date-time"  label="Data e hora" {...config}>
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>
      <Form.Item name='description' label="Descrição" rules={[{required:true,}]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
    </Layout>
    </section> */}
    </>
  );
};

export default FormAgendamento;