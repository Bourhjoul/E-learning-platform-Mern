import React from 'react'
import { Skeleton, Button, Input, Comment, Avatar, Form,  List } from 'antd';
const CommentList = () => {
    return (
        <div>
            <List
                dataSource={comments}
                header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
                itemLayout="horizontal"
                renderItem={props => <Comment {...props} />}
            />
        </div>
    )
}

export default CommentList
