import { Button, Select, Space, Image } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Fragment, useState } from "react";
import MyTable from "../MyTable/MyTable";
import styles from "./ClassificationViewer.module.css";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const columns = [
  { title: "Name", dataIndex: "name" },
  {
    title: "Confidence",
    dataIndex: "confidence",
    sortable: true,
    config: {
      defaultSortOrder: "descend",
    },
  },
];
// TODO get image's project and check if it's equal
const ClassificationViewer = (props) => {
  const [editable, setEditable] = useState(props.edit);

  const [selectedRowKeys, setSelectedRowKeys] = useState([2]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log(
      `SelectedRowKeys changed: ${newSelectedRowKeys.map(
        (key) => props.data.find((d) => d.key === key).name
      )}
      `
    );
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const [note, setNote] = useState("Lorem Ipsum");

  const [loading, setLoading] = useState(false);

  const mockImgSrc =
    "https://www.warrenphotographic.co.uk/photography/bigs/37974-Tabby-cat-portrait-white-background.jpg";

  // TODO load img from props.id
  return (
    <Fragment>
      <Space style={{ background: "#fff", padding: "10px" }}>
        <div className={styles.Preview}>
          <Space>
            <Image
              src={mockImgSrc}
              style={{ maxWidth: "40vw", height: "auto" }}
            />
            <Image
              src={mockImgSrc}
              style={{ maxWidth: "40vw", height: "auto" }}
            />
          </Space>
          <h2>{props.path}</h2>
        </div>
        <Space direction="vertical">
          <Space direction="vertical" size="large">
            <Select style={{ width: "240px" }} defaultOpen>
              {/* {pipelines.map((pipeline) => (
              <Select.Option>{pipeline.name}</Select.Option>
            ))} */}
              <Select.Option>COVID-19 + Pnuemonia V1</Select.Option>
            </Select>
            <MyTable
              columns={columns}
              data={props.data}
              defaultSelection={['COVID-19']}
              selectionType="checkbox"
              onSelectChange={onSelectChange}
              disableRowSelection={!editable}
            />
          </Space>
          <Space direction="vertical">
            <TextArea
              placeholder="Note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              disabled={!editable}
            />
            {editable ? (
              <Button
                icon={<SaveOutlined />}
                onClick={() => setLoading(true)}
                type="primary"
                loading={loading}
                disabled={selectedRowKeys.length === 0}
              >
                Save
              </Button>
            ) : (
              <Button
                icon={<EditOutlined />}
                type="primary"
                onClick={setEditable.bind(this, true)}
              >
                Edit
              </Button>
            )}
          </Space>
        </Space>
      </Space>
    </Fragment>
  );
};

export default ClassificationViewer;
