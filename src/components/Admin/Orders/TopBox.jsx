import formateTimestampToDate from "../../../Utils/formateTimestampToDate";
const TopBox = ({ orderId, orderTimestamp }) => {
  const orderDate = formateTimestampToDate(orderTimestamp);
  return (
    <div className="mb-6">
      <h1 className="text-lg font-semibold"># - {orderId}</h1>
      <span className="text-sm">{orderDate}</span>
    </div>
  );
};
export default TopBox;
