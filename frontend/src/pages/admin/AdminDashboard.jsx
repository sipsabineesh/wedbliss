// // import React, { useState,useEffect } from 'react';
// // import { Link } from "react-router-dom"
// // import AdminHeader from '../../components/AdminHeader';
// // import AdminChart from '../../components/AdminChart';
// // import AdminStatistics from '../../components/AdminStatistics';
// // import axios from 'axios';
// // import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// // import { Container, Grid, Paper, Typography, Box } from '@mui/material';
// // import { styled } from '@mui/material/styles';



// // const PREFIX = 'AdminDashboard';

// // const classes = {
// //   container: `${PREFIX}-container`,
// //   paper: `${PREFIX}-paper`,
// // };

// // const Root = styled('div')(({ theme }) => ({
// //   [`& .${classes.container}`]: {
// //     paddingTop: theme.spacing(4),
// //     paddingBottom: theme.spacing(4),
// //   },
// //   [`& .${classes.paper}`]: {
// //     padding: theme.spacing(2),
// //     display: 'flex',
// //     overflow: 'hidden',
// //     flexDirection: 'column',
// //   },
// // }));

// // export default function Home()  {
// //     const [user,setUser] = useState({})
// //     const [userStats, setUserStats] = useState({});
// //     const [planSelectionStats, setPlanSelectionStats] = useState([]);
// //     const [subscriptionStats, setSubscriptionStats] = useState([]);
// //     const [userGrowth, setUserGrowth] = useState([]);
// //     const [planDistribution, setPlanDistribution] = useState([]);
// //     const [ageDistributionData, setAgeDistributionData] = useState([]);
// //     const [countryStats, setCountryStats] = useState([]);
// //     const [regVsSubscription, setRegVsSubscription] = useState([]);


// //     useEffect(() => {
// //       const fetchUserStats = async () => {
// //         const res = await axios.get('/api/admin/userStats');
// //         setUserStats(res.data);
// //       };
// //       const fetchPlanSelectionStats = async () => {
// //         const res = await axios.get('/api/admin/planSelectionStats');
// //         setPlanSelectionStats(res.data);
// //       };
// //       const fetchSubscriptionStats = async () => {
// //         const res = await axios.get('/api/admin/subscriptionStats');
// //         setSubscriptionStats(res.data);
// //       };

// //       const fetchUserGrowth = async () => {
// //         const res = await axios.get('/api/admin/userGrowthStats');
// //         setUserGrowth(res.data);
// //       };
  
// //       const fetchPlanDistribution = async () => {
// //         const res = await axios.get('/api/admin/planDistributionStats');
// //         setPlanDistribution(res.data);
// //       };

      

// //       const fetchAgeDistribution = async () => {
// //          const ageDistributionResponse = await axios.get('/api/admin/ageStats');
// //          setAgeDistributionData(ageDistributionResponse.data);
// //       };
      
// //       const fetchCountryStats = async () => {
// //         const countryStatsResponse = await axios.get('/api/admin/countryStats');
// //         setCountryStats(countryStatsResponse.data);
// //      };
     
// //      const fetchRegistrationVsSubscription = async () => {
// //       const response = await axios.get('/api/admin/registrationVsSubscriptionStats');
// //       setRegVsSubscription(response.data);
// //       }

// //       fetchUserStats();
// //       fetchPlanSelectionStats();
// //       fetchSubscriptionStats();
// //       fetchUserGrowth();
// //       fetchPlanDistribution();
// //       fetchAgeDistribution();
// //       fetchCountryStats();
// //       fetchRegistrationVsSubscription();
// //     }, []);
// //  console.log(regVsSubscription)

// //     const userGenderData = [
// //       { name: 'Male', value: userStats.maleUsers || 0 },
// //       { name: 'Female', value: userStats.femaleUsers || 0 }
// //     ];

// //     const planSelectionData = planSelectionStats.map(stat => ({
// //       name: stat._id,
// //       count: stat.count
// //     }));

// //     const subscriptionData = subscriptionStats.map(stat => ({
// //       name: `${stat._id.year}-${stat._id.month}`,
// //       count: stat.count
// //     }));

    

// //     // const userGenderData = [
// //     //   { name: 'Male', value:33 },
// //     //   { name: 'Female', value: 56 }
// //     // ];
// //     const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
     
