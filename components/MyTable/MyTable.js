import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { Table, Space, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const sortableConfig = (fieldName) => {
  return {
    sorter: (a, b) => {
      if (typeof a[fieldName] === "string")
        return a[fieldName].localeCompare(b[fieldName]);
      if (typeof a[fieldName] === "number") return a[fieldName] - b[fieldName];
      if (typeof a[fieldName] === "boolean") return a[fieldName] - b[fieldName];
      if (a[fieldName] instanceof Date) return a[fieldName] - b[fieldName];
    },
    sortDirections: ["descend", "ascend"],
  };
};

const { Column } = Table;

const MyTable = (props) => {
  // Use to highlight the input
  let searchRef = {};

  // Use to highlight search matches
  const [searchTexts, setSearchTexts] = useState({});
  const setSearchTextsWField = (fieldName, value) => {
    const newSearchTexts = { ...searchTexts };
    newSearchTexts[fieldName] = value;
    setSearchTexts(newSearchTexts);
  };

  const searchableConfig = (fieldName) => {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={(ref) => (searchRef[fieldName] = ref)}
            value={selectedKeys}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => {
              confirm();
              setSearchTextsWField(fieldName, selectedKeys[0]);
            }}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => {
                confirm();
                setSearchTextsWField(fieldName, selectedKeys[0]);
              }}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
                setSearchTextsWField(fieldName, "");
              }}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record[fieldName]
          ? record[fieldName]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : "",
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchRef[fieldName].select(), 100);
        }
      },
      render: (text) => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchTexts[fieldName]]}
          autoEscape
          textToHighlight={text ? text : ""}
        />
      ),
    };
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState(
    props.initSelection ? props.initSelection : []
  );

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    if (props.onSelectChange) props.onSelectChange(newSelectedRowKeys);
  };

  useEffect(() => {
    if (props.value || Array.isArray(props.value)) onSelectChange(props.value);
  }, [JSON.stringify(props.value)]);

  return (
    <Table
      {...props.config}
      dataSource={props.data}
      rowSelection={
        props.selectionType
          ? {
              selectedRowKeys,
              onChange: onSelectChange,
              type: props.selectionType,
              getCheckboxProps: (record) => ({
                disabled: props.disableRowSelection,
              }),
            }
          : null
      }
    >
      {props.columns.map((column) => (
        <Column
          title={column.title}
          dataIndex={column.dataIndex}
          key={column.key ? column.key : column.dataIndex}
          {...column.config}
          {...(column.sortable && sortableConfig(column.dataIndex))}
          {...(column.searchable && searchableConfig(column.dataIndex))}
        />
      ))}
    </Table>
  );
};

export default MyTable;
