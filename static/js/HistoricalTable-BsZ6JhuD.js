import{d as u,x as h,c as w,b as t,w as l,e as o,o as f,a as x,t as i,U as g,f as C,_ as k}from"./index-DdmEF7Ck.js";const y={class:"historical-table"},N=u({__name:"HistoricalTable",props:{data:{}},emits:["row-click"],setup(n,{emit:r}){const c=n,p=r,d=s=>{p("row-click",s)},m=h(()=>c.data);return(s,v)=>{const e=o("el-table-column"),_=o("el-tag"),b=o("el-table");return f(),w("div",y,[t(b,{data:m.value,style:{width:"100%"},border:!0,stripe:!0,"highlight-current-row":"",onRowClick:d},{default:l(()=>[t(e,{prop:"trader",label:"交易员","min-width":"120"}),t(e,{prop:"product",label:"产品","min-width":"150"}),t(e,{prop:"projectName",label:"合约名称","min-width":"120"}),t(e,{prop:"date",label:"到期日","min-width":"120"}),t(e,{prop:"bs",label:"买卖","min-width":"80"},{default:l(({row:a})=>[x("span",{class:g({"text-green-500":a.bs==="买入","text-red-500":a.bs==="卖出"})},i(a.bs),3)]),_:1}),t(e,{prop:"quantity",label:"数量(手)","min-width":"100"}),t(e,{prop:"price",label:"价格(CNY)","min-width":"100"}),t(e,{prop:"settleDate",label:"成交日期","min-width":"120"}),t(e,{prop:"time",label:"时间","min-width":"100"}),t(e,{prop:"counterparty",label:"对手方","min-width":"120"}),t(e,{prop:"status",label:"状态","min-width":"100"},{default:l(({row:a})=>[t(_,{type:a.status==="撤销"?"danger":"success",size:"small"},{default:l(()=>[C(i(a.status),1)]),_:2},1032,["type"])]),_:1})]),_:1},8,["data"])])}}}),D=k(N,[["__scopeId","data-v-5111dd98"]]);export{D as default};
