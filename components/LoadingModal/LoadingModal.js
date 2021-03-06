import { Timeline } from "antd";
import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const STEPS = [
  "Connecting to server",
  "Initializing TRTIS",
  "Initializing Clara Deploy",
];

const LoadingModal = (props) => {
  const [status, setStatus] = useState(0);

  const token = useSelector((state) => state.auth.token);

  const reload = async () => {
    if (!token) return;
    try {
      const response = await axios.get("/api/util/check_server_status");
      if (!response.data.trtis_status) {
        setStatus(1);
      } else if (!response.data.clara_status) {
        setStatus(2);
      } else {
        setStatus(3);
      }
    } catch (e) {
      setStatus(0);
    }
  };

  const [oldInterval, setOldInterval] = useState(null);
  useEffect(() => {
    reload();
    if (oldInterval) clearInterval(oldInterval);
    setOldInterval(setInterval(reload.bind(this), 5000));
    return () => clearInterval(oldInterval);
  }, [token]);

  return (
    <Modal
      width={250}
      visible={status < 3}
      closable={false}
      title={"Loading..."}
      footer={null}
    >
      <Timeline pending={status < STEPS.length && STEPS[status]}>
        {STEPS.slice(0, status).map((s, i) => (
          <Timeline.Item key={i}>{s}</Timeline.Item>
        ))}
      </Timeline>
    </Modal>
  );
};

export default LoadingModal;
