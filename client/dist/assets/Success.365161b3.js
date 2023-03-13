import{x as p,G as m,u as r,r as f,k as y}from"./vendor.77d9ddd1.js";import{s as l}from"./styled-components.browser.esm.4c801d38.js";import{o as h}from"./cart-actions.b198bc31.js";import{n as w,u as x}from"./index.ddc31750.js";const O=l.div`
  width: 100vw;
  height: 100vh;
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;function g(){const s=p(),o=m(),e=r(t=>t.cart),{userAddress:a,currentUser:n,paymentIntent:c}=r(t=>t.user),[d]=w(),[u]=x(),i={userOrderId:n._id,products:e.products,amount:e.total,address:a,paymentDone:!0,paymentIntent:c};return f.exports.useEffect(()=>{(async()=>{try{const t=await d(i).unwrap(),b=await u(e).unwrap();o(h()),setTimeout(()=>{s.replace("/userorders")},2e3)}catch{}})()},[]),y(O,{children:"Redirecting to Your Orders..."})}export{g as default};
