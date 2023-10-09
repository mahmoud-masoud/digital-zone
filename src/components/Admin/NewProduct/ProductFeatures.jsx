import { useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';

const ProductFeatures = ({ setValue }) => {
  const [featureInput, setFeatureInput] = useState('');
  const [features, setFeatures] = useState([]);

  const addFeature = () => {
    if (featureInput.trim() !== '') {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const handleFeatureRemove = (featureToRemove) => {
    const updatedFeatures = features.filter(
      (feature) => feature !== featureToRemove
    );
    setFeatures(updatedFeatures);
  };

  useEffect(() => {
    setValue('features', features);
  }, [features]);
  return (
    <div className=''>
      <label htmlFor='feature' className='text-xl mb-2 block'>
        Features
      </label>
      <div className='flex gap-2 border border-black rounded-lg p-2 mb-4'>
        <input
          type='text'
          id='feature'
          placeholder='Enter a feature'
          value={featureInput}
          className='w-full outline-none'
          onChange={(e) => setFeatureInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addFeature();
            }
          }}
        />
        <button
          type='button'
          className='bg-gray-500 font-medium text-white px-6 py-2 rounded-md'
          onClick={addFeature}
        >
          Add
        </button>
      </div>

      <ul className='flex flex-col gap-2 bg-gray-100 p-4'>
        {features.map((feature) => (
          <li key={feature}>
            <div className='bg-white flex items-center gap-2 p-2 rounded-lg text-lg'>
              <button
                type='button'
                onClick={() => handleFeatureRemove(feature)}
              >
                <TiDelete className='text-3xl' />
              </button>
              <p>{feature}</p>
            </div>
          </li>
        ))}
      </ul>
      {/* <button onClick={saveFeaturesToFirestore}>Save Features</button> */}
    </div>
  );
};

export default ProductFeatures;
