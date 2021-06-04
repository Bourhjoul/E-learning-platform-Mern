import React from 'react'
import { Result, Button } from 'antd';
function NotFound() {
    return (
    <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary">Back Home</Button>}
    />
    )
}

export default NotFound
