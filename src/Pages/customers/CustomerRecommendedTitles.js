import React, { useState, useEffect } from "react";
import { Row, Col, Button, message, Spin } from "antd"
import RecommendationsCarousalComponent from "../../components/RecommendationsCarousalComponent";
import {io} from "../../api/io"

function CustomerRecommendedTitles({ customerData }) {
  
  const [customerRecommendations, setCustomerRecommendations] = useState([])
  const [loaded, setLoaded] = useState(false)
  
  useEffect(() => {
    getCustomerRecommendations()
  }, [])

  const getCustomerRecommendations = () => {
    io({ method: "get", url: `/api/reco/customer/${customerData.id}` })
        .then(({ data : { resultsMap : { CustomerRecommendations = [] }} } = {}) => {
          setCustomerRecommendations(CustomerRecommendations);
          console.log(CustomerRecommendations);
          setLoaded(true);
        })
        .catch((err) => {
          console.log(err);
          setLoaded(true);
        });
  }

  const deleteAllRecommendations = () => {
    io({ method: "delete", url: `/api/reco/customer/${customerData.id}` })
        .then((response) => {
          console.log(response);
          message.success("Recommendations Deleted Successfully")
          setCustomerRecommendations([])
        })
        .catch((err) => {
          console.log(err);
        });
  }
  
  const generateCustomerRecommendations = () => {
    io({ method: "get", url: `/api/reco/customer/${customerData.id}/generate` })
        .then((response) => {
          console.log(response);
          message.success("Recommendations Generated Successfully")
          getCustomerRecommendations()
        })
        .catch((err) => {
          console.log(err);
        });
  }

  return (
    <React.Fragment>
      <Row style={{ justifyContent:"space-between" }}>
        <Col span={12}>
          <h2>Recommended Titles</h2>
        </Col>
        <Row>
          <Col>
            <Button 
              type="primary" 
              style={{ marginBottom: "10px", float: "right", marginRight: "10px"}}
              onClick={deleteAllRecommendations}
            >
              Delete All
            </Button>
          </Col>
          <Col>
            <Button 
              type="primary" 
              style={{ marginBottom: "10px", float: "right", marginRight: "10px"}}
              onClick={() => {
                setLoaded(true);
                setTimeout(() => {
                  setLoaded(false)
                }, 1000);
                generateCustomerRecommendations()
              }}
            >
              Generate Recommendations 
            </Button>
          </Col>
        </Row>
      </Row>
      { loaded ?
        <div style={{ padding: "0 0 20px 0px", display: "inline" }}>
          <RecommendationsCarousalComponent customerRecommendations={customerRecommendations} />
        </div> : <Spin />
      }
    </React.Fragment>
  );
}

export default CustomerRecommendedTitles;
