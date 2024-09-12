
import { useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { clearUserIdForContact, userIdForContact } from '../../redux/user/userSlice'
import { Card, Spinner } from 'react-bootstrap';
import Header from '../../components/Header';

export default function ShowContact() {
    const [contactDetails, setContactDetails] = useState(null);
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const userId = useSelector(state => state.user.userIdForContact);
    useEffect(async() => {
        const fetchContactDetails = async () => {
        try {
            const res = await fetch('/api/user/getContactDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id:currentUser._id,userId:userId}),
            });
            const data = await res.json();
            setContactDetails(data)
        }
        catch(error){
            console.log(error)
        }
        }
        fetchContactDetails();
        dispatch(clearUserIdForContact());
       
    }, []);
    
  return (
    <>
     <Header />
     <section id="home" className="banner signup contact section_padding cover-bg">
                        
    <div className="container mt-4">
            <h2 className="mb-4 text-white">Contact Details</h2>
            <Card>
                <Card.Body>
                    {contactDetails ? (
                        <div>
                            <p className="mb-1"><strong>Email:</strong> {contactDetails.email}</p>
                            <p className="mb-0"><strong>Phone Number:</strong> {contactDetails.phoneNumber}</p>
                            <p className="mb-0"><strong>Number of Contacts remaining in your Plan:</strong> {contactDetails.remainingContacts}</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    )}
                </Card.Body>
            </Card>
            {/* <Card>
                <Card.Body>
                  
                        <div>
                            <p className="mb-1"><strong>You have </strong> {contactDetails.remainingContacts} remaining contacts to show for your Plan</p>
                        </div>
                   
                </Card.Body>
            </Card>

             */}
        </div>
        </section>
</>
  )
}
