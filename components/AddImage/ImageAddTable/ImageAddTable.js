import React, { useState, useEffect } from "react";
import { Button, message } from "antd";

import MyTable from "../../MyTable/MyTable";
import axios from "axios";
import { useSelector } from "react-redux";
import Modal from "antd/lib/modal/Modal";

const ImageAddTable = (props) => {
  const [data, setData] = useState([]);
  const project = useSelector((state) => state.project.currentProject);

  const reload = async () => {
    const response = await axios.get("/api/util/list_local");
    setData(response.data.files_name.map((s) => ({ filename: s, key: s })));
  };

  const [oldInterval, setOldInterval] = useState(null);
  useEffect(() => {
    reload();
    if (oldInterval) clearInterval(oldInterval);
    setOldInterval(setInterval(reload.bind(this), 5000));
    return () => clearInterval(oldInterval);
  }, []);

  const columns = [
    {
      title: "Filename",
      dataIndex: "filename",
      sortable: true,
      searchable: true,
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    console.log(newSelectedRowKeys);
  };

  const [loading, setLoading] = useState(false);
  const [dataOnModal, setDataOnModal] = useState(null);
  const submit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/project/${project.id}/upload_local/`,
        {
          files_name: selectedRowKeys,
        }
      );
      message.success(response.data.message);
      const uploadStatus = response.data.uploaded
        .map((s) => ({
          filename: s,
          key: s,
          status: "Success",
        }))
        .concat(
          response.data.duplicated.map((s) => ({
            filename: s,
            key: s,
            status: "Already exists",
          }))
        );
      setDataOnModal(uploadStatus);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message)
        message.error(err.response.data.message);
      else message.error("Cannot upload");
    }
    setLoading(false);
  };

  return (
    <>
      <MyTable
        data={data}
        config={{
          pagination: { pageSize: 50 },
          scroll: { x: 1000, y: "calc(100vh - 360px)" },
        }}
        columns={columns}
        selectionType="checkbox"
        onSelectChange={onSelectChange}
      />
      <Button
        type="primary"
        onClick={submit.bind(this)}
        loading={loading}
        disabled={selectedRowKeys.length < 1}
      >
        Submit
      </Button>
      <Modal
        title="Upload Status"
        onCancel={setDataOnModal.bind(this, null)}
        visible={dataOnModal}
        footer={null}
      >
        <MyTable
          data={dataOnModal}
          config={{ pagination: { pageSize: 50 }, scroll: { x: 300, y: 300 } }}
          columns={columns.concat({
            title: "Status",
            dataIndex: "status",
            sortable: true,
          })}
        />
      </Modal>
    </>
  );
};

export default ImageAddTable;
