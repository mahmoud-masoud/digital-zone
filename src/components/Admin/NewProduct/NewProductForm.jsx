import Wrapper from "../../../UI/Wrapper";
import ProductCategory from "../ProductFormComponents/ProductCategory";
import ProductHighlights from "../ProductFormComponents/ProductHighlights";
import ProductImages from "../ProductFormComponents/imges-grid/ProductImages";
import Tags from "../ProductFormComponents/Tags";
import { useFieldArray, useForm } from "react-hook-form";
import ProductTitle from "../ProductFormComponents/ProductTitle";
import ProductPrice from "../ProductFormComponents/ProductPrice";
import { v4 } from "uuid";
import { db } from "../../../Utils/firebase";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { uploadImages } from "../../../Utils/firebase-functions";
import { formSchema } from "../../../Utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Description from "../ProductFormComponents/Description";
import LoadingSpinner from "../../../UI/LoadingSpinner";

const NewProductForm = () => {
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
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "highlights",
    control,
  });

  const onSubmit = async (data) => {
    console.log(data);
    const productId = v4();
    try {
      const imagesUrls = await uploadImages(
        data.images,
        data.category,
        productId,
      );

      console.log("upload images successfully");

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
      console.log("done added product");
    } catch (error) {
      console.log("error happend");
    }
  };

  return (
    <div className="p-6">
      <Wrapper className={"w-full max-w-[900px]"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-8 rounded-lg border bg-white p-6 shadow-lg">
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

          <div className=" my-10 flex justify-end p-2">
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
                {isSubmitting ? <LoadingSpinner /> : "Save"}
              </span>
            </button>
          </div>
        </form>
      </Wrapper>
    </div>
  );
};
export default NewProductForm;
