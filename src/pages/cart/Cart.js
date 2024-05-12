import React, { useEffect } from "react";
import styles from "./cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART_QTY,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Card from "../../components/card/Card";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";


const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const navigate = useNavigate()

  const dispatch = useDispatch();

  const URL = window.location.href;

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL())
    dispatch(CALCULATE_TOTAL_QUANTITY())
    dispatch(SAVE_URL(""))
  }, [dispatch, cartItems])

  const checkout = () => {
    if(isLoggedIn){
      navigate("/checkout-details")
    }else{
      dispatch(SAVE_URL(URL))
      navigate("/login")
    }
  }

  const increaseItemQty = (cartItem) => {
    dispatch(ADD_TO_CART(cartItem))
  }

  const decreaseItemQty = (cartItem) => {
    dispatch(DECREASE_CART_QTY(cartItem))
  }

  const removeItemFromCart = (cartItem) => {
    dispatch(REMOVE_FROM_CART(cartItem))
  }

  const clearCart = () => {
    dispatch(CLEAR_CART())
  }

  return (
    <section>
      <div className={`container ${styles.table}`}>
        

        {cartItems.length === 0 ? (
          <div className="--center-all" style={{ minHeight: "80vh" }}>
            <p style={{ padding: "20px 0", fontSize:"30px"}}>Your cart is currently empty</p>
            <br />

            <div>
              <Link to="/collection">
                <button className="--btn --btn-danger">&larr; Continue shopping</button>
              </Link>
            </div>


          </div>
        ) : (
          <>
            <h2 style={{ padding: "20px 0", fontWeight: "bold"}}>Shopping cart</h2>
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => {
                  const { id, name, price, imageURL, cartQuantity } = item;

                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>

                      <td>
                        <p>
                          {name}
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>

                      <td>₹{price}</td>

                      <td>
                        <div className={styles.count}>
                          <button className="--btn" onClick={() => decreaseItemQty(item)}>-</button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button className="--btn" onClick={() => increaseItemQty(item)}>+</button>
                        </div>
                      </td>

                      <td>₹{(price * cartQuantity).toFixed(2)}</td>

                      <td className={styles.icons}>
                        <FaTrashAlt size={18} color="#f97316" onClick={() => removeItemFromCart(item) } />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className={styles.summary}>
              <button className="--btn --btn-danger --button" onClick={clearCart}>Clear cart</button>
              <div className={styles.checkout}>
                <div>
                  <Link to="/collection">&larr; Continue shopping</Link>
                </div>
                <br />

                <Card cardClass={styles.card}>
                  <p style={{ padding: "15px 0"}}><b>{`Cart items: ${cartTotalQuantity}`}</b></p>
                  <div className={styles.text}>
                    <h4>Subtotal: </h4>
                    <h3><b>₹{`${cartTotalAmount.toFixed(2)}`}</b></h3>
                  </div>
                  <p style={{ paddingTop: "10px", paddingBottom: "20px"}}>Tax and shipping calculated at checkout</p>

                  <button className="--btn --btn-danger --btn-block" onClick={checkout}>Checkout &rarr;</button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
