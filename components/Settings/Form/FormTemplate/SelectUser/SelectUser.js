import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import MyTable from "../../../../MyTable/MyTable";

const columns = [
  {
    title: "Username",
    dataIndex: "username",
    searchable: true,
    sortable: true,
  },
  {
    title: "Firstname",
    dataIndex: "first_name",
    searchable: true,
    sortable: true,
  },
  {
    title: "Lastname",
    dataIndex: "last_name",
    searchable: true,
    sortable: true,
  },
];

const SelectUser = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const response = await axios.get("/api/user/");
    setUsers(response.data.map((u) => ({ key: u.username, ...u })));
  }, []);

  return (
    <MyTable
      data={users}
      columns={columns}
      config={{
        pagination: false,
        scroll: {
          y: "300px",
        },
      }}
      selectionType="checkbox"
      initSelection={props.value}
      onSelectChange={props.onChange}
    />
  );
};

export default SelectUser;
