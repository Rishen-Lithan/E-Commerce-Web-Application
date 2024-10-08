import React from 'react';
import './Users.css'; // You can use this for custom styling if needed

function Users() {
  const users = [
    { id: 1, email: 'user1@example.com' },
    { id: 2, email: 'user2@example.com' },
    { id: 3, email: 'user3@example.com' }
  ];

  return (
    <div className="users-container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>
                <button className="update-btn">Update</button>
                <button className="edit-btn">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
