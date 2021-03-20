import { Table, Tag, Space} from 'antd';
import "../pages/assets/Table.css"
const columns = [
  {},{},{},
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Preço',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Data de Cadastro',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Descrição',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
function TableServicos(){
  return(
 
    <>
    <section>
      <h1 className="centralizar">Serviços</h1>
      <Table columns={columns} dataSource={data} />
      </section>
  
  </>
  )
}

export default TableServicos