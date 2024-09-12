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

