import React, { useState } from "react";
import { Upload } from "antd";

const ImgUpload = (props) => {
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    // Open new window and display image
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  
  return (
    <Upload
      // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture-card"
      fileList={props.fileList}
      onChange={props.onChange}
      // onPreview={onPreview}
      beforeUpload={() => false}
      // customRequest={({ file, onSuccess }) => {
      //   //TODO implement upload logic
      //   onSuccess({ uid: 1 });
      // }}
    >
      {/* {fileList.length < 5 && "+ Upload"} */}+ Upload
    </Upload>
  );
};

export default ImgUpload;
