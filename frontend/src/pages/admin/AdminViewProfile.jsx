// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useGetUserQuery } from '../../redux/admin/adminApiSlice';

// export default function AdminViewProfile() {
//     const [dob, setDOB] = useState('');
//     const [age, setAge] = useState('');

//     const { id } = useParams();
//     const { data, error, isLoading } = useGetUserQuery(id);

//     useEffect(() => {
//         if (data) {
//             console.log('Fetched data:', data);
//             setDOB(data.dob);
//             calculateAge(data.dob);
//         }
//     }, [data]);

//     const calculateAge = (dob) => {
//         if (!dob) return;
//         const birthDate = new Date(dob);
//         const currentDate = new Date();
//         const ageDifference = currentDate.getFullYear() - birthDate.getFullYear();
//         if (currentDate.getMonth() < birthDate.getMonth() || (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
//             setAge(ageDifference - 1);
//         } else {
//             setAge(ageDifference);
//         }
//     };

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }

//     if (!data) {
//         return <div>No data available</div>;
//     }

//     return (
//         <div className="gradient-custom-2 d-flex justify-content-center align-items-center min-vh-100">
//             <div className="py-5 h-100 profile-width">
//                 <div className="justify-content-center align-items-center h-100">
//                     <div className="col-lg-9 col-xl-7 w-100">
//                         <div className="card">
//                             <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
//                                 <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
//                                     <img src={data.profilePhoto !== null ? data.profilePhoto : 'https://static-00.iconduck.com/assets.00/avatar-default-light-icon-512x512-6c79fqub.png'}
//                                         alt="Profile Picture" className="mt-4 mb-2 img-thumbnail" style={{ width: '150px', height: '150px', zIndex: '1' }} />
//                                 </div>
//                                 <div className="ms-3" style={{ marginTop: '130px' }}>
//                                     <h5>{data.username}</h5>
//                                     <p>Lives in {data.countryLivingIn}</p>
//                                 </div>
//                             </div>
//                             <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
//                                 <div className="row mb-5">
//                                     <div className="col-md-4 ml-5">
//                                         <div className="control">
//                                             <button type="submit" className="btns profile-button">Edit Profile</button>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="control">
//                                             <button type="button" className="btns profile-button">Change Email Address</button>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="control">
//                                             <button type="button" className="btns profile-button">Change Password</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="card-body text-black p-4">
//                                 <div className="mb-5">
//                                     <p className="lead fw-normal mb-1 text-black text-capitalize">About</p>
//                                     <div className="p-4 card-subbackground">
//                                         <p className="font-italic mb-1 text-black text-capitalize">{data.about}</p>
//                                     </div>
//                                 </div>
//                                 <div className="row mb-5">
//                                     <p className="lead fw-normal mb-1 text-black text-capitalize">Personal Details</p>
//                                     <div className="col">
//                                         <div className="p-4 card-subbackground">
//                                             <p className="font-italic mb-1 text-black text-capitalize">Age : {age}</p>
//                                             <p className="font-italic mb-1 text-black text-capitalize">Weight : {data.weight}Kg</p>
//                                             <p className="font-italic mb-0 text-black text-capitalize">Height : {data.height}cm</p>
//                                             <p className="font-italic mb-0 text-black text-capitalize">Marital Status : {data.maritalStatus || 'N/A'}</p>
//                                             <p className="font-italic mb-0 text-black text-capitalize">Diet : {data.diet || 'N/A'}</p>
//                                         </div>
//                                     </div>
//                                     <div className="col">
//                                         <div className="p-4 card-subbackground">
//                                             <p className="font-italic mb-1 text-black text-capitalize">Mother Tongue : {data.motherTongue}</p>
//                                             <p className="font-italic mb-1 text-black text-capitalize">Religion : {data.religion}</p>
//                                             <p className="font-italic mb-0 text-black text-capitalize">Caste : {data.caste}</p>
//                                             <p className="font-italic mb-0 text-black text-capitalize">Native Place : {data.nativePlace || 'N/A'}</p>
//                                             <p className="font-italic mb-0 text-black text-capitalize">Hobbies : {data.hobbies || 'N/A'}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="mb-5">
//                                     <p className="lead fw-normal mb-1 text-black text-capitalize">Education & Profession</p>
//                                     <div className="p-4 card-subbackground">
//                                         <p className="font-italic mb-1 text-black text-capitalize">Qualification : {data.qualification || 'N/A'}</p>
//                                         <p className="font-italic mb-1 text-black text-capitalize">Working Status : {data.workingStatus || 'N/A'}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";

export default function AdminViewProfile() {
    const [data, setData] = useState(null);
   
    const [dob, setDOB] = useState('');
    const [age, setAge] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/user/getUser/${id}`);
console.log(response)                
                setData(response.data.user);
                setDOB(response.data.dob);
                calculateAge(response.data.user.dob);
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
                if (response.ok) {
                    setData(prevData => ({
                        ...prevData,
                        isVerifiedByAdmin: true
                    }));
                    toast.success("User Verification Successful");
                }
            }
        } catch (error) {
            console.error('Error verifying user:', error);
        }
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
                              {!data.isVerifiedByAdmin && (
                                                                    <div className="control">
                                                                        <button
                                                                            type="button"
                                                                            className="btns"
                                                                            onClick={() => handleVerify(data._id)}
                                                                        >
                                                                            Verify
                                                                        </button>
                                                                    </div>
                                                                )}
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
        </div>
    );
}
