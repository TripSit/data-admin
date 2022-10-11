import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  Container,
} from 'react-bootstrap';

const MainNav = styled(Nav)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ul {
    display: flex;
    list-style: none;
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;

    > li:not(:last-of-type) {
      margin-right: 1em;
    }
  }
`;

const PageLayoutHeader: FC = function PageLayoutHeader() {
  return (
    <Navbar as="header">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Tripsit</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <MainNav as="nav">
            <ul>
              <li>
                <Nav.Link as={Link} to="/drugs">Drugs</Nav.Link>
              </li>
              <li>
                <Nav.Link as={Link} to="/users">Users</Nav.Link>
              </li>
            </ul>
          </MainNav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PageLayoutHeader;
