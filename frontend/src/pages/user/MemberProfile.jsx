import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import io from 'socket.io-client';
import ReportAbuseModal from './ReportAbuseModal'; 

const socket = io('http://localhost:3000');

export default function MemberProfile() {

    const [data, setData] = useState(null);
    const [dob, setDOB] = useState('');
    const [age, setAge] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isBlocked, setIsBlocked] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportedUserId, setReportedUserId] = useState(null); 
    const { currentUser } = useSelector(state => state.user);
    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/user/getUser/${id}`);
console.log(response)                
                setData(response.data.user);
                setDOB(response.data.dob);
                calculateAge(response.data.user.dob);
                const currentUserResponse = await axios.get(`/api/user/getUser/${currentUser._id}`);
                const isBlocked = currentUserResponse.data.user.blockedProfiles.includes(id);
                setIsBlocked(isBlocked);
                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const calculateAge = (dob) => { 
        if (!dob) return;
        const birthDate = new Date(dob);
        const currentDate = new Date();
        const ageDifference = currentDate.getFullYear() - birthDate.getFullYear();
        if (currentDate.getMonth() < birthDate.getMonth() || (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
            setAge(ageDifference - 1);
        } else {
            setAge(ageDifference);
        }
    };


    const handleBlock = async (blockUserId) => {
        // try {
        //     const response = await fetch(`/api/user/blockMemberProfile/${currentUser._id}`, {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({ 
        //             blockUserId })
        //     });
        //     if (response.ok) {
        //             toast.success("Member has been blocked successful");
        //     }
        // } catch (error) {
        //     console.error('Error blocking profile:', error);
        // }
        try {
            const endpoint = isBlocked ? `/api/user/unblockMemberProfile/${currentUser._id}` : `/api/user/blockMemberProfile/${currentUser._id}`;
            const response = await axios.put(endpoint, {
                // userId: currentUser._id,
                blockUserId: data._id
            });

            if (response.status === 200) {
                setIsBlocked(!isBlocked);
                toast.success(`Member has been ${isBlocked ? 'unblocked' : 'blocked'} successfully`);
            }
        } catch (error) {
            console.error('Error toggling block status:', error);
            toast.error(`Failed to ${isBlocked ? 'unblock' : 'block'} member.`);
        }
    };

    // const handleReportAbuse = async () => {
    //     if (!currentUser) {
    //         toast.error("You must be logged in to report a user.");
    //         return;
    //     }

    //     if (!reportReason.trim()) {
    //         toast.error("Please provide a reason for reporting abuse.");
    //         return;
    //     }

    //     try {
    //         const response = await axios.post('/api/user/reportAbuse', {
    //             reporterId: currentUser._id,
    //             reportedUserId: data._id,
    //             reason: reportReason
    //         });

    //         if (response.status === 200) {
    //             toast.success("Abuse report submitted successfully.");
    //             setIsReportModalOpen(false);
    //             setReportReason('');
    //         }
    //     } catch (error) {
    //         console.error('Error reporting abuse:', error);
    //         toast.error("Failed to submit abuse report.");
    //     }
    // };

  
    const handleReportAbuse = async (userId) => {
      
        setShowReportModal(true);
        setReportedUserId(userId);
       
    };


    const closeModal = () => {
        setShowReportModal(false);
        setReportedUserId(null);
    };
    
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>No data available</div>;
    }



  return (
   
        <div className="gradient-custom-2 d-flex justify-content-center align-items-center min-vh-100">
            <div className="py-5 h-100 profile-width">
                <div className="justify-content-center align-items-center h-100">
                    <div className="col-lg-9 col-xl-7 w-100">
                        <div className="card">
                            <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                    <img src={data.profilePhoto !== null ? data.profilePhoto : 'https://res.cloudinary.com/dcsdqiiwr/image/upload/v1717406174/ava_xlfouh.png'}
                                        alt="Profile Picture" className="mt-4 mb-2 img-thumbnail" style={{ width: '150px', height: '150px', zIndex: '1' }} />
                                </div>
                                <div className="ms-3" style={{ marginTop: '130px' }}>
                                    <h5>{data.username}</h5>
                                    <p>Lives in {data.countryLivingIn}</p>
                                </div>
                            </div>
                            <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                              <div className="row mb-5">
                            
                                                                    <div className="control">
                                                                        <button
                                                                            type="button"
                                                                            className="btns"
                                                                            onClick={() => handleBlock(data._id)}
                                                                        >
                                                                           {isBlocked ? 'Unblock' : 'Block'}
                                                                        </button>
                                                                        
                                                                        <button
                                                                            type="button"
                                                                            className="btns"
                                                                            onClick={() => handleReportAbuse(data._id)}
                                                                        >
                                                                            Report Abuse
                                                                        </button>
                                                                    </div>
                                                                    <div className="control">
                                                                       
                                                                    </div>
                              </div>
                            </div>
                           
                            <div className="card-body text-black p-4">
                                <div className="mb-5">
                                    <p className="lead fw-normal mb-1 text-black text-capitalize">About</p>
                                    <div className="p-4 card-subbackground">
                                        <p className="font-italic mb-1 text-black text-capitalize">{data.about}</p>
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <p className="lead fw-normal mb-1 text-black text-capitalize">Personal Details</p>
                                    <div className="col">
                                        <div className="p-4 card-subbackground">
                                            <p className="font-italic mb-1 text-black text-capitalize">Age : {age}</p>
                                            <p className="font-italic mb-1 text-black text-capitalize">Weight : {data.weight}Kg</p>
                                            <p className="font-italic mb-0 text-black text-capitalize">Height : {data.height}cm</p>
                                            <p className="font-italic mb-0 text-black text-capitalize">Marital Status : {data.maritalStatus || 'N/A'}</p>
                                            <p className="font-italic mb-0 text-black text-capitalize">Diet : {data.diet || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="p-4 card-subbackground">
                                            <p className="font-italic mb-1 text-black text-capitalize">Mother Tongue : {data.motherTongue}</p>
                                            <p className="font-italic mb-1 text-black text-capitalize">Religion : {data.religion}</p>
                                            <p className="font-italic mb-0 text-black text-capitalize">Caste : {data.caste}</p>
                                            <p className="font-italic mb-0 text-black text-capitalize">Native Place : {data.nativePlace || 'N/A'}</p>
                                            <p className="font-italic mb-0 text-black text-capitalize">Hobbies : {data.hobbies || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <p className="lead fw-normal mb-1 text-black text-capitalize">Education & Profession</p>
                                    <div className="p-4 card-subbackground">
                                        <p className="font-italic mb-1 text-black text-capitalize">Qualification : {data.qualification || 'N/A'}</p>
                                        <p className="font-italic mb-1 text-black text-capitalize">Working Status : {data.workingStatus || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
              {/* Report Abuse Modal */}
        
             {/* <div className={`report-abuse-modal ${isOpen ? 'd-block' : 'd-none'}`}>
            <div className="report-abuse-modal-content">
                <span className="report-abuse-close" onClick={onClose}>&times;</span>
                <h2>Report Abuse</h2>
                <textarea
                    placeholder="Enter reason for reporting abuse..."
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                ></textarea>
                <button onClick={handleReportAbuse}>Submit</button>
            </div>
        </div> */}
          <ReportAbuseModal isOpen={showReportModal} onClose={closeModal} reportedUserId={reportedUserId} />
        </div>
  )
}

