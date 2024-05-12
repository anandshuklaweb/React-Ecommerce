import styles from "./Home.module.scss";
import InfoBox from "../../infoBox/InfoBox";

import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectProduct } from "../../../redux/slice/productSlice";
import { CALCULATE_TOTAL_ORDER_AMOUNT, STORE_ORDERS, selectOrderHistory, selectTotalOrderAmount } from "../../../redux/slice/orderSlice";
import useFetchCollection from "../../../hooks/useFetchCollection";
import { useEffect } from "react";
import Chart from "../../chart/Chart";


const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const productsIcon = <BsCart4 size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} color="orangered" />;

const Home = () => {

  const dispatch = useDispatch()

  const products = useSelector(selectProduct);
  const orders = useSelector(selectOrderHistory);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);
  
  const fbProducts = useFetchCollection("products");
  const { data } = useFetchCollection("orders");

  useEffect(() => {
   dispatch(STORE_PRODUCTS({
    products: fbProducts.data
   }))

   dispatch(STORE_ORDERS(data))

   dispatch(CALCULATE_TOTAL_ORDER_AMOUNT())
  }, [dispatch, data, fbProducts])

  return (
    <div className={styles.home}>
      <h2>Dashboard </h2>
      <div className={styles["info-box"]}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"Earnings"}
          count={`₹${totalOrderAmount}`}
          icon={earningIcon}
        />

        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={"Products"}
          count={products.length}
          icon={productsIcon}
        />

        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"Orders"}
          count={orders.length}
          icon={ordersIcon}
        />
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
};

export default Home;
