import React, {useEffect} from "react";
import { Form, Input, Button, message } from "antd";
import { io } from "../../api/io";
import { useState } from "react";

const Keywords = ({ metaTitleId, titleId }) => {
  const [form] = Form.useForm();
  const [keywords, setKeyWords] = useState();
  
  useEffect(() => {
    io({ method: "get", url: `/api/mastermeta/titleId?titleid=${titleId}&view=basic` })
      .then(({ data = [] } = {}) => {
        data.resultsMap.result?.map((item) => {
          if (item.metaTitleId === metaTitleId) {
          setKeyWords(item.keyword)
        }
        return <></>
      })
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
  form.setFieldsValue({
    keyword:  keywords,
  });
})

  const onFinish = () => {
    io({
      method: "post",
      url: `/api/mastermeta/${metaTitleId}/keyword?keyword=${keywords}`,
    })
      .then(({ data } = {}) => {
        message.success("Keywords updated Successfully");
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  return (
    <>
      <h2>Keywords</h2>
      <Form
        onFinish={onFinish}
        className="content-edit"
        form={form}
        name="control-hooks"
        layout="vertical"
      >
        <Form.Item
          label="keywords"
          name="keyword"
          rules={[{ required: true }]}
          onChange={(e) => setKeyWords(e.target.value)}
        >
          <Input.TextArea rows={5} placeholder="Please enter keywords"/>
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit" >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Keywords;
