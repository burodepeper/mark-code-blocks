# mark-code-blocks

**Under construction: do not use (yet)**

A package for Atom that marks lines that contain embedded code so they can be styled as blocks instead of inlines

Supports:

- code-blocks, tables and math-blocks in `language-markdown`
- `<style>`-blocks in `language-html`
- `<script>`-blocks in `language-html`

## TODO

- [ ] Add default styles for a dark or light environment if they don't exist in the users' syntax-theme
- [x] Also mark the line number
- [x] Add rule.name as additional className(s)
- [ ] Support `language-gfm` and `language-pfm`
- [x] Add math blocks from `language-markdown`
- [x] Add tables from `language-markdown`
- [ ] Allow custom blocks for users (by extending a scopeName in `config.cson`)
- [ ] Allow grammars to define their code-blocks (via the grammar file)
- [ ] Opening `<script>` of embedded Javascript isn't detected

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

## Test

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
