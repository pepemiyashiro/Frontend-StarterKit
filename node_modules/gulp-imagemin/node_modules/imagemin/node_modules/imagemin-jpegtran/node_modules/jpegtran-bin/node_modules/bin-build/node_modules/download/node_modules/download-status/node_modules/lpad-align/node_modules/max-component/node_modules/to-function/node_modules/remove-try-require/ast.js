var replace = require('replace-method')
var parents = require('ast-parents')

module.exports = function(file) {
  return function(ast, next) {
    parents(ast)
    replace(ast)(['require'], function(node) {
      var p = node

      while (p = p.parent) {
        if (p.type === 'CatchClause') return
        if (p.type === 'TryStatement') {
          return {
              type: 'UnaryExpression'
            , prefix: true
            , operator: 'void'
            , argument: {
                type: 'Literal'
              , value: 0
            }
          }
        }
      }
    })

    next(null, ast)
  }
}
