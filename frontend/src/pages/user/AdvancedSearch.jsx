// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';


// export default function AdvancedSearch() {
//     const { currentUser } = useSelector((state) => state.user);
//     const [formData, setFormData] = useState({
//         // ageFrom: '',
//         // ageTo: '',
//         // maritalStatus: '',
//         // diet: '',
//         // religion: '',
//         // caste: '',
//         // motherTongue: '',
//         // nativePlace: '',
//         // height: '',
//         // weight: '',
//         // qualification: '',
//         // workingStatus: '',
//         // hobbies: '',
//         // countryLivingIn: '',
//       });
    
//       const [results, setResults] = useState([]);
    
//       const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//       };
    
//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(formData)
//         try {
//           const response = await axios.get(`/api/user/advancedSearch/${currentUser._id}`, {
//             params: formData,
//           });
//           setResults(response.data.suggestedUsers);
//         } catch (error) {
//           console.error('Error fetching search results', error);
//         }
//       };
    
//     return (
//         <div>
//           <h1>Advanced Search</h1>
//           <section id="home" className="home-banner banner signup contact section_padding cover-bg">
//                         <div className="container">
//                             <div className="row">
//                                 <div className="section_title text-center">
//                                     <p></p>
//                                     <h3></h3>
//                                 </div>

//                                 <div className="col-md-12" id="home-title">
//                                     <h3 className="text-white">Search with the filters</h3>
//                                     <div className="">
//                                         <form onSubmit={handleSubmit} className="signup-form">
//                                             <div className="row">
//                                                 <div className="col-md-3">
//                                                     <div className="form-group">
//                                                         <label className="text-white">Gender</label>
//                                                         <div className="select-box">
//                                                             <select id="gender" style={{ width: "100%" }} onChange={handleChange}>
//                                                                 <option disabled selected hidden>Gender</option>
//                                                                 <option value="male">Male</option>
//                                                                 <option value="female">Female</option>
//                                                             </select>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-3">
//                                                     <div className="form-group">
//                                                         <label className="text-white">Age Range</label>
//                                                         <div className="row">
//                                                             <div className="col">
//                                                                 <input type="number" id="ageFrom" style={{ width: "100%" }} placeholder="From" onChange={handleChange} />
//                                                             </div>
//                                                             <div className="col">
//                                                                 <input type="number" id="ageTo" style={{ width: "100%" }} placeholder="To" onChange={handleChange} />
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-3">
//                                                     <div className="form-group">
//                                                         <label className="text-white">Religion</label>
//                                                         <div className="select-box">
//                                                             <select id="religion" style={{ width: "100%" }} onChange={handleChange}>
//                                                                 <option disabled selected hidden>Religion</option>
//                                                                 <option value="hindu">Hindu</option>
//                                                                 <option value="christian">Christian</option>
//                                                                 <option value="muslim">Muslim</option>
//                                                             </select>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-3">
//                                                     <div className="form-group">
//                                                         <label className="text-white">Mother Tongue</label>
//                                                         <input type="text" id="motherTongue" style={{ width: "100%" }} placeholder="Mother Tongue" onChange={handleChange} />
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-12">
//                                                     <button type="submit" className="btns">Search</button>
//                                                 </div>
//                                             </div>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>

//         </div>
//       );
// }

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Header from '../../components/Header';

export default function AdvancedSearch() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    gender: '',
    ageFrom: '',
    ageTo: '',
    religion: '',
    motherTongue: '',
  });

  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.get(`/api/user/advancedSearch/${currentUser._id}`, {
        params: formData,
      });
      setResults(response.data.suggestedUsers);
    } catch (error) {
      console.error('Error fetching search results', error);
    }
  };

  return (
    <>
    <Header/>
      <h1>Advanced Search</h1>
      <section id="home" className="signup contact section_padding cover-bg">
        <div className="container">
          <div className="row">
            <div className="section_title text-center">
              <p></p>
              <h3></h3>
            </div>

            <div className="col-md-12" id="home-title">
              <h3 className="text-white">Search with the filters</h3>
              <div className="">
                <form onSubmit={handleSubmit} className="signup-form">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="text-white">Gender</label>
                        <div className="select-box">
                          <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            style={{ width: '100%' }}
                            onChange={handleChange}
                          >
                            <option disabled selected hidden>
                              Gender
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="text-white">Age Range</label>
                        <div className="row">
                          <div className="col">
                            <input
                              type="number"
                              id="ageFrom"
                              name="ageFrom"
                              value={formData.ageFrom}
                              style={{ width: '100%' }}
                              placeholder="From"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="col">
                            <input
                              type="number"
                              id="ageTo"
                              name="ageTo"
                              value={formData.ageTo}
                              style={{ width: '100%' }}
                              placeholder="To"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="text-white">Religion</label>
                        <div className="select-box">
                          <select
                            id="religion"
                            name="religion"
                            value={formData.religion}
                            style={{ width: '100%' }}
                            onChange={handleChange}
                          >
                            <option disabled selected hidden>
                              Religion
                            </option>
                            <option value="hindu">Hindu</option>
                            <option value="christian">Christian</option>
                            <option value="muslim">Muslim</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label className="text-white">Mother Tongue</label>
                        <input
                          type="text"
                          id="motherTongue"
                          name="motherTongue"
                          value={formData.motherTongue}
                          style={{ width: '100%' }}
                          placeholder="Mother Tongue"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <button type="submit" className="btns">
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <h2>Search Results</h2>
      <ul>
        {results.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </>
  );
}
