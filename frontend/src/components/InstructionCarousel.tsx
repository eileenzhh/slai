import React, { useState } from 'react'
import phone from "../assets/phone.png";
import camera from "../assets/camera.png";
import imageFocus from "../assets/image_focus.png";
import mobileSubmit from "../assets/mobile_submit.png";
import mobileLaunch from "../assets/mobile_launch.png";
import web from "../assets/web.png";
import styled from 'styled-components';

const images = [
    {image: phone, caption: 'Attach the phone clip to your mobile device'},
    {image: mobileLaunch, caption: 'Launch the SLAI mobile app on your device'},
    {image: imageFocus, caption: 'Tap the screen to manually adjust the focus'},
    {image: mobileSubmit, caption: "Click 'Submit' when you are satisfied with your image"},
    {image: web, caption: "Return to the web app and click 'Next' to proceed"},
]

const InstructionCarousel = () => {
    const [currentSlide, setCurrentSlide ] = useState(0)

    const nextSlide = () => {
        setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1)
    }

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1)
    }
    return (
        <CarouselContainer>
        <PrevButton onClick={prevSlide}>&#10094;</PrevButton>
        <CarouselContent>
            <CarouselNumber>
              {images.map((image, index) => (
                <Number 
                    key={index} 
                    current={currentSlide === index}
                >
                  {index + 1}
                </Number>
              ))}
            </CarouselNumber>      
            <CarouselItem>
              <CarouselImg src={images[currentSlide].image} alt={images[currentSlide].caption} />
              <Caption>
                  <Number current={true}>{ currentSlide + 1}</Number>
                  {images[currentSlide].caption}
              </Caption>
            </CarouselItem> 
        </CarouselContent>
        <NextButton onClick={nextSlide}>&#10095;</NextButton>
      </CarouselContainer>
    )
}

export default InstructionCarousel

const CarouselContainer = styled.div`
  position: relative;
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  z-index: 2;
  color: #333;
`;

const PrevButton = styled(CarouselButton)`
  left: 10px;
`;

const NextButton = styled(CarouselButton)`
  right: 10px;
`;

const CarouselContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
`;

const CarouselItem = styled.div`
  text-align: center;
`;

const Caption = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const CarouselNumber = styled.div`
  padding-top: 1rem;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 80%;
`;

const Number = styled.div<{ current: boolean }>`
    background-color: var(--darkgrey);
    border-radius: 100%;
    width: 20px;
    height: 20px;
    text-align: center;
    font-weight: ${({ current }) => current ? 'bold' : 'normal'};
    opacity: ${({ current }) => current ? '1' : '0.5'};
    color: white;
`

const CarouselImg = styled.img`
    height: 350px;
    padding: 1rem;
`