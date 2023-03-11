import { Button } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import image from "../images/undraw_page_not_found_re_e9o6.svg";
import { mobile } from "../responsive";

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  flex-direction: column;
  width: 100vw;
`;
const Container = styled.div`
  position: relative;
`;

const Image404 = styled.img`
  width: 800px;
  height: 450px;
  margin-bottom: 30px;
  ${mobile({ width: "350px", height: "250px" })};
`;

function NotFoundPage() {
  const history = useHistory();
  return (
    <>
      <Container>
        <CenterDiv>
          <h1>Page Not Found</h1>
          <Image404 src={image} alt="404 Page Image" />
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              history.push("/");
            }}
          >
            Home
          </Button>
        </CenterDiv>
      </Container>
    </>
  );
}

export default NotFoundPage;
