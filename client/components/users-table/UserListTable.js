import React from 'react';
import Link from 'next/link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function UserListTable(props) {
  const { data, handleDelete } = props;

  if (!data) {
    return <Skeleton variant="rectangular" width={800} height={118} />;
  }
  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="left">First Name</StyledTableCell>
              <StyledTableCell align="left">Last Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Created At</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data.map((user) => (
              <StyledTableRow
                key={user._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {user._id}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {user.first_name}
                </StyledTableCell>
                <StyledTableCell align="left">{user.last_name}</StyledTableCell>
                <StyledTableCell align="left">{user.email}</StyledTableCell>
                <StyledTableCell align="left">
                  {user.created_at}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Stack direction="row" spacing={2}>
                    <Link href={`/user/${user._id}`}>
                      <Button variant="outlined">View</Button>
                    </Link>

                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default UserListTable;
