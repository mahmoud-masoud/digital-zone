import { useEffect, useState } from "react";
import Wrapper from "../../../UI/Wrapper";
import ProductCategory from "./ProductCategory";
import ProductTitle from "./ProductTitle";

import ProductPrice from "./ProductPrice";

import ProductImages from "./imges-grid/ProductImages";

import Tags from "./Tags";
import {
  collection,
  collectionGroup,
  doc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { uploadImages } from "../../../Utils/firebase-functions";
import { db } from "../../../Utils/firebase";
import { useForm, useFieldArray } from "react-hook-form";

import MainSpinner from "../../../UI/MainSpinner";
import useProduct from "../../../Hooks/useProduct";

import DeleteProductBtn from "./DeleteProductBtn";
import DeleteProductModal from "./DeleteProductModal";
import useNoScroll from "../../../Hooks/useNoScroll";
import { formSchema } from "../../../Utils/zod";
import Description from "./Description";
import { zodResolver } from "@hookform/resolvers/zod";
import ProductHighlights from "./ProductHighlights";
import { AnimatePresence } from "framer-motion";

const ProductForm = () => {
  const { product, isLoading, hasError } = useProduct();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useNoScroll(isModalOpen);
  const {
    control,
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "highlights",
    control,
  });

  useEffect(() => {
    reset(product);
  }, [product]);

  const onSubmit = async (data) => {
    console.log(data);
    const q = query(
      collectionGroup(db, "products"),
      where("id", "==", product.id),
    );

    const imagesUrls = await uploadImages(
      data.images,
      data.category,
      product.id,
    );

    await runTransaction(db, async (transaction) => {
      const productSnapshot = await getDocs(q);

      if (productSnapshot.empty) {
        throw new Error("Product not found");
      }

      const productDoc = productSnapshot.docs[0];

      transaction.update(productDoc.ref, { ...data, images: imagesUrls });
    })
      .then(() => {
        console.log("Product updated successfully");
      })
      .catch((error) => {
        console.error("Transaction failed: ", error);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isLoading && <MainSpinner />}

      {product && (
        <div className="pb-14 pt-10 md:px-4">
          <Wrapper className={"w-full max-w-[900px]"}>
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

                <ProductCategory
                  register={register("category")}
                  errors={errors}
                />

                <Tags
                  setValue={setValue}
                  serverTags={product.tags}
                  errors={errors}
                />
              </div>

              <div className=" ">
                <div className="mt-12 flex justify-end gap-8">
                  <DeleteProductBtn
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-primary px-6 py-1 text-white 
                  transition hover:bg-after"
                  >
                    <span className="flex gap-4 font-semibold">Save</span>
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
        </div>
      )}
    </>
  );
};
export default ProductForm;
