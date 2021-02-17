import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Button from "../../components/Button/Button";
import styles from "./login.module.css";
import * as action from "../../store/actions";
import { useRouter } from "next/router";
import { Form, Input, Button, Checkbox, message, Divider, Space } from "antd";
import systemName from "../../assets/name";
import Head from "next/head";
import Logo from "../../assets/Logo";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 24,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 1,
    span: 16,
  },
};

const Login = () => {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    const { username, password, remember } = values;
    dispatch(action.authInit(username, password, remember));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (token && !loading) {
      message.success("Successfully logged in");
      router.replace("home");
    }
  }, [token, loading]);

  useEffect(() => {
    if (error)
      message.error(
        `Authentication failed with the following error: ${error}`,
        5 // Duration
      );
  }, [error]);

  return (
    <>
      <Head>
        <title>{systemName} login</title>
      </Head>
      <div className={styles.Layout}>
        <div className={styles.Login}>
          <Space size="large">
            <Logo width="180px" height="90px" />
            <Divider type="vertical" style={{ height: "220px" }} />
            <Form
              {...layout}
              name="basic"
              initialValues={{
                remember: true,
              }}
              style={{marginTop:'20px'}}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item
                {...tailLayout}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </div>
      </div>
    </>
  );
};

export default Login;
