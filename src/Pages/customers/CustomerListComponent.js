import { Space, Table, Button, Row, Col, Input, message, Upload, Pagination } from "antd";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { io } from "../../api/io";
import { UploadOutlined } from '@ant-design/icons';

// Customer means User
function CustomerListComponent() {

  const [customersData, setCustomersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [dynamicKey, setDynamicKey] = useState(Date.now());
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(10);
  const [counter, setCounter] = useState(0);
  
  let interval = "";

  useEffect(() => {
    getCustomers();
    if (counter > 1) {
      clearInterval(interval);
    }
  }, [counter, pageNumber, pageSize]);

  // const uploadComponentProps = {
  //   accept:".csv",
  //   action: 'http://localhost:8080/customers/upload',
  //   onChange({ file, fileList }) {
  //     if (file.status !== 'uploading') {
  //       console.log(file, fileList);
  //     }
  //     if (file.status === 'done') {
  //       message.success(`${file.name} file uploaded successfully`);
  //     } else if (file.status === 'error') {
  //       message.error(`${file.name} file upload failed.`);
  //     }
  //   },
  // }

  useEffect(() => {
    setLoading(true);
    getCustomers();
  }, [])

  const getCustomers = () => {
    io({ method: "get", url: `/api/customer?pageNumber=${pageNumber}&pagesize=${pageSize}` })
        .then(({ data }) => {
          let result = data.resultsMap.result;
          for(let i=0;i<result.length;i++){
            let startDate = new Date(result[i].subscriptionStartDate)
            let endDate = new Date(result[i].subscriptionEndDate)
            result[i].startDate = startDate.getDate()+"/"+(startDate.getMonth()+1)+"/"+startDate.getFullYear();
            result[i].endDate = endDate.getDate()+"/"+(endDate.getMonth()+1)+"/"+endDate.getFullYear();
          }
          setCustomersData(result);
          setTotalRecords(data.totalRecords);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
  }

  const columns = [
    { title: "Id", dataIndex: "id", key: "id", fixed: 'left' },
    { title: "User Id", dataIndex: "personaId", key: "personaId" },
    { title: "Client Reference Id", dataIndex: "clientReferenceId", key: "clientReferenceId"},
    { title: "Subscription Type", dataIndex: "subscriptionType", key: "subscriptionType" },
    { title: "Start Date", dataIndex: "startDate", key: "startDate" },
    { title: "End Date", dataIndex: "endDate", key: "endDate" },
    { title: "Period", dataIndex: "period", key: "period" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Locality", dataIndex: "locality", key: "locality" },
    { title: "Device Type", dataIndex: "deviceType", key: "deviceType" },
    // { title: "Device ID", dataIndex: "deviceID", key: "deviceID" },
    { title: "Persona Category", dataIndex: "personaCategory", key: "personaCategory" },
    { title: "Active", dataIndex: "active", key: "active" },
    { title: "Primary Language", dataIndex: "primaryLanguage", key: "primaryLanguage" },
    { title: "City", dataIndex: "city", key: "city" },
    { title: "State", dataIndex: "state", key: "state" },
    { title: "Country", dataIndex: "country", key: "country" },
    { title: "Zipcode", dataIndex: "zipcode", key: "zipcode" },
    {
      title: "Action", dataIndex: "vieworedit", key: "vieworedit", fixed: 'right',
      render: (text, record) => (
        <Space size="small">
          <Button type="link" onClick={() => viewCustomerDetails(record)}>View</Button>
          <Button type="link" onClick={() => editCustomer(record)}>Edit</Button>
        </Space>
      ),
    },
  ];

  const history = useHistory()

  const viewCustomerDetails = (record) => {
    history.push({
      pathname: "/user/view",
      state: { record: record }
    });
  }
  
  const newCustomer = () => {
    history.push({
      pathname: "/user/adduser",
      state: { customerData: {} }
    });
  }
  
  const editCustomer = (record) => {
    history.push({
      pathname: "/user/edituser",
      state: { customerData: record }
    });
  }

  const uploadUsers = (e) => {
    let [uploadFileName, uploadFileExtention] = e.target.files[0].name.split(".")
    if(uploadFileExtention !== "csv"){
      message.error("Only CSV Files can be uploaded")
    } else {
      console.log(e);
      setFile(e.target.files[0]);
      console.log(file)
    }
  }

  const upload = () => {
    let formdata = new FormData();
    formdata.append("file", file);
    io({ method: "post", url: '/api/upload/customer', data: formdata })
        .then(({ data : { resultsMap : { result = "" }} } = {}) => {
          console.log(result)
          message.success(result)
          message.success("Uploaded Customers CSV File Successfully")
          setDynamicKey(Date.now())
          setFile(null)
          getCustomers()
        })
        .catch((err) => {
          console.log(err)
          message.error("Customers CSV File Not Uploaded");
        });
  }

  const HandleBrowseClick = () => {
    var fileinput = document.getElementById("fileID");
    fileinput.click();
  }

  async function onPageChange(page) {
    await setPageNumber(page);
    await getCustomers();
    await setCounter((state) => state + 1);
  }

  const onShowSizeChange = async (current, size) => {
    await setPageSize(size);
    await getCustomers();
    await setCounter((state) => state + 1);
  }


  return (
    <React.Fragment>
      <Row style={{ justifyContent:"space-between" }}>
        <Col span={12}>
          <h2>Users</h2>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={8}>
              <Button 
                type="primary" 
                style={{ marginBottom: "10px", float: "right", marginRight: "10px"}}
                onClick={newCustomer}
              >
                Add User
              </Button>
            </Col>
            {/* <Col>
              <Upload {...uploadComponentProps}>
                <Button icon={<UploadOutlined />}>Upload Customers</Button>
              </Upload>
            </Col> */}
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
                >
                  Upload Users
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
                  upload();
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
        dataSource={customersData}
        columns={columns}
        rowKey="id"
        loading={loading}
        style={{ paddingBottom: "20px", whiteSpace: "nowrap" }}
        scroll={{ x: "auto" }}
        pagination={false}
        size="small"
      />
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
              onShowSizeChange={onShowSizeChange}
            />
    </React.Fragment>
  );
}

export default CustomerListComponent;
