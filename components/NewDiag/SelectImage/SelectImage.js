import { EyeOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import React, { useState } from "react";
import MyTable from "../../MyTable/MyTable";
// TODO show how many images are selected
const data = [
  {
    key: "1",
    HN: "3289563",
    patient_name: "Griselda Luczki",
    age: 123,
    predicted_class: "",
  },
  {
    key: "2",
    HN: "1234563",
    patient_name: "Santos Marrone",
    age: 456,
    predicted_class: "normal",
  },
  {
    key: "3",
    HN: "4321363",
    patient_name: "Earle Hiller",
    age: 12,
    predicted_class: "COVID-19",
  },
  {
    key: "4",
    HN: "5321363",
    age: 24,
    patient_name: "Enoch Salameh",
    predicted_class: "pnuemonia",
  },
  {
    key: "5",
    HN: "1324563",
    age: 80,
    patient_name: "Asia Defaber",
    predicted_class: "normal",
  },
];

const SelectImage = () => {
  const columns = [
    {
      title: "Patient's HN",
      dataIndex: "HN",
      searchable: true,
      sortable: true,
    },
    {
      title: "Patient's age",
      dataIndex: "age",
      sortable: true,
    },
    {
      title: "Preview",
      key: "preview",
      config: {
        render: (text, record) => (
          <Popover
            placement="left"
            content={
              <img
                src="https://www.warrenphotographic.co.uk/photography/bigs/37974-Tabby-cat-portrait-white-background.jpg"
                width="200"
              />
            }
          >
            <a>
              <EyeOutlined />
            </a>
          </Popover>
        ),
        fixed: "right",
      },
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  return (
    <>
      <MyTable
        data={data}
        config={{
          pagination: { pageSize: 50 },
          scroll: { x: 300, y: 300 },
        }}
        columns={columns}
        selectionType="checkbox"
        onSelectChange={onSelectChange}
      />
      <p>
        <strong>{selectedRowKeys.length}</strong> images selected
      </p>
    </>
  );
};

export default SelectImage;
