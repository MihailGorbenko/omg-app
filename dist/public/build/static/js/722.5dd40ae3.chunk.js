"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[722],{5722:function(s,n,e){e.r(n);var a=e(4165),o=e(5861),r=e(9439),i=e(7022),t=e(9743),c=e(2677),l=e(8322),d=e(3053),m=e(3360),u=e(1874),h=e(1363),p=e(2791),f=e(7689),w=e(5705),x=e(8007),Z=e(9085),j=(e(5462),e(9212)),b=e(934),C=e(4831),v=e(184),g={password:"",confirm:""},k=x.Ry().shape({password:x.Z_().trim().required("Password is required!").max(16,"Can be max 16 chars length!").min(8,"Must be min 8 chars length!"),confirm:x.Z_().trim().required("Confirm password!").max(16,"Can be max 16 chars length!").min(8,"Must be min 8 chars length!")});n.default=function(){var s=(0,f.s0)(),n=(0,p.useState)(!1),e=(0,r.Z)(n,2),x=e[0],y=e[1],N=(0,p.useState)(!1),I=(0,r.Z)(N,2),S=I[0],B=I[1],F=(0,j.Z)(),G=(0,b.Z)(),O=(0,f.UO)(),P=(0,C.Tt)(),L=(0,r.Z)(P,1)[0],V=(0,f.TH)();return(0,v.jsx)(i.Z,{children:(0,v.jsx)(t.Z,{className:"justify-content-center",children:(0,v.jsx)(c.Z,{md:6,lg:5,xl:4,className:"mt-5",children:(0,v.jsxs)("div",{className:u.Z.container,children:[(0,v.jsx)("h1",{className:"mb-3",children:"Reset password"}),(0,v.jsx)(w.J9,{initialValues:g,onSubmit:function(n){return function(n){S?s("/login",{state:{from:V}}):(F.on(),G.set(15),L({password:n.password,token:null===O||void 0===O?void 0:O.token}).unwrap().then((function(s){(0,Z.Am)("Success, now you can login!"),B(!0)})).catch((function(s){return(0,Z.Am)(s.message)})).finally((function(){F.off(),G.done()})))}(n)},validationSchema:k,children:function(n){var e=n.handleBlur,r=n.handleChange,i=n.handleSubmit,c=n.values,p=n.touched,f=n.errors;return(0,v.jsxs)(l.Z,{noValidate:!0,onSubmit:i,children:[(0,v.jsxs)(l.Z.Group,{className:"mb-3",children:[(0,v.jsxs)(d.Z,{controlId:"passwordInput",label:"Password",className:u.Z.label,children:[(0,v.jsx)(l.Z.Control,{type:x?"text":"password",placeholder:"password",name:"password",onChange:r,onBlur:e,value:c.password,isValid:p.password&&!f.password,isInvalid:p.password&&!!f.password}),(0,v.jsx)("div",{onClick:function(){y(!x)},className:u.Z["password-icon"],children:x?(0,v.jsx)(h.G,{icon:["fas","eye"]}):(0,v.jsx)(h.G,{icon:["fas","eye-slash"]})}),(0,v.jsx)(l.Z.Control.Feedback,{type:"invalid",children:f.password}),(0,v.jsx)(l.Z.Control.Feedback,{children:"Looks good!"})]}),(0,v.jsxs)(d.Z,{controlId:"confirmPasswordInput",label:"Confirm password",className:u.Z.label,children:[(0,v.jsx)(l.Z.Control,{type:x?"text":"password",placeholder:"confirm password",name:"confirm",onChange:r,onBlur:e,value:c.confirm,isValid:p.confirm&&!f.confirm&&c.confirm===c.password,isInvalid:p.confirm&&(!!f.confirm||c.confirm!==c.password)}),(0,v.jsx)("div",{onClick:function(){y(!x)},className:u.Z["password-icon"],children:x?(0,v.jsx)(h.G,{icon:["fas","eye"]}):(0,v.jsx)(h.G,{icon:["fas","eye-slash"]})}),(0,v.jsx)(l.Z.Control.Feedback,{type:"invalid",children:c.confirm!==c.password?"Password not match!":f.confirm}),(0,v.jsx)(l.Z.Control.Feedback,{children:"Looks good!"})]})]}),(0,v.jsxs)(t.Z,{style:{justifyContent:"end"},children:[(0,v.jsx)(m.Z,{variant:"primary",className:u.Z.button,onClick:(0,o.Z)((0,a.Z)().mark((function n(){return(0,a.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:s("/");case 1:case"end":return n.stop()}}),n)}))),children:"Back"}),(0,v.jsx)(m.Z,{variant:"primary",type:"submit",className:u.Z.button,children:S?"Login":"Reset"})]}),(0,v.jsx)(Z.Ix,{className:u.Z["toast-container"],position:"top-center",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,transition:Z.Mi,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"})]})}})]})})})})}}}]);
//# sourceMappingURL=722.5dd40ae3.chunk.js.map