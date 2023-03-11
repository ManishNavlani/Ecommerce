import styled from "styled-components";
import ProductItem from "./ProductItem";
import { mobile } from "../../responsive";

const Container = styled.div`
  padding: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${mobile({ padding: "  37px" })}
`;

function Products({ products }) {
  return (
    <Container>
      {products?.map((product) => (
        <ProductItem product={product} key={product._id} />
      ))}
    </Container>
  );
}

export default Products;
