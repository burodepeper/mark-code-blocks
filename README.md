# mark-embedded-code

**Under construction: do not use (yet)**

A package for Atom that marks lines that contain embedded code so they can be styled as blocks instead of inlines

Supports:

- code-blocks in `language-markdown`
- `<style>`-blocks in `language-html`
- `<script>`-blocks in `language-html`

## TODO

- [ ] Add default styles for a dark or light environment if they don't exist in the users' syntax-theme
- [ ] Also mark the line number
- [ ] Add rule.name as additional className

## Configure your syntax-theme or custom stylesheet

TODO

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
