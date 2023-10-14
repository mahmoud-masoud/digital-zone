import { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { useDropzone } from 'react-dropzone';
import { SortablePhoto } from './SortablePhoto';

const ProductImages = ({ setValue, serverImages }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [items, setItems] = useState(serverImages ? serverImages : []);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  useEffect(() => {
    // Create URLs for the acceptedFiles
    const urls = acceptedFiles.map((file) => URL.createObjectURL(file));

    setItems((prev) => [...prev, ...urls]);
  }, [acceptedFiles]);

  useEffect(() => {
    setValue('images', items);
  }, [items]);

  const removeImg = (url) => {
    const updatedItems = items.filter((item) => item !== url);
    setItems(() => updatedItems);
  };
  return (
    <>
      <section className='container'>
        <div
          {...getRootProps({ className: 'dropzone' })}
          className='border-2 border-dotted border-gray-400 h-40 flex
          justify-center items-center rounded-md'
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
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {items.map((url, index) => (
              <div
                key={Math.random() * Date.now()}
                className='bg-gray-300 rounded-2xl first:col-span-2 first:row-span-2'
              >
                <div className='relative group'>
                  <SortablePhoto url={url} index={index} />
                  <button
                    className='absolute top-0 right-0 p-2 font-medium text-2xl hidden
                     group-hover:block transition'
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
    </>
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
