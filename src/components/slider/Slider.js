import React, { useEffect, useState } from 'react'
import "./Slider.scss"
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";

import { sliderData } from './slider-data';

const Slider = () => {

    const [currentSlide, setCurrentSlide] = useState(0)
    const slideLength = sliderData.length;

    const autoScroll = true;
    let slideInterval;
    let intervalTime = 50000; 

    useEffect(() => {
        setCurrentSlide(0)
    }, [])

    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime)
    }

    useEffect(() => {
        if(autoScroll){
            auto()
        }

        return () => clearInterval(slideInterval)
        // eslint-disable-next-line
    }, [currentSlide])

    
    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1)
    }

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1)
    }

  return (
    <div className='slider'>
      <AiOutlineArrowLeft className='arrow prev' onClick={prevSlide} />
      <AiOutlineArrowRight className='arrow next'  onClick={nextSlide} />

      {sliderData.map((slide, index) => {

        const {image} = slide;
        return(
            <div key={index} className={index === currentSlide ? "slide current" : "slide"}>
                { index===currentSlide && (
                    <>
                        <img src={image} alt='Slide' />
                        {/* <div className='content'>
                            <h2>{heading}</h2>
                            <p>{desc}</p>
                            <hr/>
                        </div> */}

                        <a href='#product' className='--btn --btn-danger'>Shop Now</a>
                    </>
                )}
            </div>
        )
      })}
    </div>
  )
}

export default Slider
