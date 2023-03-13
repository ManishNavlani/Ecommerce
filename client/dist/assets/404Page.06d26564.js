import{x as n,k as e,ae as s,l as i,ah as r}from"./vendor.77d9ddd1.js";import{s as t}from"./styled-components.browser.esm.4c801d38.js";import{m as a}from"./responsive.ef511f16.js";var d="/assets/undraw_page_not_found_re_e9o6.5e3a71a9.svg";const c=t.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  flex-direction: column;
  width: 100vw;
`,m=t.div`
  position: relative;
`,h=t.img`
  width: 800px;
  height: 450px;
  margin-bottom: 30px;
  ${a({width:"350px",height:"250px"})};
`;function u(){const o=n();return e(s,{children:e(m,{children:i(c,{children:[e("h1",{children:"Page Not Found"}),e(h,{src:d,alt:"404 Page Image"}),e(r,{color:"secondary",variant:"contained",onClick:()=>{o.push("/")},children:"Home"})]})})})}export{u as default};
