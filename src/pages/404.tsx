import React from 'react';

import { Button } from '../componentLibrary';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Page from '../componentLibrary/organisms/Page';

const FourOhFour = () => {
  return (
    <Page>
      <Container component="main" style={{ height: '100vh' }}>
        <div className="vertical-center-parent" style={{ height: '100vh' }}>
          <div className="vertical-center-child full-width">
            <Grid container spacing={10}>
              <Grid item xs={12} md={6}>
                <div
                  className="vertical-center-parent"
                  style={{ height: '100%', textAlign: 'center' }}
                >
                  <div className="vertical-center-child full-width">
                    <h1>404</h1>
                    <p>Looks like you wandered away from the herd</p>
                    <Button gaTag={'404_home'} href="/">
                      Return to the pasture
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div style={{ textAlign: 'center' }}>
                  <img
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                    src={'/404.gif'}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </Page>
  );
};

export default FourOhFour;
