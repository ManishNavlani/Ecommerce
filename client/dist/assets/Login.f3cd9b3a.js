import{s as t}from"./styled-components.browser.esm.4c801d38.js";import{m as L}from"./responsive.ef511f16.js";import{v as P}from"./index.387a0964.js";import{u}from"./use-input.2e302acd.js";import{G as D,r as m,k as e,l as h,al as g,L as x}from"./vendor.77d9ddd1.js";import{u as F}from"./cart-actions.b198bc31.js";import{m as T,c as z,a as N}from"./user-actions.b1b17465.js";import{l as U,m as V}from"./index.ddc31750.js";const G=t.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`,q=t.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${L({width:"75%"})}
`,A=t.h1`
  font-size: 24px;
  font-weight: 300;
`,W=t.form`
  display: flex;
  flex-direction: column;
`,M=t.button`
  width: 100%;
  background-color: teal;
  padding: 10px;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
`,Q=T(o=>({textFiled:{"margin-bottom":"10px",maxWidth:"700px"},btn:{width:"30%",margin:"20px"}}));function ae(){const o=Q(),a=D(),[f,b]=m.exports.useState(!0),[w,{data:n,isLoading:$,error:v,isError:y}]=U(),{data:s,isLoading:J,error:K}=V(void 0,{skip:f});m.exports.useEffect(()=>{s&&(a(F(s)),a(z(n)))},[s,n,a]);const{value:i,isValid:k,hasError:d,valueChangeHandler:j,inputBlurHandler:E,reset:H}=u(r=>P.isEmail(r.trim())),{value:l,isValid:C,reset:S,hasError:c,valueChangeHandler:I,inputBlurHandler:B}=u(r=>r.trim()!=="");return e(G,{children:h(q,{children:[e(A,{children:"SIGN IN"}),h(W,{onSubmit:async r=>{if(r.preventDefault(),!(!k||!C)){try{const p=await w({email:i,password:l}).unwrap();a(N(p)),b(!1)}catch{}H(),S()}},children:[e(g,{id:"outlined-basic",className:o.textFiled,color:"secondary",label:"Email",variant:"standard",onBlur:E,helperText:d?"Please enter valid email":"",onChange:j,error:d,value:i,type:"email",required:!0}),e(g,{id:"outlined-basic",className:o.textFiled,color:"secondary",label:"Password",variant:"standard",onBlur:B,helperText:c?"Please enter valid password.":"",onChange:I,error:c,value:l,type:"password",required:!0}),e("span",{style:{fontSize:"12px",marginBottom:"12px",color:"red"},children:y?v.data:""}),e(M,{style:{backgroundColor:"#000"},children:"Log In"}),e(x,{style:{margin:"5px 0",fontSize:"12px",color:"black",textDecoration:"none"},to:"",children:"Forgot Password?"}),e(x,{style:{margin:"5px 0",fontSize:"12px",color:"black",textDecoration:"none"},to:"/register",children:"Create An Account"})]})]})})}export{ae as default};