// //     return (
// //         <>
// //         <AdminHeader/>
// //         <Root>
// //       <Container maxWidth="lg" className={classes.container}>
// //         <Typography variant="h4" gutterBottom>
// //           Admin Dashboard
// //         </Typography>
// //         <Grid container spacing={3}>
// //           <Grid item xs={12} md={6} lg={4}>
// //             <Paper className={classes.paper}>
// //               <Typography variant="h6" gutterBottom>
// //                 User Statistics
// //               </Typography>
// //               <PieChart width={350} height={300}>
// //                 <Pie
// //                   data={userGenderData}
// //                   cx={175}
// //                   cy={150}
// //                   labelLine={false}
// //                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
// //                   outerRadius={80}
// //                   fill="#8884d8"
// //                   dataKey="value"
// //                 >
// //                   {userGenderData.map((entry, index) => (
// //                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// //                   ))}
// //                 </Pie>
// //                 <Tooltip />
// //               </PieChart>
// //             </Paper>
// //           </Grid>

// //           <Grid item xs={12}>
// //             <Paper className={classes.paper}>
// //               <Typography variant="h6" gutterBottom>
// //                 Subscription Statistics
// //               </Typography>
// //               <BarChart
// //                 width={850}
// //                 height={400}
// //                 data={subscriptionData}
// //                 margin={{
// //                   top: 20, right: 30, left: 20, bottom: 5,
// //                 }}
// //               >
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="name" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Legend />
// //                 <Bar dataKey="count" fill="#8884d8" />
// //               </BarChart>
// //             </Paper>
// //           </Grid>

// //           <Grid item xs={12}>
// //             <Paper className={classes.paper}>
// //               <Typography variant="h6" gutterBottom>
// //                 Plan Selection Statistics
// //               </Typography>
// //               <PieChart width={850} height={400}>
// //                 <Pie
// //                   data={planSelectionData}
// //                   cx={425}
// //                   cy={200}
// //                   labelLine={false}
// //                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
// //                   outerRadius={150}
// //                   fill="#82ca9d"
// //                   dataKey="count"
// //                 >
// //                   {planSelectionData.map((entry, index) => (
// //                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// //                   ))}
// //                 </Pie>
// //                 <Tooltip />
// //               </PieChart>
// //             </Paper>
// //           </Grid>
// //         </Grid>
        
// //         {/* <Grid container spacing={3}> */}
// //           {/* Other charts here... */}

