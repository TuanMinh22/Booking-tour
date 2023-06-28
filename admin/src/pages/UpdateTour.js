import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  OutlinedInput,
  TextField,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Box,
  Select,
  MenuItem
} from '@mui/material';
import axios from 'axios';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useParams } from 'react-router-dom';

export default function UpdateTour() {
  const [nameTour, setNameTour] = useState('');
  const [occupany, setOccupany] = useState('');
  const [tourPrice, setTourPrice] = useState('');
  const [time, setTime] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [include, setInclude] = useState('');
  const [uninclude, setUninclude] = useState("");
  const [files, setFiles] = useState([]);
  const [des, setDes] = useState([]);
  const [info, setInfo] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState();
  const param = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/address");
        setInfo(res.data.data);
        console.log(res.data.data);
      } catch (err) {
        console.log(err)
      }
    };

    fetchData();
  }, [])

  const handleFileChange = (e) => {
    console.log('minh');
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  useEffect(() => {
    console.log(files); // Kiểm tra giá trị mới của files ở đây
  }, [files]);

  useEffect(() => {
    const timeInt = parseInt(time, 10);
    if (timeInt <= 0) {
      setDes([]);
      return;
    }
    const newDes = Array.from({ length: timeInt }, (_, index) => "");
    setDes(newDes);
  }, [time]);

  const handleDesChange = (index, value) => {
    const newDes = [...des];
    newDes[index] = value;
    setDes(newDes);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(files);
    if (files.length === 0) {
      console.log('No files selected.');
      return;
    }

    const urls = await Promise.all(files.map(async (file) => {
      try {
        const data = new FormData();
        const uniqueName = "file";
        console.log(uniqueName, file);
        data.append(uniqueName, file);
        data.append("upload_preset", "upload_file");
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/desuzwkpg/image/upload",
          data
        );
        const { url } = uploadRes.data;
        return url;
      } catch (err) {
        console.log(err);
        return null;
      }
    }));

    try {
      // const uploadRes = await axios.post(
      //   "https://api.cloudinary.com/v1_1/desuzwkpg/image/upload",
      //   data
      // );
      // console.log(uploadRes.data);

      // const urls = uploadRes.data.map((res) => res.url);
      const name = ["anh1", "anh2"];
      const title = ["Ngày 1"];
      await axios.post(`/tours/${param.id}`, {
        nameTour,
        Occupany: occupany,
        Tour_price: tourPrice,
        time,
        Date_start: dateStart,
        Date_end: dateEnd,
        include,
        uninclude,
        des,
        name,
        title,
        addressId: selectedAddress,
        urlImg: urls
      });
      window.location.replace('/dashboard/tour/');
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <>
      <Helmet>
        <title> Cập nhật Tour </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Cập nhật Tour
          </Typography>
        </Stack>
        <Card>
          <CardContent>
            <form onSubmit={e => e.preventDefault()}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginTop: '30px'
                  }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        gap: '10px',
                        flexWrap: 'wrap',
                        marginTop: '10px'
                      }}
                    >
                      {files.map((file, index) => (
                        <img
                          key={index}
                          style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
                          src={file
                            ? URL.createObjectURL(file)
                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                          alt=""
                        />
                      ))}
                    </Box>
                    <div style={{ display: 'flex', position: 'relative', alignItems: 'center', marginTop: '30px' }}>
                      <InputLabel htmlFor="file" style={{ display: 'flex', alignItems: 'center' }} >
                        Image: <DriveFolderUploadIcon style={{ marginLeft: '20px', cursor: 'pointer' }} htmlFor="file" />
                      </InputLabel>
                      <input
                        multiple
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='NameTour' placeholder='5N4D Hàn Quốc' onChange={(e) => setNameTour(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='Tour price' placeholder='10000' onChange={(e) => setTourPrice(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='Time' placeholder='1' onChange={(e) => setTime(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='Date start' placeholder='2023/03/02' onChange={(e) => setDateStart(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='Date end' placeholder='2023/03/03' onChange={(e) => setDateEnd(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='Occupany' placeholder='10' onChange={(e) => setOccupany(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='include' placeholder='nhập tour bao gồm' onChange={(e) => setInclude(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='uninclude' placeholder='nhập tour không bao gồm' onChange={(e) => setUninclude(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="address-select">Địa chỉ</InputLabel>
                    <Select
                      id="address-select"
                      value={selectedAddress}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      label="Địa chỉ"
                    >
                      {info.map((address) => (
                        <MenuItem key={address.addressId} value={address.addressId}>
                          {address.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {des.map((description, index) => (
                  <Grid item xs={12} key={index}>
                    <TextField fullWidth label={`Ngày ${index + 1}`} value={description} placeholder='Enter description' onChange={(e) => handleDesChange(index, e.target.value)} />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      gap: 5,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Button type='submit' variant='contained' size='large' onClick={handleClick}>
                      Cập nhật
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
