import React, { useCallback, useEffect } from "react";

import { Table, Input } from "antd";
import { NavLink } from "react-router-dom";
import { AudioOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { responsiveArray } from "antd/lib/_util/responsiveObserve";
import { debounce, join } from "lodash";
import { DELETE_USER_SAGA } from "../../../redux/constants/Cyberbugs/UserConstatnts";
import { history } from "../../../util/history";
const { Search } = Input;
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park, New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 2 Lake Park, London No. 2 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park, Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];
export default function Users(props) {
  const dispatch = useDispatch();

  const { userSearch } = useSelector(
    (state) => state.UserLoginCyberBugsReducer
  );

  useEffect(() => {
    dispatch({
      type: "GET_USER_API",
      keyword: ""
    });
  }, []);

  const debounceSearch = useCallback(
    debounce(
      (value) =>
        dispatch({
          type: "GET_USER_API",
          keyword: value
        }),
      1000
    ),
    []
  );

  const onHandleChange = (e) => {
    const { value } = e.target;
    debounceSearch(value);
  };

  const onSearch = (value) => {
    dispatch({
      type: "GET_USER_API",
      keyword: value
    });
  };

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
      width: 150
    },
    {
      title: "Số Đt",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 80
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 300
    },
    {
      title: "userId",
      dataIndex: "userId",
      key: "userId",
      width: 200
    },

    {
      title: "Tác vụ",
      dataIndex: "userId",
      render: (text, record, index) => {
        return (
          <div key={index}>
            <button
              className="mr-1"
              onClick={() => {
                history.push(`users/edituser/${record.userId}`);

                localStorage.setItem("editingUser", JSON.stringify(record));
              }}
            >
              EDIT
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: DELETE_USER_SAGA,
                  userId: record.userId
                });
              }}
            >
              DELETE
            </button>
          </div>
        );
      },
      key: "tacVu",
      width: 200
    }
  ];

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff"
      }}
    />
  );

  return (
    <div>
      <h3 className="text-3xl mt-10">Quản lý người dùng</h3>

      <NavLink to={"/users/addusers"}>Thêm người dùng</NavLink>
      {/* <NavLink to="/admin/users/addnewuser">Thêm người dùng</NavLink> */}

      <Search
        className="my-3"
        placeholder="Tìm kiếm"
        // enterButton="Search"
        size="large"
        suffix={suffix}
        onChange={onHandleChange}
        onSearch={onSearch}
      />

      <Table columns={columns} dataSource={userSearch} rowKey={"email"} />
    </div>
  );
}
