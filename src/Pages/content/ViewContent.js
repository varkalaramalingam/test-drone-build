import { Descriptions, Image } from 'antd';
import React from 'react';
import AddButton from '../../components/AddButton';
import { useLocation } from 'react-router-dom';

function ViewContent() {
  let location = useLocation();
  let initialData = location?.state?.record;

    return (
        <>
        <AddButton path="/catalogue/edit-catalogue" isAdd={false} record={initialData} pageName="Catalogue Info" addPage="Edit Catalogue"/>
        <Descriptions bordered labelStyle={{fontSize:"15px", fontWeight:"bolder"}} className="content-edit">
        <Descriptions.Item label="Title">{initialData?.title}</Descriptions.Item>
        <Descriptions.Item label="Original Title">{initialData?.originalTitle}</Descriptions.Item>
        <Descriptions.Item label="Primary Language">{initialData?.language} </Descriptions.Item>
        <Descriptions.Item label="Is Trailer">{initialData?.istrailer} </Descriptions.Item>
        <Descriptions.Item label="Title Type">{initialData?.titleType}</Descriptions.Item>
        <Descriptions.Item label="Is Adult">{initialData?.isAdultValue} </Descriptions.Item>
        <Descriptions.Item label="Run Time"> {initialData?.runtime}</Descriptions.Item>
        <Descriptions.Item label="Release Type">{initialData?.releaseType}</Descriptions.Item>
        <Descriptions.Item label="Release Year"> {initialData?.releaseYear}</Descriptions.Item>
        <Descriptions.Item label="Release Date">{initialData?.releaseDateValue}</Descriptions.Item>
        <Descriptions.Item label="Industry"> {initialData?.industryType}</Descriptions.Item>
        <Descriptions.Item label="Is Dubbed"> {initialData?.isDubbedValue}</Descriptions.Item>
        <Descriptions.Item label="Is Remade"> {initialData?.isRemadeValue}</Descriptions.Item>
        <Descriptions.Item label="Banner Image1"> 
        <Image width={200} alt={initialData?.bannerImage1}
          src={initialData?.bannerImage1}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Banner Image2"> 
        <Image width={200} alt={initialData?.bannerImage2}
          src={initialData?.bannerImage2}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Icon1"> 
        <Image alt={initialData?.iconUrl1} width={100}
          src={initialData?.iconUrl1}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Icon2"> 
        <Image alt={initialData?.iconUrl2} width={100}
          src={initialData?.iconUrl2}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Reference Url"><a href={initialData?.bannerImage2} target="blank">{initialData?.bannerImage2}</a></Descriptions.Item>
      </Descriptions>
      
      </>
    )
}

export default ViewContent
