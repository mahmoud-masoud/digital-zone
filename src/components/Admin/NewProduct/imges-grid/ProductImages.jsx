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

const ProductImages = ({ setValue }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [items, setItems] = useState(acceptedFiles);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  useEffect(() => {
    // Create URLs for the acceptedFiles
    const urls = acceptedFiles.map((file) => URL.createObjectURL(file));

    // Update both allAcceptedFiles and items in one go

    setItems((prev) => [...prev, ...urls]);
  }, [acceptedFiles]);

  useEffect(() => {
    setValue('images', items);
  }, [items]);

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
              <SortablePhoto
                key={Math.random() * Date.now()}
                url={url}
                index={index}
              />
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
