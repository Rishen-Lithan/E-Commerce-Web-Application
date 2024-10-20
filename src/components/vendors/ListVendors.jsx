import React, { useState, useEffect } from 'react';
import './ListVendors.css';
import { APP_URL } from '../../config/config';
import { useNavigate } from 'react-router-dom';

function ListVendors() {
    const [vendors, setVendors] = useState([]);
    const navigate = useNavigate();

    const handleViewComments = (vendorId) => {
        navigate(`/vendor-comments/${vendorId}`);
    }

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

    const calculateAverageRank = (comments) => {
        if (!comments || comments.length === 0) {
            return 'No Rank';
        }
        const totalRank = comments.reduce((acc, comment) => acc + comment.rank, 0);
        const averageRank = totalRank / comments.length;
        return averageRank.toFixed(2);
    }

  return (
    <div className="table-container">
      <h1 className='table-heading'>Vendor List</h1>
      <table className="vendor-table">
        <thead>
          <tr>
            <th>Vendor Name</th>
            <th>Email</th>
            <th>Category</th>
            <th>Rank (Avg)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.vendorName}</td>
              <td>{vendor.email}</td>
              <td>{vendor.category}</td>
              <td>{calculateAverageRank(vendor.comments)}</td>
              <td>
                {vendor && vendor.comments && vendor.comments.length > 0 ? (
                    <button 
                        className="comment-btn"
                        onClick={() => handleViewComments(vendor.id)}
                    >
                        Comments
                    </button>
                ) : (
                    <p className='text'>No Comments for the Vendor</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListVendors;
