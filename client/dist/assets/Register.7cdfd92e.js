import{s as a}from"./styled-components.browser.esm.4c801d38.js";import{u as i}from"./use-input.2e302acd.js";import{m as y}from"./responsive.ef511f16.js";import{v as D}from"./index.387a0964.js";import{r as C,G as R,k as e,l as s,al as o,L as U}from"./vendor.77d9ddd1.js";import{j as W,k as M}from"./index.ddc31750.js";import{m as $,a as G,c as O}from"./user-actions.b1b17465.js";import{c as q}from"./cart-actions.b198bc31.js";const J=a.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center no-repeat;
  background-size: cover;
  display: flex;
  /* repeat: no-repeat; */
  align-items: center;
  justify-content: center;
`,K=a.div`
  width: 45%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: white;
  ${y({width:"75%"})}
`,Q=a.h1`
  font-size: 24px;
  font-weight: 300;
`,X=a.form`
  display: flex;
  flex-wrap: wrap;
`,E=a.div`
  display: flex;
  ${y({flexWrap:"wrap"})}
`,Y=a.span`
  font-size: 12px;
  margin: 20px 0;
  width: 100%;
`,Z=a.span`
  font-size: 18px;
  margin: 10px 250px;
  color: red;
  width: 100%;
`,_=a.button`
  width: 50%;
  margin: auto;
  background-color: #000;
  padding: 10px;
  color: white;
  border: none;
  cursor: pointer;
`,ee=$(t=>({textFiled:{margin:"10px 50px 0px 0px",width:"275px"},btn:{width:"30%",margin:"20px"}}));function Ne(){const t=ee(),[l,c]=C.exports.useState(null),d=R(),[N,{data:re,isLoading:ae,error:te,isError:se}]=W(),[H,{data:ne,isLoading:ie,error:oe,isError:le}]=M(),{value:u,isValid:de,hasError:p,valueChangeHandler:I,inputBlurHandler:B,reset:ce}=i(r=>D.isEmail(r.trim())),{value:m,isValid:h,reset:ue,hasError:g,valueChangeHandler:j,inputBlurHandler:k}=i(r=>r.trim()!==""),{value:x,isValid:F,reset:pe,hasError:f,valueChangeHandler:P,inputBlurHandler:S}=i(r=>r.trim()!==""),{value:w,isValid:T,reset:me,hasError:v,valueChangeHandler:L,inputBlurHandler:V}=i(r=>r.trim()!==""),[z,b]=C.exports.useState(!1);return e(J,{children:s(K,{children:[e(Q,{children:"CREATE AN ACCOUNT"}),s(X,{onSubmit:async r=>{if(r.preventDefault(),!h||!h||!F||!T)return b(!0);{b(!1),c(null);const A={firstName:m,lastName:x,email:u,password:w};try{const n=await N(A).unwrap();d(G(n)),await H().unwrap()&&(d(q()),d(O(n)))}catch(n){n.data.keyPattern.email===1&&c("email already used.")}}},children:[s(E,{children:[e(o,{id:"outlined-basic",className:t.textFiled,color:"secondary",label:"First Name",variant:"standard",onBlur:k,helperText:g?"Please enter your first name":"",onChange:j,error:g,value:m,type:"text"}),e(o,{id:"outlined-basic",className:t.textFiled,color:"secondary",label:"Last Name",variant:"standard",onBlur:S,helperText:f?"Please enter your last name":"",onChange:P,error:f,value:x,type:"text"})]}),s(E,{children:[e(o,{id:"outlined-basic",className:t.textFiled,color:"secondary",label:"Email",variant:"standard",onBlur:B,helperText:p?"Please enter valid email":l||null,onChange:I,error:p||l,value:u,type:"email"}),e(o,{id:"outlined-basic",className:t.textFiled,color:"secondary",label:"Password",variant:"standard",onBlur:V,helperText:v?"Please enter valid password.":"",onChange:L,error:v,value:w,type:"password"})]}),s(Y,{children:["By creating an account,you are agreeing to our",e("b",{children:" terms & conditions."}),e("p",{children:e(U,{to:"/login",style:{color:"black",textDecoration:"underline",fontSize:14},children:"Already have an account, Sign in"})})]}),e(Z,{children:z?e("p",{style:{margin:"10px auto",color:"red"},children:"Please enter valid fields"}):""}),e(_,{children:"Register"})]})]})})}export{Ne as default};
