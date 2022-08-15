import { useState } from "react";
import {DataType,DataType2} from "./apptype"
import {ApolloClient,InMemoryCache, ApolloProvider,useQuery, gql} from "@apollo/client";
import {shipresultconnect,testconnect} from "./appquery"

export const Appfunction = (val:number):any =>{

  const [datasearch,setdatasearch] = useState(10);
//   const [classdatanumber, setclassdatanumber] = useState(0);
//   const [modalshow,setmodalshow] = useState(false);
//   const [modalshow2,setmodalshow2] = useState(false);
//   const [shipsResult,setshipsResult] = useState(0);

//   const arraypushdata : DataType[]  = [];
//   const arraypushdata2 : DataType2[]  = [];

//   const shipresult = useQuery(shipresultconnect,{
//     variables: {offset:0,  limit: 5 },
//     onError:(error1)=>{console.error(error1)},
//     onCompleted:(result)=>{ 
//       setshipsResult(result.shipsResult.result.totalCount)
//     }});

//   const shipreturn  = useQuery(testconnect,  {
//         variables: {offset:0,  limit: 5 },
//         onError:(error1)=>{console.error(error1)},
//         onCompleted:(result)=>{result.ships.map((val:DataType) => 
//                               {arraypushdata.push ({
//                                 image : val.image,
//                                 name: val.name,
//                                 roles: val.roles,
//                                 status: val.status,
//                                 active: val.active,
//                                 class: val.class,
//                                 url : val.url
//                                     } )
//                               }
//                          );
//                      }
//       });

//   const showModal = (classdata : number) => {
//     setclassdatanumber(classdata);
//     setmodalshow(true);
//   }
  
//   const  handleOk = (e: any) => {
//     console.log(e);
//     setmodalshow(false);
//   };
  
//   const handleCancel = (e: any) => {
//     console.log(e);
//     setmodalshow(false);
//   };

  return(datasearch);
}

 