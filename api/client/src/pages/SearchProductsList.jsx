import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
import Products from "../components/Products/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useHistory, useLocation } from "react-router-dom";
import Appbar from "../components/Appbar";
import Menubar from "../components/Menubar";
import { useSearchProductQuery } from "../Store/ApiCalls/api-calls";
import useQuery from "../hooks/use-query";
import { mobile } from "../responsive";
import LoadingSkeleton from "../components/Skeleton";

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

function SearchProductsList() {
  const history = useHistory();
  const query = useQuery();
  const queryStr = query.get("q");
  const queryPage = +query.get("page");
  const [currentPage, setCurrentPage] = useState(queryPage);
  const [searchDetails, setSearchDetails] = useState({
    products: [],
    numOfProducts: 0,
    searchTxt: "",
  });
  const { data, isLoading, error, isError } = useSearchProductQuery(
    { queryStr: queryStr.trim().toLowerCase(), page: queryPage },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const skeletonNumArr = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    setCurrentPage(queryPage);
    window.scrollTo(0, 0);
  }, [queryStr]);

  useEffect(() => {
    if (data) {
      setSearchDetails({
        products: data.products,
        numOfProducts: data.numOfProducts,
      });
      window.scrollTo(0, 0);
    }
  }, [data]);

  return (
    <Container>
      <Appbar />
      <Menubar />
      <Title>{queryStr.toUpperCase()}</Title>
      {isLoading || data?.products.length === 0 ? null : (
        <P>{` Showing ${data?.numOfProducts ? queryPage * 8 - 8 + 1 : 0}-${
          queryPage * 8 > data?.numOfProducts
            ? data?.numOfProducts
            : queryPage * 8 || 0
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
      {data?.products.length === 0 ? (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "10%" }}
        >
          <h1>Can't find anything. Search for something else.</h1>
        </div>
      ) : (
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
                history.push(`/search?q=${queryStr}&page=${page}`);
              }}
              page={currentPage}
              count={Math.ceil(searchDetails?.numOfProducts / 8)}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div>
      )}
      <Newsletter />
      <Footer />
    </Container>
  );
}

export default SearchProductsList;
