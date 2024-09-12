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
          dataKey="startDate"
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
