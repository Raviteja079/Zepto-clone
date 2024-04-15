import React, { useEffect, useState } from "react";
import classes from "./ProductItem.module.css";
import { useFirebase } from "../../firebase/firebase";
import { Link, useParams } from "react-router-dom";

const ProductItem = (data) => {
//   const [products, setProducts] = useState([]);
//   const { getSubCategories } = useFirebase();
  const { id, subCatId } = useParams();

//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         const subCategories = await getSubCategories(id);
//         setProducts(subCategories.docs);
//       } catch (error) {
//         console.error("Error getting users:", error);
//         setProducts([]);
//       }
//     };
//     getProducts();
//   }, [getSubCategories, id]);

  return (
    <Link
      to={`/sub-category/${id}/${data.id}`}
      className={
        subCatId === data.id
          ? `${classes["sidebar-menu-option-active"]}`
          : `${classes["sidebar-menu-option"]}`
      }
    >
      <div className={classes["image-container"]}>
        <div className={classes["rounded-container"]}>
          <img
            src={data.data.image}
            className={classes["sub-category-image"]}
            alt={data.data.subCategory}
          />
        </div>
      </div>
      <p
        className={`${classes["sub-category-text"]} ${
          subCatId === data.id
            ? classes["active-text"]
            : classes["inactive-text"]
        }`}
      >
        {data.data.subCategory}
      </p>
    </Link>
  );
};

export default ProductItem;
