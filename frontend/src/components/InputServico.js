import {Input, Col, Row, Button} from 'antd';

function InputServico(){
 return (
 <section>
  <h1 className="centralizar">Adicionar serviços</h1>
<div className="site-input-group-wrapper">
<Input.Group size="large">
<Row gutter={16}>
  <Col span={6}>
    <Input maxLength={48} placeholder="Nome" />
  </Col>
  <Col span={3}>
    <Input prefix="R$" placeholder="Preço" />
  </Col>
  <Col span={3}>
    <Input type="Date" placeholder="Data de Cadastro" />
  </Col>
  <Col span={8}>
    <Input showCount maxLength={100} placeholder="Descrição" />
  </Col>
  <Col>
    <Button style={{padding:'19px', display:'flex', alignItems:'center'}}  type="primary">Adicionar</Button>
  </Col>
</Row>
</Input.Group>
</div>
</section>
);
}

export default InputServico