import{d as b,r as v,e as s,o as a,c as n,a as t,F as y,m as C,t as o,b as l,w as r,f as i,U as g,u as k,ab as w,aA as A,_ as h}from"./index-DdmEF7Ck.js";const B={class:"flex items-center"},M={class:"flex-1"},N=b({name:"AccountManagement",__name:"AccountManagement",setup(V){const u=v([{title:"账户密码",illustrate:"当前密码强度：强",button:"修改"},{title:"密保手机",illustrate:"已经绑定手机：158****6789",button:"修改"},{title:"密保问题",illustrate:"未设置密保问题，密保问题可有效保护账户安全",button:"修改"},{title:"备用邮箱",illustrate:"已绑定邮箱：pure***@163.com",button:"修改"}]);function _(m){A("请根据具体业务自行实现",{type:"success"})}return(m,c)=>{const d=s("el-text"),p=s("el-button"),f=s("el-divider");return a(),n("div",{class:g(["min-w-[180px]",k(w)()?"max-w-[100%]":"max-w-[70%]"])},[c[0]||(c[0]=t("h3",{class:"my-8"},"账户管理",-1)),(a(!0),n(y,null,C(u.value,(e,x)=>(a(),n("div",{key:x},[t("div",B,[t("div",M,[t("p",null,o(e.title),1),l(d,{class:"mx-1",type:"info"},{default:r(()=>[i(o(e.illustrate),1)]),_:2},1024)]),l(p,{type:"primary",text:"",onClick:F=>_()},{default:r(()=>[i(o(e.button),1)]),_:2},1032,["onClick"])]),l(f)]))),128))],2)}}}),D=h(N,[["__scopeId","data-v-c4b71ab0"]]);export{D as default};
