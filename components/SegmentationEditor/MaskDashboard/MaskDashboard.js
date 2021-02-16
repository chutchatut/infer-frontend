import { Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import ColorPicker from "./ColorPicker/ColorPicker";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const MaskDashboard = (props) => {
  const poly = props.polys[props.maskOnModal];
  console.log(poly);
  return (
    <Form preserve={false} {...formItemLayout} form={props.form}>
      <Form.Item label="Label" name="label" initialValue={poly.label}>
        <Input />
      </Form.Item>
      <Form.Item label="Color" name="color" initialValue={poly.color}>
        <ColorPicker />
      </Form.Item>
    </Form>
  );
};

export default MaskDashboard;
