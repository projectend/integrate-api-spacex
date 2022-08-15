import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { useState , useContext } from "react";
import { Table , Input , Col, Row ,Select,Badge,Image ,Modal,Button,Breadcrumb, Layout, Menu } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';

import 'antd/dist/antd.css';
import React from 'react';

import {Appfunction} from "./appfunction"

// สร้าง object จาก class ApolloClient กำหนด url และ cache
const client = new ApolloClient({
  uri:"https://api.spacex.land/graphql/",
  cache: new InMemoryCache()
});
// เรียกใช้งาน function gql อ่านคำสั่ง query ข้อมูล
const VocabList = () => {
  const [datasearch,setdatasearch] = useState("");
  const [classdatanumber, setclassdatanumber] = useState(0);
  const [modalshow,setmodalshow] = useState(false);
  const [resultsearch,setresultsearch] = useState(false);
  const [modalshow2,setmodalshow2] = useState(false);
  const { Header, Content, Footer, Sider } = Layout;
  const [shipsResult,setshipsResult] = useState(0);


  const arraypushdata : DataType[]  = [];
  const arraypushdata2 : DataType2[]  = [];


  const testconnect = gql`
              query Ships($offset: Int, $limit: Int,$find: ShipsFind) {
                            ships(offset: $offset, limit: $limit,find: $find) {
                              image
                              name
                              roles
                              status
                              active
                              class
                              url
                            }
                          }
                    `;

    const shopresultconnect = gql`
                        query shipsresult{
                          shipsResult {
                                   result {
                                     totalCount
                                   }
                                 }
     }
                    `;
        

// MANU TAB
const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);






// ใช้  Hook useQuery รับการ return object ที่ประกอบไปด้วย loading, error, data)
const shipresult = useQuery(shopresultconnect,{variables: {offset:0,  limit: 5 },
  onError:(error1)=>{console.error(error1)},
  onCompleted:(result)=>{ 
    setshipsResult(result.shipsResult.result.totalCount)
  }
  }

  );
  if(shipresult.data){
   
  }
  
  var shipreturn  = useQuery(testconnect,  {
    variables: {offset:0,  limit: 5 , find:{"name":""} },
    onError:(error1)=>{console.error(error1)},

    // ใช้งานแล้วไม่แสดงผล
    onCompleted:(result)=>{
                      result.ships.map((val:DataType) => 
                          {arraypushdata.push ({
                            image : val.image,
                            name: val.name,
                            roles: val.roles,
                            status: val.status,
                            active: val.active,
                            class: val.class,
                            url : val.url
                        } )
                        console.log(val,"dd");
                        }
          );
    }
  });
  if(shipreturn.data){
    shipreturn.data.ships.map((val:DataType) => 
          {arraypushdata.push ({
            image : val.image,
            name: val.name,
            roles: val.roles,
            status: val.status,
            active: val.active,
            class: val.class,
            url : val.url
        } )
        console.log(val,"dd");
  }
);
  }
  if (shipreturn.loading) return <p>Loading...</p>;
  if (shipreturn.error) return <p>Error :</p>;


  

//สร้าง arraypushdata สำหรับรองรับ data ที่ return จาก useQuery


  interface DataType {
    image: string;
    name: string;
    roles: Array<string>;
    status: string;
    active: boolean;
    class: number;
    url: string;
  }

  interface DataType2 {
    image: string;
    name: string;
    roles: Array<string>;
  }
  
  
// วางรูปแบบ columns ตาม Antd
  const columns: ColumnsType<DataType> = [
    {
      title: 'image',
      dataIndex: 'image',
      render: (text,record) => (
        <span>
          {<Image width={200} src={record.image} /> }
        </span>
      ),
      
    },
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'roles',
      dataIndex: 'roles',
    },
    {
      title: 'status',
      dataIndex: 'status',
     
    },
    {
      title: 'active',
      dataIndex: 'active',
      render: (text,record) => (
        <span>
          {record.active == true 
          ?<Badge status="success" />
          :<Badge status="error" />
          }
        </span>
      ),
    },
    {
      title: 'class',
      dataIndex: 'class',
      render: (text,record) => (
        <span>
          {record.class != null &&
         <Button type="primary" onClick={()=>showModal(record.class)}>
           Open Modal
         </Button>
          }
        </span>
      ),
     
    },
    {
      title: 'url',
      dataIndex: 'url',
      // เปลี่ยนให้เป็นรูปแบบ link
      render:(text, record) => <a href={'https://en.wikipedia.org/wiki/' + record.name}>{text}</a>
    },
  ];

  const columns2: ColumnsType<DataType2> = [
    {
      title: 'image',
      dataIndex: 'image',
      render: (text,record) => (
        <span>
          {<Image width={200} src={record.image} /> }
        </span>
      ),
      
    },
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'roles',
      dataIndex: 'roles',
    }];

  // เรียกใช้ function map โดยให้ให้วิ่งตามข้อมูลใน missions ใส่ Object ไปใน arraypushdata



  
  


