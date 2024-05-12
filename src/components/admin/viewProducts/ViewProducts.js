import React, { useEffect, useState } from "react";
import styles from "./ViewProducts.module.css";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import { Link } from "react-router-dom";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../../loader/Loader";
import { deleteObject, ref } from "firebase/storage";

import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import {
  STORE_PRODUCTS,
  selectProduct,
} from "../../../redux/slice/productSlice";
import useFetchCollection from "../../../hooks/useFetchCollection";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from "../../../redux/slice/filterSlice";
import Search from "../../search/Search";
import Pagination from "../../pagination/Pagination";

const ViewProducts = () => {
  const [search, setSearch] = useState();
  const { data, isLoading } = useFetchCollection("products");

  const products = useSelector(selectProduct);
  const filteredProducts = useSelector(selectFilteredProducts);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  //Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(
      FILTER_BY_SEARCH({
        products: products,
        search,
      })
    );
  }, [dispatch, products, search]);

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
      },

      function cancelCb() {
        console.log("Deleted Cancelled");
      },

      {
        width: "320px",
        borderRadius: "8px",
        titleColor: "#f97316",
        okButtonBackground: "#f97316",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      // Delete product
      await deleteDoc(doc(db, "products", id));

      // Delete image
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);

      toast.success("Product deleted succesfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.table}>
        <h2>All Products</h2>

        <div className={styles.search}>
          <p>
            <b>{filteredProducts.length}</b> products found.
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {products === undefined ? (
          <p>No product found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S.N.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => {
                const { id, name, price, imageURL, category } = product;

                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>₹{price}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;{" "}
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {currentProducts.length !== 0 && (
          <Pagination
            currentPage={currentPage}
            productsPerPage={productsPerPage}
            setCurrentPage={setCurrentPage}
            totalProducts={filteredProducts.length}
          />
        )}
      </div>
    </>
  );
};

export default ViewProducts;
