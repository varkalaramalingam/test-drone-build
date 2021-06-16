import { useState, useEffect } from 'react';
import { Table, Space, Select, Form, message, Input, Button, Col, Row } from 'antd';
import Column from "antd/lib/table/Column";
import { Link } from "react-router-dom";
import AddTenantAssetComponent from './AddTenantAssetComponent';
import { DeleteOutlined, EyeOutlined} from '@ant-design/icons';
import { io } from '../../../api/io';

const { Option } = Select;

function TenantAssetsListComponent(){

    let urlPath =null;

    const [tenantData, setTenantData] = useState([]);
    const [filterValue, setFilterValue] = useState([]);
    const [tenantId, setTenantId] = useState();
    const [titleId, setTitleId] = useState();
    const [titleData, setTitleData] = useState([]);
    const [tenantAssetsData, setTenantAssetData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(100);

    useEffect(() => {
        getTenantAssetData();
        getTenantNamesData();
        getTitleNamesData();
    }, [totalRecords]);

    const getTenantNamesData = () => {
        io({ method: "get", url: "/api/tenant" })
          .then(({ data = [] } = {}) => {
            setTenantData(data.resultsMap.result);
            setLoading(true);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
        }

    const getTitleNamesData = async () => {
        io({ method: "get", url: `/api/mastermeta?pageNumber=1&pagesize=${totalRecords}`})
        .then(({ data = [] } = {}) => {            
            setTotalRecords(data.totalRecords);
            setTitleData(data.resultsMap.result)
        })
        .catch((error) => {
          message.error(error.message);
        });
    };

    function onTitleIdChange(event) {
        setTitleId(event);
        setTenantId(null);
        getTenantAssetData();
    } 

    function onTenantIdChange(event) {
        setTenantId(event);
        setTitleId(null);
        getTenantAssetData();
    } 

    if (filterValue === "tenantName"){
        tenantId === undefined || "" ? 
        urlPath = `/api/tenant/assets`:
        urlPath = `/api/tenant/assets/tenantId/${tenantId}`;
    } else if(filterValue === "titleName"){
        titleId === undefined || "" ? 
        urlPath = `/api/tenant/assets`:
        urlPath = `/api/tenant/assets/titleId/${titleId}`;
    } else {
        urlPath = `/api/tenant/assets`;
    }

    useEffect(() => {
        getTenantAssetData();
    }, [urlPath]);

    const getTenantAssetData = async () => {
        console.log(urlPath);
        io({ method: "get", url: urlPath })
        .then(({data =[]} ={}) => {
            setTenantAssetData(data.resultsMap.result);
            setLoading(true);
        })
        .catch((error) => {
            message.error(error.message);
            setLoading(false);
        });
    }

    const deleteTenantAssetOnClick = (rowId) =>{
        deleteTenantAsset(rowId);
    }

    const activateTenantAssetOnClick = (rowId) =>{
        activateTenantAsset(rowId);
    }
    

    const deleteTenantAsset = (id) => {
        io({ method: "delete", url: `/api/tenant/assets/${id}` })
        .then(({data = [] } = {}) => {
            message.success("Tenant Asset is Inactive");
            getTenantAssetData();
            setLoading(true);
        })
        .catch((error) =>{
            message.error(error.message);
            setLoading(false);
        })
    }

    const activateTenantAsset = (id) => {
        io({ method: "post", url: `/api/tenant/assets/active/${id}` })
        .then(({data = [] } = {}) => {
            message.success("Tenant Asset is Active");
            getTenantAssetData();
            setLoading(true);
        })
        .catch((error) =>{
            message.error(error.message);
            setLoading(false);
        })
    }

    const [file, setFile] = useState(null);
    const [dynamicKey, setDynamicKey] = useState(Date.now());

    const uploadTenantAssets = (e) => {
        let [uploadFileName, uploadFileExtention] = e.target.files[0].name.split(".")
        if(uploadFileExtention !== "csv"){
            message.error("Only CSV Files can be uploaded")
        } else {
            console.log(e);
            setFile(e.target.files[0]);
            console.log(file)
        }
    };

    const upload = () => {
        let formdata = new FormData();
        formdata.append("file", file);
        console.log(formdata," ======== formdata")
        io({ method: "post", url: '/api/upload/tenant/assets', data: formdata })
            .then(({ data : { resultsMap : { result = "" }} } = {}) => {
              console.log(result)
              message.success(result)
              message.success("Uploaded Tenant Assets CSV File Successfully")
              setDynamicKey(Date.now())
              setFile(null)
              getTenantAssetData()
            })
            .catch((err) => {
              console.log(err)
              message.error("Tenant Assets CSV File Not Uploaded");
            });
      }

    const HandleBrowseClick = () => {
        var fileinput = document.getElementById("fileID");
        fileinput.click();
    };

    const onFilterChange = (value) => {
        setFilterValue(value);
        setTenantId();
        setTitleId();
    }
   
    return(
        <>
        <Row style={{ justifyContent:"space-between" }}>
        <Col span={4}>
          <h2>Tenant Assets</h2>
        </Col>
        <Col span={20}>
          <Row>
          <Col span={4}>
                    <Form.Item  className="form-group" style={{ flex: "0 0 15%", maxWidth: "80%",  marginRight:"20px" }}>
                        <Select onChange={onFilterChange} placeholder="select option">
                            <Option value="tenantName">Tenant Names</Option>
                            <Option value="titleName">Title Names</Option>
                            <Option value="viewAll">View All</Option>
                        </Select>
                    </Form.Item>
                </Col>
             <Col span={4}>
                <Form.Item className="form-group" style={{ flex: "0 0 15%", maxWidth: "80%" }}>
                    {filterValue === "titleName" ?
                        <Select name="titleId" showSearch optionFilterProp="children" onClear={() => console.log("onClear")} value={titleData.title} placeholder="select title" onChange={onTitleIdChange} allowClear>
                        {titleData && 
                        Array.isArray(titleData) &&
                        titleData !== "" &&
                        titleData.map((data) => (
                            <Option value={data.id} key={data.metaTitleId}>{data.title}</Option>
                        ))}
                        </Select> : 
                        filterValue === "tenantName" ?
                        <Select name="tenantassetId" placeholder="select tenant"  onChange={onTenantIdChange} allowClear>
                        {tenantData && 
                        Array.isArray(tenantData) &&
                        tenantData !== "" &&
                        tenantData.map((data) => (
                            <Option value={data.id} key={data.tenantId}>{data.tenantName}</Option>
                        ))}
                        </Select> : null
                    }
                   
                </Form.Item>
            </Col>
            <Col span={2} style={{ margin : "0 10px 0 30px" }}>
            
            <AddTenantAssetComponent isAdd={true} getTenantAssetData={getTenantAssetData} />
              
            </Col>
            <Col span={8}> 
              <Input 
                type="file" 
                id="fileID"
                style={{ marginBottom: "10px", float: "left", display: "none" }}
                key={dynamicKey}
                onChange={e => uploadTenantAssets(e)}
              />
              <div style={{ display: "flex" }}>
                <Button 
                  type="primary" 
                  id="fakeBrowse" 
                  style={{ marginBottom: "10px", float: "right", marginRight: "10px"}}
                  onClick={HandleBrowseClick}
                >
                  Upload Tenant Assets
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
        <Table dataSource={ tenantAssetsData } rowKey="id" pagination={false} size="small" loading={!loading}>
            <Column title="Id" dataIndex="id" key="id" align="center" />
            <Column title="Tenant Code" dataIndex="tenantCode" key="tenantCode" align="center" />
            <Column title="Tenant ID" dataIndex="tenantId" key="tenantId" align="center" />
            <Column title="Tenant Name" dataIndex="tenantName" key="tenantName" align="center" />
            <Column title="Title ID" dataIndex="titleId" key="titleId" align="center" />
            <Column title="Title Name" dataIndex="title" key="titleName" align="center" />
            <Column title="Active" dataIndex="active" key="active" align="center" />
            <Column title="Action" key="action" align="center" 
            render={(record) =>  (
                <Space size="middle">
                    {record.active !== 1 ?
                    <Link title="Activate" onClick={() => activateTenantAssetOnClick(record.id)}
                        to={{
                        pathname: "/tenantAssets",
                        state: { isAdd: false, record: record },
                    }}><EyeOutlined /></Link>
                    : <Link title="Delete" onClick={() => deleteTenantAssetOnClick(record.id)}
                        to={{
                        pathname: "/tenantAssets",
                        state: { isAdd: false, record: record },
                    }}><DeleteOutlined /></Link>
                    }
              </Space>
            )}/>
        </Table>
        </>
    );
}

export default TenantAssetsListComponent    