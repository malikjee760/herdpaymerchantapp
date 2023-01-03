import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

export default function AccountLoading() {
  return (
    <Container maxWidth="sm">
      <br />
      <Skeleton variant="rectangular" width={'100%'} height={'10vh'} />
      <br />
      <Skeleton variant="text" />
      <br />
      <Skeleton variant="rectangular" width={'100%'} height={'20vh'} />
      <br />
      <Skeleton variant="rectangular" width={'100%'} height={'20vh'} />
    </Container>
  );
}
