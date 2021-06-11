import React from 'react'
import { Comment, Avatar, Form, Button, List, Input } from 'antd';

const Editor = () => {
    return (
        <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
    )
}

export default Editor
