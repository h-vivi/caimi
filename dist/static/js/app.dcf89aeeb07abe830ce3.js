webpackJsonp([1],[,,,,,,,,,,,,,function(t,e,n){"use strict";n.d(e,"b",function(){return a}),n.d(e,"a",function(){return r}),n.d(e,"c",function(){return o}),n.d(e,"d",function(){return c}),n.d(e,"e",function(){return u});var s=n(30),i=n.n(s);/*!
 * apis
 * bq-hentai | 07/22/2017
 */
i.a.defaults.baseURL="http://api.caimixinli.com/serverapi/";var a=function(){return i.a.get("http://api.caimixinli.com/serverapi/config/init")},r=function(t){var e=t.pageNo,n=t.code;return i.a.get("content/queryContent?pageNo="+e+"&categoryCode="+n)},o=function(t){var e=t.phone;return i.a.get("userlogin/getPhoneCheckCode?phone="+e)},c=function(t){var e=t.phone,n=t.verifyCode;return i.a.get("userlogin/loginNoPassword?phone="+e+"&phoneCheckCode="+n)},u=function(t){var e=t.phone,n=t.psw;return i.a.get("userlogin/loginPassword?phone="+e+"&password="+n)}},,,,,,,function(t,e,n){"use strict";var s=n(2),i=n(124),a=n(109),r=n.n(a),o=n(111),c=n.n(o),u=n(112),l=n.n(u),f=n(108),d=n.n(f),v=n(110),m=n.n(v),p=n(103),_=n.n(p);s.default.use(i.a),e.a=new i.a({routes:[{path:"/login",name:"login",component:r.a,redirect:{name:"login::psw"},children:[{path:"psw",name:"login::psw"},{path:"verify",name:"login::verify"}]},{path:"/psw",name:"psw",component:c.a},{path:"/register",name:"register",component:r.a},{path:"/s",name:"s",component:l.a,redirect:{name:"s::list"},children:[{path:"list",name:"s::list",component:d.a},{path:"mine",name:"s::mine",component:m.a}]},{path:"/detail/:id",name:"detail",component:_.a},{path:"*",redirect:{name:"login"}}]})},function(t,e,n){"use strict";var s=n(2),i=n(19);s.default.use(i.c),e.a=new i.c.Store({state:{user:{},categories:[]},mutations:{SET_CATEGORIES:function(t,e){var n=e.categories;t.categories=n}},getters:{categories:function(t){return t.categories}},actions:{setCategories:function(t,e){(0,t.commit)("SET_CATEGORIES",{categories:e})}}})},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e,n){function s(t){n(100)}var i=n(1)(n(50),n(123),s,null,null);t.exports=i.exports},,,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(2),i=n(29),a=(n.n(i),n(22)),r=(n.n(a),n(28)),o=n.n(r),c=n(27),u=n.n(c),l=n(20),f=n(21),d=n(24),v=(n.n(d),n(25)),m=(n.n(v),n(26)),p=(n.n(m),n(23));n.n(p);n.i(i.sync)(f.a,l.a),s.default.use(o.a),s.default.config.productionTip=!1,new s.default({el:"#app",store:f.a,router:l.a,template:"<App/>",components:{App:u.a}})},function(t,e,n){"use strict";n.d(e,"b",function(){return s}),n.d(e,"a",function(){return i});/*!
 * utils
 * bq-hentai | 07/22/2017
 */
var s=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;t.scrollTop=e},i=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.7;arguments[2];return t.scrollTop/(t.scrollHeight-t.offsetHeight)>e}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"hello",data:function(){return{msg:"Welcome to Your Vue.js App"}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"essay-desc-item",data:function(){return{}},props:{item:{default:function(){return{userInfo:{},images:[]}}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"footer",data:function(){return{}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"header",data:function(){return{}},methods:{handleClick:function(t){this.$emit("to-certain-item",{code:t})}},props:{items:{default:function(){return[]}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"setting-item",data:function(){return{msg:""}},props:{item:{default:function(){return{name:{},icon:{}}}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(62),i=n.n(s),a=n(19),r=n(13),o=n(106),c=n.n(o),u=n(104),l=n.n(u),f=n(49);e.default={name:"s",data:function(){return{essays:[],loading:!1}},computed:i()({},n.i(a.a)(["categories"])),components:{XHeader:c.a,EssayDescItem:l.a},methods:i()({},n.i(a.b)(["setCategories"]),{handleStart:function(t){var e=(t.imageUrl,t.referrer,t.categories);e=e.map(function(t){return{name:t.categoryName,code:t.categoryCode}}),this.setCategories(e),e.length>0&&this.toItem({code:e[0].code})},loadEassy:function(){var t=this,e=this.categories.find(function(t){return t.active});e&&n.i(f.a)(this.$el.querySelector(".essays"))&&(e.end||this.loading||(e.pageNo+=1,this.loading=!0,n.i(r.a)(e).then(function(n){if(n=n.data,!n.success)throw new Error("fail");if(!n.data.items||0===n.data.items.length)throw e.end=!0,new Error("end");t.essays=t.essays.concat(n.data.items),console.log(t.essays),t.loading=!1}).catch(function(n){e.pageNo-=1,t.loading=!1})))},toItem:function(t){var e=this,s=t.code,i=this.categories.find(function(t){return t.code===s});i&&(i.pageNo=0,i.end=!1,this.loading=!0,n.i(r.a)(i).then(function(t){if(t=t.data,t.success){var i=e.categories.map(function(t){return t.active=t.code===s,t});e.setCategories(i),e.essays=t.data.items,n.i(f.b)(e.$el.querySelector(".essays")),e.loading=!1}}).catch(function(t){e.loading=!1}))}}),beforeMount:function(){var t=this;n.i(r.b)().then(function(e){if(e=e.data,e.success){var n=e.data;t.handleStart({imageUrl:n.startImg.imgUrl,referrer:n.startImg.url,categories:n.categorys})}}).catch(function(t){})}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(13);e.default={name:"login",data:function(){return{phone:"",psw:"",curTime:0,disableGetVerify:!1}},methods:{back:function(){this.$router.back()},sendVerifyCode:function(){var t=this;this.disableGetVerify||n.i(s.c)({phone:this.phone}).then(function(e){e=e.data,e.success&&(t.disableGetVerify=!0,t.curTime=59,t.verifyTimer=setInterval(function(e){0===--t.curTime&&(clearInterval(t.verifyTimer),t.disableGetVerify=!1)},1e3))}).catch(function(t){})},loginAction:function(){if(this.phone&&this.psw){var t=s.d;this.inVerifyMode||(t=s.e),t({phone:this.phone,verifyCode:this.psw}).then(function(t){t=t.data,t.success}).catch(function(t){})}}},watch:{$route:function(){this.psw=""}},computed:{inVerifyMode:function(){return"login::verify"===this.$route.name},loginInExtra:function(){return this.inVerifyMode?{path:"login::psw",name:"账号密码登录",placeholder:"请输入验证码",verifyType:"text"}:{path:"login::verify",name:"免密码登录",placeholder:"请输入密码",verifyType:"password"}}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(107),i=n.n(s);e.default={name:"s",data:function(){return{settings1:[{name:"我的故事",icon:"../../assets/xicon-story.png"},{name:"我的收藏",icon:"../../assets/xicon-collect.png"},{name:"我的赞",icon:"../../assets/xicon-up-setting.png"},{name:"我的问答",icon:"../../assets/xicon-answer.png"}],settings2:[{name:"设置",icon:""}]}},components:{SettingItem:i.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"psw",data:function(){return{msg:""}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(105),i=n.n(s);e.default={name:"s",data:function(){return{}},methods:{},components:{XFooter:i.a}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,,function(t,e,n){function s(t){n(95)}var i=n(1)(n(51),n(118),s,"data-v-3c19d1ba",null);t.exports=i.exports},function(t,e,n){function s(t){n(98)}var i=n(1)(n(52),n(121),s,"data-v-7b24ef03",null);t.exports=i.exports},function(t,e,n){function s(t){n(91)}var i=n(1)(n(53),n(114),s,"data-v-09ce28c7",null);t.exports=i.exports},function(t,e,n){function s(t){n(94)}var i=n(1)(n(54),n(117),s,"data-v-2b008cb9",null);t.exports=i.exports},function(t,e,n){function s(t){n(96)}var i=n(1)(n(55),n(119),s,"data-v-401d221c",null);t.exports=i.exports},function(t,e,n){function s(t){n(99)}var i=n(1)(n(56),n(122),s,"data-v-c04d4e9e",null);t.exports=i.exports},function(t,e,n){function s(t){n(97)}var i=n(1)(n(57),n(120),s,"data-v-406de066",null);t.exports=i.exports},function(t,e,n){function s(t){n(90)}var i=n(1)(n(58),n(113),s,"data-v-03422c34",null);t.exports=i.exports},function(t,e,n){function s(t){n(92)}var i=n(1)(n(59),n(115),s,"data-v-1b776b91",null);t.exports=i.exports},function(t,e,n){function s(t){n(93)}var i=n(1)(n(60),n(116),s,"data-v-280796f0",null);t.exports=i.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mine"},[t._m(0),t._v(" "),n("ul",{staticClass:"mine-setting-module"},t._l(t.settings1,function(t,e){return n("setting-item",{key:e,attrs:{item:t}})})),t._v(" "),n("ul",{staticClass:"mine-setting-module"},t._l(t.settings2,function(t,e){return n("setting-item",{key:e,attrs:{item:t}})}))])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mine-info"},[n("div",{staticClass:"mine-info-top"},[n("h2",[t._v("我的")])]),t._v(" "),n("div",{staticClass:"mine-avatar"}),t._v(" "),n("p",{staticClass:"mine-sign"},[t._v("登录彩米")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",{staticClass:"footer"},[n("router-link",{staticClass:"footer-item main",attrs:{to:{name:"s::list"}}},[n("i",{staticClass:"xicon xicon-main"}),t._v(" "),n("br"),t._v(" "),n("span",{staticClass:"name"},[t._v("首页")])]),t._v(" "),t._m(0),t._v(" "),n("router-link",{staticClass:"footer-item mine",attrs:{to:{name:"s::mine"}}},[n("i",{staticClass:"xicon xicon-mine"}),t._v(" "),n("br"),t._v(" "),n("span",{staticClass:"name"},[t._v("我的")])])],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"footer-item add"},[n("i",{staticClass:"xicon xicon-add"})])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"psw"},[t._v("\n  找回密码页面\n\n  "),n("input",{attrs:{type:"",name:""}})])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"s"},[n("router-view",{staticClass:"content"}),t._v(" "),n("x-footer",{staticClass:"footer"})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{staticClass:"header"},[n("ul",{staticClass:"list"},t._l(t.items,function(e){return n("li",{staticClass:"list-item",class:{active:e.active},on:{click:function(n){t.handleClick(e.code)}}},[t._v(t._s(e.name))])}))])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("h1",[t._v(t._s(t.msg))]),t._v(" "),n("h2",[t._v("Essential Links")]),t._v(" "),t._m(0),t._v(" "),n("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("Core Docs")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[t._v("Forum")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://gitter.im/vuejs/vue",target:"_blank"}},[t._v("Gitter Chat")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[t._v("Twitter")])]),t._v(" "),n("br"),t._v(" "),n("li",[n("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[t._v("Docs for This Template")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[t._v("vue-router")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[t._v("vuex")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[t._v("vue-loader")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[t._v("awesome-vue")])])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",{staticClass:"setting-item"},[n("span",{staticClass:"xicon xicon-setting",attrs:{src:t.item.icon,alt:""}}),t._v(" "),n("div",{staticClass:"setting-name"},[t._v(t._s(t.item.name))])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"login"},[n("div",{staticClass:"top"},[n("div",{staticClass:"back xicon",on:{click:t.back}},[t._v("返回")]),t._v(" "),n("router-link",{staticClass:"new-account",attrs:{to:{name:"psw"}}},[t._v("注册")])],1),t._v(" "),n("div",{staticClass:"content",class:{"verify-mode":t.inVerifyMode}},[n("form",{staticClass:"info-form"},[n("div",{staticClass:"xinput-wrapper"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.phone,expression:"phone"}],staticClass:"xinput",attrs:{type:"text",placeholder:"请输入手机号"},domProps:{value:t.phone},on:{input:function(e){e.target.composing||(t.phone=e.target.value)}}})]),t._v(" "),n("div",{staticClass:"xinput-wrapper with-verify"},[t.inVerifyMode?[n("input",{directives:[{name:"model",rawName:"v-model",value:t.psw,expression:"psw"}],staticClass:"xinput",attrs:{type:"text",placeholder:t.loginInExtra.placeholder},domProps:{value:t.psw},on:{input:function(e){e.target.composing||(t.psw=e.target.value)}}})]:[n("input",{directives:[{name:"model",rawName:"v-model",value:t.psw,expression:"psw"}],staticClass:"xinput",attrs:{type:"password",placeholder:t.loginInExtra.placeholder},domProps:{value:t.psw},on:{input:function(e){e.target.composing||(t.psw=e.target.value)}}})],t._v(" "),n("div",{staticClass:"verify-code",class:{disabled:t.disableGetVerify},on:{click:t.sendVerifyCode}},[t._v("\n          "+t._s(t.disableGetVerify?"重新发送("+t.curTime+"s)":"发送验证码")+"\n        ")])],2),t._v(" "),n("input",{staticClass:"xbtn xbtn-large login-btn",attrs:{type:"button",value:"登录"},on:{click:t.loginAction}})]),t._v(" "),n("div",{staticClass:"extras"},[n("router-link",{staticClass:"account",attrs:{to:{name:t.loginInExtra.path}}},[t._v(t._s(t.loginInExtra.name))]),t._v(" "),n("router-link",{staticClass:"forget",attrs:{to:{name:"psw"}}},[t._v("忘记密码")])],1)])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"essay-desc-item"},["content"===t.item.type?[n("div",{staticClass:"user"},[n("img",{staticClass:"avatar",attrs:{src:t.item.userInfo.avatar}}),t._v(" "),n("div",{staticClass:"name"},[t._v(t._s(t.item.userInfo.nickName))]),t._v(" "),n("div",{staticClass:"follow"},[t.item.userInfo.follow?[t._v("已关注")]:[t._v("+ 关注")]],2)]),t._v(" "),n("div",{staticClass:"image-list",attrs:{type:t.item.images.length}},[t._l(t.item.images,function(t,e){return n("img",{staticClass:"image-list-item",attrs:{index:e,src:t}})}),t._v(" "),n("div",{class:{"has-voice":t.item.hasVoice}})],2),t._v(" "),n("div",{staticClass:"desc"},[t._v(t._s(t.item.content))]),t._v(" "),n("div",{staticClass:"opr"},[n("div",{staticClass:"up"},[n("i",{staticClass:"xicon xicon-up",class:{"xicon-up--liked":t.item.like}}),t._v("\n        "+t._s(t.item.likeNum)+"\n      ")]),t._v(" "),n("div",{staticClass:"comment"},[n("i",{staticClass:"xicon xicon-comment"}),t._v("\n        "+t._s(t.item.commentNum)+"\n      ")]),t._v(" "),n("div",{staticClass:"time"},[t._v("\n        2017.7.12 16:40\n      ")])])]:t._e(),t._v(" "),"banner"===t.item.type?[n("a",{attrs:{href:t.item.url}},[n("img",{staticClass:"image",attrs:{src:t.item.imageUrl}})])]:t._e()],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"list"},[n("x-header",{staticClass:"header",attrs:{items:t.categories},on:{"to-certain-item":t.toItem}}),t._v(" "),n("div",{staticClass:"essays optimize-scroll",on:{scroll:t.loadEassy}},t._l(t.essays,function(t){return n("essay-desc-item",{key:t.contentId,staticClass:"essay-desc-item",attrs:{item:t}})}))],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]}}],[48]);
//# sourceMappingURL=app.dcf89aeeb07abe830ce3.js.map