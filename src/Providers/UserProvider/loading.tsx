import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

export default function Loading() {
  return (
    <Container
      component="main"
      maxWidth="sm"
      style={{ overflow: 'hidden', margin: '1em auto' }}
    >
      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
        <Skeleton variant="rectangular" width={'100%'} height={'50vh'} />
        <Skeleton variant="rectangular" width={'100%'} height={60} />
      </Stack>
    </Container>
  );
}
