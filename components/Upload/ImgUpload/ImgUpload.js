import React, { useState } from "react";
import { Upload } from "antd";

// const onPreview = async (file) => {
//   let src = file.url;
//   if (!src) {
//     src = await new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file.originFileObj);
//       reader.onload = () => resolve(reader.result);
//     });
//   }
//   const image = new Image();
//   image.src = src;
//   // Open new window and display image
//   const imgWindow = window.open(src);
//   imgWindow.document.write(image.outerHTML);
// };

const ImgUpload = (props) => {
  const maxCount =
    props.filetype === "png" ? 1 : props.filetype === "dcm" ? 20 : 0;

  return (
    <Upload
      multiple={props.filetype === "dcm"}
      accept={`.${props.filetype}`}
      listType="picture-card"
      fileList={props.fileList}
      onChange={props.onChange}
      // onPreview={onPreview}
      beforeUpload={() => false}
      showUploadList={{ showPreviewIcon: false }}
      maxCount={maxCount}
    >
      {(!props.fileList || props.fileList.length < maxCount) && "+ Upload"}
    </Upload>
  );
};

export default ImgUpload;
