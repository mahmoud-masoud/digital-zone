import Wrapper from "../../../UI/Wrapper";
import ProductCategory from "../ProductFormComponents/ProductCategory";
import ProductHighlights from "../ProductFormComponents/ProductHighlights";
import ProductImages from "../ProductFormComponents/imges-grid/ProductImages";
import Tags from "../ProductFormComponents/Tags";
import { useFieldArray, useForm } from "react-hook-form";
import ProductTitle from "../ProductFormComponents/ProductTitle";
import ProductPrice from "../ProductFormComponents/ProductPrice";
import { v4 } from "uuid";
import { db } from "../../../Utils/firebaseConfig";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { uploadImages } from "../../../Utils/firebase-functions";
import { productFormSchema } from "../../../Utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Description from "../ProductFormComponents/Description";
import LightSpinner from "../../../UI/LightSpinner";
// import Toast from "../../../UI/Toast";
// import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NewProductForm = () => {
  // const [created, setCreated] = useState(false);
  const navigate = useNavigate();

  const defaultValues = {
    title: "",
    highlights: [{ highlightName: "", highlightValue: "" }],
    description: "",
    tags: [],
  };

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "highlights",
    control,
  });

  const onSubmit = async (data) => {
    const productId = v4();
    try {
      const imagesUrls = await uploadImages(
        data.images,
        data.category,
        productId,
      );

      const productData = {
        ...data,
        images: imagesUrls,
        id: productId,
        timestamp: serverTimestamp(),
      };

      const productsCollectionRef = collection(
        db,
        "categories",
        data.category,
        "products",
      );
      const productDocRef = doc(productsCollectionRef, productId);

      await setDoc(productDocRef, productData);
      // setCreated(true);
      navigate("/admin/products/" + productId);
    } catch (error) {
      // console.log("error happend");
    }
  };

  return (
    <>
      {/* <AnimatePresence>
        {created && (
          <Toast setToastVisibility={setCreated}>
            Product created successfully
          </Toast>
        )}
      </AnimatePresence> */}

      <Wrapper className={"w-full max-w-[900px] py-10"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-8 rounded-lg border bg-white p-4 shadow-lg md:p-6">
            <ProductTitle control={control} errors={errors} />

            <ProductHighlights
              control={control}
              errors={errors}
              fields={fields}
              append={append}
              remove={remove}
            />

            <Description control={control} errors={errors} />

            <ProductImages setValue={setValue} errors={errors} />

            <ProductPrice
              register={register("price", { valueAsNumber: true })}
              errors={errors}
            />

            <ProductCategory register={register("category")} errors={errors} />

            <Tags setValue={setValue} control={control} errors={errors} />
          </div>

          <div className="mt-6 flex justify-end p-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
              ${
                isSubmitting
                  ? "opacity-50"
                  : "hover:bg-after active:shadow-inner active:shadow-dark"
              }
            h-10 rounded-lg 
            bg-primary px-7 py-1.5 font-medium
            text-white shadow shadow-dark transition
              `}
            >
              <span className="flex gap-4 font-semibold">
                {isSubmitting ? <LightSpinner /> : "Save"}
              </span>
            </button>
          </div>
        </form>
      </Wrapper>
    </>
  );
};
export default NewProductForm;
