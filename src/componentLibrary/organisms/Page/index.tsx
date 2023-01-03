import React from 'react';
import NavBar from '../NavBar';
import { Footer } from '../../index';

interface IPageProps {
  children: any;
  showNavBar?: boolean;
  showFooter?: boolean;
}
const Page = (props: IPageProps) => {
  const { children, showNavBar, showFooter = true } = props;
  return (
    <div className="page">
      {showNavBar && <NavBar />}
      {children}
      {showFooter && <Footer />}
    </div>
  );
};
export default Page;