// //           <Grid item xs={12} md={6} lg={3}>
// //             <Paper className={classes.paper}>
// //               <Typography variant="h6" gutterBottom>
// //                 User Growth Over Time
// //               </Typography>
// //               <ResponsiveContainer width="100%" height={400}>
// //                 <LineChart
// //                   width={850}
// //                   height={400}
// //                   data={userGrowth}
// //                   margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
// //                 >
// //                   <CartesianGrid strokeDasharray="3 3" />
// //                   <XAxis dataKey="date" />
// //                   <YAxis />
// //                   <Tooltip />
// //                   <Legend />
// //                   <Line type="monotone" dataKey="newUsers" stroke="#8884d8" />
// //                   <Line type="monotone" dataKey="totalUsers" stroke="#82ca9d" />
// //                 </LineChart>
// //               </ResponsiveContainer>
// //             </Paper>
// //           </Grid>
// //           <Grid item xs={12} md={6} lg={3}>
// //             <Paper className={classes.paper}>
// //               <Typography variant="h6" gutterBottom>
// //                 Plan Distribution
// //               </Typography>
// //               <ResponsiveContainer width="100%" height={400}>
// //                 <PieChart>
// //                   <Pie
// //                     data={planDistribution}
// //                     cx="50%"
// //                     cy="50%"
// //                     labelLine={false}
// //                     outerRadius={120}
// //                     fill="#8884d8"
// //                     dataKey="value"
// //                   >
// //                     {planDistribution.map((entry, index) => (
// //                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// //                     ))}
// //                   </Pie>
// //                   <Tooltip />
// //                 </PieChart>
// //               </ResponsiveContainer>
// //             </Paper>
// //           </Grid>
// //         {/* </Grid> */}
// //         <Grid item xs={6}>
// //           <Paper className={classes.paper}>
// //             <Typography variant="h5" gutterBottom>Age Distribution</Typography>
// //             <BarChart width={600} height={300} data={ageDistributionData}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="ageRange" />
// //               <YAxis/>
// //               <Tooltip />
// //               <Legend />
// //               <Bar dataKey="count" fill="#8884d8" />
// //             </BarChart>
// //           </Paper>
// //         </Grid>
// //         <Grid item xs={6}>
// //           <Paper className={classes.paper}>
// //             <Typography variant="h5" gutterBottom>Country Distribution</Typography>
// //         <BarChart  width={600} height={300} data={countryStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
// //             <CartesianGrid strokeDasharray="3 3" />
// //             <XAxis dataKey="country" />
// //             <YAxis />
// //             <Tooltip />
// //             <Legend />
// //             <Bar dataKey="count" fill="#8884d8" />
// //           </BarChart>
// //           </Paper>
// //         </Grid>
// //         {/* <Grid item xs={12}>
// //           <Paper>
// //             <Box p={3}>
// //               <Typography variant="h6" gutterBottom>
// //                 Monthly New Registrations vs Subscriptions
// //               </Typography>
// //               <ResponsiveContainer width="100%" height={400}>
// //                 <BarChart data={regVsSubscription} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
// //                   <CartesianGrid strokeDasharray="3 3" />
// //                   <XAxis dataKey="month" />
// //                   <YAxis />
// //                   <Tooltip />
// //                   <Legend />
// //                   <Bar dataKey="newRegistrations" fill="#8884d8" name="New Registrations" />
// //                   <Bar dataKey="newSubscriptions" fill="#82ca9d" name="New Subscriptions" />
// //                 </BarChart>
// //               </ResponsiveContainer>
// //             </Box>
// //           </Paper>
// //         </Grid> */}
// //       </Container>
// //     </Root>
// //           {/* <section id="home" className="admin-dashboard-section"> */}
// //             {/* <div className="container h-100">
// //               <div className="row align-items-center h-100">
// //                 <div className="col-12 caption text-center">
// //                   <div className="button col-lg-6 col-md-6 col-sm-12">
                      
// //       <div> */}
// // {/*     
// //         <h2>User Statistics</h2>
// //         <PieChart width={400} height={400}>
// //           <Pie
// //             data={userGenderData}
// //             cx={200}
// //             cy={200}
// //             labelLine={false}
// //             label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
// //             outerRadius={80}
// //             fill="#8884d8"
// //             dataKey="value"
// //           >
// //             {userGenderData.map((entry, index) => (
// //               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// //             ))}
// //           </Pie>
// //           <Tooltip />
// //         </PieChart> */}
// //       {/* </div> */}
     

// //       {/* <div>
// //         <h2>Plan Selection Statistics</h2>
// //         <PieChart width={400} height={400}>
// //           <Pie
// //             data={planSelectionData}
// //             cx={200}
// //             cy={200}
// //             labelLine={false}
// //             label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
// //             outerRadius={80}
// //             fill="#82ca9d"
// //             dataKey="count"
// //           >
// //             {planSelectionData.map((entry, index) => (
// //               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// //             ))}
// //           </Pie>
// //           <Tooltip />
// //         </PieChart>
// //       </div>
// //       <div> */}
// //         {/* <h2>Subscription Statistics</h2>
// //         <BarChart
// //           width={500}
// //           height={300}
// //           data={subscriptionData}
// //           margin={{
// //             top: 20, right: 30, left: 20, bottom: 5,
// //           }}
// //         >
// //           <CartesianGrid strokeDasharray="3 3" />
// //           <XAxis dataKey="name" />
// //           <YAxis />
// //           <Tooltip />
// //           <Legend />
// //           <Bar dataKey="count" fill="#8884d8" />
// //         </BarChart> */}
// //       {/* </div> */}
// //                    {/* <Link to="/signup" className="btn">Signup</Link>
// //                    <Link to="/login" className="btn">Login</Link> */}
// //                   {/* </div> */}
// //                   {/* <div className="social_icon text-center mt-4">
// //                     <a href="#"><span><i className="fa fa-facebook"></i></span></a>
// //                     <a href="#"><span><i className="fa fa-twitter"></i></span></a>
// //                     <a href="#"><span><i className="fa fa-instagram"></i></span></a>
// //                     <a href="#"><span><i className="fa fa-youtube-play"></i></span></a>
// //                   </div> */}
                  
