const UserInfo = ({ shippingInfo }) => {
  return (
    <div className="flex h-fit rounded-lg border border-gray-200 bg-white p-2 shadow-sm md:p-4 lg:w-1/4">
      <div>
        <div className="mb-4">
          <h3 className="mb-1 font-medium">User</h3>
          <p className="text-sm font-medium text-after">
            {shippingInfo.firstName}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="mb-1 font-medium">Contact information</h3>
          <p className="text-sm font-medium text-gray-500">
            {shippingInfo.phoneNumber}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="mb-1 font-medium">Shipping address</h3>
          <p className="text-sm font-medium text-gray-500">
            {shippingInfo.address}
          </p>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
