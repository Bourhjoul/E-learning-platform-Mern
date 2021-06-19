import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

const ActivationEmail = () => {
  const { activation_token } = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post("/user/activation", {
            activation_token,
          });
          console.log(res);
          setSuccess(res.data.msg);
        } catch (error) {
          err.response.data.msg && setErr(err.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activation_token]);
  return (
    <>
      <Helmet>
        <title>Activate your account</title>
      </Helmet>
      <div className="activate">
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
      </div>
    </>
  );
};

export default ActivationEmail;
