import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <>
    <Navbar bg="primary" >
      <ul className="header-menu my-2">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/validate-coupons">Validate Coupon</Link>
        </li>
        <li>
          <Link to="/list-coupons">List Coupons</Link>
        </li>
      </ul>
    </Navbar>
    
    </>
  );
};

export default Header;
