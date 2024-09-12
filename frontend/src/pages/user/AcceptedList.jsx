import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';

export default function AcceptedList() {
    const [list, setList] = useState({});
    const [loading, setLoading] = useState(true); // Loading state
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        const fetchData = async () => {
            if (!currentUser) {
                console.error("Current user is not available");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/user/getAcceptList/${currentUser._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setList(data);
            } catch (error) {
                console.error('Error fetching accepted list:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentUser]);

    const calculateAge = (dob) => {
        const currentDate = new Date();
        const birthDate = new Date(dob);
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = currentDate.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="vh-100 content">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-9 col-lg-7 col-xl-5 mt-5 w-100">
                                <div className="text-center">
                                    <p className="text-black">Loading...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="vh-100 content">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-9 col-lg-7 col-xl-5 mt-5 w-100">
                            <h4>Accepted Interest</h4>
                            {Object.keys(list).length === 0 ? (
                                <div className="text-center">
                                    <p className="text-black">No accepted list found.</p>
                                </div>
                            ) : (
                                Object.keys(list).map(key => (
                                    list[key].map(user => {
                                        const { _id, interestedTo } = user;
                                        const { profilePhoto, username, nativePlace, dob, height, qualification } = interestedTo;

                                        return (
                                            <div className="card mt-2" style={{ borderRadius: '15px' }} key={_id}>
                                                <div className="card-body p-4">
                                                    <div className="d-flex text-black">
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                style={{ width: '180px', borderRadius: '10px' }}
                                                                src={profilePhoto || 'https://res.cloudinary.com/dcsdqiiwr/image/upload/v1717406174/ava_xlfouh.png'}
                                                                alt='Profile Photo'
                                                                className="img-fluid"
                                                            />
                                                        </div>
                                                        <div className="flex-grow-1 ms-3">
                                                            <h5 className="card-title">{username}</h5>
                                                            <p className="card-text">{nativePlace}</p>

                                                            <div className="d-flex justify-content-start rounded-3 p-2 mb-2" style={{ backgroundColor: '#efefef' }}>
                                                                <div>
                                                                    <p className="small text-muted mb-1">Age</p>
                                                                    <p className="mb-0">{calculateAge(dob)}</p>
                                                                </div>
                                                                <div className="px-3">
                                                                    <p className="small text-muted mb-1">Height</p>
                                                                    <p className="mb-0">{height}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="small text-muted mb-1">Qualification</p>
                                                                    <p className="mb-0">{qualification}</p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
