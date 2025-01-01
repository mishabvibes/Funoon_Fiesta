import{j as e}from"./animations-C7zvLhC6.js";import{a,u as s}from"./vendor-D-wlk8X7.js";import{c as t,u as r}from"./index-lAmFerv5.js";
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=t("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]),d=t("Pen",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]]),i=t("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]),n=t("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]),o=t("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),c=({isOpen:a,onClose:s,onConfirm:t,itemName:r})=>a?e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/50",children:e.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4",children:e.jsx("div",{className:"p-6",children:e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"w-12 h-12 mx-auto mb-4 text-red-500",children:e.jsx(o,{className:"w-full h-full"})}),e.jsxs("h2",{className:"text-xl font-bold mb-2 text-gray-800 dark:text-white",children:["Delete ",r,"?"]}),e.jsxs("div",{className:"flex justify-end space-x-4 mt-4",children:[e.jsx("button",{onClick:s,className:"px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600",children:"Cancel"}),e.jsx("button",{onClick:t,className:"px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600",children:"Delete"})]})]})})})}):null,x=({label:a,value:s})=>e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{className:"text-sm font-medium text-gray-500 dark:text-gray-400",children:a}),e.jsx("span",{className:"text-sm text-gray-800 dark:text-gray-200",children:s})]}),m=({result:a,onDelete:s,onEdit:t,isDeleting:r})=>e.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 "+(r?"opacity-50":""),children:[e.jsx("div",{className:"p-4 bg-gray-50 dark:bg-gray-700",children:e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-800 dark:text-white truncate",children:a.programName}),e.jsxs("div",{className:"flex space-x-2",children:[e.jsx("button",{onClick:()=>t(a),disabled:r,className:"p-2 text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors",children:e.jsx(d,{className:"w-4 h-4"})}),e.jsx("button",{onClick:()=>s(a._id),disabled:r,className:"p-2 text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors",children:e.jsx(n,{className:"w-4 h-4"})})]})]})}),e.jsx("div",{className:"p-4",children:e.jsxs("div",{className:"space-y-2",children:[e.jsx(x,{label:"Student",value:a.studentName}),e.jsx(x,{label:"Prize",value:a.prize}),e.jsx(x,{label:"Team",value:a.teamName}),e.jsx(x,{label:"Category",value:a.category}),e.jsx(x,{label:"Stage",value:a.stage}),a.grade&&e.jsx(x,{label:"Grade",value:a.grade}),e.jsx(x,{label:"Points",value:a.points})]})})]}),g=()=>{const{results:t,deleteResult:d,refreshResults:n}=r(),[o,x]=a.useState(""),[g,u]=a.useState({isOpen:!1,resultId:null,programName:""}),[h,y]=a.useState(new Set),p=s();a.useEffect((()=>{n()}),[n]);const b=t.filter((e=>e.programName.toLowerCase().includes(o.toLowerCase()))),j=e=>p("/addresult",{state:{result:e}}),N=e=>{const a=t.find((a=>a._id===e));u({isOpen:!0,resultId:e,programName:(null==a?void 0:a.programName)||"Result"})};return e.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:[e.jsx(c,{isOpen:g.isOpen,onClose:()=>u({isOpen:!1,resultId:null,programName:""}),onConfirm:async()=>{const{resultId:e}=g;if(u({isOpen:!1,resultId:null,programName:""}),e)try{y((a=>new Set([...a,e]))),await d(e)}catch(a){}finally{y((a=>{const s=new Set(a);return s.delete(e),s}))}},itemName:g.programName}),e.jsxs("div",{className:"mb-8",children:[e.jsxs("div",{className:"flex justify-between items-center mb-6",children:[e.jsx("h1",{className:"text-3xl font-bold text-gray-900 dark:text-white",children:"Results Dashboard"}),e.jsx("button",{onClick:()=>p("/addresult"),className:"inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors",children:"Add New Result"})]}),e.jsxs("div",{className:"flex gap-4 mb-6",children:[e.jsxs("div",{className:"relative flex-1",children:[e.jsx(i,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"}),e.jsx("input",{type:"text",placeholder:"Search programs...",value:o,onChange:e=>x(e.target.value),className:"w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"})]}),e.jsxs("button",{className:"px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors inline-flex items-center",children:[e.jsx(l,{className:"w-4 h-4 mr-2"}),"Filters"]})]})]}),b.length>0?e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:b.map((a=>e.jsx(m,{result:a,onDelete:N,onEdit:j,isDeleting:h.has(a._id)},a._id)))}):e.jsx("div",{className:"bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4",children:e.jsx("p",{className:"text-gray-600 dark:text-gray-300 text-center",children:"No results found. Try adjusting your search criteria or add a new result."})})]})},u=()=>e.jsx("section",{children:e.jsx(g,{})});
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */export{u as default};