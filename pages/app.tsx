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

  const arraypushdata : DataType[]  = [];

  interface DataType {
    manufacturers:Array<string> ;
    name: string;
    wikipedia: string;
  }
  
  const columns: ColumnsType<DataType> = [
    {
      title: 'manufacturers',
      dataIndex: 'manufacturers',
    },
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'wikipedia',
      dataIndex: 'wikipedia',
    },
  ];

  data.missions.map((val: any) => 
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
