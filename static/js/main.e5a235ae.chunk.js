(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{327:function(e,a,t){e.exports=t(590)},533:function(e,a){},590:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(12),o=t.n(c),i=t(46),l=t(55),s=t(8),u=t.n(s),m=t(9),p=t(18),d=t(135),f=t.n(d),h=t(302),b=t.n(h),g=t(271),E=t(626),y=t(627),v=t(628),w=t(631),O=t(17),k="BEGIN_API_CALL",x="API_CALL_ERROR",I="SIGNUP_SUCCESS",R="SIGNIN_SUCCESS",j="SIGNOUT_SUCCESS",S="RESET_SUCCESS";function N(){return{type:k}}function C(){return{type:x}}var _=t(193),P=t.n(_);t(337),t(339);P.a.initializeApp({apiKey:"AIzaSyDbc1mKUkxSU6VbFkcc0JMG4ybRFLH9atg",authDomain:"shinkansen-5ac87.firebaseapp.com",databaseURL:"https://shinkansen-5ac87.firebaseio.com",projectId:"shinkansen-5ac87",storageBucket:"shinkansen-5ac87.appspot.com",messagingSenderId:"698376700291",appId:"1:698376700291:web:4f49b89eee84666d5236b6"});var L=P.a,T=function(e){return{type:"LOAD_OCTOKIT",payload:e}},D=function(e,a){return function(t){return u.a.async(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,t(N()),n.next=4,u.a.awrap(L.auth().createUserWithEmailAndPassword(e,a));case 4:return n.next=6,u.a.awrap(L.auth().onAuthStateChanged(function(e){e.sendEmailVerification()}));case 6:L.auth().onAuthStateChanged(function(e){e?(L.database().ref("users/"+e.uid).set({displayName:e.displayName,photoURL:e.photoURL,emailVerified:e.emailVerified,phoneNumber:e.phoneNumber,isAnonymous:e.isAnonymous,email:e.email}),t({type:I,payload:"Your account was successfully created! Now you need to verify your e-mail address, please go check your inbox."})):t({type:"SIGNUP_ERROR",payload:"Something went wrong, we couldn't create your account. Please try again."})}),n.next=13;break;case 9:n.prev=9,n.t0=n.catch(0),t(C()),t({type:"SIGNUP_ERROR",payload:"Something went wrong, we couldn't create your account. Please try again."});case 13:case"end":return n.stop()}},null,null,[[0,9]])}},A=function(e,a,t){return function(n){return u.a.async(function(r){for(;;)switch(r.prev=r.next){case 0:try{n(N()),L.auth().signInWithEmailAndPassword(e,a).then(function(a){var r=a.user;L.database().ref("users/"+r.uid).set({displayName:r.displayName,photoURL:r.photoURL,emailVerified:r.emailVerified,phoneNumber:r.phoneNumber,isAnonymous:r.isAnonymous,email:e}),r.emailVerified?(console.log("IF",r.emailVerified),n({type:R}),t()):(console.log("ELSE",r.emailVerified),n({type:"EMAIL_NOT_VERIFIED",payload:"You haven't verified your e-mail address."}))}).catch(function(){n(C()),n({type:"SIGNIN_ERROR",payload:"Invalid login credentials"})})}catch(c){n(C()),n({type:"SIGNIN_ERROR",payload:"Invalid login credentials"})}case 1:case"end":return r.stop()}})}},F=function(){return function(e){return u.a.async(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,e(N()),a.next=4,u.a.awrap(L.auth().signOut());case 4:e({type:j}),a.next=11;break;case 7:a.prev=7,a.t0=a.catch(0),e(C()),e({type:"SIGNOUT_ERROR",payload:"Error, we were not able to log you out. Please try again."});case 11:case"end":return a.stop()}},null,null,[[0,7]])}},U=function(e){return function(a){return u.a.async(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a(N()),t.next=4,u.a.awrap(L.auth().sendPasswordResetEmail(e));case 4:a({type:S,payload:"Check your inbox. We've sent you a secured reset link by e-mail."}),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),a(C()),a({type:"RESET_ERROR",payload:t.t0});case 11:case"end":return t.stop()}},null,null,[[0,7]])}},V=t(47),W=function(e,a,t){var r=Object(n.useState)({}),c=Object(p.a)(r,2),o=c[0],i=c[1],l=Object(n.useState)({email:"",password:""}),s=Object(p.a)(l,2),u=s[0],d=s[1],f=Object(n.useState)(!1),h=Object(p.a)(f,2),b=h[0],g=h[1];Object(n.useEffect)(function(){0===Object.keys(o).length&&b&&(e(),d({email:"",password:""}),g(!1))},[o,t,b,e]);return[u,function(e){e.persist(),d(function(a){return Object(m.a)({},a,Object(V.a)({},e.target.name,e.target.value))})},function(e){e&&e.preventDefault(),g(!0),i(a(u,t))},o]};function B(e,a){var t={};if(e.email||(t.emailIsEmpty="You need to enter your e-mail address"),e.email&&!/\S+@\S+\.\S+/.test(e.email)&&(t.emailFormatInvalid="Your e-mail format doesn't seem right"),!a){e.password||(t.passIsEmpty="You need a password");e.password&&!e.password.match(/^(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[0-9])(?=.*[a-z]).{8,250}$/)&&(t.passIsStrong="You need a stronger password")}return t}var G=t(645),M=t(624),z=t(96),Y=t(646),H=t(630),K=t(52),J=t.n(K),$=t(20),X=Object(g.a)(function(e){return{form:{paddingBottom:e.spacing(4)},divider:{position:"relative",overflow:"visible","&:after":{content:'"Or"',color:"#8b6baf",position:"absolute",background:"white",padding:"0 20px",top:"-11px",left:"50%",transform:"translateX(-50%)"}}}});var Z=Object(O.b)(function(e){return{userId:e.firebaseReducer.auth.uid,authMsg:e.authReducer.authMsg,loading:e.apiStatusReducer.apiCallsInProgress>0}},function(e){return{signup:function(a,t){return e(D(a,t))},signin:function(a,t,n){return e(A(a,t,n))},signout:function(){return e(F())},resetPassword:function(a){return e(U(a))}}})(function(e){var a=e.signup,t=e.signin,c=e.resetPassword,o=e.authMsg,i=e.history,l=e.loading,s=(e.userId,X()),d=Object(n.useState)(!1),h=Object(p.a)(d,2),g=h[0],O=h[1],k=Object(n.useState)(!1),x=Object(p.a)(k,2),I=x[0],R=x[1],j=Object($.useFirebase)(),S=W(function(){g?a(C.email,C.password):I?c(C.email):t(C.email,C.password,function(){return i.push("/")})},B,I),N=Object(p.a)(S,4),C=N[0],_=N[1],P=N[2],L=N[3];return r.a.createElement(G.a,{style:{background:"linear-gradient(to bottom,#654a86,#534292)"},height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"},r.a.createElement(M.a,null,r.a.createElement(G.a,{p:6},r.a.createElement(G.a,{pb:3,width:"380px"},r.a.createElement(z.a,{color:"secondary",variant:"h6"},I?"Reset password":g?"Create an account":"Sign in to your account")),r.a.createElement(E.a,{onClick:function(){var e;return u.a.async(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,u.a.awrap(j.login({provider:"github",type:"popup",scopes:["repo_deployment","admin:repo_hook"]}));case 2:return e=a.sent,a.abrupt("return",j.updateProfile(Object(m.a)({},e.additionalUserInfo,{accessToken:e.credential.accessToken})));case 4:case"end":return a.stop()}})},variant:"contained",color:"secondary",startIcon:r.a.createElement(f.a,null)},"Sign in with GitHub"),r.a.createElement(G.a,{paddingY:5},r.a.createElement(y.a,{className:s.divider})),o&&r.a.createElement("p",{className:"auth-message"},o),r.a.createElement("form",{onSubmit:P,noValidate:!0},r.a.createElement(G.a,{pb:4},r.a.createElement(v.a,{className:s.form},r.a.createElement(Y.a,{error:L.emailIsEmpty||L.emailFormatInvalid,id:"email",name:"email",placeholder:"Email address",helperText:L&&L.emailIsEmpty||L&&L.emailFormatInvalid,defaultValue:C.email,onChange:_,InputProps:{startAdornment:r.a.createElement(H.a,{position:"start"},r.a.createElement(J.a,{color:"secondary"}))}})),!I&&r.a.createElement(v.a,null,r.a.createElement(Y.a,{error:L.passIsStrong||L.passIsEmpty,id:"password",name:"password",placeholder:"Password",type:"password",autoComplete:"current-password",onChange:_,defaultValue:C.password,helperText:L&&L.passIsStrong||L&&L.passIsEmpty,InputProps:{startAdornment:r.a.createElement(H.a,{position:"start"},r.a.createElement(b.a,{color:"secondary"}))}}))),r.a.createElement(G.a,{display:"flex",justifyContent:"space-between"},r.a.createElement(E.a,{variant:"contained",color:"secondary",type:"submit"},l?r.a.createElement(w.a,{color:"secondary"}):I?"Reset password":g?"Create account":"Sign in"),!g&&!I&&r.a.createElement(E.a,{variant:"text",onClick:function(){return R(!0)}},"Forgot password?"),I&&r.a.createElement(E.a,{variant:"contained",onClick:function(){return R(!1)}},"Back to sign in")))),r.a.createElement(G.a,{p:4,display:"flex",bgcolor:"primary.light",alignItems:"center",borderTop:"1px solid #dddddd",justifyContent:"space-between"},r.a.createElement(z.a,{component:"span",color:"secondary"},g?"Already have an account?":"New to shinkansen?"),r.a.createElement(E.a,{variant:"outlined",color:"secondary",onClick:function(){O(!g),I&&R(!1)}},g?"Sign in":"Create an account"))))}),q=t(633),Q=t(634),ee=t(635),ae=t(632),te=t(320),ne=t(303),re=t.n(ne),ce=Object(g.a)(function(e){return{menu:{boxShadow:"none",borderBottom:"2px solid ".concat(e.palette.secondary.main)},menuButton:{marginRight:e.spacing(2)},title:{display:"block"},sectionDesktop:{display:"flex",marginLeft:"auto"}}});var oe=Object(O.b)(null,function(e){return{signout:function(){return e(F())}}})(function(e){var a=e.signout,t=ce(),n=r.a.useState(null),c=Object(p.a)(n,2),o=c[0],i=c[1],l=Boolean(o),s="primary-search-account-menu",u=r.a.createElement(te.a,{anchorEl:o,anchorOrigin:{vertical:"top",horizontal:"right"},id:s,keepMounted:!0,color:"secondary",transformOrigin:{vertical:"top",horizontal:"right"},open:l,onClose:function(){i(null)}},r.a.createElement(ae.a,{onClick:function(){i(null),a()}},"Logout"));return r.a.createElement(q.a,{className:t.menu,position:"sticky"},r.a.createElement(Q.a,null,r.a.createElement(ee.a,{edge:"start",className:t.menuButton,color:"inherit","aria-label":"open drawer"},r.a.createElement(re.a,null)),r.a.createElement(z.a,{className:t.title,variant:"h6",noWrap:!0},"Shinkansen"),r.a.createElement("div",{className:t.sectionDesktop},r.a.createElement(ee.a,{edge:"end","aria-label":"account of current user","aria-controls":s,"aria-haspopup":"true",onClick:function(e){i(e.currentTarget)},color:"inherit"},r.a.createElement(J.a,null)))),u)}),ie=t(130),le=t(287),se=t(95),ue=t(639),me=t(307),pe=t.n(me),de=function(e){return Object(O.b)(function(e){return{auth:e.firebaseReducer.auth}})(function(a){return Object(n.useEffect)(function(){a.auth.isLoaded&&a.auth.isEmpty&&a.history.push("/")},[a.auth,a.history]),r.a.createElement(e,a)})},fe=t(636),he=t(647),be=t(648),ge=t(629),Ee=t(594),ye=t(637),ve=t(638),we=t(310),Oe=t.n(we),ke=t(309),xe=t.n(ke),Ie=t(33),Re=t(304),je=t.n(Re),Se=t(305),Ne=t.n(Se),Ce=Object(g.a)(function(e){return{root:{width:"600px",height:"400px",overflow:"scroll",display:"flex",alignItems:"center",flexDirection:"column",backgroundColor:e.palette.background.paper},listItem:{"&:hover":{cursor:"initial",backgroundColor:"transparent"}},container:{display:"flex",padding:"10px 0px",alignItems:"center"},checkedIcon:{fill:"#30ae43"}}});var _e=Object(O.b)(function(e){var a,t;return{auth:e.firebaseReducer.auth,profile:e.firebaseReducer.profile,username:null===(a=e.firebaseReducer)||void 0===a?void 0:null===(t=a.profile)||void 0===t?void 0:t.username,octokit:e.octokitReducer.octokit}})(function(e){var a=e.auth,t=e.profile,n=e.username,c=e.connectedApps,o=e.octokit,i=r.a.useState([]),l=Object(p.a)(i,2),s=l[0],d=l[1],f=Object($.useFirebase)(),h=Ce();r.a.useEffect(function(){!function(){var e,a;u.a.async(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.a.awrap(o.repos.list({sort:"updated"}));case 2:e=t.sent,a=e.data,d(a);case 5:case"end":return t.stop()}})}()},[o.repos]);return r.a.createElement(ge.a,{className:h.root,component:"nav"},s.length?s.map(function(e){var i=c.some(function(a){return a.id===e.id});return r.a.createElement(Ee.a,{key:e.name,divider:!0,className:h.listItem,button:!0},r.a.createElement(fe.a,{className:h.container,maxWidth:"lg"},r.a.createElement(ye.a,null,i?r.a.createElement(je.a,{className:h.checkedIcon}):r.a.createElement(Ne.a,{color:"secondary"})),r.a.createElement(ve.a,{primary:"".concat(n,"/").concat(e.name)}),r.a.createElement(E.a,{disabled:i,variant:"outlined",color:"secondary",onClick:function(){return function(e){var n,r;return u.a.async(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,u.a.awrap(o.repos.createHook({owner:t.username,repo:e.name,events:["deployment","deployment_status"],config:{url:"".concat("https://hardwave.xyz/node","/"),content_type:"json",secret:"bonjour"}}));case 2:n=c.sent,r=n.data,f.push("applications/".concat(a.uid),Object(m.a)({},e,{hookId:r.id}));case 5:case"end":return c.stop()}})}(e)}},i?"Connected":"Connect")))}):r.a.createElement(w.a,{color:"secondary"}))}),Pe=Object(g.a)(function(e){return{root:{width:"100%",backgroundColor:e.palette.background.paper},listItem:{"&:hover":{backgroundColor:e.palette.primary.light}},icon:{marginRight:e.spacing(.5),width:20,height:20},link:{textDecoration:"none",display:"flex",alignItems:"center"},inputRoot:{color:"inherit"},inputInput:Object(V.a)({padding:e.spacing(1,1,1,7),transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("lg"),{width:200}),search:{position:"sticky",background:"transparent",top:0,borderRadius:e.shape.borderRadius,border:"1px solid ".concat(e.palette.primary.dark),width:"100%"},searchIcon:{width:e.spacing(7),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},container:{display:"flex",alignItems:"center"}}});var Le=Object(Ie.d)(Object(O.b)(function(e){return{auth:e.firebaseReducer.auth}}),de)(function(e){var a=e.auth,t=e.history;Object($.useFirebaseConnect)(["applications/".concat(a.uid)]);var n=Object(O.c)(function(e){var t=e.firebaseReducer.data;return t.applications&&t.applications[a.uid]}),c=r.a.useState(null),o=Object(p.a)(c,2),l=o[0],s=o[1],u=n?Object.entries(n).reduce(function(e,a){var t=Object(p.a)(a,2),n=t[0],r=t[1];return[].concat(Object(se.a)(e),[Object(m.a)({},r,{uid:n})])},[]):[],d=Pe(),f=Boolean(l),h=f?"simple-popper":void 0;return r.a.createElement(r.a.Fragment,null,r.a.createElement(G.a,{bgcolor:"primary.light",p:2},r.a.createElement(fe.a,{maxWidth:"lg"},r.a.createElement(G.a,{display:"flex",alignItems:"center"},r.a.createElement(he.a,null,r.a.createElement(i.b,{to:"/",className:d.link},r.a.createElement(J.a,{className:d.icon}),"Personnal")),r.a.createElement(G.a,{marginLeft:"auto"},r.a.createElement(E.a,{variant:"outlined",color:"secondary",onClick:function(e){s(l?null:e.currentTarget)},endIcon:r.a.createElement(pe.a,null)},"New"),r.a.createElement(ue.a,{id:h,open:f,placement:"bottom-end",anchorEl:l},r.a.createElement(M.a,null,r.a.createElement(_e,{connectedApps:u}))))))),u.length?r.a.createElement(r.a.Fragment,null,r.a.createElement(G.a,{pt:6,pb:3},r.a.createElement(fe.a,{maxWidth:"lg"},r.a.createElement("div",{className:d.search},r.a.createElement("div",{className:d.searchIcon},r.a.createElement(xe.a,null)),r.a.createElement(be.a,{placeholder:"Search\u2026",classes:{root:d.inputRoot,input:d.inputInput},inputProps:{"aria-label":"search"}})))),r.a.createElement(ge.a,{className:d.root,component:"nav","aria-label":"main mailbox folders"},u.map(function(e){return r.a.createElement(Ee.a,{key:e.name,divider:!0,className:d.listItem,button:!0,onClick:function(){return function(e){var a=e.uid;t.push("/application/".concat(a))}(e)}},r.a.createElement(fe.a,{className:d.container,maxWidth:"lg"},r.a.createElement(ye.a,null,r.a.createElement(Oe.a,{color:"secondary"})),r.a.createElement(ve.a,{primary:e.name})))}))):r.a.createElement(fe.a,null,r.a.createElement("p",null,"There's no connected app")))}),Te=t(311),De=t.n(Te),Ae=t(316),Fe=t.n(Ae),Ue=t(317),Ve=t.n(Ue),We=t(644),Be=t(642),Ge=t(312),Me=t.n(Ge),ze=t(640),Ye=t(313),He=t.n(Ye),Ke=t(4),Je=t(641),$e=t(649),Xe=function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"created_at";return e&&e.sort(function(e,t){return new Date(t[a]).getTime()-new Date(e[a]).getTime()})},Ze=function(e){return!["success","failure"].includes(e)},qe=function(e,a,t){var n,r,c,o;return u.a.async(function(i){for(;;)switch(i.prev=i.next){case 0:return n=a.username,r=t.name,i.next=4,u.a.awrap(e.repos.listDeployments({owner:n,repo:r,per_page:9}));case 4:return c=i.sent,o=c.data,i.abrupt("return",o);case 7:case"end":return i.stop()}})},Qe=function(e,a,t){var n,r,c,o;return u.a.async(function(i){for(;;)switch(i.prev=i.next){case 0:return n=a.username,r=t.name,i.next=4,u.a.awrap(e.repos.listTags({owner:n,repo:r}));case 4:return c=i.sent,o=c.data,i.abrupt("return",o);case 7:case"end":return i.stop()}})},ea=function(e,a,t,n){var r,c,o,i;return u.a.async(function(l){for(;;)switch(l.prev=l.next){case 0:return r=t.username,c=n.name,l.next=4,u.a.awrap(a.repos.listDeploymentStatuses({owner:r,repo:c,deployment_id:e}));case 4:return o=l.sent,i=o.data,l.abrupt("return",i);case 7:case"end":return l.stop()}})},aa=Object(g.a)(function(e){return{listItemIcon:{minWidth:"auto",marginRight:e.spacing(2)},inline:{display:"inline"},login:{fontWeight:500},skeleton:{width:"100px",display:"inline-flex !important"},loader:{height:"10px",width:"24px"},blueLink:{color:"#006deb",marginLeft:e.spacing(.5)},icon:{marginRight:e.spacing(.5),width:20,height:20}}}),ta=Object(Ke.a)({colorPrimary:{backgroundColor:"#fffacd"},barColorPrimary:{backgroundColor:"#ffd700"}})(ze.a),na=function(e){var a=e.status,t=e.deployments,n=aa(),c=function(e){switch(e){case"success":return{icon:r.a.createElement(Me.a,{htmlColor:"green"}),color:"green"};case"failure":return{icon:r.a.createElement(He.a,{color:"error"}),color:"red"};case"pending":return{icon:r.a.createElement(ta,{className:n.loader}),color:"gold"};default:return{icon:r.a.createElement(ta,{className:n.loader}),color:"green"}}};return r.a.createElement(ge.a,null,t.map(function(e){var t=Xe(a[e.id],"created_at"),o=t&&t[0]||{},l=new Date(e.created_at),s=new Intl.DateTimeFormat("en-US",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"}).format(l);return r.a.createElement(Ee.a,{key:e.id,divider:!0,alignItems:"center"},r.a.createElement(ye.a,{className:n.listItemIcon},c(o.state).icon),r.a.createElement(Je.a,null,r.a.createElement($e.a,{src:e.creator.avatar_url})),r.a.createElement(ve.a,{primary:r.a.createElement(r.a.Fragment,null,r.a.createElement(z.a,{component:"span",className:n.login},e.creator.login,":"," "),!o.state&&r.a.createElement(Be.a,{component:"span",className:n.skeleton,animation:"wave"}),o.state&&r.a.createElement(z.a,{component:"span",variant:"body2",className:n.inline,style:{color:c(o.state).color}},"Build ",o.state)),secondary:r.a.createElement(r.a.Fragment,null,r.a.createElement("span",null,s),!Ze(o.state)&&r.a.createElement(i.b,{to:"/",className:n.blueLink,onClick:function(){console.info("I'm a button.")}},"View build log"))}))}))},ra=t(643),ca=t(314),oa=t.n(ca),ia=t(315),la=t.n(ia),sa=t(196),ua=t.n(sa),ma=Object(g.a)(function(e){return{listItemIcon:{minWidth:"auto",marginRight:e.spacing(2)},inline:{display:"inline"},skeleton:{display:"inline-flex",width:"100px"},tag:{background:e.palette.primary.dark,borderRadius:"4px",padding:"4px 8px"}}}),pa=function(e){var a=e.currentVersion,t=e.previousVersion,n=e.handleDeploy,c=e.handleRollback,o=e.isLoading,i=ma();return r.a.createElement(ge.a,{component:"nav","aria-label":"main mailbox folders"},r.a.createElement(Ee.a,{divider:Boolean(t),alignItems:"center"},!a&&r.a.createElement(ve.a,null,r.a.createElement(ua.a,{className:i.skeleton,animation:"wave"})),a&&a.name&&r.a.createElement(ve.a,null,r.a.createElement(r.a.Fragment,null,"Current version"," ",r.a.createElement("span",{className:i.tag},a.name))),r.a.createElement(ra.a,null,r.a.createElement(E.a,{variant:"contained",color:"secondary",disabled:o,endIcon:r.a.createElement(oa.a,null),onClick:n},"Deploy new version"))),r.a.createElement(Ee.a,{alignItems:"center"},!t&&r.a.createElement(ve.a,null,r.a.createElement(ua.a,{className:i.skeleton,animation:"wave"})),t&&t.name&&r.a.createElement(ve.a,null,r.a.createElement(r.a.Fragment,null,"Previous version"," ",r.a.createElement("span",{className:i.tag},t.name))),r.a.createElement(ra.a,null,r.a.createElement(E.a,{variant:"contained",color:"primary",endIcon:r.a.createElement(la.a,null),disabled:o||!t,onClick:c},"Rollback"))))},da=Object(g.a)(function(e){return{root:{width:"100%",backgroundColor:e.palette.background.paper},link:{textDecoration:"none",display:"flex",alignItems:"center"},blueLink:{color:"#006deb",marginLeft:e.spacing(.5)},icon:{marginRight:e.spacing(.5),width:20,height:20}}});var fa=Object(Ie.d)(Object(O.b)(function(e){return{auth:e.firebaseReducer.auth,profile:e.firebaseReducer.profile,octokit:e.octokitReducer.octokit}}),de)(function(e){var a=e.auth,t=e.profile,n=e.octokit,c=e.history,o=da(),s=Object($.useFirebase)(),d=r.a.useState([]),h=Object(p.a)(d,2),b=h[0],g=h[1],y=r.a.useState({}),v=Object(p.a)(y,2),w=v[0],k=v[1],x=r.a.useState([]),I=Object(p.a)(x,2),R=I[0],j=I[1],S=Object(l.f)().uid;Object($.useFirebaseConnect)(["applications/".concat(a.uid,"/").concat(S)]);var N=Object(O.c)(function(e){var t=e.firebaseReducer.data;return t.applications&&t.applications[a.uid]&&t.applications[a.uid][S]}),C=R[0]||null,_=R[1]||null;r.a.useEffect(function(){De.a.connect("https://hardwave.xyz/node",{secure:!0}).on("event",function(e){var a=e.body,t=a.deployment,n=a.deployment_status;!t||n?k(function(e){if(e)return Object(m.a)({},e,Object(V.a)({},a.deployment.id,[].concat(Object(se.a)(e[a.deployment.id]),[a.deployment_status])))}):g(function(e){return[].concat(Object(se.a)(e),[a.deployment])})})},[]),r.a.useEffect(function(){N&&n&&(function(){var e;u.a.async(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,u.a.awrap(qe(n,t,N));case 2:e=a.sent,g(e);case 4:case"end":return a.stop()}})}(),function(){var e;u.a.async(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,u.a.awrap(Qe(n,t,N));case 2:e=a.sent,j(e);case 4:case"end":return a.stop()}})}())},[N,n,t,t.username]),r.a.useEffect(function(){b.map(function(e){var a,r;return u.a.async(function(c){for(;;)switch(c.prev=c.next){case 0:return a=e.id,c.next=3,u.a.awrap(ea(a,n,t,N));case 3:r=c.sent,k(function(e){return Object(m.a)({},e,Object(V.a)({},a,r))});case 5:case"end":return c.stop()}})})},[b]);var P=Xe(b),L=function(e,a){var t,n;return e&&Object.keys(e).length&&a.length&&(null===(t=e[a[0].id])||void 0===t?void 0:t.length)&&(null===(n=Xe(e[a[0].id])[0])||void 0===n?void 0:n.state)||[]}(w,P),T=Ze(L);return N?r.a.createElement(r.a.Fragment,null,r.a.createElement(G.a,{bgcolor:"primary.light",p:2,marginBottom:6},r.a.createElement(fe.a,{maxWidth:"lg"},r.a.createElement(G.a,{display:"flex",alignItems:"center"},r.a.createElement(he.a,{separator:r.a.createElement(Fe.a,null),"aria-label":"breadcrumb"},r.a.createElement(i.b,{to:"/",className:o.link},r.a.createElement(G.a,{display:"flex",marginRight:1},r.a.createElement(J.a,null)),r.a.createElement(z.a,{color:"textPrimary"},"Personnal")),r.a.createElement(G.a,{display:"flex"},r.a.createElement(G.a,{display:"flex",marginRight:1},r.a.createElement(f.a,{fontSize:"small"})),r.a.createElement(z.a,{color:"textPrimary"},N.name))),r.a.createElement(G.a,{marginLeft:"auto"},r.a.createElement(E.a,{variant:"contained",color:"secondary",endIcon:r.a.createElement(Ve.a,null),onClick:function(){return u.a.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.a.awrap(s.remove("applications/".concat(a.uid,"/").concat(S)));case 2:c.push("/"),n.repos.deleteHook({owner:t.username,repo:N.name,hook_id:N.hookId});case 4:case"end":return e.stop()}})}},"Delete"))))),r.a.createElement(fe.a,{maxWidth:"lg"},r.a.createElement(We.a,{container:!0,justify:"space-between",spacing:6},r.a.createElement(We.a,{item:!0,xs:12,md:6},r.a.createElement(G.a,{marginBottom:2},r.a.createElement(z.a,null,"Deployments commands")),r.a.createElement(M.a,null,r.a.createElement(pa,{isLoading:T,currentVersion:C,previousVersion:_,handleDeploy:function(){return u.a.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.a.awrap(n.repos.createDeployment({owner:t.username,repo:N.name,ref:"master"}));case 2:case"end":return e.stop()}})},handleRollback:function(){var e,a;return u.a.async(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,u.a.awrap(Qe(n,t,N));case 2:e=r.sent,a=e[1],n.repos.createDeployment({owner:t.username,repo:N.name,ref:a.commit.sha,auto_merge:!1}),j(e);case 6:case"end":return r.stop()}})}}))),r.a.createElement(We.a,{item:!0,xs:12,md:6},r.a.createElement(z.a,null,"Deployments activity"),r.a.createElement(na,{status:w,deployments:P}))))):null}),ha=Object(ie.a)({typography:{fontFamily:"Helvetica",fontWeightLight:300,fontWeightRegular:300,fontWeightMedium:300,fontWeightBold:300},palette:{text:{primary:"#62738d"},primary:{main:"#ffffff",light:"#f7f8fb",dark:"#e7ebf3",contrastText:"#8b6baf"},secondary:{main:"#8b6baf",contrastText:"#e7ebf3"}}});var ba=Object(O.b)(function(e){return{profile:e.firebaseReducer.profile}},function(e){return{loadOctokit:function(a){return e(T(a,e))}}})(function(e){var a=e.profile,t=e.loadOctokit;r.a.useEffect(function(){a.accessToken&&t(a.accessToken)},[a,t]);var n=Object(O.c)(function(e){return e.firebaseReducer.auth});return r.a.createElement(le.a,{theme:ha},Object($.isLoaded)(n)&&!Object($.isEmpty)(n)&&r.a.createElement(oe,null),r.a.createElement(l.c,null,r.a.createElement(l.a,{exact:!0,path:"/",component:function(e){return function(e,a){return Object($.isLoaded)(a)?Object($.isEmpty)(a)?r.a.createElement(Z,e):r.a.createElement(Le,e):r.a.createElement(w.a,{color:"secondary"})}(e,n)}}),r.a.createElement(l.a,{path:"/login",component:Z}),r.a.createElement(l.a,{path:"/application/:uid",component:fa})))}),ga=t(318),Ea={authMsg:""},ya={apiCallsInProgress:0};var va=t(319),wa=t.n(va),Oa={},ka=Object(Ie.c)({firebaseReducer:$.firebaseReducer,authReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ea,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case R:case j:return Object(m.a)({},e,{authMsg:""});case I:case"SIGNUP_ERROR":case"SIGNIN_ERROR":case"EMAIL_NOT_VERIFIED":case"SIGNOUT_ERROR":case S:case"RESET_ERROR":return Object(m.a)({},e,{authMsg:a.payload});default:return e}},octokitReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Oa,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"LOAD_OCTOKIT":var t=new wa.a({auth:a.payload,baseUrl:"https://api.github.com"});return Object(m.a)({},e,{octokit:t});default:return e}},apiStatusReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ya;switch((arguments.length>1?arguments[1]:void 0).type){case k:return Object(m.a)({},e,{apiCallsInProgress:1});case x:case R:case I:case S:case j:return Object(m.a)({},e,{apiCallsInProgress:0});default:return e}}}),xa=Object(Ie.e)(ka,{},Object(Ie.d)(Object(Ie.a)(ga.a))),Ia={firebase:L,config:{userProfile:"users"},dispatch:xa.dispatch};o.a.render(r.a.createElement(O.a,{store:xa},r.a.createElement($.ReactReduxFirebaseProvider,Ia,r.a.createElement(i.a,null,r.a.createElement(ba,null)))),document.getElementById("root"))}},[[327,1,2]]]);
//# sourceMappingURL=main.e5a235ae.chunk.js.map