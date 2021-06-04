import React from 'react'
import { Alert } from 'antd';
import './notification.css'

export const showErrMsg = (msg) => {
    return <Alert       
        message= 'Error Occured'
      description={msg}
      type="error"
      showIcon
      closable />
}

export const showSuccessMsg = (msg) => {
    return <Alert       
    message= 'Success'
      description={msg}
      type="success"
      showIcon
      closable />
}