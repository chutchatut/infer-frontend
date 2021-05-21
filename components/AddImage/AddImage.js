import { Tabs } from "antd";
import React from "react";
import Upload from "./Upload/Upload";
import ImageAddTable from "./ImageAddTable/ImageAddTable";
import Modal from "antd/lib/modal/Modal";
import MyTable from "../MyTable/MyTable";

const { TabPane } = Tabs;

const columns = [
  {
    title: "Filename",
    dataIndex: "filename",
    sortable: true,
    searchable: true,
  },
  {
    title: "Status",
    dataIndex: "status",
    sortable: true,
  },
];

const AddImage = () => {
  const [dataOnModal, setDataOnModal] = useState(null);

  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Upload files" key="1">
          <Upload setDataOnModal={setDataOnModal} />
        </TabPane>
        <TabPane tab="Select from remote files" key="2">
          <ImageAddTable setDataOnModal={setDataOnModal} />
        </TabPane>
      </Tabs>
      <Modal
        title="Upload Status"
        onCancel={setDataOnModal.bind(this, null)}
        visible={dataOnModal}
        footer={null}
      >
        <MyTable
          data={dataOnModal}
          config={{ pagination: { pageSize: 50 }, scroll: { x: 300, y: 300 } }}
          columns={columns}
        />
      </Modal>
    </>
  );
};

export default AddImage;
