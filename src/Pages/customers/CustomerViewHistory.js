import React, { useState, useEffect} from "react";
import HistoryCarouselComponent from "../../components/HistoryCarouselComponent";
import { Row, Col, Button, Modal, Form, Input, Divider, Select, DatePicker, Spin } from "antd"
import {io} from "../../api/io"
import { Formik, ErrorMessage } from "formik"
import * as yup from "yup";
import moment from "moment";

function CustomerViewHistory({ customerData }) {

  const validationSchema = yup.object({
      titleId: yup.string()
          .required("required"),
      devicename: yup.string()
          .required("required"),
      deviceid: yup.string()
          .required("required")
          .nullable(),
      watchtime: yup.string()
          .required("required")
          .nullable(),
      view_date: yup.string()
          .required("required"),
  });

  const [customerHistory, setCustomerHistory] = useState([]);
  const [action, setAction] = useState("Add");
  const [EditedUserHistoryRecord, setEditedUserHistoryRecord] = useState({})
  const [moviesData, setMoviesData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [timelineIds, setTimelineIds] = useState([]);

  const getCustomerHistory = () => {
    io({ method: "get", url: `/api/customer/${customerData.id}/timeline` })
        .then(({ data : { resultsMap : { result = [] }} } = {}) => {
          setCustomerHistory(result);
          console.log(result);
          setLoaded(true);
        })
        .catch((err) => {
          console.log(err);
          setLoaded(true);
        });
  }

  useEffect(() => {
    getCustomerHistory();
  }, [])

  const showModal = () => {
    setAction("Add")
    getMovies();
    setIsModalVisible(true);
  };

  const getMovies = () => {
    io({ method: "get", url: "/api/mastermeta" })
      .then(({ data : { resultsMap : { result = [] }} } = {}) => {
        setMoviesData(result);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleAddHistory = (fields) => {
    let dateToMilliSeconds = fields.view_date;
    const payload = {
      personaId: customerData.id,
      metaTitleId: fields.titleId,
      devicename: fields.devicename,
      deviceid: fields.deviceid,
      watchtime: fields.watchtime,
      view_date: moment.duration(dateToMilliSeconds).asMilliseconds(),
    }
    console.log(fields)
    io({ method: "post", url: "/api/customer/timeline", data: payload })
        .then((response) => {
          console.log(response);
          setIsModalVisible(false);
          setLoaded(false);
          getCustomerHistory();
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleEdit = (history) =>{
    console.log(history);
    console.log(moment(history));
    setEditedUserHistoryRecord(history);
    getMovies()
    setAction("Edit");
    setIsModalVisible(true);
  }
  
  const handleEditHistory = (fields) => {
    let dateToMilliSeconds = fields.view_date;
    const payload = {
      id: fields.id,
      personaId: customerData.id,
      metaTitleId: fields.titleId,
      devicename: fields.devicename,
      deviceid: fields.deviceid,
      watchtime: fields.watchtime,
      view_date: moment.duration(dateToMilliSeconds).asMilliseconds(),
    }
    console.log(fields)
    io({ method: "patch", url: `/api/customer/${customerData.id}/timeline`, data: payload })
        .then((response) => {
          console.log(response);
          setIsModalVisible(false);
          setLoaded(false);
          getCustomerHistory();
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deleteTimeline = (timelineid) => {
    let emptyArray = []
    emptyArray.push(timelineid)
    const payload = {
      timelineList: emptyArray,
      personaId: 0
    }
    io({ method: "delete", url: "/api/customer/timeline/delete", data: payload })
        .then((response) => {
          console.log(response);
          let presentIndex = null;
          const present = timelineIds.some((id, index) => {
            if(id===timelineid){
              presentIndex = index;
              return true;
            }
          })
          let timelines = [...timelineIds];
          if(present){
            timelines.splice(presentIndex, 1);
          }
          setTimelineIds(timelines)
          setLoaded(false);
          setCustomerHistory([])
          getCustomerHistory();
        })
        .catch((err) => {
          console.log(err);
        });
    console.log(timelineIds)
  }

  const selectTimelines = (timelineid) => {
    let presentIndex = null;
    const present = timelineIds.some((id, index) => {
      if(id===timelineid){
        presentIndex = index;
        return true;
      }
    })
    let timelines = [...timelineIds];
    if(present){
      timelines.splice(presentIndex, 1);
    } else {
      timelines.push(timelineid);
    }
    setTimelineIds(timelines)
    console.log(timelineIds)
  }

  const deleteSelectedTimelines = () =>{
    const payload = {
      timelineList: timelineIds,
      personaId: 0
    }
    Delete(payload)
  }
  
  const deleteAllTimelines = () =>{
    const payload = {
      timelineList: [],
      personaId: customerData.id
    }
    Delete(payload)
  }

  const Delete = (payload) => {
    io({ method: "delete", url: "/api/customer/timeline/delete", data: payload })
        .then((response) => {
          console.log(response);
          setTimelineIds([])
          setCustomerHistory([])
          setLoaded(false);
          getCustomerHistory();
        })
        .catch((err) => {
          console.log(err);
        });
  }

  return (
    <React.Fragment>
      <Row style={{ justifyContent:"space-between" }}>
        <Col span={12}>
          <h2>History</h2>
        </Col>
        <Row>
          <Col>
            <Button 
              type="primary" 
              style={{ marginBottom: "10px", float: "right", marginRight: "10px"}}
              onClick={deleteSelectedTimelines}
              disabled={timelineIds.length==0}
            >
              Delete Selected
            </Button>
          </Col>
          <Col>
            <Button 
              type="primary" 
              style={{ marginBottom: "10px", float: "right", marginRight: "10px"}}
              onClick={deleteAllTimelines}
              disabled={customerHistory.length==0}
            >
              Delete All
            </Button>
          </Col>
          <Col>
            <Button 
              type="primary" 
              style={{ marginBottom: "10px", float: "right", marginRight: "10px"}}
              onClick={showModal}
            >
              Add History
            </Button>
          </Col>
        </Row>
      </Row>
      <Modal 
        title={ action === "Add" ? "Add Customer History" : "Edit Customer History" }
        visible={isModalVisible} 
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Formik
          initialValues={ action === "Add" ? {
              titleId: undefined,
              devicename: undefined,
              deviceid: null,
              watchtime: null,
              view_date: undefined,
            } :
            {
              id: EditedUserHistoryRecord.id,
              titleId: EditedUserHistoryRecord.titleId,
              devicename: EditedUserHistoryRecord.devicename,
              deviceid: EditedUserHistoryRecord.deviceid,
              watchtime: EditedUserHistoryRecord.watchtime,
              view_date: moment(EditedUserHistoryRecord.view_date),
            }
          }
          validationSchema={validationSchema}
          onSubmit={(fields) => {
            if(action === "Add"){
              handleAddHistory(fields);
            } else {
              handleEditHistory(fields);
            }
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
            <Form
              layout="vertical"
              onSubmit={handleSubmit}
            >
              <Row>
                  <Col span={12} style={{ paddingRight: "5px" }}>
                      <Form.Item label="Title" htmlFor="titleId">
                          <Select 
                              name="titleId" 
                              type="text"
                              value={values.titleId} 
                              onChange={item => setFieldValue("titleId", item)}
                              onBlur={handleBlur}
                              placeholder="Select Title"
                              disabled={action !== "Add"}
                          >
                              { moviesData.length !== 0 ?
                                moviesData.map(movie => (
                                <Select.Option key={movie.id} value={movie.id}>{movie.originalTitle}</Select.Option>
                                )) : null
                              }
                          </Select>
                          <ErrorMessage name="titleId" component="div" className="invalid-feedback"/>
                      </Form.Item>
                  </Col>
                  <Col span={12}>
                      <Form.Item label="Device Type" htmlFor="devicename">
                          <Select 
                              name="devicename" 
                              type="text"
                              value={values.devicename} 
                              onChange={item => setFieldValue("devicename", item)}
                              onBlur={handleBlur}
                              placeholder="Select Device"
                              disabled={action !== "Add"}
                          >
                              <Select.Option value="Web">Web</Select.Option>
                              <Select.Option value="Mobile">Mobile</Select.Option>
                              <Select.Option value="TV">TV</Select.Option>
                          </Select>
                          <ErrorMessage name="devicename" component="div" className="invalid-feedback"/>
                      </Form.Item>
                  </Col>
              </Row>
              <Row>
                  <Col span={12} style={{ paddingRight: "5px" }}>
                      <Form.Item label="Device Id" htmlFor="deviceid">
                        <Input name="deviceid" type="number" value={values.deviceid} onChange={handleChange} onBlur={handleBlur} 
                            className={
                                "form-control" +
                                (errors.deviceid && touched.deviceid
                                ? " is-invalid"
                                : "")
                            }
                            disabled={action !== "Add"}
                            placeholder="Select Device Id"
                            
                        />
                        <ErrorMessage name="deviceid" component="div" className="invalid-feedback"/>
                      </Form.Item>
                  </Col>
                  <Col span={12} style={{ paddingRight: "5px" }}>
                      <Form.Item label="Watch Time" htmlFor="watchtime">
                          <Input name="watchtime" type="number" value={values.watchtime} onChange={handleChange} onBlur={handleBlur} 
                              className={
                                  "form-control" +
                                  (errors.watchtime && touched.watchtime
                                  ? " is-invalid"
                                  : "")
                              }
                              placeholder="Enter Time(mins)"
                          />
                          <ErrorMessage name="watchtime" component="div" className="invalid-feedback"/>
                      </Form.Item>
                  </Col>
              </Row>
              <Row>
                  <Col span={12}>
                      <Form.Item label="Date" htmlFor="view_date">
                          <DatePicker 
                              name="view_date" 
                              type="date"
                              showTime
                              value={values.view_date}
                              onChange={item => setFieldValue("view_date", item)}
                              onBlur={handleBlur}
                              placeholder="Select Viewed Date"
                          />
                          <ErrorMessage name="view_date" component="div" className="invalid-feedback"/>
                      </Form.Item>
                  </Col>
              </Row>
              <Divider span={24} />
              <Row style={{ display: "flex", flexDirection: "row-reverse" }}>
                  <Col style={{ paddingLeft: "10px" }}>
                      <Form.Item>
                          <Button type="primary" onClick={handleSubmit}>Submit</Button>
                      </Form.Item>
                  </Col>
                  <Col>
                      <Form.Item>
                          <Button onClick={handleCancel}>Cancel</Button>
                      </Form.Item>
                  </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Modal>
      { loaded ?
        <div style={{ padding: "0 0 20px 0px", display: "inline" }}>
          <HistoryCarouselComponent customerHistory={customerHistory} 
            handleEdit={handleEdit} 
            deleteTimeline={deleteTimeline}
            selectTimelines={selectTimelines}
            timelineIds={timelineIds}
          />
        </div> : <Spin />
      }
    </React.Fragment>
  );
}

export default CustomerViewHistory;
