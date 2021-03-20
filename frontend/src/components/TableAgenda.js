import { Table, Tag, Space} from 'antd';
import "../pages/assets/Table.css"
const columns = [
  {},
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Placa',
    dataIndex: 'plate',
    key: 'plate',
  },
  {
    title: 'Tipo de Atendimento',
    dataIndex: 'type-service',
    key: 'type-service',
  },
  {
    title: 'Data e Hora',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Status',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
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
function TableAgenda(){
  return(
 
    <>
    <section>
      <h1 className="centralizar">Agendamentos</h1>
      <Table columns={columns} dataSource={data} />
      </section>
   </>
  )
}

export default TableAgenda