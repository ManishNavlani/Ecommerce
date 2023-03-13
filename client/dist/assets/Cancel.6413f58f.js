import{u as n,x as c,r as o,k as e}from"./vendor.77d9ddd1.js";import{s as i}from"./styled-components.browser.esm.4c801d38.js";import{u as d}from"./index.ddc31750.js";const u=i.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  margin: auto;
  text-align: center;
  height: 80vh;
`;function y(){const t=n(a=>a.cart),[s]=d(),r=c();return o.exports.useEffect(()=>{(async()=>{await s(t).unwrap()})(),setTimeout(()=>{r.replace("/cart")},4e3)},[]),e(u,{children:e("div",{children:e("h1",{children:"Payment Transaction has not been processed successfully.Please Try Again.Redirecting to your cart..."})})})}export{y as default};
