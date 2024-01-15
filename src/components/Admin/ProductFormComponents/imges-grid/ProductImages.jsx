import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useDropzone } from "react-dropzone";
import { SortablePhoto } from "./SortablePhoto";
import InputError from "../../../../UI/InputError";

const ProductImages = ({ setValue, serverImages, errors }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [items, setItems] = useState(serverImages ? serverImages : []);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  useEffect(() => {
    const urls = acceptedFiles.map((file) => URL.createObjectURL(file));

    setItems((prev) => [...prev, ...urls]);
  }, [acceptedFiles]);

  useEffect(() => {
    setValue("images", items);
  }, [items]);

  const removeImg = (url) => {
    const updatedItems = items.filter((item) => item !== url);
    setItems(() => updatedItems);
  };

  return (
    <div>
      <section className="container">
        <div
          {...getRootProps({ className: "dropzone" })}
          className="flex h-40 items-center justify-center rounded-md
          border-2 border-dotted border-gray-400"
        >
          <input {...getInputProps()} />
          <p>Drag and drop some files here, or click to select files</p>
        </div>
      </section>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {items.map((url, index) => (
              <div
                key={Math.random() * Date.now()}
                className="rounded-2xl bg-gray-300 first:col-span-2 first:row-span-2"
              >
                <div className="group relative">
                  <SortablePhoto url={url} index={index} />
                  <button
                    className="absolute right-0 top-0 hidden p-2 text-2xl font-medium
                     transition group-hover:block"
                    onClick={() => {
                      removeImg(url);
                    }}
                  >
                    x
                  </button>
                </div>
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      {errors && errors.images && (
        <InputError message={errors.images.message} />
      )}
    </div>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
};

export default ProductImages;
