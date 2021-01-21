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

const ClassificationViewer = (props) => {
  const [editable, setEditable] = useState(props.edit);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (selectedRowKeys) => {
    console.log(
      `SelectedRowKeys changed: ${selectedRowKeys.map(
        (key) => props.data.find((d) => d.key === key).name
      )}
      `
    );
    setSelectedRowKeys(selectedRowKeys);
  };

  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);

  const mockImgSrc =
    "https://www.warrenphotographic.co.uk/photography/bigs/37974-Tabby-cat-portrait-white-background.jpg";

  // TODO load img from props.id
  return (
    <Fragment>
      <div className={styles.Layout}>
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
        <div className={styles.Pred}>
          <Space direction="vertical">
            <Select style={{ width: "240px" }} defaultOpen>
              {/* {pipelines.map((pipeline) => (
              <Select.Option>{pipeline.name}</Select.Option>
            ))} */}
              <Select.Option>COVID-19 + Pnuemonia V1</Select.Option>
            </Select>
            <MyTable
              columns={columns}
              data={props.data}
              selectionType="checkbox"
              onSelectChange={onSelectChange}
              disableRowSelection={!editable}
            />
          </Space>
          {editable ? (
            <Space direction="vertical">
              <TextArea
                placeholder="Note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
              <Button
                icon={<SaveOutlined />}
                onClick={() => setLoading(true)}
                type="primary"
                loading={loading}
                disabled={selectedRowKeys.length === 0}
              >
                Save
              </Button>
            </Space>
          ) : (
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={setEditable.bind(this, true)}
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ClassificationViewer;
