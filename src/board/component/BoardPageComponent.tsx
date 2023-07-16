import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { ChangeEvent } from 'react';

const BoardPage = () => {
  const [page, setPage] = useState(1);
  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  return (
    <Pagination page={page} count={10} siblingCount={2} boundaryCount={1} shape="rounded" onChange={handlePageChange} showFirstButton showLastButton sx={{ marginTop: '0.5rem' }} />
  );
};

export default BoardPage;
