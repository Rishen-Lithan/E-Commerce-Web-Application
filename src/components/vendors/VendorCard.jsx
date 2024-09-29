import React, { useState } from "react";
import { featured } from "../data/Data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSpring, animated } from 'react-spring';

const VendorCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const modalAnimation = useSpring({
    opacity: isModalOpen ? 1 : 0,
    transform: isModalOpen ? `translateY(0)` : `translateY(-50px)`,
    config: { tension: 200, friction: 15 },
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="content mtop">
      <Slider {...settings}>
        {featured.map((items, index) => (
          <div className="box" key={index} onClick={() => openModal(items)}>
            <img src={items.cover} alt="" />
            <h4>{items.name}</h4>
            <label>{items.total}</label>
          </div>
        ))}
      </Slider>

      {isModalOpen && selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <animated.div
            className="modal-content"
            style={modalAnimation}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedItem.name}</h2>
            <img
              src={selectedItem.cover}
              alt={selectedItem.name}
              className="modal-image"
            />
           
            <button className="close-btn" onClick={closeModal}>
              Close
            </button>
          </animated.div>
        </div>
      )}

      <style>
        {`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .modal-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            width: 80%;
            max-width: 600px;
          }
          .modal-image {
            width: 100%;
            max-width: 300px;
            height: auto;
            margin-bottom: 20px;
            border-radius: 8px;
          }
          .close-btn {
            padding: 10px 20px;
            background-color: #27ae60;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            width: 100%;
            margin-top: 10px;
          }
          .close-btn:hover {
            background-color: #219150;
          }
        `}
      </style>
    </div>
  );
};

export default VendorCard;
