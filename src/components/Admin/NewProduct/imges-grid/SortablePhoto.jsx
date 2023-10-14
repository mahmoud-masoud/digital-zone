import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const SortablePhoto = (props) => {
  const sortable = useSortable({ id: props.url });
  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef,
    transform,
    transition,
  } = sortable;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className='bg-white  border rounded-2xl p-2 flex justify-center items-center
      aspect-square '
      ref={setNodeRef}
      {...props}
      {...attributes}
      {...listeners}
      style={style}
    >
      <img
        src={props.url}
        alt=''
        className='max-w-full max-h-full object-contain rounded-lg'
      />
    </div>
  );
};
