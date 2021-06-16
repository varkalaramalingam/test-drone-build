import { Space, Form, Button } from 'antd'
import React from 'react'

function SubmitCloseButtons({clearValues, onClick}) {
    return (
        <Form.Item style={{ textAlign: "center" }}>
        <Space>
          <Button onClick={clearValues}>Close</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form.Item>
    )
}

export default SubmitCloseButtons
