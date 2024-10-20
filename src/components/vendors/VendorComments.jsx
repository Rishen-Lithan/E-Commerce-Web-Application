import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { APP_URL } from '../../config/config';
import './VendorComments.css';

function VendorComments() {
    const { vendorId } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (!token) {
          console.error('No token found');
          return;
        }
    
        fetch(APP_URL + `Vendor/${vendorId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => response.json())
        .then((responseJson) => {
          console.log('Vendors Comments Response : ', responseJson.comments);
          setComments(responseJson.comments);
        })
        .catch(err => console.log('Error getting vendors : ', err));
    }, [setComments, vendorId]);

  return (
    <div className="comments-container">
        <h1>Customer Comments for the Vendor</h1>
        <div className="comments-grid">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <div className="card-content">
                <p className="comment-text">"{comment.comment}"</p>
                <p className="comment-rank">Rank: {comment.rank}</p>
                <p className="user-id">User ID: {comment.userId}</p>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default VendorComments
