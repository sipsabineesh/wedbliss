// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, Alert } from '@mui/material';
// import AdminHeader from './AdminHeader';


// export default function AdminReportAbuseList() {
//     const [reports, setReports] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchReports = async () => {
//             try {
//                 setLoading(true);
//                 const { data } = await axios.get('/api/admin/viewAbuseReport');
//                 console.log(data)
//                 setReports(data);
//             } catch (err) {
//                 setError(err.response?.data.message || err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchReports();
//     }, []);

    // const handleMarkAsReviewed = async (reportId) => {
    //     try {
    //         setLoading(true);
    //         await axios.put(`/api/admin/reviewedReport/${reportId}`, { status: 'Reviewed' });
    //         setReports((prevReports) =>
    //             prevReports.map((report) =>
    //                 report.id === reportId ? { ...report, status: 'Reviewed' } : report
    //             )
    //         );
    //     } catch (err) {
    //         setError(err.response?.data.message || err.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // }
//     return (
//         <>
//         {/* <AdminHeader/> */}
//         <TableContainer>
//             {loading && <CircularProgress />}
//             {error && <Alert severity="error">{error}</Alert>}
//             <Table>
//                 <TableHead>
//                     <TableRow>
//                         {/* <TableCell>ID</TableCell> */}
//                         <TableCell>Reporter</TableCell>
//                         <TableCell>Reported User</TableCell>
//                         <TableCell>Reason</TableCell>
//                         <TableCell>Date</TableCell>
//                         <TableCell>Status</TableCell>
//                         <TableCell>Actions</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
             
