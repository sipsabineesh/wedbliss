import React, { useState,useEffect } from 'react';
import { Link } from "react-router-dom"
import AdminHeader from '../../components/AdminHeader';
import AdminChart from '../../components/AdminChart';
import AdminStatistics from '../../components/AdminStatistics';
import axios from 'axios';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';



const PREFIX = 'AdminDashboard';

const classes = {
  container: `${PREFIX}-container`,
  paper: `${PREFIX}-paper`,
};

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.container}`]: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  [`& .${classes.paper}`]: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
  },
}));

export default function Home()  {
    const [user,setUser] = useState({})
    const [userStats, setUserStats] = useState({});
    const [planSelectionStats, setPlanSelectionStats] = useState([]);
    const [subscriptionStats, setSubscriptionStats] = useState([]);
    const [userGrowth, setUserGrowth] = useState([]);
    const [planDistribution, setPlanDistribution] = useState([]);
    const [ageDistributionData, setAgeDistributionData] = useState([]);
    const [countryStats, setCountryStats] = useState([]);
    const [regVsSubscription, setRegVsSubscription] = useState([]);


    useEffect(() => {
      const fetchUserStats = async () => {
        const res = await axios.get('/api/admin/userStats');
        setUserStats(res.data);
      };
      const fetchPlanSelectionStats = async () => {
        const res = await axios.get('/api/admin/planSelectionStats');
        setPlanSelectionStats(res.data);
      };
      const fetchSubscriptionStats = async () => {
        const res = await axios.get('/api/admin/subscriptionStats');
        setSubscriptionStats(res.data);
      };

      const fetchUserGrowth = async () => {
        const res = await axios.get('/api/admin/userGrowthStats');
        setUserGrowth(res.data);
      };
  
      const fetchPlanDistribution = async () => {
        const res = await axios.get('/api/admin/planDistributionStats');
        setPlanDistribution(res.data);
      };

      

      const fetchAgeDistribution = async () => {
         const ageDistributionResponse = await axios.get('/api/admin/ageStats');
         setAgeDistributionData(ageDistributionResponse.data);
      };
      
      const fetchCountryStats = async () => {
        const countryStatsResponse = await axios.get('/api/admin/countryStats');
        setCountryStats(countryStatsResponse.data);
     };
     
     const fetchRegistrationVsSubscription = async () => {
      const response = await axios.get('/api/admin/registrationVsSubscriptionStats');
      setRegVsSubscription(response.data);
      }

      fetchUserStats();
      fetchPlanSelectionStats();
      fetchSubscriptionStats();
      fetchUserGrowth();
      fetchPlanDistribution();
      fetchAgeDistribution();
      fetchCountryStats();
      fetchRegistrationVsSubscription();
    }, []);
 console.log(regVsSubscription)

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

    

    // const userGenderData = [
    //   { name: 'Male', value:33 },
    //   { name: 'Female', value: 56 }
    // ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
     
    return (
        <>
        <AdminHeader/>
        <Root>
      <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom>
                User Statistics
              </Typography>
              <PieChart width={350} height={300}>
                <Pie
                  data={userGenderData}
                  cx={175}
                  cy={150}
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
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom>
                Subscription Statistics
              </Typography>
              <BarChart
                width={850}
                height={400}
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
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom>
                Plan Selection Statistics
              </Typography>
              <PieChart width={850} height={400}>
                <Pie
                  data={planSelectionData}
                  cx={425}
                  cy={200}
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
            </Paper>
          </Grid>
        </Grid>
        
        {/* <Grid container spacing={3}> */}
          {/* Other charts here... */}

          <Grid item xs={12} md={6} lg={3}>
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
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom>
                Plan Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={planDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {planDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        {/* </Grid> */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>Age Distribution</Typography>
            <BarChart width={600} height={300} data={ageDistributionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ageRange" />
              <YAxis/>
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>Country Distribution</Typography>
        <BarChart  width={600} height={300} data={countryStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
          </Paper>
        </Grid>
        {/* <Grid item xs={12}>
          <Paper>
            <Box p={3}>
              <Typography variant="h6" gutterBottom>
                Monthly New Registrations vs Subscriptions
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={regVsSubscription} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="newRegistrations" fill="#8884d8" name="New Registrations" />
                  <Bar dataKey="newSubscriptions" fill="#82ca9d" name="New Subscriptions" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid> */}
      </Container>
    </Root>
   
     </>
    )
  }
  
  