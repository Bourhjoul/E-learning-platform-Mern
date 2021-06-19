import React, { useState } from "react";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { isEmail } from "../../utils/validation/Validation";
import { Input, Button } from "antd";

const initialState = {
  email: "",
  success: "",
  err: "",
};
const ForgotPassword = () => {
  const [data, setData] = useState(initialState);
  const { email, success, err } = data;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value, err: "", success: "" });
  };
  const forgotPassword = async () => {
    if (!isEmail(email))
      return setData({ ...data, err: "Invalid email", success: "" });
    try {
      console.log("test");
      const res = await axios.post("/user/forgot", { email });

      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };
  return (
    <div className="fg_pass">
      <div className="row">
        <h2>Forgot Your Password ?</h2>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <label>Enter your email address</label>
        <Input
          name="email"
          value={email}
          type="text"
          className="input"
          placeholder="Email"
          onChange={handleChange}
        />
        <Button onClick={forgotPassword}>Verify your email</Button>
      </div>
    </div>
  );
};
export default ForgotPassword;
