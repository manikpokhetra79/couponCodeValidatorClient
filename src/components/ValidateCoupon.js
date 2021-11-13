import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { validateCoupon } from '../utils/urls';
const ValidateCoupon = () => {
  const [cartAmount, setCartAmount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [ifError, setError] = useState(false);
  const [ifSuccess, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [updatedCartAmount, setUpdatedCartAmount] = useState(0);
  useEffect(() => {
    return function cleanup() {
      setCartAmount(0);
      setCouponCode('');
      setError(false);
      setSuccess(false);
      setErrorMessage('');
      setSuccessMessage('');
      setDiscountAmount(0);
      setUpdatedCartAmount(0);
    };
  }, []);
  let handleSubmit = () => {
    if (cartAmount && couponCode) {
      fetch(validateCoupon, {
        method: 'POST',
        body: JSON.stringify({
          cartValue: cartAmount,
          couponcode: couponCode,
        }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === 'success') {
            //  get required data from api response
            setSuccess(true);
            setSuccessMessage(data.message);
            setDiscountAmount(data.discountAmount);
            setUpdatedCartAmount(data.updatedCartValue);
            setTimeout(() => {
              setSuccess(false);
            }, 4000);
          } else {
            //   if error update cart amount to 0
            setUpdatedCartAmount(0);
            setDiscountAmount(0);
            setError(true);
            setErrorMessage(data.message);
            setTimeout(() => {
              setError(false);
            }, 4000);
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert('Enter complete details');
    }
  };
  return (
    <div>
      <Container>
        <Row className="my-3">
          {' '}
          <h2 className="text-center text-danger">Coupon Validator</h2>
          <ul className="my-4">
            <li>
              For testing purposes, we are taking Total Cart Amount directly via
              input box.
            </li>
          </ul>
        </Row>
        <Row className="my-3">
          <Col md={4} lg={4} className="d-flex justify-content-between">
            <label>Enter Code</label>
            <input
              type="text"
              name="name"
              placeholder="Enter coupon Code"
              onChange={(e) => {
                setCouponCode(e.target.value);
              }}
              required
            />
          </Col>
          <Col md={4} lg={4} className="d-flex justify-content-between">
            <label>Total Cart Amount</label>
            <input
              type="text"
              name="number"
              placeholder="Total Cart Amount"
              onChange={(e) => {
                setCartAmount(e.target.value);
              }}
              required
            />
          </Col>
          <Col md={4} lg={4}>
            <Button variant="primary" onClick={handleSubmit}>
              Apply Coupon
            </Button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={4} lg={4}>
            <p>
              Updated Amount :{' '}
              {updatedCartAmount > 0 && (
                <span style={{ fontWeight: '600' }} className="text-primary">
                  {updatedCartAmount}
                </span>
              )}
            </p>
          </Col>
          <Col md={4} lg={4}>
            <p>
              Discount Amount :{' '}
              {discountAmount > 0 && (
                <span style={{ fontWeight: '600' }} className="text-primary ">
                  {discountAmount}
                </span>
              )}
            </p>
          </Col>
          <Col md={4} lg={4}>
            {' '}
            {ifError && (
              <div className="alert alert-danger" role="alert">
                <span style={{ fontsize: '12px' }} className="text-capitalize">
                  {errorMessage}
                </span>
              </div>
            )}
            {ifSuccess && (
              <div className="alert alert-success" role="alert">
                <span style={{ fontsize: '12px' }} className="text-capitalize">
                  {successMessage}
                </span>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ValidateCoupon;
