import { useState,useEffect } from 'react';
import { useParams ,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { Form,Button,Row,Col } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer';
import { toast } from "react-toastify";
import AdminHeader from '../../components/AdminHeader';
import { useEditPlanMutation } from '../../redux/admin/adminApiSlice';

export default function AdminEditPlan() {
    const {id} = useParams()
    const plans = useSelector(state => state.admin.plans);
    const plan = plans.plan.find( u => u._id === id)
    console.log(plan)
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
    const [editPlan] = useEditPlanMutation();
   
    useEffect(() => {
        setPlanName(plan.planName);
        setPlanValidity(plan.planValidity);
        setPlanPrice(plan.planPrice);
        setNoOfContacts(plan.noOfContacts);
        setNoOfMessages(plan.noOfMessages);
      }, [plan.planName, plan.planValidity,plan.planPrice,plan.noOfContacts,plan.noOfMessages]);
    
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
          const { data } = await editPlan({
            id: plan._id,
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
      <h2>Edit Plan</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='my-2' controlId='planName'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            value={planName}
            placeholder='Plan Name'
            onChange={(e) => setPlanName(e.target.value)}
            isInvalid={!!planNameError} 
          />
          {planNameError && <div className="error-message">{planNameError}</div>}
        </Form.Group>
    
        <Form.Group className='my-2' controlId='planValidity'>
          <Form.Label>Validity</Form.Label>
          <Form.Control
            type='text'
            value={planValidity}
            placeholder='Plan Validity'
            onChange={(e) => setPlanValidity(e.target.value)}
            isInvalid={!!planValidityError}
          />
          {planValidityError && <div className="error-message">{planValidityError}</div>}
        </Form.Group>
    
        <Form.Group className='my-2' controlId='planPrice'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='text'
            value={planPrice}
            placeholder='Plan Price'
            onChange={(e) => setPlanPrice(e.target.value)}
            isInvalid={!!planPriceError} 
          />
          {planPriceError && <div className="error-message">{planPriceError}</div>}
        </Form.Group>
    
        <Form.Group className='my-2' controlId='noOfContacts'>
          <Form.Label>Number of Contacts Allowed</Form.Label>
          <Form.Control
            type='text'
            value={noOfContacts}
            placeholder='No.of Contacts'
            onChange={(e) => setNoOfContacts(e.target.value)}
            isInvalid={!!noOfContactsError}
          />
          {noOfContactsError && <div className="error-message">{noOfContactsError}</div>}
        </Form.Group>
    
        <Form.Group className='my-2' controlId='noOfMessages'>
          <Form.Label>Number of Messages Allowed</Form.Label>
          <Form.Control
            type='text'
            value={noOfMessages}
            placeholder='No.of Messages'
            onChange={(e) => setNoOfMessages(e.target.value)}
            isInvalid={!!noOfMessagesError} 
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