import React, { useContext } from 'react';

import { UserContext } from '../context/userContext';
import Page from '../componentLibrary/organisms/Page';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Footer from '../components/footer';
import { Button } from '../componentLibrary';

function IndexPage() {
  const { userLoading } = useContext(UserContext);
  if (userLoading) {
    return <></>;
  }
  return (
    <Page showNavBar={true} showFooter={false}>
      <main style={{ minHeight: '60vh' }}>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              HerdPay for Merchants
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                gaTag={'landing_learn_more'}
                appearance={'secondary'}
                target="_blank"
                href={'https://herdpay.com'}
              >
                Learn More
              </Button>
            </Stack>
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Footer />
    </Page>
  );
}

export default IndexPage;
