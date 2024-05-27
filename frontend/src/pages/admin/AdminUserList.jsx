import React, { useState, useEffect } from 'react';
import AdminHeader from '../../components/AdminHeader';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';

export default function AdminUserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [blockUserId, setBlockUserId] = useState(null);
    const [blockReason, setBlockReason] = useState('');
    const [isBlocking, setIsBlocking] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(5);

    useEffect(() => {
        fetchUserList();
    }, []);

    const fetchUserList = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/admin/viewUsers');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Fetched users:', data); // Debug log to check fetched data
            if (data.user && Array.isArray(data.user)) {
                setUsers(data.user);
            } else {
                setUsers([]);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (userId) => {
        try {
            const response = await fetch(`/api/admin/verifyUser`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: userId })
            });
            if (response.ok) {
                setUsers(prevUsers => {
                    const updatedUsers = prevUsers.map(user => {
                        if (user._id === userId) {
                            return { ...user, isVerifiedByAdmin: true };
                        }
                        return user;
                    });
                    return updatedUsers;
                });
            }
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    };

    const handleBlock = (userId, isBlocking) => {
        setBlockUserId(userId);
        setIsBlocking(isBlocking);
        if(isBlocking)
         setShowModal(true);
        else {
          setShowModal(false);
          confirmBlockUnblock()
        }

    };

    const confirmBlockUnblock = async () => {
        if (isBlocking && !blockReason) {
            toast.error("A reason is required to block a user.");
            return;
        }
 
        try {
            const response = await fetch(`/api/admin/blockUnblockUser`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: blockUserId, isBlocked: isBlocking, reason: blockReason })
            });

            if (response.ok) {
                const result = await response.json();
                const updatedUser = result.user;
                setIsBlocking(!isBlocking)
                setUsers(prevUsers => {
                    const updatedUsers = prevUsers.map(user => {
                        if (user._id === updatedUser._id) {
                            return updatedUser;
                        }
                        return user;
                    });
                    return updatedUsers;
                });
                setShowModal(false);
                setBlockReason('');
            } else {
                console.error('Error updating user status:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    };

    const handlePageLimitChange = (e) => {
        setCurrentPage(1);
        setUsersPerPage(parseInt(e.target.value));
    };

    const handleClick = (event, pageNumber) => {
        event.preventDefault();
        setCurrentPage(pageNumber);
    };

    const renderPageLimitOptions = () => {
        return [5, 10, 15].map((limit, index) => (
            <option key={index} value={limit}>{limit}</option>
        ));
    };

    const renderPaginationButtons = () => {
        const totalPages = Math.ceil(users.length / usersPerPage);
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <a className="page-link" href="#" onClick={(e) => handleClick(e, i)}>{i}</a>
                </li>
            );
        }
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {currentPage !== 1 && (
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={(e) => handleClick(e, currentPage - 1)}>Prev</a>
                        </li>
                    )}
                    {buttons}
                    {currentPage !== totalPages && (
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={(e) => handleClick(e, currentPage + 1)}>Next</a>
                        </li>
                    )}
                </ul>
            </nav>
        );
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <>
          <AdminHeader/>
            <section id="home" className="cover-bg">
            <div className="col-12 caption text-center">
    <div className="button col-lg-6 col-md-6 col-sm-12">
        <main id="site-main">
            <h4>User Management</h4>
            <div className="container">
            <div className="row">
                    <div className="col-md-4">
                        <label className="text-white">Page Limit:</label>
                        <select
                            className="form-control"
                            value={usersPerPage}
                            onChange={handlePageLimitChange}
                        >
                            {renderPageLimitOptions()}
                        </select>
                    </div>
                </div>
                {loading ? (
                    <div className="text-white">Loading...</div>
                ) : (
                    <form id="product-list">
                       <div className="table-responsive">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th colSpan="2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>
                                            {!user.isVerifiedByAdmin && (
                                                <div className="control">
                                                    <button
                                                        type="button"
                                                        className="btns"
                                                        onClick={() => handleVerify(user._id)}
                                                    >
                                                        Verify
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <div className="control">
                                                <button
                                                    type="button"
                                                    className="btns"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleBlock(user._id, !user.isBlocked);
                                                    }}
                                                >
                                                    {user.isBlocked ? "Unblock" : "Block"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                    </form>
                )}
                {renderPaginationButtons()}
                
            </div>
        </main>
    </div>
</div>
            </section>

<Modal show={showModal} onHide={() => setShowModal(false)}>
    <Modal.Header closeButton>
        <Modal.Title>{isBlocking ? 'Block User': 'Unblock User'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <div>
            <label htmlFor="blockReason">Reason for Blocking:</label>
            <input
                type="text"
                id="blockReason"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                className="form-control"
            />
        </div>
    </Modal.Body>
    <Modal.Footer>
        <Button className="btns" onClick={() => setShowModal(false)}>
            Cancel
        </Button>
        <Button className="btns" onClick={confirmBlockUnblock}>
            Confirm
        </Button>
    </Modal.Footer>
</Modal>

           </>
    )
}













