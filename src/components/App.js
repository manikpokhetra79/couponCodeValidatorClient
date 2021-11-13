import React from 'react';
// import { createCoupon, listCoupons, validateCoupon } from '../utils/urls';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateCoupon from './CreateCoupon';
import Header from './Header';
import ValidateCoupon from './ValidateCoupon';
import CouponsList from './CouponsList';
// import Page404 from './Page404';
const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<CreateCoupon />}></Route>
          <Route path="/list-coupons" element={<CouponsList />}></Route>
          <Route path="/validate-coupons" element={<ValidateCoupon />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
