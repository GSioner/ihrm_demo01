(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3c6def9a"],{"173b":function(e,t,n){},"5bbb":function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));n("d3b7"),n("159b");function r(e,t){var n=[];return e.forEach((function(a){if(""===a.pid&&(a["icon"]="chart"),a.pid===t){var o=r(e,a.id);o.length&&(a["children"]=o),n.push(a)}})),n}},7424:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"setting"},[n("div",{staticClass:"topBar"},[n("el-tabs",{model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[e.rander?n("el-tab-pane",{attrs:{label:"角色管理",name:"first"}},[n("RoleManagement",{attrs:{show:e.promissionShow,"role-show":e.roleShow},on:{changeShow:e.changeShow,sendRoleInfo:e.sendRoleInfo,reRander:e.reRander}})],1):e._e(),n("el-tab-pane",{attrs:{label:"公司信息",name:"second"}},[n("CompanyInfo")],1)],1)],1),n("PromissionDialog",{attrs:{show:e.promissionShow,"row-data":e.rowData,"permission-list":e.permissionList},on:{changeShow:e.changeShow}}),n("EditRoleInfo",{attrs:{"role-data":e.rowData,show:e.roleShow},on:{changeRoleShow:e.changeRoleShow,reRander:e.reRander}})],1)},a=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"role"},[n("div",{staticClass:"addBtn"},[n("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){return e.addBtn("add")}}},[e._v("新增角色")])],1),n("el-table",{staticClass:"montherTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",stripe:!0,"highlight-current-row":!0}},[n("el-table-column",{attrs:{label:"序号",width:"100px",align:"center",type:"index",index:e.indexMethod}}),n("el-table-column",{attrs:{prop:"name",label:"角色",width:"200px",align:"center"}}),n("el-table-column",{attrs:{prop:"description",label:"描述","min-width":"",align:"center"}}),n("el-table-column",{attrs:{label:"操作","min-width":"",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"success",size:"small"},on:{click:function(n){return e.promissionBtn(t.$index,t.row)}}},[e._v("分配权限")]),n("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(n){return e.editBtn(t.$index,t.row)}}},[e._v("编辑")]),n("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(n){return e.deleteBtn(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),n("div",{staticClass:"page"},[n("span",{staticClass:"demonstration"},[e._v("共 "+e._s(e.page.page)+" 条")]),n("el-pagination",{attrs:{layout:"prev, pager, next",total:e.page.total,"page-size":e.page.pagesize,"current-page":e.page.page},on:{"update:currentPage":function(t){return e.$set(e.page,"page",t)},"update:current-page":function(t){return e.$set(e.page,"page",t)},"current-change":e.handleCurrentChange}})],1)],1)},s=[],i=n("c7eb"),c=n("1da1"),l=(n("d3b7"),n("159b"),n("c740"),n("90e7")),u=n("5bbb"),f={props:{show:{type:Boolean,default:!1},roleShow:{type:Boolean,default:!1}},data:function(){return{tableData:[],page:{page:1,pagesize:10,total:0}}},created:function(){this.getRoleInfo()},methods:{promissionBtn:function(e,t){var n=this;return Object(c["a"])(Object(i["a"])().mark((function e(){var r;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.getRolePermission(t.id);case 2:r=e.sent,n.$emit("changeShow",!n.show,t,r);case 4:case"end":return e.stop()}}),e)})))()},editBtn:function(e,t){this.$emit("sendRoleInfo",!this.roleShow,t)},deleteBtn:function(e,t){this.deleteDialog(t.id)},addBtn:function(e){this.$emit("sendRoleInfo",!this.roleShow,e)},indexMethod:function(e){return e+1},getRoleInfo:function(){var e=this;return Object(c["a"])(Object(i["a"])().mark((function t(){var n;return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["f"])(e.page);case 2:n=t.sent,e.total=n.total,e.tableData=n.rows;case 5:case"end":return t.stop()}}),t)})))()},handleCurrentChange:function(e){this.page.page=e,this.getRoleInfo()},getRolePermission:function(e){return Object(c["a"])(Object(i["a"])().mark((function t(){var n,r,a,o,s;return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=[],t.next=3,Object(l["e"])();case 3:return r=t.sent,r.forEach((function(e,t){e.perid=t})),a=Object(u["a"])(r,"0"),t.next=8,Object(l["g"])(e);case 8:return o=t.sent,s=o.permIds,r.forEach((function(e){var t=s.findIndex((function(t){return t===e.id}));-1!==t&&n.push(e.perid)})),t.abrupt("return",Promise.resolve({arr:n,base:a}));case 12:case"end":return t.stop()}}),t)})))()},deleteDialog:function(e){var t=this;this.$confirm("此操作将永久删除该权限角色信息，是否继续？","警告",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(c["a"])(Object(i["a"])().mark((function n(){return Object(i["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(l["b"])(e);case 2:t.$emit("reRander"),t.$message.success("删除成功");case 4:case"end":return n.stop()}}),n)})))).catch((function(){t.$message.info("已取消删除")}))}}},d=f,m=(n("aa2f"),n("2877")),h=Object(m["a"])(d,o,s,!1,null,"5fbbae2a",null),p=h.exports,b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"company"},[n("div",{staticClass:"top"},[n("el-alert",{attrs:{title:e.txt,type:"info","show-icon":""}})],1),n("div",{staticClass:"text"},[n("el-form",{ref:"form",attrs:{model:e.form,"label-width":"120px"}},[n("el-form-item",{attrs:{label:"公司名称"}},[n("el-input",{staticClass:"length",attrs:{disabled:!0},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),n("el-form-item",{attrs:{label:"公司地址"}},[n("el-input",{staticClass:"length",attrs:{disabled:!0},model:{value:e.form.companyAddress,callback:function(t){e.$set(e.form,"companyAddress",t)},expression:"form.companyAddress"}})],1),n("el-form-item",{attrs:{label:"公司邮箱"}},[n("el-input",{staticClass:"length",attrs:{disabled:!0},model:{value:e.form.mailbox,callback:function(t){e.$set(e.form,"mailbox",t)},expression:"form.mailbox"}})],1),n("el-form-item",{attrs:{label:"备注"}},[n("el-input",{staticClass:"length",attrs:{disabled:!0,type:"textarea",maxlength:"300",rows:"4"},model:{value:e.form.remarks,callback:function(t){e.$set(e.form,"remarks",t)},expression:"form.remarks"}})],1)],1)],1)])},w=[],g={data:function(){return{txt:"对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改",form:{name:"",companyAddress:"",mailbox:"",remarks:""}}},created:function(){this.getCompanyInfo()},methods:{getCompanyInfo:function(){var e=this;return Object(c["a"])(Object(i["a"])().mark((function t(){var n;return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["d"])();case 2:n=t.sent,e.form=n[0];case 4:case"end":return t.stop()}}),t)})))()}}},v=g,x=(n("b750"),Object(m["a"])(v,b,w,!1,null,"56e62b50",null)),O=x.exports,j=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-dialog",{attrs:{title:"分配权限",visible:e.promissionShow},on:{"update:visible":function(t){e.promissionShow=t}}},[n("el-tree",{attrs:{"check-strictly":"",data:e.perList,"show-checkbox":"","node-key":"perid",props:e.defaultProps,"default-expand-all":!0,"default-checked-keys":e.showList},on:{"check-change":e.handleNodeClick}}),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.changeShow(1)}}},[e._v("确 定")]),n("el-button",{on:{click:function(t){return e.changeShow(0)}}},[e._v("取 消")])],1)],1)],1)},y=[],k=(n("a434"),{props:{show:{type:Boolean,default:!1},permissionList:{type:[Array,Object],default:function(){return{}}},rowData:{type:[Object,String],default:function(){return{}}}},data:function(){return{perList:[],defaultProps:{children:"children",label:"name"},showList:[],showDialog:!0,id:"",realPermission:[]}},computed:{promissionShow:{set:function(){},get:function(){return this.show}}},watch:{promissionShow:function(){this.randerData()}},methods:{changeShow:function(e){e&&this.sendRolePermission(),this.$emit("changeShow",!this.show)},handleNodeClick:function(e){var t=this;return Object(c["a"])(Object(i["a"])().mark((function n(){var r,a;return Object(i["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:r=e.id,a=t.realPermission.findIndex((function(e){return e===r})),-1===a?t.realPermission.push(r):t.realPermission.splice(a,1);case 3:case"end":return n.stop()}}),n)})))()},randerData:function(){var e=this;return Object(c["a"])(Object(i["a"])().mark((function t(){var n,r;return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.perList=e.permissionList.base,e.showList=e.permissionList.arr,e.id=e.rowData.id,t.next=5,Object(l["g"])(e.id);case 5:n=t.sent,r=n.permIds,e.realPermission=r;case 8:case"end":return t.stop()}}),t)})))()},sendRolePermission:function(){var e=this;return Object(c["a"])(Object(i["a"])().mark((function t(){var n;return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={id:e.id,permIds:e.realPermission},t.next=3,Object(l["h"])(n);case 3:e.$message.success("权限修改成功");case 4:case"end":return t.stop()}}),t)})))()},clearData:function(e){e.forEach((function(t){var n=e.findIndex((function(e){return"number"===typeof e}));-1!==n&&e.splice(n,1)}))}}}),S=k,R=Object(m["a"])(S,j,y,!1,null,null,null),$=R.exports,C=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-dialog",{attrs:{title:"编辑角色",visible:e.editRoleShow,width:"60%","destroy-on-close":!0},on:{"update:visible":function(t){e.editRoleShow=t}}},[n("el-form",{attrs:{model:e.form,rules:e.formRules}},[n("el-form-item",{attrs:{label:"角色名称","label-width":"15%",prop:"name"}},[n("el-input",{attrs:{placeholder:"请输入2-12个字符的角色名称"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),n("el-form-item",{attrs:{label:"角色描述","label-width":"15%"}},[n("el-input",{attrs:{placeholder:"请输入角色描述"},model:{value:e.form.description,callback:function(t){e.$set(e.form,"description",t)},expression:"form.description"}})],1)],1),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.changeRoleShow(1)}}},[e._v("确 定")]),n("el-button",{on:{click:function(t){return e.changeRoleShow(0)}}},[e._v("取 消")])],1)],1)},D=[],_={props:{roleData:{type:[Object,String],default:function(){return{}}},show:{type:Boolean,default:!1}},data:function(){return{form:{name:"",description:""},formRules:{name:[{required:!0,trigger:"blur",message:"请输入角色名称"},{min:2,max:12,trigger:"blur",message:"请输入正确的角色名称"}]}}},computed:{editRoleShow:{set:function(){},get:function(){return this.show}}},watch:{roleData:function(){var e=this;return Object(c["a"])(Object(i["a"])().mark((function t(){var n;return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if("add"===e.roleData){t.next=5;break}return t.next=3,Object(l["g"])(e.roleData.id);case 3:n=t.sent,e.form=n;case 5:case"end":return t.stop()}}),t)})))()}},methods:{changeRoleShow:function(e){var t=this;return Object(c["a"])(Object(i["a"])().mark((function n(){return Object(i["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!e){n.next=10;break}if("add"!==t.roleData){n.next=7;break}return n.next=4,Object(l["a"])(t.form);case 4:t.$message.success("添加成功！"),n.next=10;break;case 7:return n.next=9,Object(l["c"])(t.form,t.form.id);case 9:t.$message.success("编辑成功!");case 10:t.form={name:"",description:""},t.$emit("changeRoleShow",!t.show),t.$emit("reRander");case 13:case"end":return n.stop()}}),n)})))()}}},I=_,P=(n("e555"),Object(m["a"])(I,C,D,!1,null,"3af557ef",null)),B=P.exports,E={components:{RoleManagement:p,CompanyInfo:O,PromissionDialog:$,EditRoleInfo:B},data:function(){return{activeName:"first",promissionShow:!1,rowData:"",permissionList:[],roleShow:!1,rander:!0}},methods:{changeShow:function(e,t,n){this.promissionShow=e,t&&(this.rowData=t),this.permissionList=n},sendRoleInfo:function(e,t){this.roleShow=e,this.rowData=t},changeRoleShow:function(e){this.roleShow=e},reRander:function(){var e=this;this.rander=!1,setTimeout((function(){e.rander=!0}),0)}}},L=E,T=(n("f545"),Object(m["a"])(L,r,a,!1,null,"5789de37",null));t["default"]=T.exports},7507:function(e,t,n){},"90e7":function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"f",(function(){return o})),n.d(t,"e",(function(){return s})),n.d(t,"g",(function(){return i})),n.d(t,"h",(function(){return c})),n.d(t,"c",(function(){return l})),n.d(t,"b",(function(){return u})),n.d(t,"a",(function(){return f}));var r=n("b775"),a=function(){return Object(r["a"])({url:"/company"})},o=function(e){return Object(r["a"])({url:"/sys/role",params:e})},s=function(){return Object(r["a"])({url:"/sys/permission"})},i=function(e){return Object(r["a"])({url:"/sys/role/".concat(e)})},c=function(e){return Object(r["a"])({url:"/sys/role/assignPrem",method:"PUT",data:e})},l=function(e,t){return Object(r["a"])({url:"/sys/role/".concat(t),method:"PUT",data:e})},u=function(e){return Object(r["a"])({url:"/sys/role/".concat(e),method:"DELETE"})},f=function(e){return Object(r["a"])({url:"/sys/role",method:"POST",data:e})}},aa2f:function(e,t,n){"use strict";n("7507")},b750:function(e,t,n){"use strict";n("d4fb")},d4fb:function(e,t,n){},e555:function(e,t,n){"use strict";n("173b")},f545:function(e,t,n){"use strict";n("ff93")},ff93:function(e,t,n){}}]);