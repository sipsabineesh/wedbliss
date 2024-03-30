import React, { useState,useEffect } from 'react';
import { Link } from "react-router-dom"
import AdminHeader from '../../components/AdminHeader';

export default function AdminUserList()  {
    const [users, setUsers] = useState([]);

    
    useEffect(() => {
        fetchUserList(); 
    }, []);
     const fetchUserList = async () => {
        try {
            const response = await fetch('/api/admin/viewUsers'); 
            const data = await response.json();
            setUsers(data); 
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    console.log(users)
    // Convert the users object into an array
    const usersArray = Object.values(users);
    console.log(usersArray)
    // Logic for displaying current users
    const indexOfLastUser = currentPage * usersPerPage;
    console.log("indexOfLastUser  : "+ indexOfLastUser)
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    console.log("indexOfFirstUser  : "+ indexOfFirstUser)
    
    const currentUsers = usersArray.slice(indexOfFirstUser, indexOfLastUser);
    console.log("currentUsers  : "+ currentUsers)
  
    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(usersArray.length / usersPerPage); i++) {
      pageNumbers.push(i);
    }
  console.log(usersArray[0]);

  const handleVerify = async (userId,event) => {
    try {
        const response = await fetch(`/api/admin/verifyUser`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
             body: JSON.stringify({ id: userId })
        });

    } catch (error) {
        console.error('Error fetching user data:', error);
    }
  };
  
  const handleBlock = async (userId,flag) => {
    try {
        const response = await fetch(`/api/admin/blockUnblockUser`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
             body: JSON.stringify({ id: userId ,isBlocked:flag})
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
  };

    const handleClick = (event, pageNumber) => {
      event.preventDefault();
      setCurrentPage(pageNumber);
    };
  

    return (
        <>
        <AdminHeader/>
          <section id="home" className="banner cover-bg">
            <div className="container h-100">
              <div className="row align-items-center h-100">
                <div className="col-12 caption text-center">
                  <div className="button col-lg-6 col-md-6 col-sm-12">
                  <main id="site-main">
            <div className="container">
                <form id="product-list">
                <table className="table">
                        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th colspan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
                          
        {Object.keys(currentUsers).map(key => (
            currentUsers[key].map(user => ( 
              <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                  {!user.isVerifiedByAdmin ? (
          <div className="control">
            <button
              type="submit"
              className="btns"
              onClick={() => handleVerify(user._id)}
            >
              Verify
            </button>
          </div>
        ) : null}
                  </td>
                  <td> 
                    <div className="control">
                        <button 
                          type="submit" 
                          className="btns"  
                          onClick={() => handleBlock(user._id,user.isBlocked)}>
                            {user.isBlocked ? "Unblock" : "Block"}
                        </button>
                    </div> 
                  </td> 
              </tr>
            ))
          ))}
    
  
        </tbody>
      </table>
                </form>
            </div>
            <ul>
        {pageNumbers.map(number => (
          <li key={number}>
            <a href="#" onClick={e => handleClick(e, number)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
        </main>
                  </div>
                </div>
              </div>
            </div>
          </section>
     </>
    )
  }
  
  