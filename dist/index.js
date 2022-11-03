(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Kr = __webpack_require__(/*! @cre.ative/kram */ \"./node_modules/@cre.ative/kram/dist/index.js\");\n\nmodule.exports = {\n  name: \"react-redux\",\n  description: \"React (JSX) for Views and Redux for data model\",\n  languages: {\n    jsx: \"Javascript (React)\",\n    js: \"Javascript (ES6)\",\n    svg: \"Scalable Vector Graphics\",\n    css: \"Cascading Style Sheets\",\n  },\n  register,\n};\n\nfunction register({ providesLanguage }) {\n  providesLanguage(\"jsx\", {\n    use: () => 'babel-loader?{presets:[\"@babel/preset-react\"]}',\n    classify: classifyJavascript,\n    collate: (workbook, lang) => {\n      const evals = Kr.extract(workbook, \"eval\", lang);\n      const defns = Kr.extract(workbook, \"define\", lang);\n\n      return {\n        name: \"index.jsx\",\n        language: lang,\n        code: generateJsx(workbook, defns, evals),\n      };\n    },\n  });\n\n  providesLanguage(\"js\", {\n    use: () => 'babel-loader?{presets:[\"@babel/preset-es6\"]}',\n    classify: classifyJavascript,\n    collate: (workbook, lang) => {\n      const defns = Kr.extract(workbook, \"define\", lang);\n\n      return {\n        name: \"index.js\",\n        language: lang,\n        code: generateJavascript(workbook, defns),\n      };\n    },\n  });\n\n  providesLanguage(\"svg\", {\n    use: () => \"svg-inline-loader\",\n  });\n\n  providesLanguage(\"css\", {\n    use: () => ({\n      loader: \"css-loader\"\n    }),\n    collate: (workbook, lang) => {\n      const defns = Kr.extract(workbook, \"define\", lang);\n\n      return {\n        name: \"styles.css\",\n        language: lang,\n        code: defns.map((b) => b[2]).join(\"\\n/****/\\n\\n\"),\n      };\n    },\n  });\n}\n\nconst jsxDefnRegex = /^\\s*(function|let|const|var)\\s+(\\w+)/;\nconst keywordToType = {\n  function: \"function\",\n  const: \"constant\",\n  var: \"variable\",\n  let: \"variable\",\n};\n\nfunction classifyJavascript(code) {\n  const jsxDefnMatch = code.match(jsxDefnRegex);\n  if (jsxDefnMatch) {\n    return {\n      mode: \"define\",\n      type: keywordToType[jsxDefnMatch[1]],\n      name: jsxDefnMatch[2],\n    };\n  } else {\n    return { mode: \"eval\" };\n  }\n}\n\nfunction generateJavascript({ moduleName, imports }, defns) {\n  // generates JSX module\n  return `// module ${moduleName} (JSX)\n  ${imports.map(genImport).join(\"\\n\")}\n  `;\n}\n\nfunction generateJsx({ moduleName, imports, shape }, defns, evals) {\n\n  return `// module ${moduleName} (JSX)\nimport React from 'react'\nimport ReactDOM from 'react-dom'\nconst Redux = require('redux')\nimport Im from 'immutable'\nimport { Provider, connect } from 'react-redux'\nimport CssModule from './styles.css'\n${imports.map(genImport).join(\"\\n\")}\n\n${defns.map(genDefn).join(\"\\n\")}\n\nconst Program = (${genProps(shape)}) => ({\n  ${evals.map(genView).join(\",\\n\")}\n})\n\nconst mapStateToProps = state =>\n  ( ${genExposeModel(shape)} )\n\nexport function mount (mountpoint, initial) {\n\n  const init = Im.Map(initial)\n  const store = Redux.createStore(update)\n  const props = Object.assign(\n    mapStateToProps(store.getState()),\n    {dispatch: store.dispatch, css: CssModule.locals}\n  )\n\n  const krumbs = Program(props)\n\n  return (n, container) => {\n     ReactDOM.render(React.createElement(krumbs[n-1]), container)\n  }\n\n  function update (state = init, action = {}) {\n      let value = state.get('value')\n      switch (action.type) {\n          case 'Increment':\n              console.log('increment', state)\n              return state.set('value', value + 1)\n          case 'Decrement':\n              console.log('decrement', state)\n              return state.set('value', value - 1)\n          default:\n              return state\n      }\n  }\n}\n`;\n}\n\nfunction genImport(spec) {\n  return `import ${spec.as} from '${spec.from}'`;\n}\n\nfunction genProps(shape) {\n  const record = Kr.recordType(shape);\n  const propNames = Object.keys(record).concat(['css'])\n  if (record) return `{ ${propNames.join(\", \")} }`;\n\n  return \"\";\n}\n\nfunction genExposeModel(shape) {\n  const record = Kr.recordType(shape);\n  const expose = (k) => `${k}: state.get('${k}')`;\n\n  if (record)\n    return `{\n      ${Object.keys(record).map(expose).join(\", \")}\n    }`;\n\n  return \"{}\";\n}\n\nfunction genView(block) {\n  const [_, attrs, code] = block;\n  const { scene } = attrs;\n\n  return `${scene}: () => (<>${code}</>)`;\n}\n\nfunction genDefn(block) {\n  return block[2];\n}\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./node_modules/@cre.ative/kram/dist/index.js":
/*!****************************************************!*\
  !*** ./node_modules/@cre.ative/kram/dist/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, { enumerable: true, get: getter });\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// define __esModule on exports\n/******/ \t__webpack_require__.r = function(exports) {\n/******/ \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t}\n/******/ \t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t};\n/******/\n/******/ \t// create a fake namespace object\n/******/ \t// mode & 1: value is a module id, require it\n/******/ \t// mode & 2: merge all properties of value into the ns\n/******/ \t// mode & 4: return value when already ns object\n/******/ \t// mode & 8|1: behave like require\n/******/ \t__webpack_require__.t = function(value, mode) {\n/******/ \t\tif(mode & 1) value = __webpack_require__(value);\n/******/ \t\tif(mode & 8) return value;\n/******/ \t\tif((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;\n/******/ \t\tvar ns = Object.create(null);\n/******/ \t\t__webpack_require__.r(ns);\n/******/ \t\tObject.defineProperty(ns, 'default', { enumerable: true, value: value });\n/******/ \t\tif(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));\n/******/ \t\treturn ns;\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = \"./src/index.js\");\n/******/ })\n/************************************************************************/\n/******/ ({\n\n/***/ \"./src/classify.js\":\n/*!*************************!*\\\n  !*** ./src/classify.js ***!\n  \\*************************/\n/*! no static exports found */\n/***/ (function(module, exports) {\n\neval(\"module.exports = {\\n  classify,\\n  defaultClassifier,\\n}\\n\\nfunction defaultClassifier(code, lang) {\\n  switch (lang) {\\n    case 'html':\\n    case 'svg':\\n      return { mode: 'eval' }\\n    default:\\n      return { mode: 'define' }\\n  }\\n}\\n\\nfunction classify(wb, modules) {\\n  const { scenes } = wb\\n\\n  return Object.assign({}, wb, {\\n    scenes: scenes.map((scene) => classifyScene(scene, modules)),\\n  })\\n}\\n\\nfunction classifyScene(scene, modules = []) {\\n  const out = scene.blocks.map((b, i) => {\\n    //console.log('Classify:', b)\\n    const [type, attrs, ...rest] = b\\n\\n    if (type === 'fence') {\\n      const { lang } = attrs\\n      const [code] = rest\\n      const module = modules.find((m) => m.language === lang)\\n      const classifier = (module && module.classify) || defaultClassifier\\n      const classified = classifier(code, lang)\\n\\n      //console.log(\\\"Classified:\\\", lang, code, classified)\\n\\n      return [type, Object.assign(attrs, classified), ...rest]\\n    } else {\\n      return b\\n    }\\n  })\\n\\n  return Object.assign({}, scene, { blocks: out })\\n}\\n\\n\\n//# sourceURL=webpack:///./src/classify.js?\");\n\n/***/ }),\n\n/***/ \"./src/collect.js\":\n/*!************************!*\\\n  !*** ./src/collect.js ***!\n  \\************************/\n/*! exports provided: collect */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\neval(\"__webpack_require__.r(__webpack_exports__);\\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \\\"collect\\\", function() { return collect; });\\nfunction collect(workbook, loadFn = defaultLoadFn, epilog = '') {\\n  const { modules } = workbook\\n  const json = JSON.stringify(Object.assign(workbook, { modules: [] }))\\n\\n  const resourceDefn = (m) => `{\\n\\t  language: '${m.language}',\\n\\t  filepath: '${m.filepath}',\\n\\t  use: '${m.use}',\\n\\t  bind: ${m.bind},\\n\\t  loader: ${loadFn(m)}\\n  }`\\n\\n  // console.log('Kram modules: ', modules)\\n\\n  const definitions = modules.map(resourceDefn).join(',\\\\n')\\n\\n  // console.log('Kram resource definitions: ', definitions)\\n\\n  return `export default Object.assign(${json},{modules: [${definitions}]});${epilog}`\\n}\\n\\nfunction defaultLoadFn({ filepath, use }) {\\n  const target = use ? `!${use}!${filepath}` : filepath\\n\\n  return `function () { return import('${target}') }`\\n}\\n\\n\\n//# sourceURL=webpack:///./src/collect.js?\");\n\n/***/ }),\n\n/***/ \"./src/dekram.js\":\n/*!***********************!*\\\n  !*** ./src/dekram.js ***!\n  \\***********************/\n/*! exports provided: dekram */\n/***/ (function(module, __webpack_exports__, __webpack_require__) {\n\n\"use strict\";\neval(\"__webpack_require__.r(__webpack_exports__);\\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \\\"dekram\\\", function() { return dekram; });\\nfunction dekram(workbook, emitter, plugin) {\\n  const { moduleName, languages } = workbook\\n\\n  // console.log('Dekram: ', workbook)\\n\\n  const emit = (module) => {\\n    console.log('Emit module:', module)\\n    const { language, name, code } = module.collate(workbook, module.language)\\n    const filepath = emitter(name, code)\\n    const use = module.use(module.language)\\n    return {\\n      language,\\n      filepath,\\n      use,\\n      bind: module.bind(moduleName, module.language) || 'null',\\n    }\\n  }\\n\\n  const modules = plugin.modules\\n    .filter((m) => languages.find((s) => s === m.language))\\n    .map(emit)\\n\\n  // console.log('Dekram modules', modules)\\n\\n  return { modules, ...workbook }\\n}\\n\\n\\n//# sourceURL=webpack:///./src/dekram.js?\");\n\n/***/ }),\n\n/***/ \"./src/extract.js\":\n/*!************************!*\\\n  !*** ./src/extract.js ***!\n  \\************************/\n/*! no static exports found */\n/***/ (function(module, exports) {\n\neval(\"module.exports = {\\n  extract,\\n}\\n\\nfunction extract({ scenes }, mode, lang) {\\n  return scenes\\n    .map((scn, i) =>\\n      scn.blocks\\n        .filter((b) => {\\n          const [type, attrs] = b\\n\\n          return (\\n            type === 'fence' &&\\n            (!lang || attrs.lang === lang) &&\\n            (!mode || attrs.mode === mode)\\n          )\\n        })\\n        .map((b) => {\\n          const [type, attrs, ...rest] = b\\n          return [type, { scene: i, ...attrs }, ...rest]\\n        })\\n    )\\n    .reduce((a, b) => a.concat(b), [])\\n}\\n\\n\\n//# sourceURL=webpack:///./src/extract.js?\");\n\n/***/ }),\n\n/***/ \"./src/index.js\":\n/*!**********************!*\\\n  !*** ./src/index.js ***!\n  \\**********************/\n/*! no static exports found */\n/***/ (function(module, exports, __webpack_require__) {\n\neval(\"const { parse } = __webpack_require__(/*! ./parse */ \\\"./src/parse.js\\\")\\nconst { classify } = __webpack_require__(/*! ./classify */ \\\"./src/classify.js\\\")\\nconst { extract } = __webpack_require__(/*! ./extract */ \\\"./src/extract.js\\\")\\nconst { dekram } = __webpack_require__(/*! ./dekram */ \\\"./src/dekram.js\\\")\\nconst { collect } = __webpack_require__(/*! ./collect */ \\\"./src/collect.js\\\")\\nconst { pack } = __webpack_require__(/*! ./pack */ \\\"./src/pack.js\\\")\\nconst { register, defaultPlugin } = __webpack_require__(/*! ./platform */ \\\"./src/platform.js\\\")\\nconst { recordType, scalarType, arrayType } = __webpack_require__(/*! ./utils */ \\\"./src/utils.js\\\")\\n\\nmodule.exports = {\\n  parse,\\n  classify,\\n  extract,\\n  dekram,\\n  collect,\\n  pack,\\n  register,\\n  defaultPlugin,\\n  recordType,\\n  scalarType,\\n  arrayType,\\n}\\n\\n\\n//# sourceURL=webpack:///./src/index.js?\");\n\n/***/ }),\n\n/***/ \"./src/pack.js\":\n/*!*********************!*\\\n  !*** ./src/pack.js ***!\n  \\*********************/\n/*! no static exports found */\n/***/ (function(module, exports, __webpack_require__) {\n\neval(\"const { stringify } = __webpack_require__(/*! yaml */ \\\"yaml\\\")\\nconst { parse } = __webpack_require__(/*! node-html-parser */ \\\"node-html-parser\\\")\\n\\nmodule.exports = { pack }\\n\\nfunction pack(wb) {\\n  const frontMatter = configToYaml(wb)\\n  const mdPages = wb.scenes.map(sceneToMarkdown)\\n\\n  return ['', frontMatter].concat(mdPages).join('---\\\\n')\\n}\\n\\nfunction configToYaml(wb) {\\n  const { title, init, platform, imports } = wb\\n  const order = [\\n    { title },\\n    { platform },\\n    { imports: importsToYaml(imports) },\\n    { model: init },\\n  ]\\n\\n  return order.map(stringify).join('')\\n}\\n\\nfunction importsToYaml(imports) {\\n  return imports\\n}\\n\\nfunction sceneToMarkdown(scn) {\\n  return scn.blocks.map(blockToMarkdown).join('\\\\n')\\n}\\n\\nfunction blockToMarkdown(blk) {\\n  const [type, { markup, block, lang }, ...rest] = blk\\n  console.log('blockToMarkdown:', type, { markup, block, lang }, rest)\\n  switch (type) {\\n    case 'fence':\\n      return `${markup}${lang}\\\\n${rest[0]}${markup}\\\\n`\\n    case 'bullet_list':\\n    case 'ordered_list':\\n      return `${blocksToMarkdown(rest, false)}\\\\n`\\n    case 'paragraph':\\n      return `${inlineToMarkdown(rest)}\\\\n`\\n    case 'heading':\\n      return `${markup} ${inlineToMarkdown(rest)}`\\n    case 'list-item':\\n      return `${markup} ${blocksToMarkdown(rest, false)}`\\n    case 'hr':\\n      return `${markup}\\\\n`\\n    default:\\n      const contents = inlineToMarkdown(rest)\\n      return typeof markup === undefined || !markup\\n        ? contents\\n        : block\\n        ? `${markup} ${contents}\\\\n`\\n        : `${markup}${contents}${markup}`\\n  }\\n}\\n\\nfunction blocksToMarkdown(list, newlines = true) {\\n  return list ? list.map(blockToMarkdown).join(newlines ? '\\\\n' : '') : ''\\n}\\n\\nfunction inlineToMarkdown(list) {\\n  return list ? list.map(inlineNodeToMarkdown).join('') : ''\\n}\\n\\nfunction inlineNodeToMarkdown(node) {\\n  if (Array.isArray(node)) {\\n    const [type, { markup, href }, ...rest] = node\\n    const contents = inlineToMarkdown(rest)\\n    switch (type) {\\n      case 'link':\\n        const parens = href ? `(${href})` : ''\\n\\n        return `[${inlineToMarkdown(rest)}]${parens}`\\n      default:\\n        return `${markup}${contents}${markup}`\\n    }\\n  } else {\\n    return node\\n  }\\n}\\n\\n\\n//# sourceURL=webpack:///./src/pack.js?\");\n\n/***/ }),\n\n/***/ \"./src/parse.js\":\n/*!**********************!*\\\n  !*** ./src/parse.js ***!\n  \\**********************/\n/*! no static exports found */\n/***/ (function(module, exports, __webpack_require__) {\n\neval(\"const hash = __webpack_require__(/*! object-hash */ \\\"object-hash\\\")\\nconst MarkdownIt = __webpack_require__(/*! markdown-it */ \\\"markdown-it\\\")\\nconst frontMatter = __webpack_require__(/*! front-matter */ \\\"front-matter\\\")\\nconst { rules } = __webpack_require__(/*! ./render */ \\\"./src/render.js\\\")\\n\\nmodule.exports = {\\n  parse,\\n}\\n\\nconst mdit = MarkdownIt('commonmark')\\n\\nObject.assign(mdit.renderer.rules, rules)\\n\\nfunction parse(md, basename, updaterFn = (wb) => wb) {\\n  const { body, attributes } = frontMatter(md)\\n  const defaultLang = attributes.lang || 'text'\\n  const tokens = mdit.parse(body)\\n  const flat = tokens.reduce(\\n    (l, r) => (r.type === 'inline' ? l.concat(r.children) : l.concat([r])),\\n    []\\n  )\\n  const unhandled = flat.filter(\\n    (t) => t.type !== 'inline' && typeof rules[t.type] !== 'function'\\n  )\\n  const json = `[{}${mdit.render(body)}]`\\n\\n  if (unhandled.length > 0) {\\n    console.log('Unhandled Tokens:', unhandled)\\n  }\\n\\n  const blocks = JSON.parse(json).slice(1)\\n  const { title, platform, model, imports } = attributes\\n\\n  const result = updaterFn({\\n    title,\\n    basename,\\n    platform,\\n    languages: getLanguages(blocks),\\n    init: model,\\n    shape: getShapeOf(model),\\n    imports: getImportSpecs(imports),\\n    scenes: paginate(blocks),\\n  })\\n  console.log('Workbook:', JSON.stringify(result))\\n\\n  const hashkey = hashcode(result)\\n  const moduleName = `Kram_${hashkey}_${basename}`\\n\\n  return Object.assign({ hashkey, moduleName }, result)\\n}\\n\\nfunction paginate(blocks) {\\n  const isBreak = (b) =>\\n    Array.isArray(b) && b.length === 2 && b[0] === 'hr' && b[1].markup === '---'\\n  let breaks = blocks\\n    .map((b, i) => (isBreak(b) ? i : false))\\n    .filter((i) => i !== false)\\n\\n  breaks.unshift(-1)\\n\\n  return breaks\\n    .map((b, i) => blocks.slice(b + 1, breaks[i + 1]))\\n    .map(blocksToScene)\\n}\\n\\nfunction blocksToScene(blocks) {\\n  const headings = blocks.filter((b) => b[0] === 'heading')\\n\\n  return Object.assign(\\n    { blocks },\\n    headings.length ? { title: textContent(headings[0]) } : {}\\n  )\\n}\\n\\nfunction textContent(t) {\\n  return typeof t === 'string'\\n    ? t\\n    : Array.isArray(t)\\n    ? t\\n        .slice(1)\\n        .map((s) => textContent(s))\\n        .join('')\\n    : ''\\n}\\n\\nfunction getLanguages(tokens) {\\n  return tokens\\n    .filter(([type]) => type === 'fence')\\n    .map(([_, attrs]) => attrs.lang)\\n    .reduce(\\n      (accum, next) => (accum.includes(next) ? accum : accum.concat([next])),\\n      []\\n    )\\n}\\n\\nfunction getImportSpecs(imports) {\\n  console.log('imports:', JSON.stringify(imports))\\n  switch (getTypeOf(imports)) {\\n    case 'array':\\n      return imports.map(importSpec)\\n    case 'record':\\n      return Object.entries(imports || {}).map(([k, v]) => importSpec(k, v))\\n    case 'string':\\n      return [importSpec(imports)]\\n    default:\\n      return []\\n  }\\n}\\n\\nfunction importSpec(pkg, spec) {\\n  switch (getTypeOf(spec)) {\\n    case 'record':\\n      return Object.assign(spec, { as: pkg })\\n    case 'string':\\n      return { from: spec, as: pkg }\\n    default:\\n      return { from: pkg, as: pkg }\\n  }\\n}\\n\\nfunction getShapeOf(model) {\\n  const type = getTypeOf(model)\\n\\n  switch (type) {\\n    case 'array':\\n      return { [type]: getShapeOf(model[1]) }\\n    case 'record':\\n      fields = Object.entries(model).map(([k, v]) => [k, getShapeOf(v)])\\n      return { [type]: Object.fromEntries(fields) }\\n    default:\\n      return type\\n  }\\n}\\n\\nfunction getTypeOf(value) {\\n  const type = typeof value\\n\\n  switch (type) {\\n    case 'object':\\n      return Array.isArray(value) ? 'array' : 'record'\\n    case 'number':\\n      return Number.isInteger(value) ? 'int' : 'float'\\n    default:\\n      return type\\n  }\\n}\\n\\nfunction hashcode({ platform, imports, shape, scenes }, lang) {\\n  const code = scenes.map((scn) => scn.code)\\n  const views = scenes.map((scn) => scn.view || {})\\n\\n  return hash({ platform, imports, shape, code, views }).substr(-8)\\n}\\n\\n\\n//# sourceURL=webpack:///./src/parse.js?\");\n\n/***/ }),\n\n/***/ \"./src/platform.js\":\n/*!*************************!*\\\n  !*** ./src/platform.js ***!\n  \\*************************/\n/*! no static exports found */\n/***/ (function(module, exports, __webpack_require__) {\n\neval(\"const { defaultClassifier } = __webpack_require__(/*! ./classify */ \\\"./src/classify.js\\\")\\nconst { extract } = __webpack_require__(/*! ./extract */ \\\"./src/extract.js\\\")\\n\\nconst defaultModule = {\\n  bind: (moduleName, lang) => {\\n    switch (lang) {\\n      // load all definitions, and return an eval function\\n      case 'css':\\n        return `function(resource, container) {\\n\\t\\t\\t\\t\\t\\tlet sheet = document.createElement('style')\\n\\t\\t\\t\\t\\t\\tsheet.innerHTML = resource.default\\n\\t\\t\\t\\t\\t\\tcontainer.appendChild(sheet);\\n            return function (scene, container) {}\\n\\t\\t\\t\\t\\t}`\\n\\n      case 'html':\\n        return `function(resource /*, container*/ ) {\\n          const parser = new DOMParser()\\n          const doc = parser.parseFromString(resource.default, 'text/html')\\n          const body = doc.body.firstChild\\n          const children = body.children\\n          const scenes = Object.fromEntries(\\n            Array.prototype.map.call(children, \\n              (node) => {\\n                const idmatch = node && node.id && node.id.match(/kramScene-(\\\\\\\\d+)/)\\n                return idmatch ? [idmatch[1], node] : null\\n              })\\n              .filter(Boolean)\\n          )\\n          return function (n, container) {\\n            container.appendChild(scenes[n])\\n          }\\n        }`\\n\\n      case 'svg':\\n        return `function(resource /*, container*/ ) {\\n            const parser = new DOMParser()\\n            const doc = parser.parseFromString(resource.default, 'image/svg+xml')\\n            const body = doc.firstChild\\n            const children = Array.prototype.slice.call(body.children, 1)\\n            const scenes = Object.fromEntries(\\n              Array.prototype.map.call(children, \\n                (node) => {\\n                  const idmatch = node && node.id && node.id.match(/kramScene-(\\\\\\\\d+)/)\\n                  return idmatch ? [idmatch[1], node] : null\\n                })\\n                .filter(Boolean)\\n            )\\n            return function (n, container) {\\n              container.appendChild(scenes[n])\\n            }\\n\\t\\t\\t\\t\\t}`\\n\\n      default:\\n        return `function(resource, container, initial) {\\n\\t\\t\\t\\t\\t\\treturn resource.mount(container, initial)\\n\\t\\t\\t\\t\\t}`\\n    }\\n  },\\n\\n  classify: defaultClassifier,\\n\\n  collate: (workbook, lang) => {\\n    // collates definitions and evaluations and generates code\\n    // emit definitions first, followed by a list or group of all the evaluations\\n    const defns = extract(workbook, 'define', lang).map((b) => b[2])\\n    const evals = extract(workbook, 'eval', lang).map((b) => [\\n      b[1]['scene'],\\n      b[2],\\n    ])\\n    let evalcontainer = evals\\n    let defscontainer = defns\\n    let open = []\\n    let close = []\\n\\n    switch (lang) {\\n      case 'html':\\n        open = ['<html>']\\n        close = ['</html>']\\n        evalcontainer = ['<ol>'].concat(\\n          evals.map(([n, el]) => `<li id=\\\"kramScene-${n + 1}\\\">${el}</li>`),\\n          ['</ol>']\\n        )\\n        break\\n      case 'svg':\\n        open = ['<svg xmlns=\\\"http://www.w3.org/2000/svg\\\">']\\n        close = ['</svg>']\\n        evalcontainer = evals.map(\\n          ([n, el]) =>\\n            `<svg id=\\\"kramScene-${n + 1}\\\" viewBox=\\\"0 0 100 100\\\">${el}</svg>`\\n        )\\n        defscontainer = ['<defs>'].concat(defns, ['</defs>'])\\n        break\\n    }\\n\\n    return {\\n      name: `code.${lang}`,\\n      language: lang,\\n      code: open.concat(defscontainer, evalcontainer, close).join('\\\\n'),\\n    }\\n  },\\n\\n  use: () => 'raw-loader',\\n}\\n\\nconst defaultLanguages = {\\n  html: 'Hypertext Markup Language (HTML5)',\\n  css: 'Cascading Style Sheets (CSS3)',\\n  js: 'Javascript (ES6)',\\n  svg: 'Scalable Vector Graphics',\\n}\\n\\nconst defaultPlugin = {\\n  name: 'web-standard',\\n  description: 'Standard technologies supported by all browsers',\\n  languages: defaultLanguages,\\n  modules: Object.keys(defaultLanguages).map((language) => ({\\n    language,\\n    ...defaultModule,\\n  })),\\n}\\n\\nmodule.exports = {\\n  register,\\n  defaultPlugin,\\n}\\n\\nfunction register(platform, assignedName) {\\n  const { name, description, languages, register, ...rest } = platform\\n  let plugins = {}\\n\\n  if (register) {\\n    let providers = {}\\n\\n    register({\\n      providesLanguage: (lang, dict) => (providers[lang] = dict),\\n    })\\n\\n    plugins = create(providers)\\n  }\\n\\n  const plugin = {\\n    name: assignedName || name,\\n    description,\\n    languages,\\n    ...rest,\\n    ...plugins,\\n  }\\n\\n  console.log('Plugin registered:', assignedName || name, plugin)\\n\\n  return plugin\\n}\\n\\nfunction create(providers) {\\n  return {\\n    modules: Object.keys(providers).map((language) => ({\\n      language,\\n      ...defaultModule,\\n      ...(providers[language] || {}),\\n    })),\\n  }\\n}\\n\\n\\n//# sourceURL=webpack:///./src/platform.js?\");\n\n/***/ }),\n\n/***/ \"./src/render.js\":\n/*!***********************!*\\\n  !*** ./src/render.js ***!\n  \\***********************/\n/*! no static exports found */\n/***/ (function(module, exports) {\n\neval(\"module.exports = {\\n  rules: {\\n    heading_open: open_element,\\n    heading_close: close_element,\\n    paragraph_open: open_element,\\n    paragraph_close: close_element,\\n    bullet_list_open: open_element,\\n    bullet_list_close: close_element,\\n    ordered_list_open: open_element,\\n    ordered_list_close: close_element,\\n    list_item_open: open_element,\\n    list_item_close: close_element,\\n    text: insert_text,\\n    softbreak: insert_newline,\\n    hr: insert_empty_element,\\n    code_inline: insert_code,\\n    fence: insert_code_block,\\n    strong_open: open_element,\\n    strong_close: close_element,\\n    em_open: open_element,\\n    em_close: close_element,\\n    link_open: open_element,\\n    link_close: close_element,\\n    html_block: insert_code_block, // escaping html for now\\n    html_inline: insert_code // escaping html for now\\n  },\\n  not_implemented\\n}\\n\\nconst nl = (b) => b ? '\\\\n' : ''\\n\\nfunction open_element(tokens, i) {\\n  const {type, block, attrs, tag, markup} = tokens[i]\\n  const ts = JSON.stringify(type.replace(/_(open|close)$/, ''))\\n  const attrjson = attrs && attrs.length ? Object.fromEntries(attrs) : {}\\n  const json = JSON.stringify(Object.assign(attrjson, {\\n    tag: tag.toLowerCase(),\\n    block,\\n    markup\\n  }))\\n\\n  return `,${nl(block)}[${ts},${json}`\\n}\\n\\nfunction close_element(tokens, i) {\\n  return ']'\\n}\\n\\nfunction insert_empty_element(tokens, i) {\\n  return open_element(tokens, i) + ']'\\n}\\n\\nfunction insert_text(tokens, i) {\\n  const {content} = tokens[i]\\n  const json = JSON.stringify(content)\\n\\n  return content ? `,${json}` : ''\\n}\\n\\nfunction insert_newline() {\\n  return ',\\\"\\\\\\\\n\\\"'\\n}\\n\\nfunction insert_code(tokens, i) {\\n  const {type, tag, block, markup, info, content} = tokens[i]\\n  const json = JSON.stringify([\\n    type,\\n    {\\n      tag: tag.toLowerCase(),\\n      block,\\n      markup\\n    },\\n    content\\n  ])\\n\\n  return `,${nl(block)}${json}`\\n}\\n\\nfunction insert_code_block(tokens, i) {\\n  const {type, tag, block, markup, info, content} = tokens[i]\\n  const json = JSON.stringify([\\n    type,\\n    {\\n      tag,\\n      preformatted: true,\\n      lang: info.toLowerCase(),\\n      markup,\\n      block,\\n      id: `krumb-${i}`\\n    },\\n    content\\n  ])\\n\\n  return `,${nl(block)}${json}`\\n}\\n\\n\\nfunction not_implemented(tokens, i) {\\n  const {type} = tokens[i]\\n\\n  console.log(`renderer.rule.${type} not implemented`)\\n}\\n\\n\\n//# sourceURL=webpack:///./src/render.js?\");\n\n/***/ }),\n\n/***/ \"./src/utils.js\":\n/*!**********************!*\\\n  !*** ./src/utils.js ***!\n  \\**********************/\n/*! no static exports found */\n/***/ (function(module, exports) {\n\neval(\"module.exports = {\\n    scalarType: sh => typeof sh === 'string' && sh,\\n    arrayType: sh => typeof sh === 'object' && sh['array'] || false,\\n    recordType: sh => typeof sh === 'object' && sh['record'] || false\\n}\\n\\n\\n//# sourceURL=webpack:///./src/utils.js?\");\n\n/***/ }),\n\n/***/ \"front-matter\":\n/*!*******************************!*\\\n  !*** external \"front-matter\" ***!\n  \\*******************************/\n/*! no static exports found */\n/***/ (function(module, exports) {\n\neval(\"module.exports = require(\\\"front-matter\\\");\\n\\n//# sourceURL=webpack:///external_%22front-matter%22?\");\n\n/***/ }),\n\n/***/ \"markdown-it\":\n/*!******************************!*\\\n  !*** external \"markdown-it\" ***!\n  \\******************************/\n/*! no static exports found */\n/***/ (function(module, exports) {\n\neval(\"module.exports = require(\\\"markdown-it\\\");\\n\\n//# sourceURL=webpack:///external_%22markdown-it%22?\");\n\n/***/ }),\n\n/***/ \"node-html-parser\":\n/*!***********************************!*\\\n  !*** external \"node-html-parser\" ***!\n  \\***********************************/\n/*! no static exports found */\n/***/ (function(module, exports) {\n\neval(\"module.exports = require(\\\"node-html-parser\\\");\\n\\n//# sourceURL=webpack:///external_%22node-html-parser%22?\");\n\n/***/ }),\n\n/***/ \"object-hash\":\n/*!******************************!*\\\n  !*** external \"object-hash\" ***!\n  \\******************************/\n/*! no static exports found */\n/***/ (function(module, exports) {\n\neval(\"module.exports = require(\\\"object-hash\\\");\\n\\n//# sourceURL=webpack:///external_%22object-hash%22?\");\n\n/***/ }),\n\n/***/ \"yaml\":\n/*!***********************!*\\\n  !*** external \"yaml\" ***!\n  \\***********************/\n/*! no static exports found */\n/***/ (function(module, exports) {\n\neval(\"module.exports = require(\\\"yaml\\\");\\n\\n//# sourceURL=webpack:///external_%22yaml%22?\");\n\n/***/ })\n\n/******/ })));\n\n//# sourceURL=webpack:///./node_modules/@cre.ative/kram/dist/index.js?");

/***/ })

/******/ })));