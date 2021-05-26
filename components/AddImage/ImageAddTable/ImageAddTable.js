import React, { useState, useEffect } from "react";
import { Button, message, Select, Space } from "antd";

import MyTable from "../../MyTable/MyTable";
import axios from "axios";
import { useSelector } from "react-redux";

const columns = [
  {
    title: "Filename",
    dataIndex: "filename",
    sortable: true,
    searchable: true,
  },
];

const ImageAddTable = (props) => {
  const [data, setData] = useState([]);
  const project = useSelector((state) => state.project.currentProject);
  const [folderNames, setFolderNames] = useState([]);
  const [selectedFolderName, setSelectedFoldername] = useState(null);

  const reload = async () => {
    {
      const response = await axios.get("/api/util/list_local_dir/");
      setFolderNames(response.data.dir_name);
    }
    if (!selectedFolderName) return;
    {
      const response = await axios.get(
        `/api/util/list_local_files?directory=${selectedFolderName}`
      );
      setData(response.data.files_name.map((s) => ({ filename: s, key: s })));
    }
  };

  const [oldInterval, setOldInterval] = useState(null);
  useEffect(() => {
    reload();
    if (oldInterval) clearInterval(oldInterval);
    setOldInterval(setInterval(reload.bind(this), 5000));
    return () => clearInterval(oldInterval);
  }, [selectedFolderName]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const [loading, setLoading] = useState(false);
  const submit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/project/${project.id}/upload_local/`,
        {
          files_name: selectedRowKeys,
          directory: selectedFolderName,
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
      props.setDataOnModal(uploadStatus);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message)
        message.error(err.response.data.message);
      else message.error("Cannot upload");
    }
    setLoading(false);
  };

  return (
    <Space direction="vertical" size="large">
      <Select
        style={{ width: 300 }}
        onChange={(e) => {
          setSelectedFoldername(e);
          setSelectedRowKeys([]);
          setData([]);
        }}
      >
        {folderNames.map((folderName) => (
          <Select.Option key={folderName}>{folderName}</Select.Option>
        ))}
      </Select>
      <MyTable
        value={selectedRowKeys}
        data={data}
        config={{
          pagination: { pageSize: 50 },
          scroll: { y: "calc(100vh - 440px)" },
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
    </Space>
  );
};

export default ImageAddTable;
