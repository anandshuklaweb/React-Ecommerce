import React, { useEffect } from "react";
import styles from "./orderHistory.module.css";
import useFetchCollection from "../../hooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { STORE_ORDERS, selectOrderHistory } from "../../redux/slice/orderSlice";
import { selectUserID } from "../../redux/slice/authSlice";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const { data, isLoading } = useFetchCollection("orders");

  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserID);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`)
  }

  const filteredOrder = orders.filter((order) => order.userID === userID)

  return (
    <section>
      <div className={`container ${styles.order}`}>
        <h2>Your Orders</h2>
        <p>
          Open an order to leave a <b>Product Review</b>
        </p>

        <br />

        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            {filteredOrder.length === 0 ? (
              <p>No orders found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrder.map((order, index) => {
                    const {
                      id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;
                    return (
                      <tr key={id} onClick={() => handleClick(id)}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} at {orderTime}
                        </td>
                        <td>{id}</td>
                        <td>₹{orderAmount}</td>
                        <td
                          className={
                            orderStatus !== "Delivered"
                              ? `${styles.pending}`
                              : `${styles.delivered}`
                          }
                        >
                          {orderStatus}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </section>
  );
};

export default OrderHistory;
