import React, { useEffect } from "react";
import Appbar from "../components/Appbar";
import Menubar from "../components/Menubar";
import Categories from "../components/Categories/Categories";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import styled from "styled-components";
import { mobile } from "../responsive";
import Carousel, { CarouselItem } from "../components/Slider/Carousel";

const Container = styled.div`
  position: relative;
  top: 120px;
  ${mobile({ top: "0" })}
`;

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container>
      <Appbar />
      <Menubar />
      <Carousel>
        <CarouselItem link="/products/men?page=1">
          https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/8/258aa8d5-ab1f-4d1a-b895-92ba7a06c0fc1646738420020-Wrogn_Desk_Banner.jpg
        </CarouselItem>
        <CarouselItem link="/products/women?page=1">
          https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/8/9ce82891-515e-4781-a427-a95fef24902e1646751364756-Kurtas---Sets_Desk.jpg
        </CarouselItem>
        <CarouselItem link="/products/girls?page=1">
          https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/3/8/4eb7d87c-e7c8-4cd9-b72e-75f0cdabd3eb1646738420041-Dressberry_Desk.jpg
        </CarouselItem>
        <CarouselItem link="/products/boys?page=1">
          https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/2/28/4534dba9-51db-45dd-acae-07033fc3b24d1646060784295-SS22-DesktopBanners-Unisex.jpg
        </CarouselItem>
        <CarouselItem link="/products/men-footwear?page=1">
          https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/11/16/11cc5325-37c6-4490-9adb-6f09ccb2a0781637049244895-luxe-banner.jpg
        </CarouselItem>
      </Carousel>
      <Categories />
      <Newsletter />
      <Footer />
    </Container>
  );
}

export default Home;
