import { useState } from "react";
import type { MenuProps } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Table , Input , Col, Row ,Select,Badge,Image ,Modal,Button,Breadcrumb, Layout, Menu } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import {DataType,DataType2} from "./apptype"
import {Appfunction} from "./appfunction"


export const { Header, Content, Footer, Sider } = Layout;

export const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
        key,
        label: `nav ${key}`,
      }));

export const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
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

export const columns: ColumnsType<DataType> = [
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
         <Button type="primary" onClick={()=>Appfunction.showModal(record.class)}>
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

export const columns2: ColumnsType<DataType2> = [
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