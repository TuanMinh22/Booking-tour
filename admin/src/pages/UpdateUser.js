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
  Box
} from '@mui/material';
import axios from 'axios';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useParams } from 'react-router-dom';

export default function NewUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState("");
  const [info, setInfo] = useState([]);

  const param = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/users/${param.id}`);
        console.log(res.data[0]);
        setInfo(res.data[0]);
      } catch (err) {
        console.log(err)
      }
    };

    fetchData();

  }, param.id);

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload_file");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/desuzwkpg/image/upload",
        data
      );

      const { url } = uploadRes.data;

      await axios.patch(`/users/${param.id}`, {
        firstName,
        lastName,
        Email: email,
        Phone: phone,
        Password: password,
        Image: url
      });
      window.location.replace('/dashboard/user/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Helmet>
        <title> Update User </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Update User
          </Typography>
        </Stack>
        <Card>
          <CardContent>
            <form onSubmit={e => e.preventDefault()}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Box>
                    <img
                      style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover' }}
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : (info.Image ? info.Image : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg")
                      }
                      alt=""
                    />
                    <div style={{ display: 'flex', position: 'relative', alignItems: 'center', marginTop: '30px' }}>
                      <InputLabel htmlFor="file" style={{ display: 'flex', alignItems: 'center' }}>
                        Image: <DriveFolderUploadIcon style={{ marginLeft: '20px', cursor: 'pointer' }} htmlFor="file" />
                      </InputLabel>
                      <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='firstName' placeholder={info.firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='lastName' placeholder={info.lastName} onChange={(e) => setLastName(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type='email'
                    label='Email'
                    placeholder={info.Email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type='phone'
                    label='Phone'
                    placeholder={info.Phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='form-layouts-basic-password'>Password</InputLabel>
                    <OutlinedInput
                      label='Password'
                      id='form-layouts-basic-password'
                      type='password'
                      aria-describedby='form-layouts-basic-password-helper'
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='form-layouts-confirm-password'>Confirm Password</InputLabel>
                    <OutlinedInput
                      label='Confirm Password'
                      id='form-layouts-confirm-password'
                      aria-describedby='form-layouts-confirm-password-helper'
                      type='password'
                    />
                  </FormControl>
                </Grid>
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
                      Update User
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
