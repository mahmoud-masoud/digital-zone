import { useEffect, useState } from "react";
import Wrapper from "../../../UI/Wrapper";
import ProductCategory from "./ProductCategory";
import ProductTitle from "./ProductTitle";
import Description from "./Description";
import ProductPrice from "./ProductPrice";
import ProductImages from "./imges-grid/ProductImages";
import Tags from "./Tags";
import {
  collection,
  deleteDoc,
  doc,
  runTransaction,
  setDoc,
} from "firebase/firestore";
import { uploadImages } from "../../../Utils/firebase-functions";
import { db } from "../../../Utils/firebase";
import { useForm, useFieldArray } from "react-hook-form";
import { productFormSchema } from "../../../Utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";

import useNoScroll from "../../../Hooks/useNoScroll";
import useProduct from "../../../Hooks/firebase/useProduct";
import DeleteProductBtn from "./DeleteProductBtn";
import DeleteProductModal from "./DeleteProductModal";
import ProductHighlights from "./ProductHighlights";
import { AnimatePresence } from "framer-motion";
import PageSpinner from "../../../UI/PageSpinner";
import Toast from "../../../UI/Toast";
import LightSpinner from "../../../UI/LightSpinner";

const ProductForm = () => {
  const { product, isLoading } = useProduct();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updated, setUpdated] = useState(false);

  useNoScroll(isModalOpen);

  const {
    control,
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "highlights",
    control,
  });

  useEffect(() => {
    reset(product);
  }, [product, reset]);

  const onSubmit = async (data) => {
    try {
      const productRef = doc(
        collection(db, "categories", product.category, "products"),
        product.id,
      );

      const imagesUrls = await uploadImages(
        data.images,
        data.category,
        product.id,
      );

      if (data.category !== product.category) {
        const updatedProductRef = doc(
          collection(db, "categories", data.category, "products"),
          product.id,
        );

        await setDoc(updatedProductRef, {
          ...data,
          id: product.id,
          timestamp: product.timestamp,
        });

        await deleteDoc(productRef);
        setUpdated(true);
      } else {
        await runTransaction(db, async (transaction) => {
          transaction.update(productRef, { ...data, images: imagesUrls });
        });
        setUpdated(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return <PageSpinner />;

  return (
    <>
      <AnimatePresence>
        {updated && (
          <Toast setToastVisibility={setUpdated}>
            Product updated successfully
          </Toast>
        )}
      </AnimatePresence>

      <Wrapper className={"w-full max-w-[900px] py-10 md:px-4"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className="flex flex-col gap-8 bg-white p-4 shadow-lg
               md:rounded-lg md:border md:p-6"
          >
            <ProductTitle control={control} errors={errors} />
            <ProductHighlights
              control={control}
              errors={errors}
              fields={fields}
              append={append}
              remove={remove}
            />

            <Description
              control={control}
              errors={errors}
              description={product.description}
            />

            <ProductImages
              setValue={setValue}
              serverImages={product.images}
              errors={errors}
            />

            <ProductPrice
              register={register("price", { valueAsNumber: true })}
              errors={errors}
            />

            <ProductCategory register={register("category")} errors={errors} />

            <Tags
              setValue={setValue}
              serverTags={product.tags}
              errors={errors}
            />
          </div>

          <div className="max-sm:pr-4">
            <div className="mt-12 flex justify-end gap-8">
              <DeleteProductBtn
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
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
          </div>
          <AnimatePresence>
            {isModalOpen && (
              <DeleteProductModal
                closeModal={closeModal}
                productId={product.id}
              >
                <div className="h-72 w-72 bg-orange-400"></div>
              </DeleteProductModal>
            )}
          </AnimatePresence>
        </form>
      </Wrapper>
    </>
  );
};
export default ProductForm;
