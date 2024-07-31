import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow,  TableFooter, TablePagination, Box, CircularProgress, Alert } from '@mui/material';
import Layout from "../components/Layout";
import { Link } from "../models/link"; // Ensure this import is correct
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Links: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>(); // Fetch ID from route params

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const { data } = await axios.get<Link[]>(`/users/${id}/links`);
        setLinks(data);
      } catch (error) {
        setError('Error fetching links');
        console.error('Error fetching links:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, [id]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Alert severity="error">{error}</Alert>
    </Box>
  );

  return (
    <Layout>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Count</TableCell>
              <TableCell>Revenue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {links.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((link) => (
              <TableRow key={link.id}>
                <TableCell>{link.id}</TableCell>
                <TableCell>{link.code}</TableCell>
                <TableCell>{link.orders.length}</TableCell>
                <TableCell>{/* Add revenue calculation if needed */}</TableCell>
                <TableCell>{link.orders.reduce((s, o) => s + o.total, 0)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]} // Added options for rows per page
                count={links.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
    </Layout>
  );
};

export default Links;