// //                 {/* </div>
// //               </div>
// //             </div> */}
// //           {/* </section> */}
// //           {/* <section id="about" className="about section_padding pb-0">
// //             <div className="container">
// //               <div className="row align-items-center">
// //                 <div className="col-lg-12 section_title text-center">
// //                   <p>Who We Are</p>
// //                   <h3>About Us</h3>
// //                 </div>
// //                 <div className="col-lg-6 col-md-6 col-sm-12">
// //                   <div className="part_photo">
// //                     <img className="img-fluid pb-100 about-pic" />
// //                   </div>
// //                 </div>
// //                 <div className="col-lg-6 col-md-6 col-sm-12">
// //                   <div className="part_text">
// //                     <h4 className="mb-30">Your soulmate is waiting for you</h4>
// //                     <p className="pb-35">Welcome to the most trusted Matrimonial site in South India.</p>
// //                     <a href="#" className="btns mr-2">Subscribe</a>
// //                     <a href="#" className="btns">Get your Soulmate</a>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </section>
// //           <section className="showContact section_padding text-center cover-bg">
// //             <div className="container">
// //               <h2>If you are interested</h2>
// //               <a href="#" className="btns mt-20">More Details</a>
// //             </div>
// //           </section> */}
// //           {/* <section id="package" className="package section_padding">
// //             <div className="container">
// //               <div className="row">
// //                 <div className="section_title text-center">
// //                   <p>What We Do</p>
// //                   <h3>Packages</h3>
// //                 </div>
// //                 <div className="col-lg-4 col-md-6 col-sm-12 py-15">
// //                   <div className="package_box box">
// //                     <div className="icon">
// //                       <i className="fa fa-star-half-o"></i>
// //                     </div>
// //                     <div className="text">
// //                       <h4 className="box_title mb-20">1 Month Package</h4>
// //                       <p>hvjyftydtestfghghyty</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //                 {/* More package boxes */}
// //               {/* </div>
// //             </div> */}
// //           {/* </section> */}
// //           {/* <section id="contact" className="contact section_padding cover-bg">
// //             <div className="container">
// //                 <div className="row">
// //                     <div className="section_title text-center">
// //                         <p>Get In Touch</p>
// //                         <h3>Contact</h3>
// //                     </div>
// //                     <div className="col-md-12">
// //                         <div className="part_info">
// //                             <div className="row">
// //                                 <div className="col-md-4 xs-md-30">
// //                                     <div className="info-block text-center">
// //                                         <div className="icon">
// //                                             <i className="fa fa-map-marker"></i>
// //                                         </div>
// //                                         <h5>Location</h5>
// //                                         <p>India</p>
// //                                     </div>
// //                                 </div>
// //                                 <div className="col-md-4 xs-md-30">
// //                                     <div className="info-block text-center">
// //                                         <div className="icon">
// //                                             <i className="fa fa-mobile"></i>
// //                                         </div>
// //                                         <h5>Phone</h5>
// //                                         <p>987654321</p>
// //                                     </div>
// //                                 </div>
// //                                 <div className="col-md-4">
// //                                     <div className="info-block text-center">
// //                                         <div className="icon">
// //                                             <i className="fa fa-envelope"></i>
// //                                         </div>
// //                                         <h5>Email Address</h5>
// //                                         <p>info@wedbliss.online</p>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>

// //                     <div className="col-md-12">
// //                         <div className="contact-form">
// //                             <form>
// //                                 <div className="row">
// //                                     <div className="col-md-6">
// //                                         <div className="form-group">
// //                                             <input type="text" name="name" placeholder="Name" required />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-6">
// //                                         <div className="form-group">
// //                                             <input type="email" name="email" placeholder="Email" required />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-12">
// //                                         <div className="form-group">
// //                                             <input type="text" name="subject" placeholder="Subject" required />
// //                                         </div>
// //                                     </div>
// //                                     <div className="col-md-12">
// //                                         <textarea placeholder="Type Your Message" required></textarea>
// //                                     </div>
// //                                     <div className="col-md-12">
// //                                         <button type="submit" className="btns">Send Message</button>
// //                                     </div>
// //                                 </div>
// //                             </form>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </section> */}
// //      </>
// //     )
// //   }
  
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import AdminHeader from '../../components/AdminHeader';
// import axios from 'axios';
// import {
//   BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
// } from 'recharts';
// import { Container, Grid, Paper, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
// import { Dashboard, Group, PieChart as PieChartIcon, BarChart as BarChartIcon, Timeline, AccountBox } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';

