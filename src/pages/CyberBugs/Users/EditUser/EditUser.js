import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { history } from "../../../../util/history";
import { EDIT_USER_SAGA } from "../../../../redux/constants/Cyberbugs/UserConstatnts";

export default function EditUser(props) {
  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch();
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  let editingUser = JSON.parse(localStorage.getItem("editingUser"));
  //   console.log(editingUser);
  const formik = useFormik({
    initialValues: {
      id: editingUser.userId,
      name: editingUser.name,
      email: editingUser.email,
      passWord: "",
      phoneNumber: editingUser.phoneNumber
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
      //   console.log("valus", values);
      dispatch({
        type: EDIT_USER_SAGA,
        editingUserInfo: values
      });
    }
  });

  return (
    <div className="container">
      <h3 className="display-4">Chỉnh sửa người dùng</h3>

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
        <div style={{ height: 60 }}>
          <Form.Item label="Tên">
            <Input
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
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
            <Input
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? formik.errors.email : ""}
          </Form.Item>
        </div>

        <div style={{ height: 60 }}>
          <Form.Item label="Số điện thoại">
            <Input
              name="phoneNumber"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
            />
            {formik.errors.phoneNumber ? formik.errors.phoneNumber : ""}
          </Form.Item>
        </div>

        <Form.Item label="Tác vụ">
          <Button htmlType="submit" className="mr-2">
            Chỉnh sửa
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
