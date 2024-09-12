
import { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { editUserSuccess,logout } from '../../redux/user/userSlice.js';
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

export default function AddProfile() {
    const [email, setEmail] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imageFileURL, setImageFileURL] = useState(null);
    const filePickerRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dob, setDOB] = useState('');
    const userId = useSelector(state => state.user.userId);

    useEffect(() => {
      if (imageFile) {
        uploadImage(imageFileURL);
      }
    }, [ imageFileURL]);
  
    const uploadImage = async (imageFile) => {
     
    };
  
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
                <h3>Add Details</h3>
              </div>
              <div className="col-md-12">
                <div className="signup-form">
                  <Formik
                    initialValues={{
                      username:  '',
                      email:  '',
                      gender:  '',
                      dob:'',
                      phoneNumber: '',
                      religion: '',
                      caste: '',
                      maritalStatus: '',
                      diet:'',
                      motherTongue:'',
                      nativePlace:'',
                      height:'',
                      weight:'',
                      hobbies: '',
                      countryLivingIn: '',
                      qualification: '',
                      workingStatus:'',
                      about:  '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting, setErrors }) => {  
                      try {
                         let imageUrl = '';
                      if (imageFileURL) {
                           imageUrl =  imageFileURL
                      }
                      const res = await fetch(`/api/user/editProfile/${userId}`, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({...values, profilePhoto: imageUrl}),
                      });

  
                        const data = await res.json();
                          toast.success('Profile added');
                          navigate('/login');
                        
  
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
                                  src={imageFileURL || 'https://res.cloudinary.com/dcsdqiiwr/image/upload/v1717406174/ava_xlfouh.png'}
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
                              <Field type="radio" id="gender" className="gender-details" name="gender" value="male" />
                              <label htmlFor="male" className="gender-label">Male</label>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <Field type="radio" id="gender" className="gender-details" name="gender" value="female" />
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
                                  <option value="Higher Secondary">Higher Secondary</option>
                                  <option value="Diploma">Diploma</option>
                                  <option value="Graduation">Graduation</option>
                                  <option value="Post Graduation">Post Graduation</option>
                                  <option value="Other">Other</option>
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
                                {isSubmitting ? 'Submitting...' : 'Submit'}
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

