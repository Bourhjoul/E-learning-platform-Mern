import { useParams, useHistory } from "react-router-dom";
import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Helmet } from "react-helmet";

import { ArrowLeftOutlined, RetweetOutlined } from "@ant-design/icons";
import { Button, Input, Checkbox } from "antd";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";

const EditUser = () => {
  const [size, setSize] = useState("middle");

  const { id } = useParams();
  const history = useHistory();
  const [editUser, setEditUser] = useState([]);
  const [num, setNum] = useState(0);

  const usersInfo = useSelector((state) => state.usersInfo);
  const { users } = usersInfo;
  const token = useSelector((state) => state.token);

  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);

  const [checkAdmin, setCheckAdmin] = useState(false);

  const handleCheck = () => {
    setSuccess("");
    setErr("");
    setCheckAdmin(!checkAdmin);
    setNum(num + 1);
  };
  const handleUpdate = async () => {
    try {
      if (num % 2 !== 0) {
        const res = await axios.patch(
          `/user/update_role/${editUser._id}`,
          {
            role: checkAdmin ? 1 : 0,
          },
          {
            headers: { Authorization: token },
          }
        );

        setSuccess(res.data.msg);
        setNum(0);
      }
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  useEffect(() => {
    if (users.length !== 0) {
      users.forEach((user) => {
        if (user._id === id) {
          setEditUser(user);
          setCheckAdmin(user.role === 1 ? true : false);
        }
      });
    } else {
      history.push("/profile");
    }
  }, [users, id, history]);

  return (
    <div>
      <Helmet>
        <title>EDIT USER</title>
      </Helmet>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <div className="edit-page">
        <div className="row">
          <Button
            className="btn-back"
            onClick={() => history.goBack()}
            size={size}
            type="primary"
            shape="round"
            icon={<ArrowLeftOutlined />}
          >
            Go Back
          </Button>
        </div>
        <div className="col-left">
          <h2>Edit User</h2>
          <div className="form-group">
            <label>Name </label>
            <Input
              type="text"
              name="name"
              value={editUser.name}
              placeholder="Your name"
              disabled
            />
          </div>
          <div className="form-group">
            <label>Email </label>
            <Input
              type="text"
              name="email"
              value={editUser.email}
              placeholder="Your email address"
              disabled
            />
          </div>
          <div>
            <Checkbox onChange={handleCheck} checked={checkAdmin}>
              isAdmin
            </Checkbox>
          </div>
          <>
            {" "}
            <Button
              className="btn-update-user"
              shape="round"
              onClick={handleUpdate}
              size={size}
              type="primary"
            >
              Update <RetweetOutlined />
            </Button>
          </>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
