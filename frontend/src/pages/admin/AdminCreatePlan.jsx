import { useState,useEffect } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { Form,Button,Row,Col } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer';
import { toast } from "react-toastify";
import AdminHeader from '../../components/AdminHeader';
import { useCreatePlanMutation  } from '../../redux/admin/adminApiSlice';


export default function AdminCreatePlan() {
    // const [formData,setFormData] = useState({})
    const [planName,setPlanName] = useState('')
    const [planValidity,setPlanValidity] = useState('')
    const [planPrice,setPlanPrice] = useState(null)
    const [noOfContacts,setNoOfContacts] = useState(null)
    const [noOfMessages,setNoOfMessages] = useState(null)
    const [planNameError, setPlanNameError] = useState('');
    const [planValidityError, setPlanValidityError] = useState('');
    const [planPriceError, setPlanPriceError] = useState('');
    const [noOfContactsError, setNoOfContactsError] = useState('');
    const [noOfMessagesError, setNoOfMessagesError] = useState('');

    const navigate = useNavigate();
    const [createPlan] = useCreatePlanMutation();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      let valid = true;
  
      setPlanNameError('');
      setPlanValidityError('');
      setPlanPriceError('');
      setNoOfContactsError('');
      setNoOfMessagesError('');
  
      if (!planName) {
          setPlanNameError('Plan name is required');
          valid = false;
      }
  
      if (!planValidity) {
          setPlanValidityError('Plan validity is required');
          valid = false;
      }
  
      if (!planPrice) {
          setPlanPriceError('Plan price is required');
          valid = false;
      } else if (isNaN(planPrice)) {
          setPlanPriceError('Plan price must be a valid number');
          valid = false;
      } else if (planPrice < 0) {
          setPlanPriceError('Plan price must be non-negative');
          valid = false;
      }
  
      if (!noOfContacts) {
          setNoOfContactsError('Number of contacts is required');
          valid = false;
      } else if (isNaN(noOfContacts)) {
          setNoOfContactsError('Number of contacts must be a valid number');
          valid = false;
      } else if (noOfContacts < 0) {
          setNoOfContactsError('Number of contacts must be non-negative');
          valid = false;
      }
  
      if (!noOfMessages) {
          setNoOfMessagesError('Number of messages is required');
          valid = false;
      } else if (isNaN(noOfMessages)) {
          setNoOfMessagesError('Number of messages must be a valid number');
          valid = false;
      } else if (noOfMessages < 0) {
          setNoOfMessagesError('Number of messages must be non-negative');
          valid = false;
      }
  
      if (!valid) return;
  
      try {
          const { data } = await createPlan({
              planName,
              planValidity,
              planPrice: Number(planPrice),
              noOfContacts: Number(noOfContacts),
              noOfMessages: Number(noOfMessages),
          });
  
          if (data.success) {
              toast.success(data.message);
              navigate('/planList');
          } else {
              toast.error(data.message);
          }
      } catch (err) {
          toast.error(err.message || err);
      }
  };
  
      
  return (
    <>
    <AdminHeader/>
    <FormContainer>
            <h2>Add Plan</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='my-2' controlId='planName'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Plan Name'
                        value={planName}
                        onChange={(e) => setPlanName(e.target.value)}
                        isInvalid={!!planNameError} // Bootstrap validation
                    />
                    {planNameError && <div className="error-message">{planNameError}</div>}
                </Form.Group>

                <Form.Group className='my-2' controlId='planValidity'>
                    <Form.Label>Validity</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Plan Validity'
                        value={planValidity}
                        onChange={(e) => setPlanValidity(e.target.value)}
                        isInvalid={!!planValidityError} // Bootstrap validation
                    />
                    {planValidityError && <div className="error-message">{planValidityError}</div>}
                </Form.Group>

                <Form.Group className='my-2' controlId='planPrice'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Plan Price'
                        value={planPrice}
                        onChange={(e) => setPlanPrice(e.target.value)}
                        isInvalid={!!planPriceError} // Bootstrap validation
                    />
                    {planPriceError && <div className="error-message">{planPriceError}</div>}
                </Form.Group>

                <Form.Group className='my-2' controlId='noOfContacts'>
                    <Form.Label>Number of Contacts Allowed</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='No.of Contacts'
                        value={noOfContacts}
                        onChange={(e) => setNoOfContacts(e.target.value)}
                        isInvalid={!!noOfContactsError} // Bootstrap validation
                    />
                    {noOfContactsError && <div className="error-message">{noOfContactsError}</div>}
                </Form.Group>

                <Form.Group className='my-2' controlId='noOfMessages'>
                    <Form.Label>Number of Messages Allowed</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='No.of Messages'
                        value={noOfMessages}
                        onChange={(e) => setNoOfMessages(e.target.value)}
                        isInvalid={!!noOfMessagesError} // Bootstrap validation
                    />
                    {noOfMessagesError && <div className="error-message">{noOfMessagesError}</div>}
                </Form.Group>

                <Button type='submit' className='btns mt-3'>
                    Submit
                </Button>
            </Form>
        </FormContainer>
    </>
  )
}
