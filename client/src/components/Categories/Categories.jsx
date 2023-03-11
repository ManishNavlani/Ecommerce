import styled from "styled-components";
import { categoriesData } from "./CategoriesData";
import CategoryItem from "./CategoryItem";
import { mobile } from "../../responsive";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  position: relative;
  top: 120px;
  /* bottom: 100px; */
`;

function Categories() {
  return (
    <Container>
      {categoriesData.map((item, index) => (
        <CategoryItem item={item} key={index} />
      ))}
    </Container>
  );
}
export default Categories;
