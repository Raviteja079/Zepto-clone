import { collection, getDocs } from "firebase/firestore";
import { firestore} from "./firebase";



export const getCategories = async (user,setAllCategoriesList) => {
  try {
    if (user && user.email) {
      const allCategories = [];
      const collectionRef = collection(firestore, "category");
      const allCategoryDocs = await getDocs(collectionRef);
      allCategoryDocs.forEach(async (categoryDoc) =>
        allCategories.push({
          id: categoryDoc.id,
          name: categoryDoc.data().name,
        })
      );
      setAllCategoriesList(allCategories);
    }
  } catch (err) {
    console.log(err.message);
  }
};


export const getSubCategories = async (categoryId) => {
  try {
    const collectionRef = collection(
      firestore,
      "category",
      categoryId,
      "subcategories"
    );
    const result = await getDocs(collectionRef);
    const subCategories = result.docs.map((subCategory) => [
      subCategory.id,
      subCategory.data(),
    ]);
    return subCategories;
  } catch (err) {
    console.log(err.message);
  }
};