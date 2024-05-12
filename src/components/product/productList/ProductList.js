import React, { useEffect, useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";

import styles from "./ProductList.module.scss";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  selectFilteredProducts,
} from "../../../redux/slice/filterSlice";
import Pagination from "../../pagination/Pagination";

const ProductList = ({ products, withFilter }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  //Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filteredProducts = useSelector(selectFilteredProducts);

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      SORT_PRODUCTS({
        products: products,
        sort,
      })
    );
  }, [dispatch, products, sort]);

  useEffect(() => {
    dispatch(
      FILTER_BY_SEARCH({
        products: products,
        search,
      })
    );
  }, [dispatch, products, search]);

  return (
    <div className={styles["product-list"]} id="product">
      {withFilter && (
        <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color="#f97316"
            onClick={() => setGrid(true)}
          />
          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />

          <p>
            <b>{filteredProducts.length}</b> Products found.
          </p>
        </div>

        {/* Search Icon */}
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {/* Sort Product */}
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
      )}
      

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {currentProducts.length === 0 ? (
          <p style={{ fontSize: "30px", padding: "40px 0", fontWeight: "600" }}>
            No products found.
          </p>
        ) : (
          <>
            {currentProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem {...product} grid={grid} product={product} />
                </div>
              );
            })}
          </>
        )}
      </div>

      {currentProducts.length !== 0 && (
        <Pagination
          currentPage={currentPage}
          productsPerPage={productsPerPage}
          setCurrentPage={setCurrentPage}
          totalProducts={filteredProducts.length}
        />
      )}
    </div>
  );
};

export default ProductList;
