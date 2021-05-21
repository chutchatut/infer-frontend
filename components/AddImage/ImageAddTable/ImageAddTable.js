import React, { useState, useEffect } from "react";
import { Button, message } from "antd";

import MyTable from "../../MyTable/MyTable";
import axios from "axios";

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
  const submit = async () => {
    setLoading(true);
    try {
      const response = axios.post(`/api/project/${project.id}/upload_local/`, {
        files_name: selectedRowKeys,
      });
    } catch (err) {
      if (err.response && err.response.status === 400)
        message.error(err.response.message);
      message.error("Cannot upload");
    }
    setLoading(false);
  };

  return (
    <>
      <MyTable
        data={data}
        config={{ pagination: { pageSize: 50 }, scroll: { x: 300, y: 300 } }}
        columns={columns}
        selectionType="checkbox"
        onSelectChange={onSelectChange}
      />
      <Button type="primary" onClick={submit.bind(this)} loading={loading}>
        Submit
      </Button>
    </>
  );
};

export default ImageAddTable;
