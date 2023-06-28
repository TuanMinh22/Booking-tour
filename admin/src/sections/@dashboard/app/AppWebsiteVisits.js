import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { useState } from 'react';
// @mui
import { Card, CardHeader, Box, FormControl, InputLabel, Select, MenuItem, styled } from '@mui/material';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  chartInterval: PropTypes.oneOf(['month', 'quarter', 'year']),
};

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  marginRight: theme.spacing(2),
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-root': {
    padding: '10px 26px 10px 12px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F5F5F5',
    '&:focus': {
      backgroundColor: '#E6E6E6',
    },
  },
}));

// export default function AppWebsiteVisits({ title, subheader, chartLabels, chartData, ...other }) {
//   const chartOptions = useChart({
//     plotOptions: { bar: { columnWidth: '16%' } },
//     fill: { type: chartData.map((i) => i.fill) },
//     labels: chartLabels,
//     xaxis: { type: 'datetime' },
//     tooltip: {
//       shared: true,
//       intersect: false,
//       y: {
//         formatter: (y) => {
//           if (typeof y !== 'undefined') {
//             return `${y.toFixed(0)} visits`;
//           }
//           return y;
//         },
//       },
//     },
//   });

//   return (
//     <Card {...other}>
//       <CardHeader title={title} subheader={subheader} />

//       <Box sx={{ p: 3, pb: 1 }} dir="ltr">
//         <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
//       </Box>
//     </Card>
//   );
// }

export default function AppWebsiteVisits({ title, subheader, chartLabels, chartData, chartInterval, ...other }) {
  // const [timeInterval, setTimeInterval] = useState('month');

  // const handleTimeIntervalChange = (event) => {
  //   setTimeInterval(event.target.value);
  // };

  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: {
      type: chartInterval === 'day' ? 'datetime' : chartInterval, // Sử dụng type tương ứng với từng interval
      labels: { format: chartInterval === 'day' ? 'dd/MM/yyyy' : undefined }, // Định dạng nhãn ngày/tháng/năm nếu là interval theo ngày
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} đơn`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        {/* <FormControl> */}
        {/* <InputLabel id="time-interval-label">Thời gian</InputLabel> */}
        {/* <Select
            labelId="time-interval-label"
            id="time-interval-select"
            value={timeInterval}
            onChange={handleTimeIntervalChange}
          >
            <MenuItem value="month">Tháng</MenuItem>
            <MenuItem value="quarter">Quý</MenuItem>
            <MenuItem value="year">Năm</MenuItem>
          </Select>
        </FormControl> */}
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
