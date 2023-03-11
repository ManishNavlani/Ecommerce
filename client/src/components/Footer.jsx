import styled from "styled-components";
import {
  Instagram,
  Twitter,
  LocationOn,
  Phone,
  Email,
  LinkedIn,
} from "@mui/icons-material";

import { mobile } from "../responsive";
import { Link, useHistory } from "react-router-dom";
const Container = styled.div`
  display: flex;
  background-color: rgb(0, 0, 0);
  color: #fff;
  position: relative;
  top: 120px;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Logo = styled.h1``;
const Description = styled.p`
  margin: 20px 0;
`;
const SocialContainer = styled.div`
  display: flex;
  align-items: center;
`;
const SocialIcon = styled.button`
  border: none;
  width: 40px;
  height: 40px;
  margin-right: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  color: white;
  background-color: #${(props) => props.color};
  cursor: pointer;
`;
///////////
const Center = styled.div`
  flex: 1;
  padding: 20px;
  /* ${mobile({ display: "none" })} */
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

///////////
const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

function Footer() {
  const history = useHistory();
  return (
    <Container>
      <Left>
        <Logo>Manish</Logo>
        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
          eligendi? Velit blanditiis consectetur voluptatibus reprehenderit,
          rerum id! Unde eum quisquam obcaecati totam cupiditate aperiam? Fugiat
          vero ipsum iste vitae illum.
        </Description>
        <SocialContainer>
          <a target="_blank" href="https://www.instagram.com/manish_navlani_7/">
            <SocialIcon
              color="E4405F"
              onClick={() => {
                ``;
              }}
            >
              <Instagram />
            </SocialIcon>
          </a>
          <a target="_blank" href="https://twitter.com/ManishNavlani5">
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/manish-navlani-362b27219/"
          >
            <SocialIcon color="1b93e0">
              <LinkedIn />
            </SocialIcon>
          </a>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/cart" style={{ textDecoration: "none", color: "white" }}>
              Cart
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/products/men?page=1"
              style={{ textDecoration: "none", color: "white" }}
            >
              Man Fashion
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/products/women?page=1"
              style={{ textDecoration: "none", color: "white" }}
            >
              Woman Fashion
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/products/boys?page=1"
              style={{ textDecoration: "none", color: "white" }}
            >
              Boy Fashion
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/products/girls?page=1"
              style={{ textDecoration: "none", color: "white" }}
            >
              Girl Fashion
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/products/men-footwear?page=1"
              style={{ textDecoration: "none", color: "white" }}
            >
              Man Footwear
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/products/women-footwear?page=1"
              style={{ textDecoration: "none", color: "white" }}
            >
              Woman Footwear
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/userorders"
              style={{ textDecoration: "none", color: "white" }}
            >
              My Orders
            </Link>
          </ListItem>
          <ListItem>
            <a
              href="https://e-commerce-e40c8.web.app/"
              target="_blank"
              style={{ textDecoration: "none", color: "white" }}
            >
              Admin
            </a>
          </ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <LocationOn style={{ marginRight: "10px" }} /> 622 Dixie Path , South
          Winchester 98336
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +91 9925299287
        </ContactItem>
        <ContactItem>
          <Email style={{ marginRight: "10px" }} />
          navlanimanish77@outlook.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        <p>&#9400; Design and Developed By Manish Navlani (2022)</p>
      </Right>
    </Container>
  );
}

export default Footer;