// const PREFIX = 'AdminDashboard';

// const classes = {
//   container: `${PREFIX}-container`,
//   paper: `${PREFIX}-paper`,
//   drawerPaper: `${PREFIX}-drawerPaper`,
//   drawerHeader: `${PREFIX}-drawerHeader`,
// };

// const drawerWidth = 240;

// const Root = styled('div')(({ theme }) => ({
//   display: 'flex',
//   [`& .${classes.container}`]: {
//     paddingTop: theme.spacing(4),
//     paddingBottom: theme.spacing(4),
//   },
//   [`& .${classes.paper}`]: {
//     padding: theme.spacing(2),
//     display: 'flex',
//     overflow: 'hidden',
//     flexDirection: 'column',
//   },
//   [`& .${classes.drawerPaper}`]: {
//     width: drawerWidth,
//   },
//   [`& .${classes.drawerHeader}`]: {
//     display: 'flex',
//     alignItems: 'center',
//     padding: theme.spacing(0, 1),
//     ...theme.mixins.toolbar,
//     justifyContent: 'flex-end',
//   },
// }));

// export default function Home() {
//   const [userStats, setUserStats] = useState({});
//   const [planSelectionStats, setPlanSelectionStats] = useState([]);
//   const [subscriptionStats, setSubscriptionStats] = useState([]);
//   const [userGrowth, setUserGrowth] = useState([]);
//   const [planDistribution, setPlanDistribution] = useState([]);
//   const [ageDistributionData, setAgeDistributionData] = useState([]);
//   const [countryStats, setCountryStats] = useState([]);
//   const [regVsSubscription, setRegVsSubscription] = useState([]);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalPlans, setTotalPlans] = useState(0);
//   const [totalSubscriptions, setTotalSubscriptions] = useState(0);

//   useEffect(() => {
//     const fetchUserStats = async () => {
//       const res = await axios.get('/api/admin/userStats');
//       setUserStats(res.data);
//       setTotalUsers(res.data.totalUsers);
//     };
//     const fetchPlanSelectionStats = async () => {
//       const res = await axios.get('/api/admin/planSelectionStats');
//       setPlanSelectionStats(res.data);
//       setTotalPlans(res.data.length);
//     };
//     const fetchSubscriptionStats = async () => {
//       const res = await axios.get('/api/admin/subscriptionStats');
//       setSubscriptionStats(res.data.subscriptions);
//       setTotalSubscriptions(res.data.totalSubscriptions);
//     };
//     const fetchUserGrowth = async () => {
//       const res = await axios.get('/api/admin/userGrowthStats');
//       setUserGrowth(res.data);
//     };
//     const fetchPlanDistribution = async () => {
//       const res = await axios.get('/api/admin/planDistributionStats');
//       setPlanDistribution(res.data);
//     };
//     const fetchAgeDistribution = async () => {
//       const ageDistributionResponse = await axios.get('/api/admin/ageStats');
//       setAgeDistributionData(ageDistributionResponse.data);
//     };
//     const fetchCountryStats = async () => {
//       const countryStatsResponse = await axios.get('/api/admin/countryStats');
//       setCountryStats(countryStatsResponse.data);
//     };
//     const fetchRegistrationVsSubscription = async () => {
//       const response = await axios.get('/api/admin/registrationVsSubscriptionStats');
//       setRegVsSubscription(response.data);
//     };

//     fetchUserStats();
//     fetchPlanSelectionStats();
//     fetchSubscriptionStats();
//     fetchUserGrowth();
//     fetchPlanDistribution();
//     fetchAgeDistribution();
//     fetchCountryStats();
//     fetchRegistrationVsSubscription();
//   }, []);

//   const userGenderData = [
//     { name: 'Male', value: userStats.maleUsers || 0 },
//     { name: 'Female', value: userStats.femaleUsers || 0 }
//   ];

//   const planSelectionData = planSelectionStats.map(stat => ({
//     name: stat._id,
//     count: stat.count
//   }));

