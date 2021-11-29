const Kr = require('kram')

module.exports = {
  collate,
  bind,
  classify
}

function bind(moduleName, lang = 'jsx') {
  return `function(module, container, initial) {
    module.mount(container, initial)
  }`
}

const jsxDefnRegex = /^\s*(function|let|const|var)\s+(\w+)/
const keywordToType = {
  "function": "function",
  "const": "constant",
  "var": "variable",
  "let": "variable"
}

function classify(code, lang) {
  switch( lang ) {
    case "jsx":
      const jsxDefnMatch = code.match(jsxDefnRegex)
      if (jsxDefnMatch) {
        return {
          mode: "define",
          type: keywordToType[jsxDefnMatch[1]],
          name: jsxDefnMatch[2]
        }
      } else {
        return {mode: "eval"}
      }
    default:
      return {mode: "define"}
  }
}

function collate(workbook, lang) {
  // generates JSX module

  const { imports, moduleName, shape } = workbook
  const evals = Kr.extract(workbook, 'eval')
  const defns = Kr.extract(workbook, 'define')

  const code = `// module ${moduleName} (JSX)
import React from 'react'
import ReactDOM from 'react-dom'
const Redux = require('redux')
import Im from 'immutable'
import { Provider, connect } from 'react-redux'
${imports.map(genImport).join('\n')}

${defns.map(genDefn).join('\n')}

const Program = (${genProps(shape)}) =>
  (<ol>
      ${evals.map(genView).join('\n')}
  </ol>)

const mapStateToProps = state =>
  ( ${genExposeModel(shape)} )

function mount (mountpoint, initial) {

  const init = Im.Map(initial)
  const store = Redux.createStore(update)
  const props = Object.assign(
    mapStateToProps(store.getState()),
    {dispatch: store.dispatch}
  )

  ReactDOM.render(
    React.createElement(Program, props),
    mountpoint
  )

  function update (state = init, action = {}) {
      let value = state.get('value')
      switch (action.type) {
          case 'Increment':
              console.log('increment', state)
              return state.set('value', value + 1)
          case 'Decrement':
              console.log('decrement', state)
              return state.set('value', value - 1)
          default:
              return state
      }
  }
}

export {
    Program,
    mount
}
`

  return {
    name: `index.${lang}`,
    language: lang,
    code,
  }
}

function genImport(spec) {
  return `import ${spec.as} from '${spec.from}'`
}

function genProps(shape) {
  const record = Kr.recordType(shape)
  if (record) return `{ ${Object.keys(record).join(', ')} }`

  return ''
}

function genExposeModel(shape) {
  const record = Kr.recordType(shape)
  const expose = (k) => `${k}: state.get('${k}')`

  if (record)
    return `{
      ${Object.keys(record).map(expose).join(', ')}
    }`

  return '{}'
}

function genView(block) {
  return block
    ? `<li key="${block.id}" id="${block.id}">
       ${block.text.split('\n').join('\n        ')}
     </li>
    `
    : '<li></li>'
}

function genDefn(block) {
  return block.text
}
