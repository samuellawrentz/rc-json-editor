"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var React=require("react");function _interopDefaultLegacy(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var DataTypes,React__default=_interopDefaultLegacy(React);!function(e){e.string="string",e.number="number",e.boolean="boolean",e.array="array",e.object="object"}(DataTypes=DataTypes||{});class TreeUtils{static convertJSONtoTree(d,s,u="",i=0,p=0){return Object.keys(d).map((e,t)=>{const a=d[e],r=TreeUtils.getType(a),n=Array.isArray(a),l=r===DataTypes.object||r===DataTypes.array,o=(u?u+".":"")+e,c=r===DataTypes.object||n&&!TreeUtils.isAllPrimitive(a)?"":a;return{setSubObject:function(){return this.sub_object=l?TreeUtils.convertJSONtoTree(n?TreeUtils.getObjectFromList(a):a,this,o,i+1,t):[],this},key:e,path:o,parent:s,parentIndex:p,level:i,response_value:c,selected:!1,display_format:r,sub_object:[]}.setSubObject()})}static convertTreetoJSON(e){return e.reduce((e,t)=>{var a;return e[t.key]=t.response_value,t.sub_object.length&&(a=this.convertTreetoJSON(t.sub_object),e[t.key]=t.display_format===DataTypes.array?[a]:a),e},{})}static generateNewNode(e,t){return{key:"key"+((null==e?void 0:e.sub_object.length)||t||0),response_value:"value",display_format:"string",sub_object:[],path:(null==e?void 0:e.path)+".key",level:void 0===(null==e?void 0:e.level)?0:(null==e?void 0:e.level)+1,parent:e}}static isAllPrimitive(e){return e.every(e=>typeof e!==DataTypes.object)}static getType(e){return Array.isArray(e)?DataTypes.array:typeof e===DataTypes.object?DataTypes.object:typeof e}static getObjectFromList(e){return e.reduce((t,a)=>(TreeUtils.getType(a)===DataTypes.object&&Object.keys(a).forEach(e=>t[e]=a[e]),t),{})}}function DefaultItemComponent({item:t,dataRef:a,idx:r,updateSelection:n,addSubItem:e,updateNodeType:l,removeNode:o,updateKey:c}){return React__default.default.createElement(React__default.default.Fragment,null,React__default.default.createElement("div",{className:"checkbox",style:{transform:`translateX(-${32*t.level}px)`}},React__default.default.createElement("input",{type:"checkbox",checked:t.selected,onChange:e=>n(null==a?void 0:a[r],e.target.checked)})),React__default.default.createElement("div",{className:"add",onClick:()=>e(a,r)},"+"),React__default.default.createElement("div",{className:"key"},React__default.default.createElement("input",{value:t.key,onChange:e=>c(t,e.target.value)})),React__default.default.createElement("div",{className:"type"},React__default.default.createElement("select",{value:t.display_format,style:{width:180},onChange:e=>{l(t,e.target.value)}},React__default.default.createElement("option",{value:"array"},"Array"),React__default.default.createElement("option",{value:"string"},"String"),React__default.default.createElement("option",{value:"object"},"Object"),React__default.default.createElement("option",{value:"number"},"Number"),React__default.default.createElement("option",{value:"boolean"},"Boolean"))),React__default.default.createElement("div",{className:"remove",onClick:()=>{o(a,r)}},"➖"))}function styleInject(e,t){var a,r,t=(t=void 0===t?{}:t).insertAt;e&&"undefined"!=typeof document&&(a=document.head||document.getElementsByTagName("head")[0],(r=document.createElement("style")).type="text/css","top"===t&&a.firstChild?a.insertBefore(r,a.firstChild):a.appendChild(r),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(document.createTextNode(e)))}TreeUtils.transformTree=(e,r,n=0,l=0)=>e.map((e,t)=>{var a;return e.parent=r,e.level=n,e.parentIndex=l,null!=(a=e.sub_object)&&a.length&&(e.sub_object=TreeUtils.transformTree(e.sub_object,e,n+1,t)),e});var css_248z='.schema-editor.default input, .schema-editor.default select {\n  height: 24px;\n  margin: 0;\n  font-size: 16px;\n  padding: 0 4px;\n}\n.schema-editor.default .add {\n  border: 1px solid;\n  width: 24px;\n  height: 24px;\n  display: grid;\n  place-items: center;\n}\n.schema-editor.default .remove, .schema-editor.default .add {\n  cursor: pointer;\n}\n.schema-editor .object {\n  flex-basis: 100%;\n}\n.schema-editor .object .object {\n  margin-left: 32px;\n}\n.schema-editor .object .object .item::before {\n  content: "";\n  position: absolute;\n  display: block;\n  height: calc(100% + 16px);\n  top: 0px;\n  left: 8px;\n  width: 1px;\n  background-color: #000;\n}\n.schema-editor .object .object .item:after {\n  position: absolute;\n  display: block;\n  content: "";\n  width: 16px;\n  height: 1px;\n  background-color: #000;\n  top: 16px;\n  left: 8px;\n}\n.schema-editor .object .object .item:last-child:before {\n  height: 16px;\n}\n.schema-editor .object .item {\n  margin-top: 16px;\n  position: relative;\n  display: flex;\n  column-gap: 16px;\n  align-items: center;\n  flex-wrap: wrap;\n}';styleInject(css_248z);const TreeContext=React__default.default.createContext({}),useTreeHandler=()=>{const{stateUpdater:a,mainDataRef:r}=React.useContext(TreeContext),e=React.useCallback(e=>React.useCallback(e,[]),[]),n=e((e,t)=>{null!=e&&e.push(TreeUtils.generateNewNode(t,e.length)),a([...r.current])});var t=e((e,t)=>{var a;e&&(e[t].display_format!==DataTypes.array&&(e[t].display_format=DataTypes.object),e[t].response_value="",a=e[t].sub_object,n(a,e[t]))});const l=e((e,t)=>{null!=e&&e.sub_object.forEach(e=>{e.selected=t,e.sub_object.length&&c(e,t)})}),o=e((e,t)=>{var a;null!=e&&e.parent&&(null!=(a=e.parent)&&a.parent&&o(e.parent,t),e.parent.selected=t)}),c=e((e,t)=>{e&&(e.selected=t,null!=e&&e.sub_object.length&&l(e,t),t&&o(e,!0),a([...r.current]))});var d=e((e,t)=>{e.display_format=t,e.sub_object=[],t===DataTypes.object&&(e.sub_object=[TreeUtils.generateNewNode(e)]),a([...r.current])}),s=e((e,t)=>{null!=e&&e.splice(t,1),a([...r.current])}),u=e((e,t)=>{p(e,{key:t})}),i=e((e,t)=>{p(e,{response_value:t})});const p=e((e,t)=>{e=Object.assign(e,t),a([...r.current])});return{updateSelection:c,updateNodeType:d,removeNode:s,addSubItem:t,addItem:n,updateKey:u,updateValue:i}},JsonTree=({data:e,dataRef:r,ItemComponent:n})=>{const{updateSelection:l,updateNodeType:o,removeNode:c,addSubItem:d,addItem:s,updateKey:u,updateValue:i}=useTreeHandler();return React__default.default.createElement("div",{className:"object"},e.map((e,t)=>{var a={updateSelection:l,updateNodeType:o,removeNode:c,updateKey:u,addSubItem:d,addItem:s,updateValue:i,item:e,dataRef:r,idx:t};return React__default.default.createElement(React__default.default.Fragment,{key:t},React__default.default.createElement("div",{key:t,className:"item "+(e.sub_object.length?"has-children":"")},n?React__default.default.createElement(n,Object.assign({},a)):React__default.default.createElement(DefaultItemComponent,Object.assign({},a)),!!e.sub_object.length&&React__default.default.createElement(JsonTree,{data:e.sub_object,dataRef:null==r?void 0:r[t].sub_object,ItemComponent:n})))}))},JsonEditor=React.forwardRef(function({data:t,ItemComponent:e,fromTree:a},r){if(console.log("asdfadsf",t),!t)return null;const[n,l]=React.useState(a?TreeUtils.transformTree(t,void 0):TreeUtils.convertJSONtoTree(t,void 0)),o=React.useRef(n);return React.useEffect(()=>{var e=a?TreeUtils.transformTree(t,void 0):TreeUtils.convertJSONtoTree(t,void 0);l(e),o.current=e},[t]),React.useImperativeHandle(r,()=>({getJson:()=>TreeUtils.convertTreetoJSON(o.current),getTree:()=>o.current}),[]),n?React__default.default.createElement(TreeContext.Provider,{value:{stateUpdater:l,mainDataRef:o}},React__default.default.createElement("div",{className:"schema-editor "+(e?"custom":"default")},React__default.default.createElement("form",{noValidate:!0},React__default.default.createElement(JsonTree,{data:n,dataRef:o.current,ItemComponent:e})))):null});exports.JsonEditor=JsonEditor,exports.TreeUtils=TreeUtils;
//# sourceMappingURL=index.js.map
