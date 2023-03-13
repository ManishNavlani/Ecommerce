var Q=Object.defineProperty,V=Object.defineProperties;var U=Object.getOwnPropertyDescriptors;var j=Object.getOwnPropertySymbols;var W=Object.prototype.hasOwnProperty,J=Object.prototype.propertyIsEnumerable;var N=(i,o,a)=>o in i?Q(i,o,{enumerable:!0,configurable:!0,writable:!0,value:a}):i[o]=a,$=(i,o)=>{for(var a in o||(o={}))W.call(o,a)&&N(i,a,o[a]);if(j)for(var a of j(o))J.call(o,a)&&N(i,a,o[a]);return i},A=(i,o)=>V(i,U(o));import{E as H,k as e,r as f,l as r,ag as L,V as T,ah as m,O as K,N as B,Q as X,D as Y,x as Z,u as F,ai as ee,aj as te,ak as re,al as M,am as ne,ab as oe,G as ie,W as se}from"./vendor.77d9ddd1.js";import{s as n}from"./styled-components.browser.esm.4c801d38.js";import{R as ae,N as le,F as ce}from"./Footer.d90ef9f8.js";import{N as de}from"./Newsletter.ed3f61b1.js";import{m as g}from"./responsive.ef511f16.js";import{a as pe}from"./cart-actions.b198bc31.js";import{e as ue,f as ge,g as he,h as me,i as xe}from"./index.ddc31750.js";import{u as ve}from"./use-input.2e302acd.js";import{m as I}from"./user-actions.b1b17465.js";import{P as fe}from"./ProductLoader.1286f1ae.js";import{S as be}from"./Star.7e8b1702.js";import{R as we,A as _e}from"./Remove.1ec5f4a9.js";var ye=H(e("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),Ce=H(e("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");const Re=n.div`
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(240, 240, 240);
  border-radius: 8px;
  margin-bottom: 50px;
  padding: 20px 16px;
`,G=n.h4`
  ${g({fontSize:"14px"})}
`,Se=n.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  ${g({padding:" 0 0 0 0px"})}
`,Oe=n.div`
  padding: 10px;
  display: flex;
  align-items: center;
  ${g({padding:"0"})}
`,Pe=n.div`
  padding: 0 0 10px 10px;
  ${g({padding:"0"})}
`,ke=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,ze=I(i=>({box:{width:"650px",[i.breakpoints.between("xs","sm")]:{width:"100%"}},reviewHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 15px "},cardRatings:{color:"#000",padding:"10px",[i.breakpoints.between("xs","sm")]:{fontSize:"14px"}},personIcon:{border:"1px solid black",borderRadius:"50%",marginRight:"5px"},drawer:{[i.breakpoints.between("xs","sm")]:{width:"100px"}}})),De=n.h6`
  margin-bottom: 16px;
  color: rgb(51, 51, 51);
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
`,Ie=n.div`
  padding: 10px 15px;
`;function je({productId:i}){const o=ze(),[a,x]=f.exports.useState(!1),{data:t,isLoading:b,isError:d,error:z}=ue(i,{refetchOnMountOrArgChange:!0}),v=l=>()=>{x(l)},h=(l,p)=>r(Se,{children:[r(ke,{children:[r(Oe,{children:[e(Ce,{className:o.personIcon}),e(G,{children:l.userName})]}),e(L,{name:"read-only",value:l.ratings,readOnly:!0,className:o.cardRatings})]}),e(Pe,{children:e("p",{children:l.review})}),e(T,{})]},p),C=()=>r(B,{className:o.box,role:"presentation",children:[r(X,{className:o.reviewHeader,children:[e(Y,{variant:"h5",component:"h4",children:"Product Reviews"}),e(m,{onClick:v(!1),color:"secondary",children:e(ye,{})})]}),e(T,{}),e(Ie,{children:t==null?void 0:t.map((l,p)=>h(l,p))})]});return r("div",{children:[r(Re,{children:[e(De,{children:"Product reviews"}),(t==null?void 0:t.length)>5?t==null?void 0:t.slice(0,5).map((l,p)=>h(l,p)):t==null?void 0:t.map((l,p)=>h(l,p)),(t==null?void 0:t.length)>5?e(m,{onClick:v(!0),color:"secondary",variant:"outlined",children:"View All Reviews"}):null,(t==null?void 0:t.length)===0?e(G,{children:"Be the first reviewer."}):null]}),e(K,{anchor:"right",className:o.drawer,open:a,onClose:v(!1),onOpen:v(!0),children:C()})]})}const Ne=I(i=>({ratings:{color:"#000"},text:{width:400,[i.breakpoints.between("xs","sm")]:{width:250}}}));function $e({productId:i}){const o=Ne(),[a,x]=f.exports.useState(!1);Z();const{currentUser:t,isLoggedIn:b}=F(u=>u.user),{data:d,isLoading:z,isError:v,error:h}=ge(i,{refetchOnMountOrArgChange:!0,skip:!b}),[C]=he(),[l]=me(),[p,w]=f.exports.useState(d?d.review:""),[R,s]=f.exports.useState(d?d.ratings:0);f.exports.useEffect(()=>{d&&(w(d.review),s(d.ratings))},[d]);const _=()=>{x(!0)},S=()=>{x(!1)},D=async u=>{u.preventDefault();const y={productId:i,userReviewId:t._id,ratings:R,review:p,userName:`${t.firstName} ${t.lastName}`},O={ratings:R,review:p};try{if(d){const c=await l({updateReviewBody:O,productId:i}).unwrap();w(c.review),s(c.ratings)}else{const c=await C(y).unwrap();w(c.review),s(c.ratings)}}catch{}x(!1)};return r("div",{children:[e(m,{variant:"outlined",onClick:_,color:"secondary",disabled:!b,children:"Give Ratings"}),r(ee,{open:a,onClose:S,"aria-labelledby":"responsive-dialog-title",children:[e(te,{id:"responsive-dialog-title",children:"Give Ratings"}),r(re,{children:[e(B,{sx:{"& > legend":{mt:2}},children:e(L,{name:"simple-controlled",value:R,className:o.ratings,onChange:(u,y)=>{s(y)}})}),e(M,{multiline:!0,color:"secondary",className:o.text,margin:"dense",id:"name",label:"Review",type:"text",fullWidth:!0,value:p,variant:"standard",onChange:u=>w(u.target.value)})]}),r(ne,{children:[e(m,{autoFocus:!0,onClick:S,color:"secondary",children:"Cancel"}),e(m,{onClick:D,autoFocus:!0,color:"secondary",children:"Submit"})]})]})]})}const Ae=n.div`
  position: relative;
  top: 100px;
`,He=n.div`
  padding: 50px;
  display: flex;
  ${g({padding:"10px",flexDirection:"column"})}
`,Le=n.div`
  text-align: center;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(240, 240, 240);
  border-radius: 8px;
  margin-bottom: 16px;
  height: 80vh;
  padding: 20px 16px;
  flex: 1;
  ${g({padding:"10px"})}
`,Te=n.div`
  flex: 1;
  padding: 0 50px;
  ${g({padding:"10px"})}
`,Be=n.h1`
  font-weight: 500;
`,Fe=n.img`
  height: 80vh;
  object-fit: cover;
  width: 80%;
  ${g({height:"50vh"})}
`,P=n.div`
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(240, 240, 240);
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 20px 16px;
`,Me=n.span`
  font-weight: 100;
  font-size: 35px;
`,Ge=n.span`
  font-weight: 100;
  font-size: 20px;
  color: gray;
  margin-left: 10px;
  text-decoration: line-through;
`,qe=n.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 0;
  border-radius: 8px;
  margin-bottom: 16px;
  padding: 20px 16px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(240, 240, 240);
`,Ee=n.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  margin: 10px 0;
  ${g({width:"70%"})}
`,Qe=n.span`
  width: 30px;
  height: 30px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`,Ve=n.div`
  width: 25%;
  margin: 10px 0;
  background-color: rgb(255 255 255);
  border-radius: 8px;
  padding-top: 8px;
`,Ue=n.div`
  color: white;
  width: 50px;
  display: flex;
  font-size: 15px;
  align-items: center;
  margin: 5px 0 0 0;
  border-radius: 10px;
  justify-content: center;
  background-color: black;
`;n.span`
  color: green;
  font-size: 16px;
  margin-left: 10px;
`;const k=n.h6`
  margin-bottom: 16px;
  color: rgb(51, 51, 51);
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
`,We=n.div`
  flex-wrap: wrap;
  display: flex;
`,Je=I(i=>({textFiled:{margin:"20px",width:"100px"}})),Ke=n.div``;function dt(){var y,O;const o=oe().pathname.split("/")[2],{isLoggedIn:a}=F(c=>c.user),x=Je(),[t,b]=f.exports.useState(1),[d,z]=f.exports.useState(!1),v=ie(),{value:h,isValid:C,hasError:l,valueChangeHandler:p,inputBlurHandler:w,reset:R}=ve(c=>c.trim()!==""),{data:s,error:_,isLoading:S}=xe(o,{refetchOnMountOrArgChange:!0}),D=()=>{h===""&&z(!0),C&&v(pe(A($({},s),{size:h,quantity:t})))};let u;return S&&(u=e(fe,{})),_&&(u=r("h1",{style:{textAlign:"center",margin:"50px"},children:[_==null?void 0:_.originalStatus," Product not found"]})),s&&(u=r(He,{children:[e(Le,{children:e(Fe,{src:s.productImage})}),r(Te,{children:[r(P,{children:[e(Be,{children:s.title}),r("div",{children:[r(Me,{children:["Rs. ",s.price]}),r(Ge,{children:["Rs.",Math.round(s.price*s.discount/100+s.price)]})]}),r(Ue,{children:[s.ratings||0,e(be,{sx:{fontSize:13,marginLeft:.5}})]}),e(Ve,{children:"Free Delivery"})]}),r(P,{children:[e(k,{children:"Select Size"}),e(We,{children:e(M,{id:"outlined-select-state",select:!0,label:"Size",color:"secondary",className:x.textFiled,value:h,required:!0,helperText:d||l?"Select Size.":"",onChange:p,onBlur:w,error:!!(d||l),children:(y=s==null?void 0:s.size)==null?void 0:y.map(c=>e(se,{value:c,children:c},c))})})]}),r(P,{children:[e(k,{children:"Product Details"}),e(Ke,{children:(O=Object.entries(s.description))==null?void 0:O.map(([c,q],E)=>r("p",{children:[e("span",{style:{fontWeight:600},children:c}),` : ${q}`]},E))})]}),r(qe,{children:[e(k,{children:"Add Product To The Cart"}),r(Ee,{children:[e(m,{variant:"outlined",color:"secondary",size:"small",onClick:()=>t>1&&b(t-1),children:e(we,{})}),e(Qe,{children:t}),e(m,{variant:"outlined",color:"secondary",size:"small",onClick:()=>b(t+1),children:e(_e,{})})]}),e(m,{variant:"contained",onClick:D,size:"large",color:"secondary",children:"ADD TO CART"})]}),r(P,{children:[e(k,{children:"Give Review"}),e($e,{productId:o}),!a&&e("p",{style:{marginTop:10},children:"Login to give review"})]}),e(je,{productId:o})]})]})),r(Ae,{children:[e(ae,{}),e(le,{}),u,e(de,{}),e(ce,{})]})}export{dt as default};
