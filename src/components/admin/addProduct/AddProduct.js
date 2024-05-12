import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./AddProducts.module.scss";
import Card from "../../card/Card";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../firebase/config";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../loader/Loader";

import { selectProduct } from "../../../redux/slice/productSlice";



const categories = [
  {
    id: 1,
    name: "Laptop",
  },
  {
    id: 2,
    name: "Electronics",
  },
  {
    id: 3,
    name: "Fashion",
  },
  {
    id: 4,
    name: "Phone",
  },
  {
    id: 5,
    name: "Home Appliances",
  },
];

const initialState = {
  name: "",
  imageURL: "",
  price: "",
  category: "",
  brand: "",
  desc: "",
};

const AddProduct = () => {

  const {id} = useParams()
  const products  = useSelector(selectProduct);
  const productEdit = products.find((item) => item.id === id);

  const detectForm = (id, f1, f2) => {
    if(id === "ADD"){
      return f1;
    }
    return f2;
  }


  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit)
    return newState
  });

  

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({
            ...product,
            imageURL: downloadURL,
          });
          toast.success("Image uploaded succesfully");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });

      setIsLoading(false);

      setProduct({ ...initialState });
      setUploadProgress(0);

      navigate("/admin/all-products");

      toast.success("Product uploaded succesfully.");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if(product.imageURL !== productEdit.imageURL){
      // Delete image
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate()
      });

      setIsLoading(false);

      setProduct({ ...initialState });

      toast.success("Product edited succesfully.")
      navigate("/admin/all-products");
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>{detectForm(id, "ADD New Product", "Edit Product")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            <label>Product Name:</label>
            <input
              type="text"
              placeholder="Product name"
              name="name"
              required
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product Image:</label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {/* Uploading {uploadProgress}% */}
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}%`
                      : `Upload complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                placeholder="Product image"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />
              {product.imageURL === "" ? null : (
                <input
                  type="text"
                  required
                  placeholder="Image URL"
                  name="imageURL"
                  value={product.imageURL}
                  disabled
                />
              )}
            </Card>

            <label>Product Price:</label>
            <input
              type="number"
              placeholder="Product price"
              name="price"
              required
              value={product.price}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product Category:</label>
            <select
              name="category"
              value={product.category}
              onChange={(e) => handleInputChange(e)}
              required
            >
              <option value="" disabled>
                -- choose product category --
              </option>

              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </select>

            <label>Product Company/Brand:</label>
            <input
              type="text"
              placeholder="Product brand"
              name="brand"
              required
              value={product.brand}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product Description</label>
            <textarea
              name="desc"
              required
              value={product.desc}
              onChange={(e) => handleInputChange(e)}
            ></textarea>

            <button type="submit" className="--btn --btn-danger">
              {detectForm(id, "Save Product", "Edit Product")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
