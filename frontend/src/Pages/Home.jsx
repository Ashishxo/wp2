import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const settings = { dots: true, infinite: true, slidesToShow: 1, slidesToScroll: 1, autoplay: true, autoplaySpeed: 3000, cssEase: "linear" };

  return (
    <>
      <div className="slider-container w-full mt-8">
        <Slider {...settings}>
          <div><img src="./src/assets/banner3.jpg" alt="" className='w-screen' /></div>
          <div><img src="./src/assets/banner2.jpg" alt="" className='w-screen' /></div>
          <div><img src="./src/assets/banner1.jpg" alt="" className='w-screen'/></div>
        </Slider>
      </div>

      <h1 className='text-2xl font-bold text-gray-700 font-sans ml-20 mt-10'>S H O P <span className='ml-5 mr-5'>B Y</span> C A T E G O R Y</h1>
      <div className='flex justify-center gap-20 mt-16'>
        <Link to="/products/men">
          <div>
            <img className='h-96 w-72 object-cover hover:scale-105 duration-100' src="./src/assets/banners/men.jpg" alt="Men" />
            <h1 className='mt-8 text-2xl font-light text-gray-800'>Men</h1>
          </div>
        </Link>
        <Link to="/products/women">
          <div>
            <img className='h-96 w-72 object-cover hover:scale-105 duration-100' src="./src/assets/banners/women.webp" alt="Women" />
            <h1 className='mt-8 text-2xl font-light text-gray-800'>Women</h1>
          </div>
        </Link>
        <Link to="/products/kids">
          <div>
            <img className='h-96 w-72 object-cover hover:scale-105 duration-100' src="./src/assets/banners/kids.jpg" alt="Kids" />
            <h1 className='mt-8 text-2xl font-light text-gray-800'>Kids</h1>
          </div>
        </Link>
      </div>
    </>
  );
}

export default Home;
