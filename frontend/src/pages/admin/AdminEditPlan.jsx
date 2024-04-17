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
        try {
          if (!planName || !planValidity || !planPrice || !noOfContacts || !noOfMessages) {
            toast.error('Please fill in all fields');
            return;
        }

        // Validating planPrice, noOfContacts, and noOfMessages as numbers
        if (isNaN(planPrice) || isNaN(noOfContacts) || isNaN(noOfMessages)) {
            toast.error('Price, number of contacts, and number of messages must be valid numbers');
            return;
        }
            const { data } = await editPlan({
                id:plan._id,
                planName,
                planValidity,
                planPrice,
                noOfContacts,
                noOfMessages});
       console.log("sdfds")
        console.log(data)

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
                    <Form.Group className='my-2' controlId = 'planName'>
                    <Form.Label>Name</Form.Label>
                  <Form.Control
                   type = 'text'
                   value = {planName}
                   placeholder = 'Plan Name'
                   onChange={(e) => setPlanName(e.target.value)}
                  ></Form.Control>
                   </Form.Group>
    
                   <Form.Group className='my-2' controlId = 'planValidity'>
                    <Form.Label>Validity</Form.Label>
                  <Form.Control
                   type = 'text'
                   value = {planValidity}
                   placeholder = 'Plan Validity'
                   onChange={(e) => setPlanValidity(e.target.value)}
                  ></Form.Control>
                   </Form.Group>
                   <Form.Group className='my-2' controlId = 'planPrice'>
                    <Form.Label>Price</Form.Label>
                  <Form.Control
                   type = 'text'
                   value = {planPrice}
                   placeholder = 'Plan Price'
                   onChange={(e) => setPlanPrice(e.target.value)}
                  ></Form.Control>
                   </Form.Group>
                   <Form.Group className='my-2' controlId = 'noOfContacts'>
                    <Form.Label>Number of Contacts Allowed</Form.Label>
                  <Form.Control
                   type = 'text'
                   value = {noOfContacts}
                   placeholder = 'No.of Contacts'
                   onChange={(e) => setNoOfContacts(e.target.value)}
                  ></Form.Control>
                   </Form.Group>
                   <Form.Group className='my-2' controlId = 'noOfMessages'>
                    <Form.Label>Number of Messages Allowed</Form.Label>
                  <Form.Control
                   type = 'text'
                   value = {noOfMessages}
                   placeholder = 'No.of Messages'
                   onChange={(e) => setNoOfMessages(e.target.value)}
                  ></Form.Control>
                   </Form.Group>
                   <Button type='submit'  className='btns mt-3'>Submit</Button>
                 </Form>
            </FormContainer></>
      )
}



