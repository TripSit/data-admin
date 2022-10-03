import React, { ReactNode, FC } from 'react';
import { Helmet } from 'react-helmet';
import Header from './header';

interface Props {
  children: ReactNode;
  title: string;
}

const PageLayout: FC<Props> = function PageLayout({ children, title }) {
  return (
    <>
      <Helmet>
        <title>TripSit Admin Panel &bull; {title}</title>
      </Helmet>

      <Header />

      <main>{children}</main>
    </>
  );
};

export default PageLayout;
