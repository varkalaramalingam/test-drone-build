import React from 'react'
import RecommendationsCardComponent from './RecommendationsCardComponent';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function RecommendationsCarousalComponent({ customerRecommendations }) {
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
          key="RecommendationsCarousalComponent"
        >
          { customerRecommendations.length !== 0 ?
            customerRecommendations.map(recommendation => (
              <RecommendationsCardComponent 
                key={recommendation.id}
                recommendation={recommendation}
              />
            )) :
            <div>No Recommendations available</div>
          }
        </Carousel>
      )
}

export default RecommendationsCarousalComponent
