import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import styled from "styled-components";
import { mobile } from "../../responsive";
// import "./Carousel.css";

const CarouselDiv = styled.div`
  overflow: hidden;
  ${mobile({ top: "120px", position: "relative" })}
`;

const CarouselInner = styled.div`
  white-space: nowrap;
  transition: transform 1s;
`;

const CarouselItemDiv = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${mobile({ width: "100%" })}
`;

const CarouselImg = styled.img`
  width: 96.5%;
  object-fit: cover;
  ${mobile({ width: " 100%" })}
  &:hover {
    cursor: pointer;
  }
`;

export const CarouselItem = ({ children, width, link }) => {
  const history = useHistory();
  return (
    <CarouselItemDiv>
      <CarouselImg src={children} alt="" onClick={() => history.push(link)} />
    </CarouselItemDiv>
  );
};

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 2000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  return (
    <CarouselDiv
      {...handlers}
      // className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <CarouselInner
        // className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </CarouselInner>
    </CarouselDiv>
  );
};

export default Carousel;
