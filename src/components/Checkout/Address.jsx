import { FaLocationDot } from "react-icons/fa6";

const Address = ({ userAddress, setFormVisibility }) => {
  return (
    <div className="">
      <div className="flex items-center gap-4">
        <div>
          <FaLocationDot className="text-xl" />
        </div>
        <div>
          <p className="mb-2">{userAddress?.firstName}</p>
          <p className="mb-2">{userAddress?.address}</p>
          <span>{userAddress?.phoneNumber}</span>
        </div>
      </div>

      <div
        className="flex justify-end pr-4 text-primary
       underline duration-150 hover:no-underline"
      >
        <button
          onClick={() => {
            setFormVisibility(true);
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};
export default Address;
