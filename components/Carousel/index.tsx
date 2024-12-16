/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect, ReactNode } from "react";
import './style.css';

interface VerticalCarouselProps {
  items: string[]; // array of items to display in the carousel
}

export default function VerticalCarousel({items}: VerticalCarouselProps):ReactNode {
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll event listener for automatic scroll change
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      const { deltaY } = event;
      if(deltaY > 0) // For next scroll
      {
        setActiveIndex((activeIndex + 1) % items.length);
        window.scrollTo({
          top: (activeIndex + 1) * window.innerHeight,
          behavior: "smooth"
        })
      }
      else if( deltaY < 0 ) // For previous scroll
      {
        const newIndex = activeIndex - 1;
        setActiveIndex(newIndex < 0 ? (items.length - 1) : newIndex);
        window.scrollTo({
          top: ( activeIndex - 1 ) * window.innerHeight,
          behavior: "smooth"
        })
      }

      // const scrollTop = window.scrollY;
      // const windowHeight = window.innerHeight;
      // const newIndex = Math.round(scrollTop / windowHeight);

      // if (newIndex >= 0 && newIndex < items.length) {
      //   setActiveIndex(newIndex);
      // }
    };
    // handleScroll()
    window.addEventListener("wheel", handleScroll);
    
    return () => window.removeEventListener("wheel", handleScroll);
  }, [items.length, activeIndex]);

  // Manual navigation using the buttons
  // const goToNext = () => {
  //   setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  //   window.scrollTo({
  //     top: (activeIndex + 1) * window.innerHeight,
  //     behavior: "smooth",
  //   });
  // };

  // const goToPrev = () => {
  //   setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  //   window.scrollTo({
  //     top: (activeIndex - 1) * window.innerHeight,
  //     behavior: "smooth",
  //   });
  // };

  const changeToActive = (idx: number) => {
    setActiveIndex(idx);
    window.scrollTo({
      top: activeIndex * window.innerHeight,
      behavior: "smooth"
    })
  }

  return (
    <div className="carousel-container">
      <div
        className="carousel-content"
        style={{ transform: `translateY(-${activeIndex * 100}vh)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="carousel-item">
            { item }
          </div>
        ))}
      </div>
      <div className="controls">
        {/* <button onClick={goToPrev}>▲</button>
        <button onClick={goToNext}>▼</button> */}
        {
          items.map((item: string, idx: number) => {
            return(
              <div 
                key={idx} 
                className={`w-1 ${idx === activeIndex ? 'h-10' : 'h-1'} rounded-full bg-slate-200 cursor-pointer transition-all duration-200 ease-in-out`}
                onClick={() => changeToActive(idx)}
              >
              </div>
            )
          })
        }
      </div>
    </div>
  );
};
