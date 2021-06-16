
import React from 'react'
import HistoryCardItem from './HistoryCardComponent';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function HistoryCarouselComponent({ customerHistory, handleEdit, deleteTimeline, selectTimelines, timelineIds }) {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          slidesToSlide: 3 
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3,
          slidesToSlide: 2 
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 
        }
      };

     return (
        <Carousel
          className="carousel"
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          infinite={false}
          dotListClass="custom-dot-list-style"
          key="HistoryCarousalComponent"
        >
          { customerHistory.length !== 0 ?
            customerHistory.map(history => (
              <HistoryCardItem 
                key={history.id}
                timelineid={history.id} 
                title={history.originalTitle} 
                img={history.iconUrl1} 
                watchtime={history.watchtime}
                runtime={history.runtime}
                history={history}
                handleEdit={handleEdit}
                deleteTimeline={deleteTimeline}
                selectTimelines={selectTimelines}
                timelineIds={timelineIds}
              />
            )) :
            <div>No History available</div>
          }
        </Carousel>
      )
}

export default HistoryCarouselComponent