// import React, { useState, useEffect } from 'react';
// import AdminHeader from '../../components/AdminHeader';
// import { toast } from 'react-toastify';
// import { Modal, Button } from 'react-bootstrap';

// export default function AdminUserList() {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showModal, setShowModal] = useState(false);
//     const [blockUserId, setBlockUserId] = useState(null);
//     const [blockReason, setBlockReason] = useState('');
//     const [isBlocking, setIsBlocking] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const usersPerPage = 5;

//     useEffect(() => {
//         fetchUserList();
//     }, []);

//     const fetchUserList = async () => {
//         setLoading(true);
//         try {
//             const response = await fetch('/api/admin/viewUsers');
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             console.log('Fetched users:', data); // Debug log to check fetched data
//             if (data.user && Array.isArray(data.user)) {
//                 setUsers(data.user);
//             } else {
//                 setUsers([]);
//             }
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//             setUsers([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleVerify = async (userId) => {
//         try {
//             const response = await fetch(`/api/admin/verifyUser`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ id: userId })
//             });
//             if (response.ok) {
//                 setUsers(prevUsers => {
//                     const updatedUsers = prevUsers.map(user => {
//                         if (user._id === userId) {
//                             return { ...user, isVerifiedByAdmin: true };
//                         }
//                         return user;
//                     });
//                     return updatedUsers;
//                 });
//             }
//         } catch (error) {
//             console.error('Error verifying user:', error);
//         }
//     };

//     const handleBlock = (userId, isBlocking) => {
//         setBlockUserId(userId);
//         setIsBlocking(isBlocking);
//         if (isBlocking) {
//             setShowModal(true);
//         } else {
//             confirmBlockUnblock(userId, isBlocking);
//         }
//     };

//     const confirmBlockUnblock = async (userId, isBlocking) => {
//         if (isBlocking && !blockReason) {
//             toast.error("A reason is required to block a user.");
//             return;
//         }

//         try {
//             const response = await fetch(`/api/admin/blockUnblockUser`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ id: userId, isBlocked: isBlocking, reason: blockReason })
//             });

//             if (response.ok) {
//                 const result = await response.json();
//                 const updatedUser = result.user;
//                 setUsers(prevUsers => {
//                     const updatedUsers = prevUsers.map(user => {
//                         if (user._id === updatedUser._id) {
//                             return updatedUser;
//                         }
//                         return user;
//                     });
//                     return updatedUsers;
//                 });
//                 setShowModal(false);
//                 setBlockReason('');
//             } else {
//                 console.error('Error updating user status:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error updating user status:', error);
//         }
//     };

//     const indexOfLastUser = currentPage * usersPerPage;
//     const indexOfFirstUser = indexOfLastUser - usersPerPage;
//     const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

//     const totalPages = Math.ceil(users.length / usersPerPage);

//     const renderPageNumbers = () => {
//         const pageNumbers = [];
//         const maxPageNumbersToShow = 5;
//         const halfWay = Math.ceil(maxPageNumbersToShow / 2);
//         let startPage = currentPage - halfWay + 1;
//         let endPage = currentPage + halfWay - 1;

//         if (startPage < 1) {
//             startPage = 1;
//             endPage = maxPageNumbersToShow;
//         }

//         if (endPage > totalPages) {
//             startPage = totalPages - maxPageNumbersToShow + 1;
//             endPage = totalPages;
//         }

//         if (startPage < 1) startPage = 1;

//         for (let i = startPage; i <= endPage; i++) {
//             pageNumbers.push(i);
//         }

