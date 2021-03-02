import React, { useState } from "react";
import { Button } from "antd";

import MyTable from "../../MyTable/MyTable";

const ImageAddTable = (props) => {
  const [data, setData] = useState([
    { filename: "test", key: 1 },
    { filename: "test2", key: 2 },
    { filename: "test3", key: 3 },
    { filename: "test4", key: 4 },
  ]);

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

  return (
    <>
      <MyTable
        data={data}
        config={{ pagination: { pageSize: 50 }, scroll: { x: 300, y: 300 } }}
        columns={columns}
        selectionType="checkbox"
        onSelectChange={onSelectChange}
      />
      <Button type="primary">Submit</Button>
    </>
  );
};

export default ImageAddTable;
