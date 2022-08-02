import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { useState } from "react";
import { Space, Table, Button  } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import 'antd/dist/antd.css';
import React from 'react';



const client = new ApolloClient({
  uri:"https://api.spacex.land/graphql/",
  cache: new InMemoryCache()
});

const VocabList = ({ text = "" }) => {
  const vocabs = gql`
    query VocabsQuery {
        missions {
          name
          manufacturers
          wikipedia
        }
      }
  `;

  const { loading, error, data } = useQuery(vocabs);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  console.log("babyQ",data)

  const arraypushdata : DataType[]  = [];

  interface DataType {
    manufacturers:Array<string> ;
    name: string;
    wikipedia: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Manufacturers',
      dataIndex: 'manufacturers',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Wikipedia',
      dataIndex: 'wikipedia',
    },
  ];
  // notice the parentheses, to avoid confusion with a block scope
  data.missions.map(val => 
    arraypushdata.push ({
    manufacturers : val.manufacturers,
    name: val.name,
    wikipedia : val.wikipedia
  } as DataType)
  );


console.log(arraypushdata,"arraypushdata");

  return (
    <div>
    <Table columns={columns} dataSource={arraypushdata} size="middle" />
    <Button type="link">Link Button</Button>

    </div>
  );
};

const App: React.FC = () => {
  const [text, setText] = useState("");

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h2>ตัวอย่างโปรแกรม React เรียกใช้งาน GraphQL</h2>
        <VocabList text={text} />
      </div>
    </ApolloProvider>
  );
};

export default App;
