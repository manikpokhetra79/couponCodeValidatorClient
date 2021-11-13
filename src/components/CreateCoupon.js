import React, { useState } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { createCoupon } from '../utils/urls';
const CreateCoupon = () => {
  const [couponName, setCouponName] = useState('');
  const [expirationDate, setexpirationDate] = useState('');
  const [minCartValue, setminCartValue] = useState(0);
  const [couponType, setcouponType] = useState('');
  const [flatAmount, setflatAmount] = useState(0);
  const [percentValue, setpercentValue] = useState(0);
  const [maxDiscount, setmaxDiscount] = useState(0);
  const [isFlat, setIsFlat] = useState(false);
  const [isPercent, setIsPercent] = useState(false);

  let handleOption = (e) => {
    if (e.target.value === 'flat') {
      setIsFlat(true);
      setIsPercent(false);
      setcouponType('flat');
    } else if (e.target.value === 'percent') {
      setIsFlat(false);
      setIsPercent(true);
      setcouponType('percent');
    } else {
      setIsFlat(false);
      setIsPercent(false);
    }
  };

  let handleSubmit = () => {
    if (couponType === 'flat') {
      let obj = {
        name: couponName,
        expiryDate: expirationDate,
        couponType,
        minCartAmount: minCartValue,
        flatAmount,
      };
      if (
        couponName &&
        expirationDate &&
        couponType &&
        minCartValue &&
        flatAmount
      ) {
        generateCoupon(obj);
      }
    } else if (couponType === 'percent') {
      let obj = {
        name: couponName,
        expiryDate: expirationDate,
        couponType,
        minCartAmount: minCartValue,
        percentValue,
        maxDiscount,
      };
      if (
        couponName &&
        expirationDate &&
        couponType &&
        minCartValue &&
        percentValue &&
        maxDiscount
      ) {
        generateCoupon(obj);
      }
    }
  };
  // generate coupon fetch api function
  let generateCoupon = async (obj) => {
    await fetch(createCoupon, {
      method: 'POST',
      body: JSON.stringify({
        formdata: obj,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <>
      <Row>
        <h1 className="text-center">Coupon Generator</h1>
      </Row>
      <Container className="form">
        <Row lg={10} className="my-3">
          <Col md={5} lg={5} className="d-flex justify-content-between">
            <label>Enter Code</label>
            <input
              type="text"
              name="name"
              placeholder="Enter coupon Code"
              onChange={(e) => {
                setCouponName(e.target.value);
              }}
            />
          </Col>
          <Col md={5} lg={5} className="d-flex justify-content-between">
            {' '}
            <label>Select Expiry Date</label>
            <input
              type="datetime-local"
              step="2"
              name="expirationDate"
              onChange={(e) => {
                setexpirationDate(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row lg={10} className="my-3">
          <Col md={5} lg={5} className="d-flex justify-content-between">
            {' '}
            <label>Enter Minimum Cart Value</label>
            <input
              type="number"
              name="minCartValue"
              placeholder="Enter Minimum Cart Value"
              onChange={(e) => {
                setminCartValue(e.target.value);
              }}
            />
          </Col>
          <Col md={5} lg={5} className="d-flex justify-content-between">
            {' '}
            <label>Coupon Type</label>
            <select name="couponType" onClick={handleOption}>
              <option value="empty" default>
                Select
              </option>
              <option value="flat">Flat Coupon</option>
              <option value="percent">Percent Coupon</option>
            </select>
          </Col>
        </Row>
        {isFlat && (
          <Row lg={10} className="my-3">
            <Col md={5} lg={5} className="d-flex justify-content-between">
              {' '}
              <label>Enter flat Coupon Amount</label>
              <input
                type="number"
                name="flatAmount"
                placeholder="Enter Amount for Coupon"
                onChange={(e) => {
                  setflatAmount(e.target.value);
                }}
              />
            </Col>
          </Row>
        )}
        {isPercent && (
          <Row lg={10} className="my-3">
            <Col md={5} lg={5} className="d-flex justify-content-between">
              {' '}
              <label>Enter Percent Value</label>
              <input
                type="number"
                name="percentValue"
                placeholder="Enter Percent Value"
                onChange={(e) => {
                  setpercentValue(e.target.value);
                }}
              />
            </Col>
            <Col md={5} lg={5} className="d-flex justify-content-between">
              {' '}
              <label>Enter Max Percent Discount</label>
              <input
                type="number"
                name="maxDiscount"
                placeholder="Max Percent Discount"
                onChange={(e) => {
                  setmaxDiscount(e.target.value);
                }}
              />
            </Col>
          </Row>
        )}
        <Row lg={10} className="my-3">
          <Col md={5} lg={5} className="d-flex justify-content-between">
            <Button variant="primary" onClick={handleSubmit}>
              Generate Coupon
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateCoupon;
