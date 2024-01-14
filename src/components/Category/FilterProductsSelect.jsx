import { useState } from "react";

const FilterProductsSelect = ({ getFilterValue }) => {
  const [filterValue, setFilterValue] = useState("best-match");
  const onSelectChangeHandler = (e) => {
    setFilterValue(e.target.value);
    getFilterValue(e.target.value);
  };
  return (
    <div className="mb-4 flex justify-end">
      <select
        name="sort"
        id="sort"
        value={filterValue}
        onChange={onSelectChangeHandler}
      >
        <option value="best-seller">Best seller</option>
        <option value="best-match">Best Match</option>
        <option value="price-low">Price Low</option>
        <option value="price-high">Price High</option>
      </select>
    </div>
  );
};
export default FilterProductsSelect;
