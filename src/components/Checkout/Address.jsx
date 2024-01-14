import { MapPinIcon } from "@heroicons/react/24/solid";

const Address = ({ userShippingInfo, setFormVisibility }) => {
  return (
    <div className="">
      <div className="flex items-center gap-4">
        <div>
          <MapPinIcon className="h-7 w-7" />
        </div>
        <div>
          <p className="mb-2">{userShippingInfo?.firstName}</p>
          <p className="mb-2">{userShippingInfo?.address}</p>
          <span>{userShippingInfo?.phoneNumber}</span>
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
