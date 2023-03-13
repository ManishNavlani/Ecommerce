import{s as t}from"./styled-components.browser.esm.4c801d38.js";import{R as v,N as w,F as j}from"./Footer.d90ef9f8.js";import{m as r}from"./responsive.ef511f16.js";import{u as f,x,l as n,k as e,G as C,r as $,ae as S,ah as u,L as k}from"./vendor.77d9ddd1.js";import{i as P,d as R}from"./cart-actions.b198bc31.js";import{C as D}from"./Stepper.99161eb3.js";import{A as I,R as T}from"./Remove.1ec5f4a9.js";import"./user-actions.b1b17465.js";import"./index.ddc31750.js";const z=t.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`,A=t.h1`
  font-weight: 200;
`,c=t.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: ${i=>i.type==="total"&&"500"};
  font-size: ${i=>i.type==="total"&&"24px"};
`,d=t.span``,l=t.span``,B=t.button`
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border: none;
  padding: 10px;
  width: 100%;
`;function F({total:i}){const{isLoggedIn:s}=f(p=>p.user),a=x();return n(z,{children:[e(A,{children:"ORDER SUMMARY"}),n(c,{children:[e(d,{children:"SubTotal"}),n(l,{children:["Rs. ",i]})]}),n(c,{children:[e(d,{children:"Estimated Shipping"}),e(l,{children:"Rs. 70"})]}),n(c,{children:[e(d,{children:" - Shipping Discount"}),e(l,{children:"Rs. 70"})]}),n(c,{type:"total",children:[e(d,{children:"Total"}),n(l,{children:["Rs. ",i]})]}),e(B,{onClick:()=>{s?a.push("/checkout"):a.push("/login")},children:"Check Out"})]})}const N=t.div`
  position: relative;
  top: 120px;
`,y=t.div`
  padding: 20px;
  ${r({padding:"10px"})}
`,Y=t.h1`
  font-weight: 300;
  text-align: center;
`,E=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  ${r({padding:"20px 0"})}
`,g=t.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${i=>i.type==="filled"&&"none"};
  color: #${i=>i.type==="filled"&&"fff"};
  background-color: ${i=>i.type==="filled"?"#000":"transparent"};
`,L=t.div`
  ${r({display:"none"})}
`;t.span`
  cursor: pointer;
  margin: 0 10px;
  &:hover {
    text-decoration: underline;
  }
`;const O=t.div`
  display: flex;
  justify-content: space-between;
  ${r({flexDirection:"column"})}
`,Q=t.div`
  flex: 3;
`,_=t.hr`
  background-color: #eee;
  border: none;
  height: 2px;
`,q=t.div`
  display: flex;
  justify-content: space-between;
`,H=t.div`
  flex: 2;
  display: flex;
  ${r({flexDirection:"column"})}
`,M=t.img`
  width: 200px;
`,G=t.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${r({padding:"20px 0"})};
`,U=t.span``,W=t.span``,J=t.span``,K=t.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${r({justifyContent:"start"})}
`,V=t.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 60%;
  justify-content: space-between;
  ${r({flexDirection:"column",width:"50%"})}
`,X=t.div`
  height: 30px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  ${r({margin:"20px 0",width:"100%"})}
`,Z=t.div`
  font-size: 30px;
  font-weight: 200;
  ${r({marginBottom:"20px"})}
`;function le(){const i=x(),{products:s,cartQuantity:a,total:p}=f(o=>o.cart),m=C();$.exports.useEffect(()=>{window.scrollTo(0,0)},[]);let h;return s.length===0&&(h=n(y,{style:{padding:"50px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"},children:[e("h1",{children:"Your Cart is empty.Please Add Products to your Cart."}),e(k,{to:"/products",style:{color:"black",textDecoration:"none"},children:e(u,{style:{width:"150px",margin:"30px"},variant:"contained",color:"secondary",children:"Shop Now"})})]})),s.length>0&&(h=e(S,{children:n(y,{children:[e(D,{step:0}),e(Y,{children:"Your Cart"}),n(E,{children:[e(g,{onClick:()=>i.push("/products"),children:"Continue Shopping"}),e(L,{children:e(g,{type:"filled",onClick:()=>i.push("/userorders"),children:"Your Orders"})})]}),n(O,{children:[n(Q,{children:[s.map((o,b)=>n(q,{children:[n(H,{children:[e(M,{src:o.productImage}),n(G,{children:[n(U,{children:[e("b",{children:"Product:"})," ",o.title]}),n(W,{children:[e("b",{children:"ID:"})," ",o._id]}),n(J,{children:[e("b",{children:"Size:"})," ",o.size]})]})]}),n(K,{children:[n(V,{children:[e(u,{variant:"outlined",onClick:()=>m(P({id:o._id})),color:"secondary",size:"small",children:e(I,{})}),e(X,{children:o.quantity}),e(u,{variant:"outlined",onClick:()=>m(R({id:o._id})),color:"secondary",size:"small",children:e(T,{})})]}),n(Z,{children:["Rs. ",o.price*o.quantity]})]})]},b)),e(_,{})]}),e(F,{total:p})]})]})})),n(N,{children:[e(v,{}),e(w,{}),h,e(j,{})]})}export{le as default};
