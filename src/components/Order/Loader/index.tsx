import React from 'react';
import Skeleton from '@mui/material/Skeleton';

interface ILoaderProps {
  loading: boolean;
}
const Loader = (props: ILoaderProps) => {
  const { loading } = props;
  if (loading) {
    return (
      <>
        <Skeleton animation="wave" variant="rectangular" />
        <br />
        <Skeleton animation="wave" variant="rectangular" height={50} />
        <br />
        <Skeleton animation="wave" variant="rectangular" />
      </>
    );
  }
  return <></>;
};

export default Loader;
