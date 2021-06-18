import React from "react";
import { Result, Button } from "antd";
import { Helmet } from "react-helmet";

import { Link } from "react-router-dom";
function NotFound() {
  return (
    <>
      <Helmet>
        <title>404</title>
      </Helmet>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </>
  );
}

export default NotFound;
