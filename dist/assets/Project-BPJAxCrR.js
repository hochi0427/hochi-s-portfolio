import{_,o as s,c as o,a as t,t as i,b as u,w as C,d as D,v as $,e as v,T as b,s as w,F as h,r as g,f,g as d}from"./index-BOL9qK0c.js";const x={props:{demonstrate:{type:Object,required:!0}}},S={class:"card"},B={class:"card_text"};function N(a,r,c,m,l,e){return s(),o("div",S,[t("span",B,i(c.demonstrate.name),1)])}const T=_(x,[["render",N]]),q={props:{demonstrate:{type:Object,required:!0}},data(){return{isCollapsed:!0}},methods:{toggleCollapse(){this.isCollapsed=!this.isCollapsed}},computed:{formattedDescription(){return this.demonstrate.description.replace(/\n/g,"<br>")}}},L={class:"collapse-container"},V={class:"collapse-content"},F=["innerHTML"];function H(a,r,c,m,l,e){return s(),o("div",L,[t("button",{class:"collapse-toggle",onClick:r[0]||(r[0]=(...p)=>e.toggleCollapse&&e.toggleCollapse(...p))},i(l.isCollapsed?"▼ "+c.demonstrate.name:"▲ "+c.demonstrate.name),1),u(b,null,{default:C(()=>[D(t("div",V,[this.isCollapsed?v("",!0):(s(),o("p",{key:0,innerHTML:e.formattedDescription},null,8,F))],512),[[$,!l.isCollapsed]])]),_:1})])}const I=_(q,[["render",H],["__scopeId","data-v-b6a20968"]]),M={props:{id:{type:Number,required:!0}},computed:{project(){return w.projects.find(a=>a.id===this.id)}},components:{DemonstrateCard:T,Collapse:I}},O={key:0,class:"project"},E={class:"project-details"},P=["src","alt"],z={class:"demonstrates"},A={class:"cards-wrapper"},G={class:"cards"};function J(a,r,c,m,l,e){const p=d("Collapse"),j=d("DemonstrateCard"),k=d("router-link"),y=d("router-view");return s(),o("div",null,[e.project?(s(),o("section",O,[t("h1",null,i(e.project.name),1),t("div",E,[t("img",{src:`/hochi-s-portfolio/images/${e.project.image}`,alt:e.project.name},null,8,P),t("div",null,[t("p",null,i(e.project.description),1),(s(!0),o(h,null,g(e.project.demonstrates.slice(0,2),n=>(s(),o("div",{key:n.slug},[u(p,{demonstrate:n},null,8,["demonstrate"])]))),128))])])])):v("",!0),t("section",z,[r[0]||(r[0]=t("h2",null,"System Introduction",-1)),t("div",A,[t("div",G,[(s(!0),o(h,null,g(e.project.demonstrates.slice(2),n=>(s(),f(k,{key:n.slug,to:{name:"demonstrate",params:{demonstrateSlug:n.slug}}},{default:C(()=>[u(j,{demonstrate:n},null,8,["demonstrate"])]),_:2},1032,["to"]))),128))])]),(s(),f(y,{key:a.$route.params.demonstrateSlug}))])])}const Q=_(M,[["render",J]]);export{Q as default};