//                             {/* <TableCell>aaaaaaaaaaaaaaaaaaaaaaaaaaa</TableCell>
//                             <TableCell>aaaaaaaaaaaaaaaaaaaaaaaaaaa</TableCell>
//                             <TableCell>aaaaaaaaaaaaaaaaaaaaaaaaaaa</TableCell>
//                             <TableCell>aaaaaaaaaaaaaaaaaaaaaaaaaaa</TableCell>
//                             <TableCell>aaaaaaaaaaaaaaaaaaaaaaaaaaa</TableCell> */}
//                  {/* <TableCell>{report.id}</TableCell>  */}
//                     {reports.map((report) => (
//                         <TableRow key={report.id}> 
//                              {/* <TableCell>{report.id}</TableCell> */}
//                             <TableCell>{report.reporterId.username}</TableCell>
//                             <TableCell>{report.reportedUserId.username}</TableCell>
//                             <TableCell>{report.reason}</TableCell>
//                             <TableCell>{new Date(report.createdAt).toLocaleString()}</TableCell>
//                             <TableCell>{report.status}</TableCell> 
//                              <TableCell>
//                                 <Button
//                                     variant="contained"
//                                     color="primary"
//                                     onClick={() => handleMarkAsReviewed(report.id)}
//                                     disabled={loading || report.status === 'Reviewed'}
//                                 >
//                                     Mark as Reviewed
//                                 </Button>
//                             </TableCell> 
//                      </TableRow>
//                     ))} 
//                 </TableBody>
//             </Table>
//         </TableContainer>
//         </>
//     );
// }

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AbuseList = () => {
//     const [reports, setReports] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);

//     const limit = 10; // Number of reports per page

//     useEffect(() => {
//         fetchReports();
//     }, [currentPage]);

//     const fetchReports = async () => {
//         try {
//             const { data } = await axios.get('/api/admin/viewAbuseReport', {
//                 params: { page: currentPage, limit }
//             });
//             setReports(data.reports);
//             setCurrentPage(data.currentPage);
//             setTotalPages(data.totalPages);
//         } catch (error) {
//             console.error('Failed to fetch reports', error);
//         }
//     };

//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//     };

//     return (
//         <div>
//             <h2>Abuse Reports</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Reporter</th>
//                         <th>Reported User</th>
//                         <th>Reason</th>
//                         <th>Proof Image</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {reports.map((report) => (
//                         <tr key={report._id}>
//                             <td>{report.reporterId.username}</td>
//                             <td>{report.reportedUserId.username}</td>
//                             <td>{report.reason}</td>
//                             <td>
//                                 {report.proofImage ? (
//                                     <a href={report.proofImage} target="_blank" rel="noopener noreferrer">
//                                         View Image
//                                     </a>
//                                 ) : (
//                                     'No Image'
//                                 )}
//                             </td>
//                             <td>{report.status}</td>
//                             <td>
//                                 <button onClick={() => handleStatusChange(report._id, 'Reviewed')}>Mark as Reviewed</button>
//                                 <button onClick={() => handleStatusChange(report._id, 'Resolved')}>Mark as Resolved</button>
//                                 <button onClick={() => handleBanUser(report.reportedUserId._id)}>Ban User</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <div className="pagination">
//                 {Array.from({ length: totalPages }, (_, index) => (
//                     <button
//                         key={index + 1}
//                         onClick={() => handlePageChange(index + 1)}
//                         disabled={index + 1 === currentPage}
//                     >
//                         {index + 1}
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AbuseList;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import AdminHeader from './AdminHeader';

// const AbuseList = () => {
//     const [reports, setReports] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [usersPerPage, setUsersPerPage] = useState(5);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchReports();
//     }, [currentPage, usersPerPage]);

//     const fetchReports = async () => {
//         setLoading(true);
//         try {
//             const { data } = await axios.get('/api/admin/viewAbuseReport', {
//                 params: { page: currentPage, limit: usersPerPage }
//             });
//             setReports(data.reports);
//             setCurrentPage(data.currentPage);
//             setTotalPages(data.totalPages);
//         } catch (error) {
//             console.error('Failed to fetch reports', error);
//         } finally {
//             setLoading(false);
//         }
//     };
//     const handleMarkAsReviewed = async (reportId) => {
//         try {
//             setLoading(true);
//             await axios.put(`/api/admin/reviewedReport/${reportId}`, { status: 'Reviewed' });
//             setReports((prevReports) =>
//                 prevReports.map((report) =>
//                     report.id === reportId ? { ...report, status: 'Reviewed' } : report
//                 )
//             );
//         } catch (err) {
//             setError(err.response?.data.message || err.message);
//         } finally {
//             setLoading(false);
//         }
//     }
//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//     };

//     const handlePageLimitChange = (event) => {
//         setUsersPerPage(parseInt(event.target.value, 5));
//     };

//     const renderPageLimitOptions = () => {
//         return [10, 20, 30].map(limit => (
//             <option key={limit} value={limit}>
//                 {limit}
//             </option>
//         ));
//     };

//     const renderPaginationButtons = () => {
//         return (
//             <div className="pagination">
//                 {Array.from({ length: totalPages }, (_, index) => (
//                     <button
//                         className='btns'
//                         key={index + 1}
//                         onClick={() => handlePageChange(index + 1)}
//                         disabled={index + 1 === currentPage}
//                     >
//                         {index + 1}
//                     </button>
//                 ))}
//             </div>
//         );
//     };

//     return (
//         <>
//          <AdminHeader/>
//         <section id="home" className="cover-bg">
//             <div className="col-12 caption text-center">
//                 <div className="button col-lg-6 col-md-6 col-sm-12">
//                     <main id="site-main">
//                         <h4>Report Management</h4>
//                         <div className="container">
//                             <div className="row">
//                                 <div className="col-md-4">
//                                     <label className="text-white">Page Limit:</label>
//                                     <select
//                                         className="form-control"
//                                         value={usersPerPage}
//                                         onChange={handlePageLimitChange}
//                                     >
//                                         {renderPageLimitOptions()}
//                                     </select>
//                                 </div>
//                             </div>
//                             {loading ? (
//                                 <div className="text-white">Loading...</div>
//                             ) : (
//                                 <form id="product-list">
//                                     <div className="table-responsive">
//                                         <table className="table">
//                                             <thead className="thead-dark">
//                                                 <tr>
//                                                     <th>Reporter</th>
//                                                     <th>Reported User</th>
//                                                     <th>Reason</th>
//                                                     <th>Proof Image</th>
//                                                     <th>Status</th>
//                                                     <th colSpan={3}>Actions</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {reports.map(report => (
//                                                     <tr key={report._id}>
//                                                         <td>{report.reporterId.username}</td>
//                                                         <td>{report.reportedUserId.username}</td>
//                                                         <td>{report.reason}</td>
//                                                         <td>
//                                                             {report.proofImage ? (
//                                                                 <a href={report.proofImage} target="_blank" rel="noopener noreferrer">
//                                                                     View Image
//                                                                 </a>
//                                                             ) : (
//                                                                 'No Image'
//                                                             )}
//                                                         </td>
//                                                         <td>{report.status}</td>
//                                                         <td>
//                                                             <div className="control">
//                                                                 <button
//                                                                     type="button"
//                                                                     className="btns"
//                                                                     onClick={() => handleStatusChange(report._id, 'Reviewed')}
//                                                                 >
//                                                                     Mark as Reviewed
//                                                                 </button>
//                                                                 </div>
//                                                                 </td>
//                                                                 <td>
//                                                                 <div className="control">

//                                                                 <button
//                                                                     type="button"
//                                                                     className="btns"
//                                                                     onClick={() => handleStatusChange(report._id, 'Resolved')}
//                                                                 >
//                                                                     Mark as Resolved
//                                                                 </button>
//                                                                 </div>
//                                                                 </td>
                                                               
//                                                                 <td>
//                                                             <div className="control">
//                                                                 <button
//                                                                     type="button"
//                                                                     className="btns"
//                                                                     onClick={() => handleBanUser(report.reportedUserId._id)}
//                                                                 >
//                                                                     Ban User
//                                                                 </button>
//                                                                 </div>
//                                                                 </td>
                                                        
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </form>
//                             )}
//                             {renderPaginationButtons()}
//                         </div>
//                     </main>
//                 </div>
//             </div>
//         </section>
        
//         </>
//     );
// };

// export default AbuseList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import AdminHeader from './AdminHeader';

export default function AdminUserList() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [reportsPerPage, setReportsPerPage] = useState(5);
    const [selectedReport, setSelectedReport] = useState(null);
    const [status, setStatus] = useState('');
    const [reportedUserId, setReportedUserId] = useState('');

    useEffect(() => {
        fetchReports();
    }, [currentPage, reportsPerPage]);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/admin/viewAbuseReport', {
                params: { page: currentPage, limit: reportsPerPage }
            });
            setReports(data.reports);
        } catch (error) {
            console.error('Failed to fetch reports', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (reportId,reportedUserId, newStatus) => {
        try {
                
            await axios.put(`/api/admin/changeReportStatus/${reportId}`, { status: newStatus });
            setReports(reports.map(report =>
                report._id === reportId ? { ...report, status: newStatus } : report
            ));
            if(newStatus === 'Blocked')
            { 
                console.log("reportedUserId")
                console.log(reportedUserId)

               const response = await fetch(`/api/admin/blockUnblockUser`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: reportedUserId, isBlocked: true, reason: 'Due to  abuse report' })
            });
           }
            setShowModal(false);
        } catch (error) {
            console.error('Failed to update report status', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageLimitChange = (e) => {
        setReportsPerPage(parseInt(e.target.value));
        setCurrentPage(1); // Reset to the first page when page limit changes
    };

    const renderPageLimitOptions = () => {
        return [5, 10, 15].map(limit => (
            <option key={limit} value={limit}>{limit}</option>
        ));
    };

    const renderPaginationButtons = () => {
        const totalPages = Math.ceil(reports.length / reportsPerPage);
        const buttons = [];
        
        const lowerBound = Math.max(1, currentPage - 2);
        const upperBound = Math.min(totalPages, currentPage + 2);
        
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= lowerBound && i <= upperBound)) {
                buttons.push(
                    <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                        <a className="page-link" href="#" onClick={(e) => handlePageChange(i)}>{i}</a>
                    </li>
                );
            } else if (i === lowerBound - 1 || i === upperBound + 1) {
                buttons.push(
                    <li key={i} className="page-item disabled">
                        <span className="page-link">...</span>
                    </li>
                );
            }
        }

        return (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {currentPage !== 1 && (
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>Prev</a>
                        </li>
                    )}
                    {buttons}
                    {currentPage !== totalPages && (
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>Next</a>
                        </li>
                    )}
                </ul>
            </nav>
        );
    };

    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

    return (
        <>
        <AdminHeader/>
            <section id="home" className="cover-bg">
                <div className="col-12 caption text-center">
                    <div className="button col-lg-6 col-md-6 col-sm-12">
                        <main id="site-main">
                            <h4>Abuse Reports Management</h4>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4">
                                        <label className="text-white">Page Limit:</label>
                                        <select
                                            className="form-control"
                                            value={reportsPerPage}
                                            onChange={handlePageLimitChange}
                                        >
                                            {renderPageLimitOptions()}
                                        </select>
                                    </div>
                                </div>
                                {loading ? (
                                    <div className="text-white">Loading...</div>
                                ) : (
                                    <form id="report-list">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th>Reporter</th>
                                                        <th>Reported User</th>
                                                        <th>Reason</th>
                                                        <th>Proof Image</th>
                                                        <th>Status</th>
                                                        <th colSpan = "2">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentReports.map(report => (
                                                        <tr key={report._id}>
                                                            <td>{report.reporterId.username}</td>
                                                            <td>{report.reportedUserId.username}</td>
                                                            <td>{report.reason}</td>
                                                            <td>
                                                                {report.proofImage ? (
                                                                    <a href={report.proofImage} target="_blank" rel="noopener noreferrer">
                                                                        View Image
                                                                    </a>
                                                                ) : (
                                                                    'No Image'
                                                                )}
                                                            </td>
                                                            <td>{report.status}</td>
                                                            <td>
                                                            {report.status !== 'Blocked' && (
                                                                <div className="control">
                                                                    <button
                                                                        type="button"
                                                                        className="btns"
                                                                        onClick={() => {
                                                                            setSelectedReport(report._id);
                                                                            setReportedUserId(report.reportedUserId)
                                                                            setStatus('Blocked');
                                                                            setShowModal(true);
                                                                        }}
                                                                    >
                                                                        Block
                                                                    </button>
                                                                    </div>
                                                            )}
                                                                    </td>
                                                                    <td>
                                                                    {report.status !== 'Resolved' && (
                                                                    <div className="control">
                                                                    <button
                                                                        type="button"
                                                                        className="btns"
                                                                        onClick={() => {
                                                                            setSelectedReport(report._id);
                                                                            setStatus('Resolved');
                                                                            setShowModal(true);
                                                                        }}
                                                                    >
                                                                        Mark as Resolved
                                                                    </button>
                                                                </div>
                                                                    )}
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
                    <Modal.Title>Update Report Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to mark this report as {status}?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btns" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button className="btns" onClick={() => handleStatusChange(selectedReport,reportedUserId, status)}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );


}

