(this["webpackJsonpphone-book"]=this["webpackJsonpphone-book"]||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(4),r=t(3),u=t(0),l=t.n(u),o=t(14),c=t.n(o),i=function(e){var n=e.tag,t=e.value,a=e.handle;return l.a.createElement("div",null,n," ",l.a.createElement("input",{value:t,onChange:a}))},m=function(e){var n=e.handleSubmit,t=e.filter,a=e.handleFilter,r=e.newName,u=e.handleName,o=e.newNum,c=e.handleNum;return l.a.createElement(l.a.Fragment,null,l.a.createElement("form",{onSubmit:n},l.a.createElement(i,{tag:"filter shown with ",value:t,handle:a}),l.a.createElement("h2",null,"add a new"),l.a.createElement(i,{tag:"name: ",value:r,handle:u}),l.a.createElement(i,{tag:"number: ",value:o,handle:c}),l.a.createElement("div",null,l.a.createElement("button",{type:"submit"},"add"))))},d=function(e){var n=e.people,t=e.deleteHandle;return l.a.createElement(l.a.Fragment,null,n.map((function(e){return l.a.createElement("p",null,e.name," ",e.num," ",l.a.createElement("button",{onClick:function(){return t(e.id,e.name)}},"delete"))})))},f=function(e){var n=e.tag;return l.a.createElement("h1",null,n)},s=t(2),h=t.n(s),b="/api/persons",p=function(){return h.a.get(b).then((function(e){return e.data}))},v=function(e){return h.a.post(b,e)},w=function(e,n){return h.a.put("".concat(b,"/").concat(e),n)},E=function(e){return h.a.delete("".concat(b,"/").concat(e))},g=(t(37),function(e){var n=e.message;return null===n?null:l.a.createElement("div",{className:"error"},n)}),j=function(){var e=Object(u.useState)([]),n=Object(r.a)(e,2),t=n[0],o=n[1],c=Object(u.useState)(""),i=Object(r.a)(c,2),s=i[0],h=i[1],b=Object(u.useState)(""),j=Object(r.a)(b,2),O=j[0],N=j[1],k=Object(u.useState)(""),S=Object(r.a)(k,2),y=S[0],F=S[1],C=Object(u.useState)(""),D=Object(r.a)(C,2),T=D[0],H=D[1];Object(u.useEffect)((function(){p().then((function(e){console.log("promise fulfilled"),o(e)}))}),[]);var J=""===y?t:t.filter((function(e){return e.name.toLowerCase().includes(y.toLowerCase())}));return l.a.createElement("div",null,l.a.createElement(f,{tag:"Phonebook"}),""===T?l.a.createElement(l.a.Fragment,null):l.a.createElement(g,{message:T}),l.a.createElement(m,{handleSubmit:function(e){e.preventDefault();var n=!0;t.forEach((function(e){if(e.name===s&&e.num===O)window.alert("".concat(s," is already in phonebook ")),n=!1;else if(e.num===O)window.alert("".concat(O," is already in phonebook ")),n=!1;else if(e.name===s&&e.num!==O){var r=t.find((function(e){return e.name===s})),u=Object(a.a)(Object(a.a)({},r),{},{num:O}),l=!1;window.confirm("".concat(u.name," is already added to phonebook ,replace the old number with the new one?"))&&(l=!0),l?(w(u.id,u).then((function(e){H("".concat(e.data.name," number is changed.")),setTimeout((function(){H(null)}),5e3),o(t.map((function(n){return n.id!==u.id?n:e.data})))})),n=!1):n=!1}})),!1!==n&&(""!==s&&""!==O||(n=!1,window.alert("please add both name and number ")),n&&v({name:s,num:O}).then((function(e){H("".concat(e.data.name," is added to the server.")),setTimeout((function(){H(null)}),5e3),o(t.concat(e.data)),h(""),N("")})))},filter:y,handleFilter:function(e){e.preventDefault(),F(e.target.value)},newName:s,handleName:function(e){h(e.target.value)},newNum:O,handleNum:function(e){N(e.target.value)}}),l.a.createElement(f,{tag:"Numbers"}),l.a.createElement(d,{people:J,deleteHandle:function(e,n){var a=!1;window.confirm("Do you really want to delete ".concat(n,"?"))&&(a=!0),a&&E(e).then((function(a){H("".concat(n,"'s number is deleted.")),setTimeout((function(){H(null)}),5e3),o(t.filter((function(n){return n.id!==e})))})).catch((function(e){alert("something went wrong")}))}}),"...")};c.a.render(l.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.b7a8e15c.chunk.js.map