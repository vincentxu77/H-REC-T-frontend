import{d as f,m as g,e as c,o as C,c as x,b as t,w as o,a as n,t as l,T as k,f as y,_ as N}from"./index-BUe-CBK6.js";const D={class:"historical-table"},v={class:"product-name-color"},T={class:"code-color"},B={class:"product-name-color"},V=f({__name:"HistoricalTable",props:{data:{}},emits:["row-click"],setup(r,{emit:i}){const d=s=>s.code?s.code:`A1${Math.floor(1e4+Math.random()*9e4)}`,p=r,m=i,_=s=>{m("row-click",s)},u=g(()=>p.data);return(s,b)=>{const e=c("el-table-column"),h=c("el-tag"),w=c("el-table");return C(),x("div",D,[t(w,{data:u.value,style:{width:"100%"},border:!0,stripe:!0,"highlight-current-row":"",onRowClick:_},{default:o(()=>[t(e,{prop:"trader",label:"交易员","min-width":"120"}),t(e,{prop:"product",label:"产品","min-width":"150"},{default:o(({row:a})=>[n("span",v,l(a.product),1)]),_:1}),t(e,{label:"标的物代码","min-width":"150"},{default:o(({row:a})=>[n("span",T,l(d(a)),1)]),_:1}),t(e,{prop:"projectName",label:"标的物名称","min-width":"120"},{default:o(({row:a})=>[n("span",B,l(a.projectName),1)]),_:1}),t(e,{prop:"date",label:"到期日","min-width":"120"}),t(e,{prop:"bs",label:"买卖","min-width":"80"},{default:o(({row:a})=>[n("span",{class:k({"text-green-500":a.bs==="买入","text-red-500":a.bs==="卖出"})},l(a.bs),3)]),_:1}),t(e,{prop:"quantity",label:"数量(手)","min-width":"100"}),t(e,{prop:"price",label:"价格(CNY)","min-width":"100"}),t(e,{prop:"settleDate",label:"成交日期","min-width":"120"}),t(e,{prop:"time",label:"时间","min-width":"100"}),t(e,{prop:"counterparty",label:"对手方","min-width":"120"}),t(e,{prop:"status",label:"状态","min-width":"100"},{default:o(({row:a})=>[t(h,{type:a.status==="撤销"?"danger":"success",size:"small"},{default:o(()=>[y(l(a.status),1)]),_:2},1032,["type"])]),_:1})]),_:1},8,["data"])])}}}),z=N(V,[["__scopeId","data-v-ae1a6309"]]);export{z as default};
