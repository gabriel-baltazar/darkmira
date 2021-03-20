import { Form, Input, Button, Select,DatePicker } from 'antd';
import "../pages/assets/Form.css"
import { Layout} from 'antd'; 

const { Option } = Select;
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};

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
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <>
    <h1 className="title">Agendamento</h1>
    <section>
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
    </section>
    </>
  );
};

export default FormAgendamento;