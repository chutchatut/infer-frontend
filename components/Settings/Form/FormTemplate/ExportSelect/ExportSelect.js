import { Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ExportSelect = (props) => {
  const [data, setData] = useState([]);

  const reload = async () => {
    const response = await axios.get("/api/export/");
    setData(response.data);
  };

  const [oldInterval, setOldInterval] = useState(null);
  useEffect(() => {
    reload();
    if (oldInterval) clearInterval(oldInterval);
    setOldInterval(setInterval(reload.bind(this), 5000));
    return () => clearInterval(oldInterval);
  }, []);

  const projects = useSelector((state) => state.project.projects);

  // O(N^2) but N should be less than 1000
  return (
    <Select onChange={(e) => props.onChange(e)}>
      {data.map((d) => (
        <Select.Option key={d.zip_file}>
          {projects.find((p) => p.id === d.project).name} - {d.timestamp}
        </Select.Option>
      ))}
    </Select>
  );
};

export default ExportSelect;
