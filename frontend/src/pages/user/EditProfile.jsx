import { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { editUserSuccess, logout } from '../../redux/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios'; 
import { toast } from 'react-toastify';
import Header from '../../components/Header.jsx';


const indianLanguages = [
  'Assamese', 'Bengali', 'Bodo', 'Dogri', 'Gujarati', 'Hindi', 'Kannada',
  'Kashmiri', 'Konkani', 'Maithili', 'Malayalam', 'Manipuri', 'Marathi', 'Nepali',
  'Odia', 'Punjabi', 'Sanskrit', 'Santali', 'Sindhi', 'Tamil', 'Tulu','Telugu', 'Urdu'
];

const validationSchema = Yup.object({
  username: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  dob: Yup.date().min(new Date('1970-01-01'), 'Date must be after 1970').required('Date of birth is required'),
  phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
  religion: Yup.string().required('Religion is required'),
  caste: Yup.string().required('Caste is required'),
  maritalStatus: Yup.string().required('Marital Status is required'),
  diet: Yup.string().required('Diet is required'),
  motherTongue: Yup.string().required('Mother Tongue is required'),
  nativePlace: Yup.string().required('Native Place is required'),
  height: Yup.string().matches(/^[0-9]+$/, 'Height must be a number').required('Height is required'),
  weight: Yup.string().matches(/^[0-9]+$/, 'Weight must be a number').required('Weight is required'),
  hobbies: Yup.string().required('Hobby is required'),
  countryLivingIn: Yup.string().required('Country Living In is required'),
  qualification: Yup.string().required('Qualification is required'),
  workingStatus: Yup.string().required('Working Status is required'),
  about:Yup.string().required('Tell Us About You'),
});

export default function EditProfile() {
  const [email, setEmail] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);
  const [dob, setDOB] = useState('');

  useEffect(() => {
    // if (imageFile) {
    //   uploadImage(imageFileURL);
    // }
    setEmail(currentUser.email);
    setDOB(convertDateFormat(currentUser.dob));
  }, [currentUser, imageFileURL]);

  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setImageFile(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
        setImageFileURL(reader.result);
      };
    }
  };

  const convertDateFormat = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <Header />
      <section id="contact" className="signup contact section_padding cover-bg">
        <div className="container">
          <div className="row">
            <div className="section_title text-center">
              <p>Enhance Your Profile</p>
              <h3>Edit Profile</h3>
            </div>
            <div className="col-md-12">
              <div className="signup-form">
                <Formik
                  initialValues={{
                    username: currentUser.username || '',
                    email: currentUser.email || '',
                    gender: currentUser.gender || '',
                    dob: convertDateFormat(currentUser.dob),
                    phoneNumber: currentUser.phoneNumber || '',
                    religion: currentUser.religion || '',
                    caste: currentUser.caste || '',
                    maritalStatus: currentUser.maritalStatus || '',
                    diet: currentUser.diet || '',
                    motherTongue: currentUser.motherTongue || '',
                    nativePlace: currentUser.nativePlace || '',
                    height: currentUser.height || '',
                    weight: currentUser.weight || '',
                    hobbies: currentUser.hobbies || '',
                    countryLivingIn: currentUser.countryLivingIn || '',
                    qualification: currentUser.qualification || '',
                    workingStatus: currentUser.workingStatus || '',
                    about: currentUser.about || '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { setSubmitting, setErrors }) => {
                    try {
                      let imageUrl = '';
                      if (imageFileURL) {
                           imageUrl =  imageFileURL
                      }
                      const res = await fetch(`/api/user/editProfile/${currentUser._id}`, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({...values, profilePhoto: imageUrl}),
                      });

                      const data = await res.json();
                      if (data.success === false) {
                        dispatch(logout());
                        setErrors({ apiError: 'You have been blocked by Admin. Please Contact the Admin' });
                        navigate('/login');
                      } else {
                        dispatch(editUserSuccess(data));
                        toast.success('Profile updated');
                        navigate('/profile');
                      }

                      setSubmitting(false);
                    } catch (error) {
                      setSubmitting(false);
                      setErrors({ apiError: 'Something went wrong. Please try again later.' });
                    }
                  }}
                >
                  {({ isSubmitting, setFieldValue, errors }) => (
                    <Form>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <input type="file" accept="image/*" id="profilePhoto" onChange={(e) => {
                              handleImageChange(e);
                              setFieldValue("profilePhoto", e.currentTarget.files[0]);
                            }} ref={filePickerRef} hidden />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <div className="rounded-image-container" onClick={() => filePickerRef.current.click()}>
                              <img
                                src={imageFileURL || 'https://static-00.iconduck.com/assets.00/avatar-default-light-icon-512x512-6c79fqub.png'}
                                alt="Profile Picture"
                                className="rounded-image"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <Field type="text" id="username" name="username" placeholder="Name" className="form-control" />
                            <ErrorMessage name="username" component="div" className="errorMsg" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <Field type="email" id="email" name="email" placeholder="Email" className="form-control" />
                            <ErrorMessage name="email" component="div" className="errorMsg" />
                          </div>
                        </div>

                        <div className="col-md-3 gender-row">
                          <div className="form-group">
                            <span className="gender-title">Gender</span>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <Field type="radio" id="gender" className="gender-details" name="gender" value="male" 
                            defaultChecked={currentUser.gender === 'male'}/>
                            <label htmlFor="male" className="gender-label">Male</label>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <Field type="radio" id="gender" className="gender-details" name="gender" value="female"
                            defaultChecked={currentUser.gender === 'female'} />
                            <label htmlFor="female" className="gender-label">Female</label>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <Field type="date" id="dob" placeholder="Date of Birth" name="dob" className="form-control" />
                            <ErrorMessage name="dob" component="div" className="errorMsg" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <Field type="text" id="phoneNumber" placeholder="Phone Number" name="phoneNumber" className="form-control" />
                            <ErrorMessage name="phoneNumber" component="div" className="errorMsg" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <div className="select-box">
                              <Field as="select" id="religion" name="religion" className="form-control">
                                <option value="" label="Select Religion" />
                                <option value="Hindu" label="Hindu" />
                                <option value="Muslim" label="Muslim" />
                                <option value="Christian" label="Christian" />
                                <option value="Sikh" label="Sikh" />
                                <option value="Other" label="Other" />
                              </Field>
                              <ErrorMessage name="religion" component="div" className="errorMsg" />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <div className="select-box">
                              <Field as="select" id="caste" name="caste" className="form-control">
                                <option value="" label="Select Caste" />
                                <option value="General" label="General" />
                                <option value="OBC" label="OBC" />
                                <option value="SC" label="SC" />
                                <option value="ST" label="ST" />
                                <option value="Other" label="Other" />
                              </Field>
                              <ErrorMessage name="caste" component="div" className="errorMsg" />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <div className="select-box">
                              <Field as="select" id="maritalStatus" name="maritalStatus" className="form-control">
                                <option value="" label="Select Marital Status" />
                                <option value="Single" label="Single" />
                                <option value="Married" label="Married" />
                                <option value="Divorced" label="Divorced" />
                                <option value="Widowed" label="Widowed" />
                              </Field>
                              <ErrorMessage name="maritalStatus" component="div" className="errorMsg" />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <div className="select-box">
                              <Field as="select" id="diet" name="diet" className="form-control">
                                <option value="" label="Select Diet" />
                                <option value="Vegetarian" label="Vegetarian" />
                                <option value="Non-Vegetarian" label="Non-Vegetarian" />
                                <option value="Vegan" label="Vegan" />
                              </Field>
                              <ErrorMessage name="diet" component="div" className="errorMsg" />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <div className="select-box">
                              <Field as="select" id="motherTongue" name="motherTongue" className="form-control">
                                <option value="" label="Select your Mother Tongue" />
                                {indianLanguages.map((language, index) => (
                                  <option key={index} value={language}>{language}</option>
                                ))}
                              </Field>
                              <ErrorMessage name="motherTongue" component="div" className="errorMsg" />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <Field type="text" id="nativePlace" placeHolder="Native Place" name="nativePlace" className="form-control" />
                            <ErrorMessage name="nativePlace" component="div" className="errorMsg" />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <Field type="text" id="height" name="height" placeHolder="Height" className="form-control" />
                            <ErrorMessage name="height" component="div" className="errorMsg" />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <Field type="text" id="weight" name="weight" placeHolder="Weight" className="form-control" />
                            <ErrorMessage name="weight" component="div" className="errorMsg" />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <Field type="text" id="hobbies" name="hobbies" placeHolder="Hobbies" className="form-control" />
                            <ErrorMessage name="hobbies" component="div" className="errorMsg" />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <div className="select-box">
                              <Field as="select" id="countryLivingIn" placeHolder="Country Living In" name="countryLivingIn" className="form-control">
                                <option value="" label="Select country" />
                                <option value="India" label="India" />
                                <option value="USA" label="USA" />
                                <option value="Other" label="Other" />
                              </Field>
                              <ErrorMessage name="countryLivingIn" component="div" className="errorMsg" />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <div className="select-box">
                              <Field as="select" id="qualification" name="qualification" className="form-control">
                              <option value="" label="Select Qualification" />
//                            <option value="Higher Secondary">Higher Secondary</option>
//                           <option value="Diploma">Diploma</option>
//                           <option value="Graduation">Graduation</option>
//                           <option value="Post Graduation">Post Graduation</option>
//                           <option value="Other">Other</option>
                              </Field>
                              <ErrorMessage name="qualification" component="div" className="errorMsg" />
                            </div>
                          </div>
                        </div>
  
                        <div className="col-md-6">
                          <div className="form-group">
                            <div className="select-box">
                              <Field as="select" id="workingStatus" name="workingStatus" className="form-control">
                                <option value="" label="Select working status" />
                                <option value="Employed" label="Employed" />
                                <option value="Unemployed" label="Unemployed" />
                                <option value="Student" label="Student" />
                              </Field>
                              <ErrorMessage name="workingStatus" component="div" className="errorMsg" />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12">
                         <Field type="textarea"  id="about" placeHolder="About You" name="about" className="form-control" />
                            {/* <textarea placeholder="About Yourself"  id="about" className="form-control" defaultValue={currentUser.about}></textarea> */}
                            <ErrorMessage name="about" component="div" className="errorMsg" />
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <button type="submit" className="btns submit_btn" disabled={isSubmitting}>
                              {isSubmitting ? 'Updating...' : 'Update Profile'}
                            </button>
                            {errors.apiError && <div className="errorMsg">{errors.apiError}</div>}
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}



// import { useState,useEffect,useRef } from 'react'
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { Link, useNavigate } from 'react-router-dom'
// import { editUserSuccess,logout } from '../../redux/user/userSlice.js'
// import { useDispatch, useSelector } from 'react-redux'
// import { toast } from 'react-toastify';
// import Header from '../../components/Header.jsx';

// const validationSchema = Yup.object({
//   username: Yup.string().required('Name is required'),
//   email: Yup.string().email('Invalid email address').required('Email is required'),
//   // password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//   // age: Yup.number().min(18, 'You must be at least 18 years old').required('Age is required'),
//   dob: Yup.date().min(new Date('1970-01-01'), 'Date must be after 1970').required('Date of birth is required'),
//   phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
//   religion: Yup.string().required('Religion is required'),
//   caste: Yup.string().required('Caste is required'),
//   maritalStatus: Yup.string().required('Marital Status is required'),
//   diet: Yup.string().required('Diet is required'),
//   motherTongue: Yup.string().required('Mother Tongue is required'),
//   nativePlace: Yup.string().required('Native Place is required'),
//   height:  Yup.string().matches(/^[0-9]$/, 'Height must be a number').required('Height is required'),
//   weight: Yup.string().matches(/^[0-9]$/, 'Height must be a number').required(' Weight is required'),
//   hobbies: Yup.string().required('Hobby is required'),
//   countryLivingIn: Yup.string().required('Country Living In is required'),
//   qualification: Yup.string().required('Qualification is required'),
//   workingStatus: Yup.string().required('WorkingStatus is required'),
// });

// export default function EditProfile() {
//   const [email,setEmail] = useState('')
//   const [imageFile,setImageFile] = useState(null)
//   const [imageFileURL,setImageFileURL] = useState(null)
//   const filePickerRef = useRef()
//   const [errors, setErrors] = useState({});
//   // const [formData,setFormData] = useState({})
//   const [loading,setLoading] = useState(false)
//   const [error,setError] = useState('')
//   const [dob,setDOB] = useState('')
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const { currentUser } = useSelector(state => state.user);
//   const [formData, setFormData] = useState({
//     username: currentUser.username || '',
//     email: currentUser.email || '',
//     phoneNumber: currentUser.phoneNumber || '',
//     motherTongue:currentUser.motherTongue || '',
//     nativePlace:currentUser.nativePlace || '',
//     height:currentUser.height || '',
//     weight:currentUser.weight || '',
//     hobbies:currentUser.hobbies || '',
//     countryLivingIn:currentUser.countryLivingIn || '',
// });
//   useEffect(() => {
//     console.log("current user in edit")
//     console.log(currentUser)
//     if(imageFile){
//       uploadImage(imageFileURL)
//     }
//     setEmail(currentUser.email);
//     function convertDateFormat(dateString) {
//       const date = new Date(dateString);
//       const day = date.getDate().toString().padStart(2, '0');
//       const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
//       const year = date.getFullYear();
//       return `${year}-${month}-${day}`;
//     }
    
//     const originalDate = currentUser.dob
//     const formattedDate = convertDateFormat(originalDate);
//     setDOB(formattedDate)
    
//   }, [currentUser,imageFileURL]);
  
//   const uploadImage = (base6Encode) => {
//     console.log('uplodingggggggggggg')
//     console.log(base6Encode)
//     try {
      
//     } catch (error) {
//       console.log(error)
//     }
    
//   }
//   const handleImageChange = (e) => {
//     const file = e.target.files[0]
//     if(file){
//        setImageFile(file)
//        const reader = new FileReader()
//        reader.readAsDataURL(file)
//        reader.onloadend = () => {
//         setImageFileURL(reader.result)
//        }
//        setFormData({ ...formData, [e.target.id]: imageFileURL });
//       //  setImageFileURL(URL.createObjectURL(file))
//     }
   
//   }

// const handleChange = (e) => {
//   let value = e.target.value;

//   if (e.target.type === 'date') {
//     const selectedDate = new Date(e.target.value);
//     value = selectedDate.toISOString();
//   }

//   setFormData({ ...formData, [e.target.id]: value });
//   setErrors({ ...errors, [e.target.id]: '' });
// }

// const handleSubmit = async(e) => {
//   e.preventDefault();
//   try {
   
//     if(imageFile){
//       uploadImage()
//     }
//     e.preventDefault();

//     const newErrors = {};
    
//     if (!formData.username) {
//         newErrors.username = 'Please enter the username';
//     }
//     if (!dob) { // Check if dob is empty
//         newErrors.dob = 'Please enter the date of birth';
//     }
//     if (!formData.phoneNumber) {
//         newErrors.phoneNumber = 'Please enter the phone number';
//     }
//     if (!formData.nativePlace) {
//       newErrors.nativePlace = 'Please enter your Native Place';
//     }
//     if (!formData.motherTongue) {
//       newErrors.motherTongue = 'Please enter your Mother Tongue';
//     }
//     if (!formData.height) {
//       newErrors.height = 'Please enter Height';
//     }
//     if (!formData.weight) {
//       newErrors.weight = 'Please enter Weight';
//     }
//     if (!formData.hobbies) {
//       newErrors.hobbies = 'Please enter the hobby';
//     }
//     if (!formData.countryLivingIn) {
//       newErrors.countryLivingIn = 'Please enter the country you are living in';
//     }

//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       setLoading(false);
//       return;
//   }


//       setLoading(true)
//       setError('')
//       console.log("FORMDATA")
//       console.log(formData)
//       const res = await fetch (`/api/user/editProfile/${currentUser._id}`,{
//       method:'PUT',
//       headers:{
//           'Content-Type':'application/json',
//       },
//       body:JSON.stringify(formData),
//   })
//     const data = await res.json()
//  console.log(data)  
//     if(data.success === false)
//     {
//       dispatch(logout())
//       setError('You have been blocked by Admin. Please Contact the Admin')
//       navigate('/login')
//     }else{
//       setLoading(false)
//       setError('')
//       dispatch(editUserSuccess(data))
//       toast.success('Profile updated')
//       navigate('/profile')
//      }
  
//     setLoading(false)
//   } catch (error) {
//       setLoading(false)
//       setError(error)
//   }
// }
// const validateEmail = email => {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return regex.test(email);
// };

// const validatePhoneNumber = phoneNumber => {
//   const regex = /^[0-9]{10}$/;
//   return regex.test(phoneNumber);
// };


//   return (
//     <>
//     <Header/>
//     <section id="contact" className="signup contact section_padding cover-bg">
//       <div className="container">
//         <div className="row">
//           <div className="section_title text-center">
//             <p>Enhance Your Profile</p>
//             <h3>Edit Profile</h3>
//           </div>

//           <div className="col-md-12">
//             <div className="signup-form">
//               <form onSubmit={handleSubmit} >
//                 <div className="row">
//                 <div className="col-md-6">
//                     <div className="form-group">
//                       <input type="file" accept="image/*" id="profilePhoto" onChange={handleImageChange} ref={filePickerRef} hidden/>
//                     </div>
//                   </div>
//                   <div className="col-md-12">
//                     <div className="form-group">
//                     <div className="rounded-image-container" onClick={() => filePickerRef.current.click()}>
//                       <img
//                         src={imageFileURL || 'https://static-00.iconduck.com/assets.00/avatar-default-light-icon-512x512-6c79fqub.png'}
//                         alt="Profile Picture"
//                         className="rounded-image"
//                       />
//                     </div>
//                     </div>
//                   </div>


//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <input type="text" id="name" placeholder="Name" defaultValue={currentUser.username} onChange={handleChange} />
//                     </div>
//                     {errors.username && <span className="errorMsg">{errors.username}</span>}
                    
//                   </div>
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <input type="email" id="email" placeholder="Email" defaultValue={email}  onChange={handleChange}/>
//                     </div>
//                  </div>
//                   <div className="col-md-3 gender-row">
//                     <div className="form-group">
//                       <span className="gender-title">Gender</span>
//                     </div>
//                   </div>
//                   <div className="col-md-3">
//                     <div className="form-group">
//                       <input type="radio" id="gender" className="gender-details" name="gender" value="male" 
//                         defaultChecked={currentUser.gender === 'male'} onChange={handleChange}/>
//                       <label htmlFor="male" className="gender-label">Male</label>
//                     </div>
//                   </div>
//                   <div className="col-md-3">
//                     <div className="form-group">
//                       <input type="radio" id="gender" className="gender-details"  name="gender" value="female"
//                        defaultChecked={currentUser.gender === 'female' } onChange={handleChange}   />
//                       <label htmlFor="female" className="gender-label">Female</label>
//                     </div>
//                   </div> 
//                   <div className="col-md-6">
//                     <div className="form-group">
//                        <input type="date" placeholder="Date of Birth" id="dob"  defaultValue={dob} onChange={handleChange}  />
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                   <div className="form-group">
//                     <input type="text" id="phoneNumber"  defaultValue={currentUser.phoneNumber}  onChange={handleChange} />
//                   </div>
//                   {errors.phoneNumber && <span className="errorMsg">{errors.phoneNumber}</span>}
//                 </div>
//                 <div className="col-md-6">
//                     <div className="form-group">
//                       <div className="select-box">
//                       <select id="religion"  defaultValue={currentUser.religion} onChange={handleChange}>
//                         <option disabled selected hidden>Religion</option>
//                         <option value="Hindu">Hindu</option>
//                             <option value="Muslim">Muslim</option>
//                             <option value="Christian">Christian</option>
//                             <option value="Sikh">Sikh</option>
//                             <option value="Buddhist">Buddhist</option>
//                             <option value="Jain">Jain</option>
//                             <option value="Other">Other</option>
//                       </select>
//                       </div>
//                     </div>
//                   </div>
                   
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <div className="select-box">
//                       <select id="caste"  defaultValue={currentUser.caste} onChange={handleChange}>
//                           <option disabled selected hidden>Caste</option>
//                          <option value="Hindu">Hindu</option>
//                             <option value="Muslim">Muslim</option>
//                             <option value="Christian">Christian</option>
//                             <option value="Sikh">Sikh</option>
//                             <option value="Buddhist">Buddhist</option>
//                             <option value="Jain">Jain</option>
//                             <option value="Other">Other</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
                  
//                  <div className="col-md-6">
//                     <div className="form-group">
//                       <div className="select-box">
//                         <select id="maritalStatus"  defaultValue={currentUser.maritalStatus} onChange={handleChange}>
//                         <option disabled selected hidden>Marital Status</option>
//                           <option value="single">Single</option>
//                           <option value="divorced">Divorced</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                    <div className="col-md-6">
//                     <div className="form-group">
//                       <div className="select-box">
//                         <select id="diet"  defaultValue={currentUser.diet} onChange={handleChange}>
//                         <option disabled selected hidden>Diet</option>
//                           <option value="Vegetarian">Vegetarian</option>
//                           <option value="Non-Veg">Non-Veg</option>
//                           <option value="Vegan">Vegan</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <input type="text" id="motherTongue" placeholder="Mother Tongue" defaultValue={currentUser.motherTongue} onChange={handleChange} />
//                        {errors.motherTongue && <span className="errorMsg">{errors.motherTongue}</span>}
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <input type="text" id="nativePlace" placeholder="Native Place"  defaultValue={currentUser.nativePlace} onChange={handleChange}/>
//                       {errors.nativePlace && <span className="errorMsg">{errors.nativePlace}</span>}
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <input type="text" id="weight" placeholder="Weight"  defaultValue={currentUser.weight} onChange={handleChange} />
//                       {errors.weight && <span className="errorMsg">{errors.weight}</span>}
//                     </div>
//                   </div>

//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <input type="text" id="height" placeholder="Height"  defaultValue={currentUser.height} onChange={handleChange}/>
//                       {errors.height && <span className="errorMsg">{errors.height}</span>}
//                     </div>
//                   </div>
                       
//                    <div className="col-md-6">
//                     <div className="form-group">
//                       <div className="select-box">
//                         <select id="qualification"  defaultValue={currentUser.qualification} onChange={handleChange}>
//                           <option disabled selected hidden>Qualification</option>
//                           <option value="10th">10th</option> 
//                           <option value="Higher Secondary">Higher Secondary</option>
//                           <option value="Diploma">Diploma</option>
//                           <option value="Graduation">Graduation</option>
//                           <option value="Post Graduation">Post Graduation</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <div className="select-box">
//                         <select id="workingStatus"  defaultValue={currentUser.workingStatus} onChange={handleChange}>
//                           <option disabled selected hidden>Working Status</option>
//                           <option value="Private Sector">Private Sector</option> 
//                           <option value="Public Sector">Public Sector</option>
//                           <option value="Own Business">Own Business</option>
//                           <option value="Not Working">Not Working</option>
//                           <option value="Other">Other</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <input type="text" id="hobbies" placeholder="Hobbies" defaultValue={currentUser.hobbies} onChange={handleChange}/>
//                       {errors.hobbies && <span className="errorMsg">{errors.hobbies}</span>}
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="form-group">
//                       <input type="text" id="countryLivingIn" placeholder="Country Living In" defaultValue={currentUser.countryLivingIn} onChange={handleChange}/>
//                       {errors.countryLivingIn && <span className="errorMsg">{errors.countryLivingIn}</span>}
//                     </div>
//                   </div>
           
//                   <div className="col-md-12">
//                         <textarea placeholder="About Yourself" id="about" defaultValue={currentUser.about} onChange={handleChange}></textarea>
//                   </div>
//                   <div className="col-md-12">
//                   <div className="control">
//                    <button type="submit" disabled={loading} className="btns">{loading ? "Loading... " : "Submit"}</button>
//                   </div>
//            {/* <p className="errorMsg">{error ? error || "Something went wrong" : ""}</p> */}
//            {/* <p className="errorMsg"> */}
//     {/* {Object.keys(errors).map((key, index) => ( */}
//        {/* <span key={index}>{errors[key]}{index < Object.keys(errors).length - 1 ? ', ' : ''}</span> */}
//     {/* ))} */}
//   {/* </p> */}
                  


//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//     </>
//   )
// }


