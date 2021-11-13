import React from 'react';

const CouponsList = ({couponsList}) => {
  
  return (
    <>
      <h2 className="text-center text-danger">Coupons List</h2>
      {couponsList.length === 0 && (
        <h3 className="text-center text-info">No Coupons Available</h3>
      )}
      <ol className="my-3">
        {couponsList.map((coupon, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold ">
                Coupon Code :{' '}
                <span className="text-primary">{coupon.name}</span>
              </div>
              <span>
                Applicable on a minimum Cart Amount of{' '}
                <strong>{coupon.minCartAmount}</strong>
              </span>
            </div>
            <span className="badge bg-primary rounded-pill text-capitalize">
              {coupon.couponType}
            </span>
          </li>
        ))}
      </ol>
    </>
  );
};

export default CouponsList;
