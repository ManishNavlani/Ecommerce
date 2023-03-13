import{x as h,r as n,l as x,k as r,ac as y,ad as P}from"./vendor.77d9ddd1.js";import{s as i}from"./styled-components.browser.esm.4c801d38.js";import{u as j,L as S,P as w}from"./Skeleton.a2922d2d.js";import{N as v}from"./Newsletter.ed3f61b1.js";import{R as C,N as O,F as b}from"./Footer.d90ef9f8.js";import{q}from"./index.ddc31750.js";import{m as k}from"./responsive.ef511f16.js";import"./user-actions.b1b17465.js";import"./Star.7e8b1702.js";import"./cart-actions.b198bc31.js";const L=i.div`
  padding: 25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${k({padding:"  37px"})}
`,N=i.div`
  position: relative;
  top: 120px;
`,$=i.h1`
  margin: 20px;
`,T=i.p`
  margin: 20px;
`;function G(){const a=h(),u=j(),t=u.get("q"),s=+u.get("page"),[l,d]=n.exports.useState(s),[c,f]=n.exports.useState({products:[],numOfProducts:0,searchTxt:""}),{data:e,isLoading:p,error:A,isError:E}=q({queryStr:t.trim().toLowerCase(),page:s},{refetchOnMountOrArgChange:!0}),m=[1,2,3,4,5,6,7,8];return n.exports.useEffect(()=>{d(s),window.scrollTo(0,0)},[t]),n.exports.useEffect(()=>{e&&(f({products:e.products,numOfProducts:e.numOfProducts}),window.scrollTo(0,0))},[e]),x(N,{children:[r(C,{}),r(O,{}),r($,{children:t.toUpperCase()}),p||(e==null?void 0:e.products.length)===0?null:r(T,{children:` Showing ${(e==null?void 0:e.numOfProducts)?s*8-8+1:0}-${s*8>(e==null?void 0:e.numOfProducts)?e==null?void 0:e.numOfProducts:s*8||0} out of ${(e==null?void 0:e.numOfProducts)||0} Products`}),p?r(L,{children:m.map((g,o)=>r(S,{},o))}):r(w,{products:e==null?void 0:e.products}),(e==null?void 0:e.products.length)===0?r("div",{style:{display:"flex",justifyContent:"center",padding:"10%"},children:r("h1",{children:"Can't find anything. Search for something else."})}):r("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:r(y,{children:r(P,{size:"large",onChange:(g,o)=>{d(o),a.push(`/search?q=${t}&page=${o}`)},page:l,count:Math.ceil((c==null?void 0:c.numOfProducts)/8),variant:"outlined",shape:"rounded"})})}),r(v,{}),r(b,{})]})}export{G as default};
