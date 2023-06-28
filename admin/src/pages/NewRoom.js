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

export default function NewRoom() {
  const [roomName, setRoomName] = useState('');
  const [occupany, setOccupany] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState("");

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

      await axios.post("/rooms/create", {
        roomName,
        Occupany: occupany,
        roomPrice: price,
        img: url
      });
      window.location.replace('/dashboard/room/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Helmet>
        <title> Add Room </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Add Room
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
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt=""
                    />
                    <div style={{ display: 'flex', position: 'relative', alignItems: 'center', marginTop: '30px' }}>
                      <InputLabel htmlFor="file" style={{ display: 'flex', alignItems: 'center' }} >
                        Image: <DriveFolderUploadIcon style={{ marginLeft: '20px', cursor: 'pointer' }} htmlFor="file" />
                      </InputLabel>
                      <input
                        multiple
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='RoomName' placeholder='phòng 2 giường đơn' onChange={(e) => setRoomName(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='Occupany' placeholder='4' onChange={(e) => setOccupany(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type='price'
                    label='Price'
                    placeholder='11000000'
                    onChange={(e) => setPrice(e.target.value)}
                  />
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
                      Create Room
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