// modal test 1


const showModal = (classdata : number) => {
  setclassdatanumber(classdata);
  setmodalshow(true);
}

const  handleOk = (e: any) => {
  console.log(e);
  setmodalshow(false);
};

const handleCancel = (e: any) => {
  console.log(e);
  setmodalshow(false);
};

const showModal2 = (namedata:string) => {
  shipreturn.data.ships.map((value:DataType)=>{
    if(value.name == namedata){
      arraypushdata2.push({
        image : value.image,
        name: value.name,
        roles: value.roles
      });
      console.log(value,"ddd");
    }
  })
  setmodalshow2(true);
}

const  handleOk2 = (e: any) => {
  console.log(e);
  setmodalshow2(false);
};

const handleCancel2 = (e: any) => {
  console.log(e);
  setmodalshow2(false);
};

// Option Select

const { Option } = Select;

const onChange = (value: string) => {
  console.log(`Appfunctio111n`, Appfunction(2));
  console.log(`selected ${value}`);
  // setdatasearch(value);
};

const onChange2 = (value: number) => {
  let offsetdata:number;
  offsetdata=(value-1)*5;

  shipreturn.refetch({ offset:offsetdata,  limit:5})

  // setdatasearch(value);
};

let timer: any;
  const debounce = (func:Function, timeout: number) => {
      if(timer){
          clearTimeout(timer);
          timer = undefined;
      }
      timer = setTimeout( func , timeout);
  }

  const onSearch = async(value: string) => {
    const refetch_test = () => {
      shipreturn.refetch({ offset:0,  limit:4 , find:{"name":value}})
    };
    debounce(refetch_test,2000)
  };

  const selectdata = <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        >
                        { shipreturn.data?.ships?.map((item:any,index:number)=>
                          <Option key={"test"} value={"7"}>{item.name}</Option>
                        )}
                      </Select>;

  return (
    <div>
    
    <Layout id="widthhendres">
    <Header className="header" style={{width: 'auto'}}  id="widthhendres">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
      <Row>
          <Col span={3}>  
          
       </Col>
       <Col span={1}> </Col>
          <Col span={5}> {selectdata} </Col>
          <Col span={5}> <Input  value={datasearch} /> </Col>
          <Col span={1}> </Col>
          <Col span={4}><Button type="primary" onClick={()=>showModal2(datasearch)}> tets</Button> </Col>

      </Row>
    
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
            items={items2}
          />
        </Sider>
        <Content style={{ padding: '0 24px' }}>
              {/* รูปแบบตาม Antd */}
             
              <Table columns={columns} dataSource={arraypushdata}  pagination={{ defaultCurrent:1 ,defaultPageSize: 10 , total:shipsResult , onChange:(e)=>{onChange2(e)} }} size="small" id="widthhendres" />
        
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Footer</Footer>
  </Layout>

 
 
    <Row>
      <Col span={10}>  <Input placeholder="Basic usage" /> </Col>
      <Col span={2}> </Col>
      <Col span={10}> <Input placeholder="Hungry" /> </Col>
    </Row>
    <Row>
      <Col>
        
          <Modal title="Basic Modal" visible={modalshow} onOk={handleOk}  onCancel={handleCancel}>
          <p>{classdatanumber }</p>
          </Modal>

          <Modal style={{width:"800"}} title="Basic Modal" visible={modalshow2} onOk={handleOk2}  onCancel={handleCancel2}>
             
              <Table columns={columns2} dataSource={arraypushdata2} size="middle" />

          </Modal>

      </Col>

    </Row>
   
    </div>
  );
};

const App: React.FC = () => {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h2>ตัวอย่างโปรแกรม React เรียกใช้งาน GraphQL</h2>
        <VocabList />
      </div>
    </ApolloProvider>
  );
};

export default App;
