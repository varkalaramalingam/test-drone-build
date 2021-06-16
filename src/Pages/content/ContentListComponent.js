import { Space, Table, Button, Row, Col, Input, message, Pagination, Form } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "../../api/io";
import AdvancedSearch from "./AdvancedSearch";

function ContentListComponent(props) {
  const [contentData, setContentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [ isButtonClicked, setIsButtonClicked] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(10);
  const [counter, setCounter] = useState(0);

  const [genreList, setGenreList] = useState([0]);
  const [subGenreList, setSubGenreList] = useState([0]);
  const [rolesList, setRolesList] = useState([0]);
  const [peopleList, setPeopleList] = useState([0]);
  const [ reqBody, setReqBody] = useState({
    genresList: [0],
    peopleList: [0],
    rolesList: [0],
    subGenreList: [0]
  });

  let interval = "";

  useEffect(() => {
    getCatalogueData();
    if (counter > 1) {
      clearInterval(interval);
    }
  }, [counter, pageNumber, pageSize]);

  const getCatalogueData = () => {
    io({ method: "get", url: `/api/mastermeta?pageNumber=${pageNumber}&pagesize=${pageSize}` })
      .then(({ data = [] } = {}) => {
        setContentData(data.resultsMap.result.map(item => ({
          isAdultValue:item.isAdult === null ? "" : item.isAdult === 0 ? "No" : "Yes",
          isDubbedValue:item.isDubbed === null ? "" : item.isDubbed === 0 ? "No" : "Yes",
          isRemadeValue:item.isRemade === null ? "" : item.isRemade === 0 ? "No" : "Yes",
          istrailerValue:item.istrailer === null ? "" : item.istrailer === 0 ? "No" : "Yes",
          istrailer:item.istrailer,
          isAdult:item.isAdult,
          isDubbed:item.isDubbed,
          isRemade:item.isRemade,
          title : item.title,
          originalTitle : item.originalTitle,
          keyword : item.keyword,
          releaseType : item.releaseType,
          releaseYear : item.releaseYear,
          releaseDateValue : item.releaseDate === 0 ? null : new Date(item.releaseDate).getDate()+'/' + (new Date(item.releaseDate).getMonth()+1) + '/' + new Date(item.releaseDate).getFullYear(),
          releaseDate : item.releaseDate,
          industryType : item.industryType,
          titleType : item.titleType,
          primaryLanguage : item.primaryLanguage,
          language : item.language,
          metaTitleId : item.metaTitleId,
          runtime : item.runtime,
          id : item.id,
          bannerImage1 : item.bannerImage1,
          bannerImage2 : item.bannerImage2,
          iconUrl1 : item.iconUrl1,
          iconUrl2 : item.iconUrl2
        })));
        setTotalRecords(data.totalRecords)
        setLoading(true);
      })
      .catch(() => {
        console.log(false);
        setLoading(false);
      });
    }

    const openSearch = async () => {
      await setIsButtonClicked(isButtonClicked ? false : true)
      isButtonClicked ? props.closeSideBar(false) : props.openSideBar(true)
    }

    async function onPageChange(page) {
      await setPageNumber(page);
      await getCatalogueData();
      await setCounter((state) => state + 1);
    }
  
    const onShowSizeChange = async (current, size) => {
      await setPageSize(size);
      await getCatalogueData();
      await setCounter((state) => state + 1);
    }


  const [file, setFile] = useState(null);
  const [dynamicKey, setDynamicKey] = useState(Date.now());


  const uploadUsers = (e) => {
    let [uploadFileName, uploadFileExtention] = e.target.files[0].name.split(".")
    setFile(e.target.files[0]);
    if(uploadFileExtention !== "csv"){
      message.error("Only CSV Files can be uploaded")
    } else {
      console.log(e);
      // setFile(e.target.files[0]);
      console.log(file)
    }
  }

  const upload = () => {
    let formdata = new FormData();
    formdata.append("file", file);
    setUploadLoading(true);
    io({ method: "post", url: '/api/upload/mastermeta', data: formdata })
        .then(({ data : { resultsMap : { result = "" }} } = {}) => {
          console.log(result);
          setUploadLoading(false);
          message.success("Uploaded Catalogue CSV File Successfully");
          setDynamicKey(Date.now());
          setFile(null)
          getCatalogueData();
        })
        .catch((err) => {
          console.log(err)
          message.error("Catalogue CSV File Not Uploaded");
        });
  }

  const HandleBrowseClick = () => {
    var fileinput = document.getElementById("fileID");
    fileinput.click();
  }
  
  // ==== Title Search===
  const onClickSearch = (e) => {
        e == "" || contentData == "" ? 
      getCatalogueData() :
      onTitleSearch()
  }
   const onTitleSearch = () => {
     io({ method: "get" , url: `/api/mastermeta/search?title=${searchValue == "" ? undefined : searchValue }` })
     .then(({ data = [] } ={}) =>{
      setContentData(data.resultsMap.result);
     })
     .catch((error) => {
       console.log(error);
     })
   }

  //  Advanced search submit
  const onSubmit = () => {
    io({
      method: "post",
      url: `/api/mastermeta/search`,
      data: reqBody,
    })
      .then(({ data }) => {
        setContentData(data.resultsMap.result)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setReqBody({...reqBody, genresList: genreList.length !== 0 ? genreList : [0]})
  }, [genreList])

  return (
    <>
          <Row>
      {isButtonClicked ?
      <Col span={4} style={{left:"-40px"}}>        
        <Form onFinish={onSubmit}>
          <AdvancedSearch 
            setGenreList={setGenreList}
            setSubGenreList={setSubGenreList}
            setRolesList={setRolesList}
            setPeopleList={setPeopleList}
            />
        </Form> 
      </Col>
      : null}
      <Col span={isButtonClicked ? 20 : 24}>
      <Row style={{ justifyContent:"space-between" }}>
      <Col span={6}>
        <Row span={24}>
        <Col span={11}><h2>Catalogue</h2></Col>
        <Col span={12}><Button type="primary" onClick={() => openSearch()}>Advanced Search</Button></Col>
        </Row>
        </Col>
        <Col span={5} >
	      <Input.Search
           placeholder="Search Title"
           autoFocus
           enterButton={<Button type="primary" disabled={searchValue == "" ? true : false}>Search</Button>}
           allowClear
           onSearch={(e) => onClickSearch(e)}
           onChange={(e) => setSearchValue(e.target.value)}
         />
        </Col>
        <Col span={12}>
          <Row>
            <Col span={8}>
              <Button type="primary" style={{ float: "right", marginBottom: "10px", marginRight: "10px" }}>
                <Link to={{ pathname: "/catalogue/add-catalogue", state: { isAdd: true, record: undefined } }}>
                Generate Catalogue
                </Link>
              </Button>
            </Col>
	   <Col span={12}> 
              <Input 
                type="file" 
                id="fileID"
                style={{ marginBottom: "10px", float: "left", display: "none" }}
                key={dynamicKey}
                onChange={e => uploadUsers(e)}
              />
              <div style={{ display: "flex" }}>
                <Button 
                  type="primary" 
                  id="fakeBrowse" 
                  style={{ marginBottom: "10px", float: "right", marginRight: "10px"}}
                  onClick={HandleBrowseClick}
                  loading={uploadLoading}
                >
                  {uploadLoading ? "Uploading" : "Upload"} Catalogue
                </Button>
                { file !== null ? 
                  <p id="filename" style={{ marginTop: "5px",  color:"blue"}}>{file.name}</p> :
                  <p style={{ marginTop: "5px"}}>No File Chosen</p>
                }
              </div>
            </Col>
            <Col span={4}>
              <Button 
                type="primary" 
                style={{ marginBottom: "10px", float: "right", marginRight: "10px"}}
                onClick={() => {
                  message.success("Uploaded catalogue CSV File Successfully");
                  setDynamicKey(Date.now());
                  setFile(null)
                  upload()
                }}
                disabled={file===null}
              >
                Upload
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Table
        dataSource={contentData}
        style={{ paddingBottom: "20px" }}
        scroll={{ x: 1300 }}
        loading={!loading}
        size="small"
        rowKey="id"
        pagination={false}
      >
        <Column title="Id" dataIndex="id" key="id" width={50} />
        <Column title="MetaTitleId" dataIndex="metaTitleId" key="metaTitleId" width={110} />
        <Column title="Title" dataIndex="title" key="title" width={150} />
        <Column title="Original Title" dataIndex="originalTitle"  key="originalTitle" width={150} />
        <Column title="Primary Language Id" dataIndex="primaryLanguage"  key="primaryLanguage" width={100} />
        <Column title="Primary Language" dataIndex="language"  key="language" width={100} />
        <Column title="Title Type" dataIndex="titleType"  key="titleType" width={100} />
        <Column title="Is Trailer" dataIndex="istrailerValue" key="istrailerValue" width={100} />
        <Column title="Is Adult" dataIndex="isAdultValue" key="isAdultValue" width={100} />
        <Column title="Run Time" dataIndex="runtime"  key="originalTitle" width={100} />
        <Column title="Release Type" dataIndex="releaseType" key="releaseType" width={100} />
        <Column title="Release Year" dataIndex="releaseYear" key="releaseYear" width={100} />
        <Column title="Release Date" dataIndex="releaseDateValue" key="releaseDateValue" width={120} />
        <Column title="Industry Type" dataIndex="industryType"  key="industryType" width={100} />
        <Column title="Is Dubbed" dataIndex="isDubbedValue" key="isDubbedValue" width={100} />
        <Column title="Is Remade" dataIndex="isRemadeValue" key="isRemadeValue" width={100} />
        <Column
          title="Action"
          key="action"
          align="center"
          fixed="right"
          width={120}
          render={(record) => (
            <Space size="middle">
              <Link to={{
                  pathname: `/catalogue/view-catalogue/${record.metaTitleId}`,
                  state: { isAdd: false, record: record },
                }}>
                View
              </Link>
              <Link to={{
                  pathname: "/catalogue/edit-catalogue",
                  state: { isAdd: false, record: record },
                }}>
                Edit
              </Link>
            </Space>
          )}
        />
      </Table>
      <Pagination
              defaultCurrent={1}
              total={totalRecords}
              style={{ float: "right" }}
              onChange={onPageChange}
              showTotal={(total, range) => {
                return `${range[0]}-${range[1]} of ${total}`;
              }}
              showQuickJumper
              size="small"
              pageSizeOptions={["10", "20", "30", "40", "50"]}
              showSizeChanger={true}
              // onShowSizeChange={onShowSizeChange}
            />
      </Col>
    </Row>
    </>
  );
}

export default ContentListComponent;
