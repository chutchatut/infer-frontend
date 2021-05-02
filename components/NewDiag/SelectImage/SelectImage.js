import { EyeOutlined } from "@ant-design/icons";
import { Image } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import MyTable from "../../MyTable/MyTable";

const SelectImage = (props) => {
  const data = props.images.map((image) => ({
    ...image,
    key: image.id,
    timestamp: new Date(image.timestamp),
  }));

  const task_type = useSelector((state) =>
    state.project.currentProject.task.toLowerCase()
  );

  const [previewImg, setPreviewImg] = useState("");

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
      dataIndex: "content_date",
      sortable: true,
    },
  ].concat(
    task_type.indexOf("2d") !== -1
      ? [
          {
            title: "Preview",
            key: "preview",
            config: {
              render: (text, record) => (
                // <Popover
                //   placement="left"
                //   content={
                //     <img
                //       src={`${axios.defaults.baseURL}${record.data}`}
                //       width="200"
                //     />
                //   }
                // >
                <div style={{ marginLeft: "20px" }}>
                  <a>
                    <EyeOutlined
                      onClick={setPreviewImg.bind(
                        this,
                        `${axios.defaults.baseURL}${record.data}`
                      )}
                    />
                  </a>
                </div>
                // </Popover>
              ),
              width: "90px",
              fixed: "right",
            },
          },
        ]
      : []
  );

  console.log(columns);

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
      {previewImg && (
        <Image
          preview={{
            onVisibleChange: (visible, prevVisible) => {
              if (!visible) {
                setPreviewImg("");
              }
            },
            src: previewImg,
            visible: previewImg,
            mask: false,
          }}
        />
      )}
    </>
  );
};

export default SelectImage;
