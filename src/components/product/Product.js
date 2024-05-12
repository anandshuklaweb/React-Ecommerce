import React, { useEffect, useState } from "react";
import styles from "./Product.module.scss";

import ProductList from "./productList/ProductList";
import ProductFilter from "./productFilter/ProductFilter";
import useFetchCollection from "../../hooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_PRICE_RANGE,
  STORE_PRODUCTS,
  selectProduct,
} from "../../redux/slice/productSlice";

import { FaCogs } from "react-icons/fa";
import ProductItemShimmer from "../Shimmer/ProductItemShimmer/ProductItemShimmer";
import ProductFilterShimmer from "../Shimmer/productFilterShimmer/ProductFilterShimmer";

const Product = ({ withFilter }) => {
  const { data, isLoading } = useFetchCollection("products");

  const [showFilter, setShowFilter] = useState(false);

  const products = useSelector(selectProduct);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      })
    );
  }, [dispatch, data]);

  return (
    <section>
      <div className={`container ${styles.product}`}>
        {withFilter && (
          <aside
            className={
              showFilter
                ? `${styles.filter} ${styles.show}`
                : `${styles.filter}`
            }
          >
          
            {isLoading ? <ProductFilterShimmer /> : <ProductFilter />}
          </aside>
        )}

        <div className={withFilter ? styles.content : styles.contentFull}>
          {isLoading ? (
            <div className={styles.shimmerProductContainer}>
              {Array.from({ length: 9 }, (_, index) => (
                <ProductItemShimmer key={index} />
              ))}
            </div>
          ) : (
            <ProductList products={products} withFilter={withFilter} />
          )}

          {withFilter && (
            <div
              className={styles.icon}
              onClick={() => setShowFilter(!showFilter)}
            >
              <FaCogs size={20} color="#f97316" />
              <p>
                <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Product;
