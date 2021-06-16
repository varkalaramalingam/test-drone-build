import { Button, Row, Tabs } from "antd";
import React from "react";
import BackButton from "../../components/BackButton";
import Plot from "./plot/Plot";
import ViewContent from "./ViewContent";
import { useHistory, useLocation} from "react-router-dom";
import CrewAndCast from "./crew-cast/CrewAndCast";
import Regions from "./regions/Regions";
import TitleLanguages from "./title-languages/TitleLanguages";
import TitleGenres from "./title-genres/TitleGenres";
import TitleSubGenres from "./title-subGenres/TitleSubGenres";
import TitleAttributes from "./title-attributes/TitleAttributes";
import RelatedTitles from "./relatedTitles/RelatedTitles";
import Keywords from "./Keywords";
import TitleRatings from "./title-ratings/TitleRatings";
import TitleReviews from "./title-reviews/TitleReviews";
import Awards from "./title-awards/Awards";
import TitlePeopleAwards from "./people-awards/TitlePeopleAwards";
import BoxOffice from "./box-office/BoxOffice";
import Seasons from "./seasons/Seasons";
import Episodes from "./episodes/Episodes";
import TitleVotes from "./title-votes/TitleVotes";
import TitleRatingVotes from "./title-rating-votes/TitleRatingVotes";
import TitleAliases from "./title-aliases/TitleAliases";
import { LeftOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
function ContentTabs({match}) {
  let location = useLocation();
  let history = useHistory();
  let movieTitle = location?.state?.record.title;
  let movieOriginalTitle = location?.state?.record.originalTitle;
  let titleId = location?.state?.record.id;
  let metaTitleId = location?.state?.record.metaTitleId;
  let selectedTab = location.search.substring(1, location.search.length);

  return (
    <>
    <Row style={{ display: "flex", flexDirection: "row-reverse", justifyContent: "space-between" }}>
    <Button onClick={() => history.push("/catalogue")} icon={<LeftOutlined />}>Back</Button>
    <h2>Movie Title : {movieTitle ? movieTitle :movieOriginalTitle} - {metaTitleId}</h2>
    </Row>
    <Tabs size="large"
        defaultActiveKey={selectedTab}
        style={{userSelect: "none"}}
        onChange={key => {
          history.push({
            pathname: `${match.url}`,
            search: `${key}`,
            state: { record: location?.state?.record },
        });
        }}>
      <TabPane tab={"Basic Info"} key="basic-info">
        <ViewContent />
      </TabPane>
      <TabPane tab="Plot" key="plot">
        <Plot movieTitle={movieTitle} titleId={titleId}/>
      </TabPane>
      <TabPane tab="Keywords" key="keywords">
        <Keywords metaTitleId={metaTitleId} titleId={titleId} />
      </TabPane>
      <TabPane tab="Crew/Cast" key="crew-cast">
        <CrewAndCast movieTitle={movieTitle} titleId={titleId}/>
      </TabPane>
      <TabPane tab="Images" key="images">
        Images
      </TabPane>
      <TabPane tab="Reviews" key="reviews">
        <TitleReviews titleId={titleId}/>
      </TabPane>
      <TabPane tab="Regions" key="regions">
        <Regions titleId={titleId}/>
      </TabPane>
      <TabPane tab="Genres" key="genres">
        <TitleGenres titleId={titleId}/>
      </TabPane>
      <TabPane tab="Languages" key="languages">
        <TitleLanguages titleId={titleId}/>
      </TabPane>
      <TabPane tab="Sub Genres" key="subGenres">
        <TitleSubGenres titleId={titleId}/>
      </TabPane>
      <TabPane tab="Title Attributes" key="title-attributes">
        <TitleAttributes titleId={titleId}/>
      </TabPane>
      <TabPane tab="Related Title" key="related-titles">
        <RelatedTitles titleId={titleId}/>
      </TabPane>
      <TabPane tab="Title Ratings" key="title-rating">
        <TitleRatings titleId={titleId}/>
      </TabPane> 
      <TabPane tab="Title Awards" key="title-awards">
        <Awards titleId={titleId}/>
      </TabPane> 
      <TabPane tab="People Awards" key="people-awards">
        <TitlePeopleAwards titleId={titleId}/>
      </TabPane>
      <TabPane tab="Box Office" key="box-office">
        <BoxOffice titleId={titleId}/>
      </TabPane>
      <TabPane tab="Seasons" key="seasons">
        <Seasons titleId={titleId}/>
      </TabPane>
      <TabPane tab="Episodes" key="episodes">
        <Episodes titleId={titleId} metaTitleId={metaTitleId} title={location.state?.record.title}/>
      </TabPane>
      <TabPane tab="Title Votes" key="title-votes">
        <TitleVotes titleId={titleId}/>
      </TabPane>
      <TabPane tab="Title Rating Votes" key="title-rating-votes">
        <TitleRatingVotes titleId={titleId}/>
      </TabPane>
      <TabPane tab="Title Aliases" key="title-aliases">
        <TitleAliases titleId={titleId}/>
      </TabPane>
    </Tabs>
    </>
  );
}

export default ContentTabs;
