const t = require('babel-types');

const visitor = {
  ImportDeclaration: {
    enter(path, state = { opts }) {
      const specifiers = path.node.specifiers; // [ImportSpecifier, ...]
      const source = path.node.source; // StringLiteral lodash
      if (state.opts.libraries.includes(source.value) && !t.isImportDefaultSpecifier(specifiers[0])) {
        const declarations = specifiers.map((specifier, index) => {
          return t.importDeclaration([t.importDefaultSpecifier(specifier.local)],
            t.stringLiteral(`${source.value}/${specifier.imported.name}`));
        });
        path.replaceWithMultiple(declarations);
      }
    }
  }
};

module.exports = function () {
  return {
    visitor,
  };
};