//   const subscriptionData = subscriptionStats.map(stat => ({
//     name: `${stat._id.year}-${stat._id.month}`,
//     count: stat.count
//   }));

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//   return (
//     <>
//       <AdminHeader />
//       <Root>
//         {/* <Drawer
//           variant="permanent"
//           classes={{
//             paper: classes.drawerPaper,
//           }}
//         >
//           <div className={classes.drawerHeader}>
//             <Typography variant="h6">Admin Panel</Typography>
//           </div>
//           <Divider />
//           <List>
//             <ListItem button component={Link} to="/admin">
//               <ListItemIcon><Dashboard /></ListItemIcon>
//               <ListItemText primary="Dashboard" />
//             </ListItem>
//             <ListItem button component={Link} to="/admin/users">
//               <ListItemIcon><Group /></ListItemIcon>
//               <ListItemText primary="Users" />
//             </ListItem>
//             <ListItem button component={Link} to="/admin/plans">
//               <ListItemIcon><PieChartIcon /></ListItemIcon>
//               <ListItemText primary="Plans" />
//             </ListItem>
//             <ListItem button component={Link} to="/admin/subscriptions">
//               <ListItemIcon><BarChartIcon /></ListItemIcon>
//               <ListItemText primary="Subscriptions" />
//             </ListItem>
//             <ListItem button component={Link} to="/admin/stats">
//               <ListItemIcon><Timeline /></ListItemIcon>
//               <ListItemText primary="Statistics" />
//             </ListItem>
//             <ListItem button component={Link} to="/admin/profile">
//               <ListItemIcon><AccountBox /></ListItemIcon>
//               <ListItemText primary="Profile" />
//             </ListItem>
//           </List>
//         </Drawer> */}
//         <Container maxWidth="lg" className={classes.container}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Typography variant="h4" gutterBottom>
//                 Admin Dashboard
//               </Typography>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Paper className={classes.paper}>
//                 <Typography variant="h6" gutterBottom>
//                   Total Users
//                 </Typography>
//                 <Typography variant="h4">{totalUsers}</Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Paper className={classes.paper}>
//                 <Typography variant="h6" gutterBottom>
//                   Total Plans
//                 </Typography>
//                 <Typography variant="h4">{totalPlans}</Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Paper className={classes.paper}>
//                 <Typography variant="h6" gutterBottom>
//                   Total Subscriptions
//                 </Typography>
//                 <Typography variant="h4">{totalSubscriptions}</Typography>
//               </Paper>
//             </Grid>
//           </Grid>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6} lg={4}>
//               <Paper className={classes.paper}>
//                 <Typography variant="h6" gutterBottom>
//                   User Statistics
//                 </Typography>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={userGenderData}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                       outerRadius={80}
//                       fill="#8884d8"
//                       dataKey="value"
//                     >
//                       {userGenderData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </Paper>
//             </Grid>
//             <Grid item xs={12}>
//               <Paper className={classes.paper}>
//                 <Typography variant="h6" gutterBottom>
//                   Subscription Statistics
//                 </Typography>
//                 <ResponsiveContainer width="100%" height={400}>
//                   <BarChart
//                     data={subscriptionData}
//                     margin={{
//                       top: 20, right: 30, left: 20, bottom: 5,
//                     }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="count" fill="#8884d8" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </Paper>
//             </Grid>
//             <Grid item xs={12}>
//               <Paper className={classes.paper}>
//                 <Typography variant="h6" gutterBottom>
//                   Plan Selection Statistics
//                 </Typography>
//                 <ResponsiveContainer width="100%" height={400}>
//                   <PieChart>
//                     <Pie
//                       data={planSelectionData}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                       outerRadius={150}
//                       fill="#82ca9d"
//                       dataKey="count"
//                     >
//                       {planSelectionData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </Paper>
//             </Grid>
//           </Grid>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <Paper className={classes.paper}>
//                 <Typography variant="h6" gutterBottom>
//                   Age Distribution
//                 </Typography>
//                 <ResponsiveContainer width="100%" height={400}>
//                   <BarChart
//                     data={ageDistributionData}
//                     margin={{
//                       top: 20, right: 30, left: 20, bottom: 5,
//                     }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="ageGroup" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="count" fill="#8884d8" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Paper className={classes.paper}>
//                 <Typography variant="h6" gutterBottom>
//                   User Distribution by Country
//                 </Typography>
//                 <ResponsiveContainer width="100%" height={400}>
//                   <BarChart
//                     data={countryStats}
//                     margin={{
//                       top: 20, right: 30, left: 20, bottom: 5,
//                     }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="country" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="count" fill="#82ca9d" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </Paper>
//             </Grid>
//           </Grid>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Paper className={classes.paper}>
//                 <Typography variant="h6" gutterBottom>
//                   Registration vs Subscription Statistics
//                 </Typography>
//                 <ResponsiveContainer width="100%" height={400}>
//                   <LineChart
//                     data={regVsSubscription}
//                     margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="date" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Line type="monotone" dataKey="registrations" stroke="#8884d8" />
//                     <Line type="monotone" dataKey="subscriptions" stroke="#82ca9d" />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Container>
//       </Root>
//     </>
//   );
// }

