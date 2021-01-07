import React, { useState } from "react";
import DropDown from "../../components/DropDown/DropDown";

const Infer = () => {
  const options = ["test", "test23"];
  const [option, setOption] = useState(options[0]);
  const [pipeline, setPipeline] = useState(null);
  return (
    <DropDown
      selectedItem={pipeline}
      setSelectedItem={setPipeline}
      text="Select a pipeline"
      options={options}
      onChange={(event) => setOption(event.target.value)}
    />
  );
};

export default Infer;
