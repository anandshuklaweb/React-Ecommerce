import React, { useEffect } from "react";

import styles from "./CheckoutSummary.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
    CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { Link } from "react-router-dom";
import Card from "../card/Card";

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL())
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }, [dispatch, cartItems])

  return (
    <div>
      <h3 style={{ fontWeight: "600" }}>Checkout Summary</h3>

      <div>
        {cartItems.length === 0 ? (
          <>
            <p>No item in your cart.</p>
            <button className="--btn">
              <Link to="/collections">Back to shop</Link>
            </button>
          </>
        ) : (
          <div>
            <p>
              <b>Cart Items: {cartTotalQuantity}</b>
            </p>

            <div className={styles.text}>
              <h4>Subtotal: </h4>
              <h3> <b>₹{cartTotalAmount}</b></h3>
            </div>

            {cartItems.map((item) => {

              const { id, name, price, cartQuantity, imageURL } = item;

              return (
                <Card cardClass={` ${styles.checkoutSummaryCard} ${styles.card}`} key={id}>
                  <div>
                    <h4><b>Product:</b> {name}</h4>
                    <p><b>Quantity:</b> {cartQuantity}</p>
                    <p><b>Unit price:</b> ₹{price}</p>
                    <p><b>Set Price:</b> ₹{price * cartQuantity}</p>
                  </div>
                  <div style={{ width: "25%"}}>
                    <img src={imageURL} alt={name} style={{width: "125px", border: "1px solid #f9731638", borderRadius: "5px" }}/>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
