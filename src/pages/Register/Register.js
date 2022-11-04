import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { SIGN_UP_SAGA } from "../../redux/constants/Cyberbugs/Cyberbugs";
import { history } from "../../util/history";

export default function Register() {
  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch();
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      passWord: "",
      phoneNumber: ""
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(6, "Tài khoản phải trên 6 ký tự")
        .max(30, "Tài khoản phải ít hơn 40 ký tự")
        .required("Không được bỏ trống!"),
      passWord: Yup.string()
        .min(6, "Password phải trên 6 ký tự")
        .required("Không được bỏ trống!"),

      email: Yup.string()
        .required("Không được bỏ trống!")
        .email("Email không hợp lệ! Vui lòng nhập lại"),
      //   hoTen: Yup.string().required("Không được bỏ trống!"),
      phoneNumber: Yup.string()
        .matches(
          /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
          "Số ĐT không hơp lệ! Vui lòng nhập lại"
        )
        .required("Không được bỏ trống!")
    }),

    onSubmit: (values) => {
      console.log("valus", values);
      dispatch({
        type: SIGN_UP_SAGA,
        userInfo: values
      });
    }
  });
  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
      labelCol={{
        span: 4
      }}
      wrapperCol={{
        span: 14
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
    >
      <h3 className="ml-3">Sign up</h3>
      <div style={{ height: 60 }}>
        <Form.Item label="Tên">
          <Input name="name" onChange={formik.handleChange} />
          {formik.errors.name ? formik.errors.name : ""}
        </Form.Item>
      </div>

      <div style={{ height: 60 }}>
        <Form.Item label="Password">
          <Input name="passWord" onChange={formik.handleChange} />
          {formik.errors.passWord ? formik.errors.passWord : ""}
        </Form.Item>
      </div>

      <div style={{ height: 60 }}>
        <Form.Item label="Email">
          <Input name="email" onChange={formik.handleChange} />
          {formik.errors.email ? formik.errors.email : ""}
        </Form.Item>
      </div>

      <div style={{ height: 60 }}>
        <Form.Item label="Số điện thoại">
          <Input name="phoneNumber" onChange={formik.handleChange} />
          {formik.errors.phoneNumber ? formik.errors.phoneNumber : ""}
        </Form.Item>
      </div>

      <Form.Item label="Tác vụ">
        <Button htmlType="submit" className="mr-2">
          Đăng ký
        </Button>
        <Button
          onClickCapture={() => {
            history.push("login");
          }}
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
}
