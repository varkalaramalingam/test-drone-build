import {  AutoComplete, Button, Checkbox,  Menu, Radio, Row, Select, Space } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import Text from 'antd/lib/typography/Text';
import React, { useEffect, useState } from 'react'
import { io } from '../../api/io';

function AdvancedSearch({ setGenreList, setSubGenreList, setRolesList, setPeopleList }) {
    const [ genreData, setGenreData ] = useState([]);
    const [ peopleData, setPeopleData ] = useState([]);
    const [ subgenreData, setSubGenreData ] = useState([]);
    const [ rolesData, setRoleData ] = useState([]);
    const [ languageData, setLanguageData ] = useState([]);
    const [ regionsData, setRegionsData ] = useState([]);
    const [ attributeData, setAttributeData ] = useState([]);
    const [ awardsData, setAwardsData ] = useState([]);

    useEffect(() => {
      io({ method: "get", url: "/api/subgenre/active" })
        .then(({ data = [] } = {}) => {
          setSubGenreData(data.resultsMap.result);
      })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    useEffect(() => {
      io({ method: "get", url: `/api/genre/active` })
        .then(({ data = [] } = {}) => {
          setGenreData(data.resultsMap.result);
        })
        .catch((error) => {
          console.log(error);
        });
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

  useEffect(() => {
    io({ method: "get", url: "/api/role" })
      .then(({ data = [] } = {}) => {
        setRoleData(data.resultsMap.result);
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);


    const getPeopleData = (searchValue) => {
      io({ method: "get", url: `/api/people/search?firstname=${searchValue}` })
        .then(({ data = [] } = {}) => {
          setPeopleData(data.resultsMap.result);
        })
        .catch((error) => {
          console.log(error);
        });
    }

      useEffect(() => {
        io({ method: "get", url: `/api/mastermeta/region` })
          .then(({data}) => {
            setRegionsData(data.resultsMap.result);;
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

      useEffect(() => {
        io({ method: "get", url: "/api/mastermeta/attributes" })
          .then(({ data = [] } = {}) => {
            setAttributeData(data.resultsMap.result);
          })
          .catch((error) => {
            console.log(error);
          })
      }, []);

      useEffect(() => {
        io({ method: "get", url: `/api/awards` })
          .then(({ data }) => {
            setAwardsData(data.resultsMap.result);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
      
const SearchButton = () => {
  return <Button type="primary" htmlType="submit" size="small" style={{margin:"10px"}}>Search</Button>
 }

    return (
        <>
        <Space style={{padding: "0 0 15px 20px"}}>
        <Text type="secondary">ADVANCED SEARCH</Text>
        </Space>
        <Menu
          theme="light"
          style={{ minWidth: "150px", maxWidth: "220px"}}
          defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7', 'sub8', 'sub9', 'sub10']}
          mode="inline"
        >
           {/* ==========  Genres ===========  */}
          <SubMenu key="sub1" title="Genre">
          <div style={{minHeight:"auto", maxHeight:"160px", overflowY:"auto", paddingLeft:"10px"}}>
              <Checkbox.Group style={{ width: "100%" }} onChange={(e) => setGenreList(e)}>
              {genreData.map((item) => (
                  <Row span={24} className="checkBox"><Checkbox value={item.id} key={item.id}>{item.name}</Checkbox></Row>
                ))}
            </Checkbox.Group>
            </div>
          <SearchButton />
          </SubMenu>
    
           {/* ==========  Sub-Genres ===========  */}
          <SubMenu key="sub2" title="Sub Genre">
          <div style={{minHeight:"auto", maxHeight:"160px", overflowY:"auto", paddingLeft:"10px"}}>
            <Checkbox.Group style={{ width: "100%" }} onChange={(e) => setSubGenreList(e)}>
              {subgenreData.map((item) => (
                <Row span={24} className="checkBox"><Checkbox value={item.id} key={item.id}>{item.name}</Checkbox></Row>
              ))}
          </Checkbox.Group>
          </div>
          <SearchButton />
          </SubMenu>
    
         {/* ==========  Languages  ===========  */}
          <SubMenu key="sub3" title="Languages">
          <div style={{minHeight:"auto", maxHeight:"160px", overflowY:"auto", paddingLeft:"10px"}}>
              <Checkbox.Group style={{ width: "100%" }} onChange={(e) => console.log(e)}>
                {languageData.map((item) => (
                  <Row span={24} className="checkBox"><Checkbox value={item.id} key={item.id}>{item.language}</Checkbox></Row>
                ))}
            </Checkbox.Group>
          </div>
          <SearchButton />
          </SubMenu>
          
         {/* ==========  Ratings ===========  */}
          <SubMenu key="sub4" title="Ratings">
              <Radio.Group >
            <Space direction="vertical" style={{padding:"10px 0 0 20px"}}>
              <Radio value={1} key={1}>&#60; 5</Radio>
              <Radio value={2} key={2}>&#60; 6</Radio>
              <Radio value={3} key={3}>&#60; 7</Radio>
              <Radio value={4} key={4}>&#60; 8</Radio>
              <Radio value={5} key={5}>&#60; 9</Radio>
            </Space>
          </Radio.Group>
          <br/>
          <SearchButton />
          </SubMenu>
    
          {/* ==========  Roles ===========  */}
          <SubMenu key="sub5" title="Roles">
          <Select
             showSearch
             mode="multiple"
             placeholder="Search to Select Genre"
             optionFilterProp="children"
             onChange={(e) => setRolesList(e)}
             allowClear
             size="small"
             style={{padding:"0 10px 0 10px", width:"100%"}}
           >
             {rolesData?.map((item) => (
               <Select.Option value={item.id} key={item.id}>{item.rolename}</Select.Option>
             ))}
           </Select>
           <SearchButton />
          </SubMenu>
      
           {/* ==========  People  ===========  */}
          <SubMenu key="sub6" title="People">
          <AutoComplete
                    onChange={(e) => {
                      // setPeopleList(e)
                      getPeopleData(e)}}
                    placeholder="input here"
                    style={{width:"100%", padding:"0 10px 0 10px"}}
                    size="small"
                    allowClear
                    // mode="multiple"
                    name="peopleId"
                  >
                     {peopleData?.map((item) => {
                     return(<Select.Option value={item.id} key={item.id}>{item.firstname}</Select.Option>
                  )})}
                </AutoComplete>
                {/* <Select
                  showSearch
                  mode="multiple"
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  allowClear
                  size="small"
                  onChange={(e) => setPeopleList(e)}
                  style={{margin:"0 0 0 10px", width:"90%"}}
                >
                  {peopleData?.map((item) => (
                    <Select.Option value={item.id} key={item.id}>{item.firstname}</Select.Option>
                  ))}
                </Select> */}
                <SearchButton />
          </SubMenu>
      
          {/* ==========  Regions ===========  */}
          <SubMenu key="sub7" title="Regions">
             <div style={{minHeight:"auto", maxHeight:"160px", overflowY:"auto", paddingLeft:"10px"}}>
              <Checkbox.Group style={{ width: "100%" }} onChange={(e) => console.log(e)}>
                {regionsData.map((item) => (
                  <Row span={24} className="checkBox"><Checkbox value={item.id} key={item.id}>{item.regionname}</Checkbox></Row>
                ))}
            </Checkbox.Group>
          </div>
          <SearchButton />
          </SubMenu>
           
         {/* ==========  Title Attributes ===========  */}
          <SubMenu key="sub8" title="Title Attributes">
            <Select
                  showSearch
                  mode="multiple"
                  placeholder="Search to Select Genre"
                  optionFilterProp="children"
                  onChange={(e) => console.log(e)}
                  allowClear
                  size="small"
                  style={{padding:"0 10px 0 10px", width:"100%"}}
                >
                  {attributeData?.map((item) => (
                    <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                  ))}
                </Select>
                <SearchButton />
          </SubMenu>

           {/* ==========  Title Awards ===========  */}
          <SubMenu key="sub9" title="Title Awards">
             <div style={{minHeight:"auto", maxHeight:"160px", overflowY:"auto", paddingLeft:"10px"}}>
              <Checkbox.Group style={{ width: "100%" }} onChange={(e) => console.log(e)}>
                {awardsData.map((item) => (
                  <Row span={24} className="checkBox"><Checkbox value={item.id} key={item.id}>{item.awardname}</Checkbox></Row>
                ))}
            </Checkbox.Group>
          </div>
          <SearchButton />
          </SubMenu>
        
         {/* ==========  Box Office ===========  */}
           <SubMenu key="sub10" title="Box Office">
          <Radio.Group >
        <Space direction="vertical" style={{padding:"10px 0 0 20px"}}>
          <Radio value={1}>&#60; 1 M</Radio>
          <Radio value={2}>&#60; 10 M</Radio>
          <Radio value={3}>&#60; 30 M</Radio>
          <Radio value={4}>&#60; 50 M</Radio>
          <Radio value={5}>&#60; 100 M</Radio>
        </Space>
      </Radio.Group>
      <br/>
      <SearchButton />
     </SubMenu>
    </Menu>
   </>
  )  
}



export default AdvancedSearch
