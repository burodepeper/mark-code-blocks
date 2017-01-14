# mark-code-blocks

A package for [Atom](https://atom.io) that marks lines that contain embedded code so they can be styled as blocks instead of inlines. Currently detects:

- **language-markdown**: code-blocks, tables and math-blocks
- **language-html**: `<style>`- and `<script>`-blocks

## TODO

- [ ] Add default styles for a dark or light environment if they don't exist in the users' syntax-theme
- [ ] Add Markdown support `language-gfm` and `language-pfm`
- [ ] Allow custom blocks for users (by extending a scopeName in `config.cson`)
- [ ] Allow grammars to define their code-blocks (via the grammar file)
- [ ] Bug: Opening `<script>` of embedded Javascript isn't detected

## Configure your syntax-theme or custom stylesheet

```less
atom-text-editor {
  .line,
  .line-number {
    &.code-block {
      background: fade(SOME_AWESOME_COLOR, 10%);
    }

    &.math-block {
      background: fade(ANOTHER_COLOR, 10%);
    }
  }
}
```

## Tests/examples

```js
var "false" = true;
function test () {
  console.log("something");
}
```

```
I am another code block
```

| I'm    | sort of  | a table          |
| with a | separate | background-color |

$$
f \in \{0,1\}^*\to\{0,1\}^*
$$
