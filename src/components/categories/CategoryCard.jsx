import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useSpring, animated } from 'react-spring';
import './CategoryModal.css';
import { APP_URL } from '../../config/config';
import { toast } from "react-toastify";

const CategoryCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Fetch categories from the API
  const fetchCategories = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    setToken(token);

    fetch(`${APP_URL}Category/list`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Category List Response : ', data);
        setCategories(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const updateCategoryStatus = (name, status) => {
    fetch(APP_URL + 'Product/category-status', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        category: name,
        categoryStatus : status === 0 ? 1 : 0
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('Category Update Status Response : ', responseJson);
      toast.success('Category updated Successfully');
      fetchCategories();
      closeModal()
    })
    .catch((err) => {
      console.log('Error updating category status : ', err);
      toast.error('Failed to update Category Status');
      closeModal()
    })
  }

  const openModal = (index) => {
    const selectedCategory = categories[index];
    setSelectedItem(selectedCategory);
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

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="content mtop">
      <Slider {...settings}>
        {categories.map((category, index) => (
          <div className="box" key={category.id} onClick={() => openModal(index)}>
            <h4>{category.categoryName}</h4>
          </div>
        ))}
      </Slider>

      {isModalOpen && selectedItem && (
        <div className="category-modal-overlay" onClick={closeModal}>
          <animated.div
            className="category-modal-content"
            style={modalAnimation}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedItem.categoryName}</h2>
            <p>Status: {selectedItem.status === 1 ? 'Active' : 'Inactive'}</p>

            <button
              className={selectedItem.status === 1 ? 'deactivate-btn' : 'close-btn'}
              onClick={() => updateCategoryStatus(selectedItem.categoryName, selectedItem.status)}
            >
              {selectedItem.status === 1 ? 'Deactivate' : 'Activate'}
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
          .deactivate-btn {
            padding: 10px 20px;
            background-color: #db665a;
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

export default CategoryCard;
