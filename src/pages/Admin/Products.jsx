import { Link } from "react-router-dom";
import Wrapper from "../../UI/Wrapper";
import Product from "../../components/Admin/Products/Product";
import ProductsList from "../../components/Admin/Products/ProductsList";
import ProductsTable from "../../components/Admin/Products/ProductsTable";

const Products = () => {
  return (
    <section className="px-4 py-6">
      <Wrapper>
        <div className="flex justify-between">
          <h1 className="text-xl font-bold text-fontColor">Products</h1>
          <Link to="new">
            <div
              className="rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium
          text-white transition
           hover:bg-gray-700"
            >
              <span>Add Product</span>
            </div>
          </Link>
        </div>
        {/* <ProductsList /> */}
        <ProductsTable />
      </Wrapper>
    </section>
  );
};
export default Products;
