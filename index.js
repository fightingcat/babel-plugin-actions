module.exports = function (babel) {
    function getBindingName(path) {
        const node = path.node;

        if (path.type == 'VariableDeclarator') {
            if (node.id.type == 'Identifier') {
                return node.id.name;
            }
        }
        if (path.type == 'ObjectProperty') {
            if (node.key.type == 'Identifier') {
                return getBindingName(path.parentPath) + '.' + node.key.name;
            }
        }
        if (path.type == 'ObjectExpression') {
            return getBindingName(path.parentPath);
        }
        return '(line ' + node.loc.start.line +
            ' column ' + node.loc.start.column + ')';
    }

    function ImportDeclaration(nodePath) {
        const source = nodePath.node.source;
        const file = nodePath.hub.file.opts.sourceFileName;

        if (source.type == 'StringLiteral' && source.value == 'the-actions') {
            const specifier = nodePath.node.specifiers.find(s => s.local.name == 'ActionCreator');

            if (specifier) {
                const binding = nodePath.scope.getBinding(specifier.local.name);

                binding.referencePaths.forEach(ref => {
                    if (ref.parentPath.type == 'CallExpression') {
                        const name = getBindingName(ref.parentPath.parentPath);
                        const arg = babel.template.expression('"' + file + ': ' + name + '"')();

                        ref.parent.arguments.push(arg);
                    }
                });
            }
        }
    }

    return {
        visitor: { ImportDeclaration }
    }
}