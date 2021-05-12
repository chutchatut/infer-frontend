import { Timeline } from "antd";
import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import React, { useState, useEffect } from "react";

const STEPS = [
  "Connecting to server",
  "Initializing TRTIS",
  "Initializing Clara Deploy",
];

const LoadingModal = (props) => {
  const [status, setStatus] = useState(0);
  console.log(props);
  const [timer, setTimer] = useState(null);
  const [tick, setTick] = useState(true);

  const reload = async () => {
    if (!axios.defaults.headers.common["Authorization"]) return;
    try {
      const response = await axios.get("/api/util/check_server_status");
      console.log(response);
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

  useEffect(() => {
    reload();
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      setTick((tick) => !tick);
    }, 5000);
    setTimer(newTimer);
  }, [tick]);

  return (
    <Modal
      width={250}
      visible={status < 3}
      closable={false}
      title={"Loading..."}
      footer={null}
    >
      <Timeline pending={status < STEPS.length && STEPS[status]}>
        {STEPS.slice(0, status).map((s) => (
          <Timeline.Item>{s}</Timeline.Item>
        ))}
      </Timeline>
    </Modal>
  );
};

export default LoadingModal;
