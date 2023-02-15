import styled from "styled-components";
import Products from "../components/Products/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useHistory, useLocation } from "react-router-dom";
import Appbar from "../components/Appbar";
import Menubar from "../components/Menubar";
import { useGetAllProductsQuery } from "../Store/ApiCalls/api-calls";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import useQuery from "../hooks/use-query";
import LoadingSkeleton from "../components/Skeleton";
import { mobile } from "../responsive";

const LoadingContainer = styled.div`
  padding: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${mobile({ padding: "  37px" })}
`;
const Container = styled.div`
  position: relative;
  top: 120px;
`;

const Title = styled.h1`
  margin: 20px;
`;

const P = styled.p`
  margin: 20px;
`;

function ProductList() {
  const location = useLocation();
  const history = useHistory();
  const query = useQuery();
  const queryPage = +query.get("page") || 1;
  const category = location.pathname.split("/")[2] || "";
  const [currentPage, setCurrentPage] = useState(queryPage);

  const skeletonNumArr = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    setCurrentPage(queryPage);
    window.scrollTo(0, 0);
  }, [category]);

  const { data, isLoading, error, isError } = useGetAllProductsQuery(
    { category: category, currentPage: queryPage },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <Container>
      <Appbar />
      <Menubar />
      <Title>{category?.toUpperCase()}</Title>
      {isLoading ? null : (
        <P>{` Showing ${data?.numOfProducts ? queryPage * 8 - 8 + 1 : 0}-${
          queryPage * 8 > data?.numOfProducts
            ? data?.numOfProducts
            : queryPage * 8
        } out of ${data?.numOfProducts || 0} Products`}</P>
      )}

      {isLoading ? (
        <LoadingContainer>
          {skeletonNumArr.map((skeleton, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </LoadingContainer>
      ) : (
        <Products products={data?.products} />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack>
          <Pagination
            size="large"
            onChange={(e, page) => {
              setCurrentPage(page);
              history.push(`/products/${category}?page=${page}`);
              window.scrollTo(0, 0);
            }}
            page={currentPage}
            count={Math.ceil(data?.numOfProducts / 8) || 0}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
      <Newsletter />
      <Footer />
    </Container>
  );
}

export default ProductList;
