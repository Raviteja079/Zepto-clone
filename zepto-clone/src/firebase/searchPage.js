import { collection, getDocs } from "firebase/firestore";
import {firestore } from "./firebase";

export const getSearchPageProducts = async (setSearchPageProducts) => {
  try {
    const allProducts = [];
    const collectionRef = collection(firestore, "category");
    const allCategoryDocs = await getDocs(collectionRef);
    allCategoryDocs.forEach(async (categoryDoc) => {
      const eachDocCollecitonRef = collection(
        firestore,
        "category",
        categoryDoc.id,
        "subcategories"
      );
      const allSubCategories = await getDocs(eachDocCollecitonRef);
      allSubCategories.forEach(async (subCategoryDoc) => {
        const eachSubCatProducts = collection(
          firestore,
          "category",
          categoryDoc.id,
          "subcategories",
          subCategoryDoc.id,
          "products"
        );
        const allSubCatProducts = await getDocs(eachSubCatProducts);
        allSubCatProducts.forEach((doc) => {
          allProducts.push(doc.data());
        });
      });
    });
    setSearchPageProducts(allProducts);
  } catch (err) {
    console.log(err.message);
  }
};
