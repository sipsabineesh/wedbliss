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
    const navigate = useNavigate();
    const [createPlan] = useCreatePlanMutation();
    
    // const {admin } = useSelector((state) => state.admin)

    const dispatch = useDispatch();
    // useEffect(() => {
    //     if(!admin){
    //       navigate('/dashboard');
    //     } 
    //     },[navigate,admin])
   

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
            const { data } = await createPlan({planName,planValidity,planPrice,noOfContacts,noOfMessages});
           
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
                <Form.Group className='my-2' controlId = 'planName'>
                <Form.Label>Name</Form.Label>
              <Form.Control
               type = 'text'
               placeholder = 'Plan Name'
               value={planName}
               onChange={(e) => setPlanName(e.target.value)}
              ></Form.Control>
               </Form.Group>

               <Form.Group className='my-2' controlId = 'planValidity'>
                <Form.Label>Validity</Form.Label>
              <Form.Control
               type = 'text'
               placeholder = 'Plan Validity'
               onChange={(e) => setPlanValidity(e.target.value)}
              ></Form.Control>
               </Form.Group>
               <Form.Group className='my-2' controlId = 'planPrice'>
                <Form.Label>Price</Form.Label>
              <Form.Control
               type = 'text'
               placeholder = 'Plan Price'
               onChange={(e) => setPlanPrice(e.target.value)}
              ></Form.Control>
               </Form.Group>
               <Form.Group className='my-2' controlId = 'noOfContacts'>
                <Form.Label>Number of Contacts Allowed</Form.Label>
              <Form.Control
               type = 'text'
               placeholder = 'No.of Contacts'
               onChange={(e) => setNoOfContacts(e.target.value)}
              ></Form.Control>
               </Form.Group>
               <Form.Group className='my-2' controlId = 'noOfMessages'>
                <Form.Label>Number of Messages Allowed</Form.Label>
              <Form.Control
               type = 'text'
               placeholder = 'No.of Messages'
               onChange={(e) => setNoOfMessages(e.target.value)}
              ></Form.Control>
               </Form.Group>


              
               <Button type='submit'  className='btns mt-3'>Submit</Button>
              
             </Form>
        </FormContainer></>
  )
}