//         return pageNumbers;
//     };

//     const handleClick = (event, pageNumber) => {
//         event.preventDefault();
//         setCurrentPage(pageNumber);
//     };

//     const handlePrev = (event) => {
//         event.preventDefault();
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     const handleNext = (event) => {
//         event.preventDefault();
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     return (
//         <>
//             <AdminHeader />
//             <section id="home" className="admin-banner banner cover-bg">
//                 <div className="container h-100">
//                     <div className="row align-items-center h-100">
//                         <div className="col-12 caption text-center">
//                             <div className="button col-lg-6 col-md-6 col-sm-12">
//                                 <main id="site-main">
//                                     <h4>User Management</h4>
//                                     <div className="container">
//                                         {loading ? (
//                                             <div>Loading...</div>
//                                         ) : (
//                                             <form id="product-list">
//                                                 <table className="table">
//                                                     <thead className="thead-dark">
//                                                         <tr>
//                                                             <th>Username</th>
//                                                             <th>Email</th>
//                                                             <th>Phone</th>
//                                                             <th colSpan="2">Actions</th>
//                                                         </tr>
//                                                     </thead>
//                                                     <tbody>
//                                                         {currentUsers.map(user => (
//                                                             <tr key={user._id}>
//                                                                 <td>{user.username}</td>
//                                                                 <td>{user.email}</td>
//                                                                 <td>{user.phoneNumber}</td>
//                                                                 <td>
//                                                                     {!user.isVerifiedByAdmin && (
//                                                                         <div className="control">
//                                                                             <button
//                                                                                 type="button"
//                                                                                 className="btns"
//                                                                                 onClick={() => handleVerify(user._id)}
//                                                                             >
//                                                                                 Verify
//                                                                             </button>
//                                                                         </div>
//                                                                     )}
//                                                                 </td>
//                                                                 <td>
//                                                                     <div className="control">
//                                                                         <button
//                                                                             type="button"
//                                                                             className="btns"
//                                                                             onClick={(e) => {
//                                                                                 e.preventDefault();
//                                                                                 handleBlock(user._id, !user.isBlocked);
//                                                                             }}
//                                                                         >
//                                                                             {user.isBlocked ? "Unblock" : "Block"}
//                                                                         </button>
//                                                                     </div>
//                                                                 </td>
//                                                             </tr>
//                                                         ))}
//                                                     </tbody>
//                                                 </table>
//                                             </form>
//                                         )}
//                                         <ul className="pagination">
//                                             {currentPage > 1 && (
//                                                 <li>
//                                                     <a
//                                                         href="#"
//                                                         onClick={handlePrev}
//                                                         className="pagination-link"
//                                                     >
//                                                         Prev
//                                                     </a>
//                                                 </li>
//                                             )}
//                                             {renderPageNumbers().map(number => (
//                                                 <li key={number} className={number === currentPage ? 'active' : ''}>
//                                                     <a
//                                                         href="#"
//                                                         onClick={e => handleClick(e, number)}
//                                                         className="pagination-link custom-class"
//                                                     >
//                                                         {number}
//                                                     </a>
//                                                 </li>
//                                             ))}
//                                             {currentPage < totalPages && (
//                                                 <li>
//                                                     <a
//                                                         href="#"
//                                                         onClick={handleNext}
//                                                         className="pagination-link"
//                                                     >
//                                                         Next
//                                                     </a>
//                                                 </li>
//                                             )}
//                                         </ul>
//                                     </div>
//                                 </main>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <Modal show={showModal} onHide={() => setShowModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>{isBlocking ? 'Block User' : 'Unblock User'}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {isBlocking && (
//                         <div>
//                             <label htmlFor="blockReason">Reason for Blocking:</label>
//                             <input
//                                 type="text"
//                                 id="blockReason"
//                                 value={blockReason}
//                                 onChange={(e) => setBlockReason(e.target.value)}
//                                 className="form-control"
//                             />
//                         </div>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowModal(false)}>
//                         Cancel
//                     </Button>
//                     <Button variant="primary" onClick={() => confirmBlockUnblock(blockUserId, isBlocking)}>
//                         Confirm
//                     </Button>
//                 </Modal.Footer>
//             </Modal>  
//         </>
//     );
// }
