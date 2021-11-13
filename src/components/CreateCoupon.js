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
  const [ifError, setError] = useState(false);
  const [ifSuccess, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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

  let handleSubmit = (e) => {
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
      } else {
        alert('Enter all required values');
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
      } else {
        alert('Enter all required values');
      }
    } else {
      alert('Enter all required values');
    }
  };
  // generate coupon fetch api function
  let generateCoupon = (obj) => {
    console.log(obj);
    fetch(createCoupon, {
      method: 'POST',
      body: JSON.stringify({
        formdata: obj,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.status === 'success') {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 4000);
        } else {
          setError(true);
          setErrorMessage(data.message);
          setTimeout(() => {
            setError(false);
          }, 4000);
        }
      })
      .catch((error) => {
        console.log(error, 'ehjre');
      });
  };
  return (
    <>
      <Container className="p-3">
        {' '}
        <Row>
          <h1 className="text-center text-danger">Coupon Generator</h1>
        </Row>
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
              required
            />
          </Col>
          <Col md={5} lg={5} className="d-flex justify-content-between">
            {' '}
            <label>Select Expiry Date</label>
            <input
              type="datetime-local"
              step="2"
              required
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
              required
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
                required
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
                min="1"
                required
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
                min="1"
                required
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
          {ifSuccess && (
            <Col>
              <div className="alert alert-primary" role="alert">
                Coupon created Successfully.
              </div>
            </Col>
          )}
          {ifError && (
            <Col>
              <div className="alert alert-danger" role="alert">
                <span className="text-capitalize">{errorMessage}</span>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default CreateCoupon;
