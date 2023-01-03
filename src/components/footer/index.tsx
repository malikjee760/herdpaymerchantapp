import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { Copyright } from '../../componentLibrary';

const footers = [
  {
    title: 'Company',
    description: [
      { title: 'Team' },
      { title: 'About Us', link: 'https://www.herdpay.com/', target: '_blank' },
      {
        title: 'Contact us',
        link: 'https://www.herdpay.com/merchants/#signup',
        target: '_blank',
      },
    ],
  },
  {
    title: 'Features',
    description: [
      { title: 'Cool stuff' },
      { title: 'Random feature' },
      { title: 'Team feature' },
      { title: 'For Devs' },
    ],
  },
  {
    title: 'Resources',
    description: [{ title: 'FAQs' }, { title: 'Careers' }],
  },
  {
    title: 'Legal',
    description: [
      {
        title: 'Privacy policy',
        link: 'https://www.herdpay.com/privacy',
        target: '_blank',
      },
      {
        title: 'Terms of service',
        link: 'https://www.herdpay.com/terms',
        target: '_blank',
      },
    ],
  },
];

export default function Footer() {
  return (
    <Container
      maxWidth="md"
      component="footer"
      sx={{
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        mt: 8,
        py: [3, 6],
      }}
    >
      <Grid container spacing={4} justifyContent="space-evenly">
        {footers.map((footer) => (
          <Grid item xs={6} sm={3} key={footer.title}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              {footer.title}
            </Typography>
            <ul>
              {footer.description.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.link || '#'}
                    target={item.target || '_self'}
                    variant="subtitle1"
                    color="text.secondary"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
        ))}
      </Grid>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
