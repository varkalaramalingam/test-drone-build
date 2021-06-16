import { Button, Col, Input, Pagination, Row, Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "../../api/io";
import AddButton from "../../components/AddButton";

function PeopleListComponent() {
  const [peopleData, setPeopleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => { getPeopleData() }, []);
  const getPeopleData = (page, size) => {
    io({ method: "get", url: `/api/people?pageNumber=${page == undefined ? pageNumber : page}&pagesize=${size == undefined ? pageSize : size}` })
      .then(({ data = [] } = {}) => {
        setPeopleData(data.resultsMap.result);
        setTotalRecords(data.totalRecords)
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
      });
    }

    async function onPageChange(page, size) {
      await setPageNumber(page);
      await setPageSize(size);
      await getPeopleData(page, size);
    }
  
    const onClickSearch = () => {
      io({ method: "get" , url: `/api/people/search?firstname=${searchValue}` })
      .then(({ data = [] } ={}) =>{
        setPeopleData(data.resultsMap.result);
      })
      .catch((error) => {
        console.log(error);
      })
    }

  return (
    <>
    <Row span={4} style={{ justifyContent: "space-between" }}>
    <Col>
      <h2>People</h2>
      </Col>
    <Col>
    <Input.Search
           placeholder="Enter people name"
           autoFocus
           enterButton={<Button disabled={searchValue === "" ? true : false} type="primary" >Search</Button>}
           allowClear
           onSearch={(e) => onClickSearch(e)}
           onChange={(e) => {
             setSearchValue(e.target.value)
            }}
         />
      </Col>
      <Col>
      <AddButton
        path="/people/add-people"
        addPage="Add People"
        isAdd="true"
       />
       </Col>
       </Row>
      <Table
        dataSource={peopleData}
        style={{ paddingBottom: "20px" }}
        scroll={{ x: 1100 }}
        loading={!loading}
        size="small"
        rowKey="id"
        pagination={false}
      >
        <Column title="Id" dataIndex="id" key="id" />
        <Column title="Primary RoleId" dataIndex="primaryroleid" key="primaryroleid" width={100}/>
        <Column title="Primary Role" dataIndex="rolename" key="rolename" width={120}/>
        <Column title="First Name" dataIndex="firstname" key="firstname" width={120}/>
        <Column title="Last Name" dataIndex="lastname" key="lastname" />
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Summary" dataIndex="summary" key="summary" />
        <Column title="Media Title" dataIndex="mediatitle" key="mediatitle" />
        <Column title="Marital Status" dataIndex="maritalstatus" key="maritalstatus" />
        <Column title="Introduced Year" dataIndex="introduced_year" key="introduced_year" />
        <Column
          title="Action"
          key="action"
          align="center"
          width={180}
          fixed="right"
          render={(record) => (
            <Space size="small">
              <Link
                style={{ paddingRight: "20px" }}
                to={{
                  pathname: `/people/${record.id}`,
                  state: { isAdd: false, record: record },
                }}
              >
                View
              </Link>
              <Link
                to={{
                  pathname: `/people/${record.id}/edit-people`,
                  state: { isAdd: false, record: record },
                }}
              >
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
        />
    </>
  );
}

export default PeopleListComponent;