import React, { useState, useEffect, useRef  } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from '../../components/AdminHeader';
import axios from 'axios';
import { format } from 'date-fns';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import {
  Container, Grid, Paper, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton, Button
} from '@mui/material';
import {
  Dashboard, Group, PieChart as PieChartIcon, BarChart as BarChartIcon, Timeline, AccountBox, Menu
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PREFIX = 'AdminDashboard';

const classes = {
  container: `${PREFIX}-container`,
  paper: `${PREFIX}-paper`,
  drawerPaper: `${PREFIX}-drawerPaper`,
  drawerHeader: `${PREFIX}-drawerHeader`,
};

const drawerWidth = 240;

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  [`& .${classes.container}`]: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  [`& .${classes.paper}`]: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
  },
  [`& .${classes.drawerPaper}`]: {
    width: drawerWidth,
    background: theme.palette.background.default,
  },
  [`& .${classes.drawerHeader}`]: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  },
}));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Home() {
  const [userStats, setUserStats] = useState({});
  const [planSelectionStats, setPlanSelectionStats] = useState([]);
  const [subscriptionStats, setSubscriptionStats] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);
  const [planDistribution, setPlanDistribution] = useState([]);
  const [ageDistributionData, setAgeDistributionData] = useState([]);
  const [countryStats, setCountryStats] = useState([]);
  const [regVsSubscription, setRegVsSubscription] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPlans, setTotalPlans] = useState(0);
  const [totalSubscriptions, setTotalSubscriptions] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dashboardRef = useRef();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const [
        userStatsRes,
        planSelectionStatsRes,
        subscriptionStatsRes,
        userGrowthRes,
        planDistributionRes,
        ageDistributionRes,
        countryStatsRes,
        regVsSubscriptionRes
      ] = await Promise.all([
        axios.get('/api/admin/userStats'),
        axios.get('/api/admin/planSelectionStats'),
        axios.get('/api/admin/subscriptionStats'),
        axios.get('/api/admin/userGrowthStats'),
        axios.get('/api/admin/planDistributionStats'),
        axios.get('/api/admin/ageStats'),
        axios.get('/api/admin/countryStats'),
        axios.get('/api/admin/registrationVsSubscriptionStats')
      ]);

      setUserStats(userStatsRes.data);
      setPlanSelectionStats(planSelectionStatsRes.data);
      setSubscriptionStats(subscriptionStatsRes.data.subscriptions);
      setUserGrowth(userGrowthRes.data);
      setPlanDistribution(planDistributionRes.data);
      setAgeDistributionData(ageDistributionRes.data);
      setCountryStats(countryStatsRes.data);
      setRegVsSubscription(regVsSubscriptionRes.data);

      setTotalUsers(userStatsRes.data.totalUsers);
      setTotalPlans(planSelectionStatsRes.data.length);
      setTotalSubscriptions(subscriptionStatsRes.data.totalSubscriptions);
    };

    fetchData();
  }, []);

  const userGenderData = [
    { name: 'Male', value: userStats.maleUsers || 0 },
    { name: 'Female', value: userStats.femaleUsers || 0 }
  ];

  const planSelectionData = planSelectionStats.map(stat => ({
    name: stat._id,
    count: stat.count
  }));

  const subscriptionData = subscriptionStats.map(stat => ({
    name: `${stat._id.year}-${stat._id.month}`,
    count: stat.count
  }));

  const drawer = (
    <div>
      <div className={classes.drawerHeader}>
        <Typography variant="h6">Admin Panel</Typography>
        <IconButton onClick={handleDrawerToggle}>
          <Menu />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button component={Link} to="/admin">
          <ListItemIcon><Dashboard /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/admin/users">
          <ListItemIcon><Group /></ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={Link} to="/admin/plans">
          <ListItemIcon><PieChartIcon /></ListItemIcon>
          <ListItemText primary="Plans" />
        </ListItem>
        <ListItem button component={Link} to="/admin/subscriptions">
          <ListItemIcon><BarChartIcon /></ListItemIcon>
          <ListItemText primary="Subscriptions" />
        </ListItem>
        <ListItem button component={Link} to="/admin/stats">
          <ListItemIcon><Timeline /></ListItemIcon>
          <ListItemText primary="Statistics" />
        </ListItem>
        <ListItem button component={Link} to="/admin/profile">
          <ListItemIcon><AccountBox /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </div>
  );

  const generatePDF = () => {
    const input = dashboardRef.current;
    html2canvas(input)
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('dashboard-report.pdf');
      });
  };
  return (
    <>
      <AdminHeader />
      <Root>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ margin: 1 }}
        >
          <Menu />
        </IconButton>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
        <Container maxWidth="lg" className={classes.container} ref={dashboardRef}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Admin Dashboard
              </Typography>
              <button type="button"  className="btns mt-5" variant="contained" color="primary" onClick={generatePDF}>
                Download PDF
              </button> 
            </Grid>
              
            <Grid item xs={12} md={4}>
              <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom>
                  Total Users
                </Typography>
                <Typography variant="h4">{totalUsers}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom>
                  Total Plans
                </Typography>
                <Typography variant="h4">{totalPlans}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom>
                  Total Subscriptions
                </Typography>
                <Typography variant="h4">{totalSubscriptions}</Typography>
              </Paper>
            </Grid>
          </Grid>
         
          <Grid container spacing={3} className="mt-2">       
               <Grid item xs={12} md={6} >
              <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom>
                  User Gender Statistics
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={userGenderData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {userGenderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

          <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom>
                  Plan Selection Statistics
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={planSelectionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#82ca9d"
                      dataKey="count"
                    >
                      {planSelectionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
        
            <Grid item xs={12} >
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom>
                  Age Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={ageDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
      
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom>
                  User Distribution by Country
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={countryStats}
                    margin={{
                      top: 20, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="country" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom>
                  Subscription Statistics
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={subscriptionData}
                    margin={{
                      top: 20, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
         
          </Grid>
          <Grid container spacing={3} className="mt-2">
   
            {/* <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom>
                  Age Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={ageDistributionData}
                    margin={{
                      top: 20, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ageGroup" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid> */}
            {/* <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom>
                User Growth Over Time
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  width={850}
                  height={400}
                  data={userGrowth}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="newUsers" stroke="#8884d8" />
                  <Line type="monotone" dataKey="totalUsers" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid> */}
<Grid item xs={12}>
  <Paper className={classes.paper}>
    <Typography variant="h6" gutterBottom>
      User Growth Over Time
    </Typography>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={850}
        height={400}
        data={userGrowth}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="startDate" // Make sure this is the correct key in your data
          tickFormatter={(date) => {
            const validDate = new Date(date);
            return isNaN(validDate.getTime()) 
              ? 'Invalid Date' 
              : format(validDate, 'MMM dd, yyyy');
          }}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="newUsers" stroke="#8884d8" />
        <Line type="monotone" dataKey="totalUsers" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  </Paper>
</Grid>
            {/* <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom>
                  User Distribution by Country
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={countryStats}
                    margin={{
                      top: 20, right: 30, left: 20, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="country" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid> */}
          </Grid>
          <Grid container spacing={3}>
            {/* <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom>
                  Registration vs Subscription Statistics
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={regVsSubscription}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="registrations" stroke="#8884d8" />
                    <Line type="monotone" dataKey="subscriptions" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid> */}
          </Grid>
          <button type="button"  className="btns mt-5" variant="contained" color="primary" onClick={generatePDF}>
            Download PDF
          </button>
        </Container>
      </Root>
    </>
  );
}
