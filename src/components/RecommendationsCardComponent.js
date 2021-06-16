import React from 'react'
import { Card } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

function RecommendationsCardComponent({ recommendation }) {
    return (
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            recommendation.img ?
            <img
              alt="example"
              src={recommendation.img}
              height="200px"
            /> :
            <img
              alt="example"
              src="https://www.bing.com/th?id=AMMS_2c823cb31868cb06bad816d4a8e848d1&w=140&h=183&c=8&rs=1&o=5&dpr=1.25&pid=3.1&rm=2"
              height="200px"
            />
          }
          actions={[
            <Checkbox>Checkbox</Checkbox>
          ]}
        >
          <Meta title={recommendation.title} />
          <p>Reason: {recommendation.reasontext}</p>
        </Card>
    );
}

export default RecommendationsCardComponent
