import React, { useEffect, useState } from "react";
import { Button, Input, Form, Row, Col, Upload, Select, message, Space, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import BackButton from "../../components/BackButton";
import { io } from "../../api/io";
import { useHistory } from "react-router-dom";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import moment from "moment";
import { titleIdRegExp } from "../../components/reusable/validations/Regex";


function ContentEditComponent(props) {
  let history = useHistory();
  let isAdd = props.location.state?.isAdd;
  let initialData = props.history.location.state?.record;

  const [ languageData, setLanguageData ] = useState([]);
  const [ genreData, setGenreData ] = useState([]);
  useEffect(() => {
    io({ method: "get", url:"/api/genre" })
      .then(({ data = [] } = {}) => {
        setGenreData(data.resultsMap.result);
      })
      .catch(() =>{
        console.log(false);
      })
  }, [])

  useEffect(() => {
    io({ method: "get", url:"/api/language" })
      .then(({ data = [] } = {}) => {
        setLanguageData(data.resultsMap.result);
      })
      .catch(() =>{
        console.log(false);
      })
  }, [])


const onSubmit = (fields) => {
  let dateToMilliSeconds = fields.releaseDate;
   fields.releaseDate = moment.duration(dateToMilliSeconds).asMilliseconds();
   let dateToYears = fields.releaseYear;
   fields.releaseYear = moment(dateToYears).year();
   console.log(initialData?.releaseYear);
  io({ method:isAdd ? "post":"patch", url: `/api/mastermeta?masterMetaId=${!isAdd ? initialData.id : ""}`, data:fields })
  .then(({response}) => {
    message.success(`content ${isAdd? 'added' : 'updated' }successfully`)
    history.push("/catalogue");
  })
  .catch((error) => {
    message.error(error.message);
    console.log(error);
  });
}

const validationSchema = yup.object({
  title: yup.string()
      .required("required"),
  metaTitleId: yup.string()
      .required("required")
      .matches(titleIdRegExp, "Must contain atleast 2 alphabets, 7 digits"),
  primaryLanguage: yup.string()
      .required("required"),
  releaseYear: yup.string()
      .required("required"),
  releaseDate: yup.string()
      .required("required"), 
  releaseType: yup.string()
      .required("required"),         
});

  return (
    <>
      <BackButton pageName={ isAdd ? "Add Catalogue" : "Edit Catalogue"}/>
      <Formik
                initialValues={{
                  genreId: initialData?.genreId || undefined,
                  language: initialData?.language || "",
                  isAdult: initialData?.isAdult || "0",
                  istrailer: initialData?.istrailer || "0",
                  reference_urls: initialData?.reference_urls || "",
                  region: initialData?.region || "",
                  primaryLanguage:initialData?.primaryLanguage || undefined,
                  releaseYear: moment(initialData?.releaseYear) || undefined,
                  releaseType: initialData?.releaseType || undefined,
                  releaseDate: moment(initialData?.releaseDate) || undefined,
                  runtime: initialData?.runtime || "",
                  title: initialData?.title || "",
                  keyword: initialData?.keyword || "",
                  originalTitle: initialData?.originalTitle || "",
                  metaTitleId: initialData?.metaTitleId || "",
                  titleType: initialData?.titleType || undefined,
                  industryType: initialData?.industryType || "",
                  isDubbed:initialData?.isDubbed || "0",
                  isRemade : initialData?.isRemade || "0",
                  director:initialData?.director || undefined,
                  writter:initialData?.writter || undefined,
                  producers:initialData?.producers || undefined,
                  bannerImage1:initialData?.bannerImage1 || "",
                  bannerImage2:initialData?.bannerImage2 || "",
                  iconUrl1:initialData?.iconUrl1 || "",
                  iconUrl2:initialData?.iconUrl2 || "",
                }}
                validationSchema={validationSchema}
                onSubmit={(fields) => {
                  onSubmit(fields) 
                }}
                
              >
                {({ handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue }) => (
      <Form
        layout="vertical"
        className="content-edit"
        onSubmit={handleSubmit}
      >
        <Row>
          <Col span={12} style={{ paddingRight: "10px" }}>
            <Form.Item label="Title" required>
              <Input
                name="title"
                value={values.title}
                placeholder="Enter Title"
                onChange={(e) => handleChange(e)}
                className={
                  "form-control" +
                  (errors.title && touched.title
                    ? " is-invalid"
                    : "")
                }
              />
              <ErrorMessage name="title" component="div" className="invalid-feedback" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Original Title">
              <Input
                placeholder="Enter Original Title"
                name="originalTitle"
                value={values.originalTitle}
                onChange={(e) => handleChange(e)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ paddingRight: "10px" }}>
            <Form.Item label="TitleId" required>
              <Input
                name="metaTitleId"
                value={values.metaTitleId}
                placeholder="Enter TitleId"
                onChange={(e) => handleChange(e)}
                className={
                  "form-control" +
                  (errors.metaTitleId && touched.metaTitleId
                    ? " is-invalid"
                    : "")
                }
              />
              <ErrorMessage name="metaTitleId" component="div" className="invalid-feedback" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Title Type" >
              <Select 
                placeholder="Select Title Type"
                name="titleType"
                value={values.titleType}
                onChange={item => setFieldValue("titleType", item)}
                allowClear
             >
                 <Select.Option value="Movie">Movie</Select.Option>
                 <Select.Option value="Web Series">Web Series</Select.Option>
             </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ paddingRight: "10px" }}>
          <Form.Item label="Primary Language" required>
              <Select
                name="primaryLanguage"
                value={values.primaryLanguage}
                placeholder="select primary Language"
                onChange={(id) => setFieldValue("primaryLanguage", id )}
                allowClear
              >
                 {languageData?.map(({id, language}) => (
                  <Select.Option key={id} value={id}>
                    {language}
                  </Select.Option>
                ))}
                  className={
                  "form-control" +
                  (errors.primaryLanguage && touched.primaryLanguage
                    ? " is-invalid"
                    : "")
                }
              </Select>
              <ErrorMessage name="primaryLanguage" component="div" className="invalid-feedback" />
            </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item label="Industry Type">
              <Input
                placeholder="Enter Industry Name"
                name="industryType"
                value={values.industryType}
                onChange={(e) => handleChange(e)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ paddingRight: "10px" }} >
            <Form.Item label="Release Date" htmlFor="releaseDate"  required>
                 <DatePicker 
                   type="date"
                   style={{width:"100%"}}
                   name="releaseDate"
                   value={values.releaseDate}
                   onChange={item => setFieldValue("releaseDate", item)}
                   onBlur={handleBlur}
                   placeholder="Select release date"
               />
              <ErrorMessage name="releaseDate" component="div" className="invalid-feedback" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Release Type" required>
               <Select 
                placeholder="Enter Release Type"
                name="releaseType"
                value={values.releaseType}
                onChange={item => setFieldValue("releaseType", item)}
                allowClear
             >
                 <Select.Option value="Theatre">Theatre</Select.Option>
                 <Select.Option value="Ott">Ott</Select.Option>
             </Select>
              <ErrorMessage name="releaseType" component="div" className="invalid-feedback" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ paddingRight: "10px" }}>
          <Form.Item label="Run Time" required>
              <Input
                placeholder="Enter Run time"
                name="runtime"
                value={values.runtime}
                type="number"
                onChange={(e) => handleChange(e)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Release Year" required>
              <DatePicker 
                   type="date"
                   picker="year"
                   style={{width:"100%"}}
                   name="releaseYear"
                   value={values.releaseYear}
                   onChange={(item) => setFieldValue("releaseYear", item)}
                   onBlur={handleBlur}
                   placeholder="Select release date"
                   className={
                    "form-control" +
                    (errors.releaseYear && touched.releaseYear
                      ? " is-invalid"
                      : "")
                  }
               />
              <ErrorMessage name="releaseYear" component="div" className="invalid-feedback" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ paddingRight: "10px" }}>
          </Col>
          <Col span={12}>
          </Col>
        </Row>

        <Row>
          <Col span={12} style={{ paddingRight: "10px" }}>
          <Form.Item label="Is Trailer" >
             <Select 
               name="istrailer"
               value={values.istrailer}
               placeholder="Select istrailer"
               onChange={item => setFieldValue("istrailer", item)}
               allowClear
             >
                 <Select.Option value="1">Yes</Select.Option>
                 <Select.Option value="0">No</Select.Option>
             </Select>
            </Form.Item> 
          </Col>
          <Col span={12}>
            <Form.Item label="Reference Url">
              <Input 
                placeholder="Enter reference url"
                name="reference_urls"
                value={values.reference_urls}
                onChange={handleChange}
                allowClear
             />
            </Form.Item>
          </Col>
        </Row>


        <Row>
          <Col span={12} style={{ paddingRight: "10px" }}>
          <Form.Item label="Is Adult" >
             <Select 
                name="isAdult"
                value={values.isAdult}
                placeholder="Select IsAdult"
                onChange={item => setFieldValue("isAdult", item)}
                allowClear
             >
                 <Select.Option value="1">Yes</Select.Option>
                 <Select.Option value="0">No</Select.Option>
             </Select>
            </Form.Item> 
          </Col>
          <Col span={12}>
            <Form.Item label="Is Dubbed">
              <Select 
                placeholder="Enter IsDubbbed"
                name="isDubbed"
                value={values.isDubbed}
                onChange={item => setFieldValue("isDubbed",item)}
                allowClear
             >
                 <Select.Option value="1">Yes</Select.Option>
                 <Select.Option value="0">No</Select.Option>
             </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ paddingRight: "10px" }}>
            <Form.Item label="Is Remade">
              <Select 
                placeholder="Enter IsRemaded"
                name="isRemade"
                value={values.isRemade}
                onChange={item => setFieldValue("isRemade",item)}
                allowClear
             >
                 <Select.Option value="1">Yes</Select.Option>
                 <Select.Option value="0">No</Select.Option>
             </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
          <Row>
              <Col span={12}>
                <Form.Item label="Icon Url" name="iconUrl1" value={values.iconUrl1}>
                  <Upload
                    listType="picture"
                    style={{ display: "block" }}
                    maxCount={1}
                    onChange={(file) => setFieldValue("iconUrl1", file.fileList[0]?.name)}
                  >
                    <Button
                      icon={<UploadOutlined />}
                      style={{ width: "100%" }}
                      block
                    >
                      Upload Icon
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span="auto">
                <Form.Item label="Icon Url2" name="iconUrl2" value={values.iconUrl2}>
                  <Upload
                    listType="picture"
                    maxCount={1}
                    onChange={(file) => setFieldValue("iconUrl2", file.fileList[0]?.name )}
                  >
                    <Button
                      icon={<UploadOutlined />}
                      style={{ width: "100%" }}
                      block
                    >
                      Upload Icon
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ paddingRight: "10px" }}>
          <Row>
              <Col span={12}>
              <Form.Item
                  label="Banner Image"
                  name="bannerImage1"
                  value={values.bannerImage1}
                  style={{ paddingRight: "5px" }}
                >
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture"
                    maxCount={1}
                    onChange={(file) => setFieldValue( "bannerImage1", file.fileList[0]?.name )}
                  >
                    <Button icon={<UploadOutlined />}>
                      Upload Banner Image
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span="auto">
              <Form.Item
                  label="Banner Image2"
                  name="bannerImage2"
                  value={values.bannerImage1}
                >
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture"
                    maxCount={1}
                    onChange={(file) => setFieldValue("bannerImage2" , file.fileList[0]?.name )}
                  >
                    <Button icon={<UploadOutlined />}>
                      Upload Banner Image
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Form.Item style={{ textAlign: "right" }}>
        <Space>
          <Button onClick={() => history.push("/catalogue")}>Close</Button>
          <Button type="primary" onClick={handleSubmit} >
            Submit
          </Button>
        </Space>
      </Form.Item>
      </Form>
  )}
  </Formik>
    </>
  );
}

export default ContentEditComponent;
