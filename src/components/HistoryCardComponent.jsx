import React, { useState } from "react";
import { Card } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from "moment"

const { Meta } = Card;

function HistoryCardItem({ history, handleEdit, deleteTimeline, selectTimelines, timelineIds }) {

  const seenTime = moment.duration(history.watchtime, 'minutes');  
  const movieTime = moment.duration(history.runtime, 'minutes');  
  const lastSeenDate = new Date(history.view_date);

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        history.img ?
        <img
          alt="example"
          src={history.img}
          height="200px"
        /> :
        <img
          alt="example"
          src="https://www.bing.com/th?id=AMMS_2c823cb31868cb06bad816d4a8e848d1&w=140&h=183&c=8&rs=1&o=5&dpr=1.25&pid=3.1&rm=2"
          height="200px"
        />
      }
      actions={[
        <Checkbox 
          checked={timelineIds.some((id) => {
            return id === history.id
          }
          )}
          onClick={() => selectTimelines(history.id)}
        ></Checkbox>,
        <EditOutlined key="edit" onClick={() => {
            handleEdit(history)
          }
        } 
        />,
        <DeleteOutlined key="delete" onClick={() => deleteTimeline(history.id)}/>,
      ]}
    >
      <Meta title={history.title} />
      <p>{seenTime.hours()} hrs {seenTime.minutes()} mins / {movieTime.hours()} hrs {movieTime.minutes()} mins</p>
      <p>{lastSeenDate.getDate()+"/"+(lastSeenDate.getMonth()+1)+"/"+lastSeenDate.getFullYear()}</p>
    </Card>
  );
}

export default HistoryCardItem;
