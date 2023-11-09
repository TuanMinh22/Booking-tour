import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// import { AppWebsiteVisits } from '../sections/@dashboard/app/AppWebsiteVisits.js';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [users, setUsers] = useState(0);
  const [bill, setBill] = useState(0);
  const [tour, setTour] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [month, setMonth] = useState([]);
  const [quarter, setQuarter] = useState([]);
  const [chartInterval, setChartInterval] = useState('month'); // State for selected interval

  const handleChartIntervalChange = (event) => {
    setChartInterval(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/users/getCount");
        setUsers(res.data[0].count);
        console.log(res.data[0].count);
      } catch (err) {
        console.log(err)
      }
    };

    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/booking/getCount");
        setBill(res.data[0].count);
        console.log(res.data[0].count);
      } catch (err) {
        console.log(err)
      }
    };

    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/tours/getCount");
        setTour(res.data[0].count);
        console.log(res.data[0].count);
      } catch (err) {
        console.log(err)
      }
    };

    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/booking/getRevenue");
        setRevenue(res.data[0].sumRevenue);
        console.log(res.data[0].sumRevenue);
      } catch (err) {
        console.log(err)
      }
    };

    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/booking/getCountTem");
        const resu = Array(12).fill(0);

        res.data.map(obj => {
          const { month, count } = obj;
          resu[month - 1] = count;
          return null;
        });

        setMonth(resu);
        console.log(res.data);
      } catch (err) {
        console.log(err)
      }
    };

    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/booking/getCountQuarter");
        const resu = Array(4).fill(0);

        res.data.map(obj => {
          const { quarter, count } = obj;
          resu[quarter - 1] = count;
          return null;
        });

        setQuarter(resu);
        console.log(res.data);
      } catch (err) {
        console.log(err)
      }
    };

    fetchData();
  }, [])

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Xin chào, Admin
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Người dùng" total={users} icon={'mdi:user'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Đơn đặt" total={bill} color="info" icon={'ri:bill-fill'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Số tour còn" total={tour} color="warning" icon={'material-symbols:tour'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Doanh thu" total={revenue} color="error" icon={'mdi:money'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="chart-interval-label" sx={{ backgroundColor: 'white', zIndex: 1 }}>Thời gian</InputLabel>
              <Select
                labelId="chart-interval-label"
                id="chart-interval-select"
                value={chartInterval}
                onChange={handleChartIntervalChange}
              >
                <MenuItem value="month">Tháng</MenuItem>
                <MenuItem value="quarter">Quý</MenuItem>
                {/* <MenuItem value="year">Năm</MenuItem> */}
              </Select>
            </FormControl>
            <AppWebsiteVisits
              title="Biểu đồ số lượng đơn đặt tour"
              chartLabels={
                chartInterval === 'month' ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] : [1, 2, 3, 4]
              }
              chartData={[
                {
                  name: 'Tháng',
                  type: 'column',
                  fill: 'solid',
                  data: chartInterval === 'month' ? month : quarter,
                },
              ]}
              chartInterval
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4} mt={7}>
            <AppCurrentVisits
              title="Doanh thu"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
