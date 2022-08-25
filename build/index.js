'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

class JsonArray extends Array {
    constructor(json, path = "", stateUpdater) {
        super();
        if (typeof json !== "object")
            return;
        this.path = path;
        this._updateTree = () => stateUpdater({ value: this });
        this._updateArray(json);
    }
    // util Method
    static convertToJSON(treeData) {
        return treeData.reduce((acc, data) => {
            if (data.type === "object")
                // Recursive call, if type is object
                acc[data.key] = JsonArray.convertToJSON(data.value);
            else
                acc[data.key] = data.value;
            return acc;
        }, {});
    }
    // Inserts a node at the given index
    addNode(idx, json) {
        this._updateArray(json, idx);
        this._updateTree();
        return this;
    }
    // Inserts a sub-node at the given index
    addSubNode(idx, json) {
        if (this[idx].type === "object")
            return this[idx].value.addNode(0, json);
        this._updateArray(json, idx, true);
        this._updateTree();
        return this;
    }
    deleteNode(idx) {
        this.splice(idx, 1);
        this._updateTree();
        return this;
    }
    // Update individual node
    updateNode(index, key, value) {
        try {
            if (key !== undefined)
                this[index].key = key;
            if (value !== undefined)
                this[index].value = value;
        }
        catch (e) {
            console.log(e);
        }
        this._updateTree(this);
        return this;
    }
    // Factory method that creates a node
    // #private method
    _createNode(key, json) {
        const isObject = typeof json[key] === "object";
        const xPath = `${this.path}[${this.length}]`;
        return {
            key,
            type: typeof json[key],
            path: xPath,
            value: isObject
                ? // Recursion if object
                    new JsonArray(json[key], xPath + ".value", this._updateTree)
                : json[key],
        };
    }
    // Internal method that is used to update the array based on the propd
    // #private method
    _updateArray(json, idx, subNode) {
        Object.keys(json).forEach((key) => {
            const prop = this._createNode(key, json);
            // If index is present, insert at index
            // Or push at the end
            if (subNode) {
                this[idx].type = "object";
                this[idx].value = new JsonArray(json, this[idx].path + ".value", this._updateTree);
            }
            else if (idx)
                this.splice(idx, 0, prop);
            else
                this.push(prop);
        });
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

const Tree = (_a) => {
    var { data } = _a, props = __rest(_a, ["data"]);
    return (React__default["default"].createElement("div", { className: "group" }, data.map((item, idx) => {
        return (React__default["default"].createElement("div", { key: item.path, className: "child node-row" },
            React__default["default"].createElement("span", { onClick: (e) => {
                    data.addSubNode(idx, { key: "value" });
                } }, "➕"),
            React__default["default"].createElement("input", { value: item.key, onChange: (e) => {
                    data.updateNode(idx, e.target.value);
                } }),
            React__default["default"].createElement("span", { className: "spacer" }),
            item.type === "object" ? (React__default["default"].createElement(React__default["default"].Fragment, null,
                React__default["default"].createElement("input", { value: "Object", disabled: true }),
                React__default["default"].createElement("span", { onClick: () => data.deleteNode(idx) }, "\uD83D\uDDD1"),
                React__default["default"].createElement(Tree, Object.assign({ data: item.value }, props)))) : (React__default["default"].createElement(React__default["default"].Fragment, null,
                React__default["default"].createElement("input", { value: item.value, onChange: (e) => {
                        data.updateNode(idx, undefined, e.target.value);
                    } }),
                React__default["default"].createElement("span", { onClick: () => data.deleteNode(idx) }, "\uD83D\uDDD1")))));
    })));
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".react-json-tree .group .group {\n  margin: 0 12px;\n}\n.react-json-tree .group .child {\n  margin: 8px 0;\n}\n.react-json-tree .group span {\n  cursor: pointer;\n  margin: 0 8px;\n  display: inline-grid;\n  height: 28px;\n  place-items: center;\n  line-height: 28px;\n}\n.react-json-tree .group input {\n  height: 24px;\n  margin: 0;\n  font-size: 16px;\n  padding: 0 4px;\n}";
styleInject(css_248z);

class TreeWrapper extends React__default["default"].Component {
    constructor(props) {
        super(props);
        this.jsonTree = new JsonArray(props.data, "", this.setState.bind(this));
        this.state = {
            value: [],
        };
    }
    componentDidUpdate(_, pState) {
        var _a, _b;
        if (this.state !== pState)
            (_b = (_a = this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, this.state.value);
    }
    render() {
        return (React__default["default"].createElement("div", { className: "react-json-tree" },
            React__default["default"].createElement(Tree, { data: this.jsonTree })));
    }
}

exports.TreeWrapper = TreeWrapper;
//# sourceMappingURL=index.js.map
