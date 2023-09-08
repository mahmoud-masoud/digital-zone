import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { newProductFormDataActions } from '../../../store/newProductFormData';
import { useEffect } from 'react';

function Basic() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const images = acceptedFiles.map((file) => URL.createObjectURL(file));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(newProductFormDataActions.addImages(images));
  }, [acceptedFiles]);

  return (
    <section className='container'>
      <div
        {...getRootProps({ className: 'dropzone' })}
        className='border-2 border-dotted border-gray-400 p-4 rounded-md h-20'
      >
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </div>
    </section>
  );
}

export default Basic;
