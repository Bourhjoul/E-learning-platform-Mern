import React, { useState } from "react";
import { isMatch, isLength } from "../../utils/validation/Validation";
import { useParams } from "react-router-dom";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { Button, Input } from "antd";
import { Helmet } from "react-helmet";

import axios from "axios";
const initialState = {
  password: "",
  cf_password: "",
  success: "",
  err: "",
};

const ResetPassword = () => {
  const [data, setData] = useState(initialState);
  const { token } = useParams();
  const { password, cf_password, err, success } = data;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value, err: "", success: "" });
  };
  const resetPassword = async () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setData({ ...data, err: "Password did not match", success: "" });
    try {
      const res = await axios.post(
        "/user/reset",
        { password },
        {
          headers: { Authorization: token },
        }
      );
      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      return setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };
  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <div className="fg_pass">
        <div className="row">
          <h2>Reset Your Password </h2>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}

          <label>Password</label>
          <Input
            name="password"
            value={password}
            type="password"
            className="input"
            placeholder="Password"
            onChange={handleChange}
          />

          <label>Confirm Password</label>
          <Input
            name="cf_password"
            value={cf_password}
            type="password"
            className="input"
            placeholder="Confirm Password"
            onChange={handleChange}
          />

          <button onClick={resetPassword}>RESET PASSWORD</button>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
