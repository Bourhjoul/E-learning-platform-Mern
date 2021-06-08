import React from 'react'
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const Error = ({error}) => {

    return (
    <Result
    status="warning"
    title={`{${error}}`}
    extra={
        <Link to = ''>
            <Button type="primary" key="console">Reload</Button>
        </Link>

    }
    />
    )
}

export default Error
