import React, { useState, useEffect } from "react";
import { featured } from "../../data/Data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSpring, animated } from 'react-spring';
import { APP_URL } from "../../../config/config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeaturedCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState([]);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    fetch(APP_URL + 'Vendor/list', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then((responseJson) => {
      console.log('Vendors List Response : ', responseJson);
      setVendors(responseJson);
    })
    .catch(err => console.log('Error getting vendors : ', err));
  }, [setVendors]);

  const rateVendor = (id) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    fetch(APP_URL + `Vendor/comment/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        comment: comment,
        rank: rating
      })
    })
    .then(response => response.json())
    .then((responseJson) => {
      console.log('Rate Response : ', responseJson);
      toast.success('Thank you for rating our vendors');
    })
    .catch(err => console.log('Error rating vendor : ', err));
  }

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setComment("");
    setRating(3);
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
        {vendors && vendors.map((cat, index) => (
          featured[index] && (
            <div className="box" key={index} onClick={() => openModal({ vendor: cat, featuredItem: featured[index] })}>
              <img src={featured[index].cover} alt="Featured Cover" />
              <h4>{cat.vendorName}</h4>
              <label>{cat.category}</label>
            </div>
          )
        ))}
      </Slider>

      {isModalOpen && selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <animated.div
            className="modal-content"
            style={modalAnimation}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedItem.vendor.vendorName}</h2>
            <img
              src={selectedItem.featuredItem.cover}
              alt="Featured Cover"
              className="modal-image"
            />
            <textarea
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginBottom: "20px",
              }}
            />
            <label htmlFor="rating">Rating: {rating}</label>
            <input
              type="range"
              id="rating"
              name="rating"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              style={{ width: "100%", margin: "10px 0" }}
            />
            
            <button className="close-btn" onClick={closeModal}>
              Close
            </button>

            <button className="close-btn" onClick={() => rateVendor(selectedItem.vendor.id)}>
              Rate Vendor
            </button>
          </animated.div>
        </div>
      )}

      <ToastContainer className="toast-container" />

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
          input[type="range"] {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            height: 8px;
            background: #ddd;
            border-radius: 5px;
          }

          input[type="range"]::-webkit-slider-runnable-track {
            width: 100%;
            height: 8px;
            cursor: pointer;
            background: #ddd;
            border-radius: 5px;
          }

          input[type="range"]::-webkit-slider-runnable-track {
            background: linear-gradient(to right, green ${(rating - 1) * 25}%, #ddd ${(rating - 1) * 25}%);
          }

          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background: #27ae60;
            border-radius: 50%;
            cursor: pointer;
            margin-top: -6px;
          }

          input[type="range"]::-moz-range-progress {
            background-color: #27ae60;
          }

          input[type="range"]::-moz-range-track {
            background-color: #ddd;
          }

          input[type="range"]::-ms-fill-lower {
            background-color: #27ae60;
          }

          input[type="range"]::-ms-fill-upper {
            background-color: #ddd;
          }
        `}
      </style>
    </div>
  );
};

export default FeaturedCard;
