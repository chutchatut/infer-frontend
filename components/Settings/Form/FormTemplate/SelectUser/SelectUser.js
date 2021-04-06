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
  return (
    <MyTable
      data={props.users}
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
