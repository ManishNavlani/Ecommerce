import{s as n}from"./styled-components.browser.esm.4c801d38.js";import{u as f,L as g,P as h}from"./Skeleton.a2922d2d.js";import{N as P}from"./Newsletter.ed3f61b1.js";import{R as x,N as j,F as y}from"./Footer.d90ef9f8.js";import{d as w}from"./index.ddc31750.js";import{ab as b,x as v,r as a,l as C,k as s,ac as O,ad as k}from"./vendor.77d9ddd1.js";import{m as L}from"./responsive.ef511f16.js";import"./user-actions.b1b17465.js";import"./Star.7e8b1702.js";import"./cart-actions.b198bc31.js";const N=n.div`
  padding: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${L({padding:"  37px"})}
`,S=n.div`
  position: relative;
  top: 120px;
`,$=n.h1`
  margin: 20px;
`,A=n.p`
  margin: 20px;
`;function D(){const u=b(),p=v(),o=+f().get("page")||1,r=u.pathname.split("/")[2]||void 0,[d,i]=a.exports.useState(o),l=[1,2,3,4,5,6,7,8];a.exports.useEffect(()=>{i(o),window.scrollTo(0,0)},[r]);const{data:e,isLoading:c,error:F,isError:T}=w({category:r,currentPage:o},{refetchOnMountOrArgChange:!0});return C(S,{children:[s(x,{}),s(j,{}),s($,{children:r==null?void 0:r.toUpperCase()}),c?null:s(A,{children:` Showing ${(e==null?void 0:e.numOfProducts)?o*8-8+1:0}-${o*8>(e==null?void 0:e.numOfProducts)?e==null?void 0:e.numOfProducts:o*8} out of ${(e==null?void 0:e.numOfProducts)||0} Products`}),c?s(N,{children:l.map((m,t)=>s(g,{},t))}):s(h,{products:e==null?void 0:e.products}),s("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:s(O,{children:s(k,{size:"large",onChange:(m,t)=>{i(t),p.push(`/products/${r}?page=${t}`),window.scrollTo(0,0)},page:d,count:Math.ceil((e==null?void 0:e.numOfProducts)/8)||0,variant:"outlined",shape:"rounded"})})}),s(P,{}),s(y,{})]})}export{D as default};
