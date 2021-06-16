import { Descriptions } from 'antd';
import React from 'react'
import AddButton from '../../../components/AddButton';
import BackButton from '../../../components/BackButton';

function ViewPlot(props) {
    let initialData = props.location.state.record;
    let movieTitle = props.location.state.movieTitle;
    return (
        <>
        <BackButton pageName={`Movie Title : ${movieTitle}`}/>
        <AddButton pageName="Plot Info" isAdd={false} record={initialData} path="/plot/edit-plot" addPage="Edit Plot"/>
        <Descriptions bordered  labelStyle={{fontSize:"15px", fontWeight:"bolder"}} className="content-edit">
        <Descriptions.Item label="TitleId" span={2}>{initialData.id}</Descriptions.Item>
        <Descriptions.Item label="Source" >{initialData.source}</Descriptions.Item>
        <Descriptions.Item label="Plot Text" span={4}>{initialData.totalPlottext}</Descriptions.Item>
        <Descriptions.Item label="Summary">{initialData.totalSummary} </Descriptions.Item>
      </Descriptions>
      </>
    )
}

export default ViewPlot
