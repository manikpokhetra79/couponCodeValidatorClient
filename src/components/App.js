import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import CreateCoupon from './CreateCoupon';
import Header from './Header';
import ValidateCoupon from './ValidateCoupon';
import CouponsList from './CouponsList';
// import Page404 from './Page404';
import { listCoupons } from '../utils/urls';
const App = () => {
  const [couponsList, setCouponsList] = useState([]);
  useEffect(() => {
    fetch(listCoupons)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCouponsList(data.coupons);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<CreateCoupon />}></Route>
          <Route
            path="/list-coupons"
            element={<CouponsList couponsList={couponsList} />}
          ></Route>
          <Route path="/validate-coupons" element={<ValidateCoupon />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
