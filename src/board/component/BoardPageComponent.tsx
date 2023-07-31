import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { ChangeEvent } from 'react';
import { Grid } from '@mui/material';

const BoardPage = () => {
  const [page, setPage] = useState(1);
  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  return (
    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
      <Pagination page={page} count={1} siblingCount={2} boundaryCount={2} shape="rounded" onChange={handlePageChange} showFirstButton showLastButton />
    </Grid>
  );
};

export default BoardPage;
