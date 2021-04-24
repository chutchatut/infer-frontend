import { EyeOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import axios from "axios";
import React from "react";
import MyTable from "../../MyTable/MyTable";

const SelectImage = (props) => {
  const data = props.images.map((image) => ({
    ...image,
    key: image.id,
    timestamp: new Date(image.timestamp),
  }));

  const columns = [
    {
      title: "Patient's HN",
      dataIndex: "patient_id",
      searchable: true,
      sortable: true,
    },
    {
      title: "Patient's name",
      dataIndex: "patient_name",
      searchable: true,
      sortable: true,
    },
    {
      title: "Patient's age",
      dataIndex: "patient_age",
      sortable: true,
    },
    {
      title: "Clinician's name",
      dataIndex: "physician_name",
      searchable: true,
      sortable: true,
    },
    {
      title: "Scan date",
      dataIndex: "timestamp",
      config: {
        render: (text) => text.toUTCString(),
      },
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
                src={`${axios.defaults.baseURL}${record.data}`}
                width="200"
              />
            }
          >
            <div style={{ marginLeft: "20px" }}>
              <a>
                <EyeOutlined />
              </a>
            </div>
          </Popover>
        ),
        width: "90px",
        fixed: "right",
      },
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    props.setSelectedImages(newSelectedRowKeys);
  };

  return (
    <>
      <MyTable
        data={data}
        config={{
          style: { height: "calc(100vh - 300px)" },
          pagination: false,
          scroll: { x: 1000, y: "calc(100vh - 300px)" },
        }}
        columns={columns}
        selectionType="checkbox"
        initSelection={props.selectedImages}
        onSelectChange={onSelectChange}
      />
      <p>
        <strong>{props.selectedImages.length}</strong> images selected
      </p>
    </>
  );
};

export default SelectImage;
