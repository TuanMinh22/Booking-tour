import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  AvatarGroup,
} from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// components
import './style.css';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'RoomName', label: 'Tên phòng', alignRight: false },
  { id: 'Image', label: 'Ảnh', alignRight: false },
  { id: 'Occupany', label: 'Số người', alignRight: false },
  { id: 'Price', label: 'Giá tiền', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function RoomPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [info, setInfo] = useState([]);

  const [deleteConfirmation, setDeleteConfirmation] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/rooms");
        setInfo(res.data.data);
        console.log(res.data.data);
      } catch (err) {
        console.log(err)
      }
    };

    fetchData();
  }, [])

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = info.map((n) => n.roomName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/hotels/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteConfirmation = (index) => {
    const updatedConfirmation = [...deleteConfirmation];
    updatedConfirmation[index] = true;
    setDeleteConfirmation(updatedConfirmation);
  };

  const handleDeleteCancel = (index) => {
    const updatedConfirmation = [...deleteConfirmation];
    updatedConfirmation[index] = false;
    setDeleteConfirmation(updatedConfirmation);
  };

  const handleDeleteConfirm = async (index, id) => {
    try {
      await axios.delete(`/rooms/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - info.length) : 0;

  const filteredUsers = applySortFilter(info, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Phòng </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Phòng
          </Typography>
          <Link to='/dashboard/room/create'>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Thêm mới
            </Button>
          </Link>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={info.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    const { RoomId, roomName, Occupany, roomPrice, urlImg } = row;
                    const selectedUser = selected.indexOf(roomName) !== -1;

                    return (
                      <TableRow hover key={RoomId} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, roomName)} />
                        </TableCell>
                        <TableCell align="left">{roomName}</TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" spacing={2}>
                            <AvatarGroup max={3}>
                              {
                                urlImg.map(m => (
                                  <Avatar alt="" src={m} />
                                ))
                              }
                            </AvatarGroup>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{Occupany}</TableCell>

                        <TableCell align="left">{roomPrice}</TableCell>

                        <TableCell align="right" key={RoomId}>
                          <Link>
                            <IconButton size="large" color="warning">
                              <Iconify icon={'eva:edit-fill'} />
                            </IconButton>
                          </Link>
                          <IconButton size="large" color="error" onClick={() => handleDeleteConfirmation(index)}>
                            <Iconify icon={'eva:trash-2-outline'} />
                          </IconButton>
                          {deleteConfirmation[index] && (
                            <div className="dialog-overlay" >
                              <div className="dialog-content" >
                                <h2 className="dialog-title">Hộp thoại xác nhận xóa</h2>
                                <p className="dialog-message">Bạn có chắc chắn muốn xóa không?</p>
                                <div className="dialog-buttons">
                                  <button className="dialog-button dialog-button-cancel" onClick={() => handleDeleteCancel(index)}>Không</button>
                                  <button className="dialog-button dialog-button-confirm" onClick={() => handleDeleteConfirm(index, row.Room_ID)}>Có</button>
                                </div>
                              </div>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={info.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
