'use babel';

import {CompositeDisposable} from "atom";

const rulesForScopeNames = {

  'text.md': [{
    'scope': 'fenced.code.md'
  }],

  'text.html.basic': [{
    'scope': 'embedded script',
    'name': 'js'
  }, {
    'scope': 'embedded style',
    'name': 'css'
  }]

};

export default {

  subscriptions: null,

  activate (state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.workspace.observeTextEditors(editor => {
      editor.onDidChange(event => {
        this.updateCurrentEditor(editor);
      });
    }));
  },

  updateCurrentEditor (editor) {
    if (!editor || !editor.getLineCount()) {
      return;
    }

    // Continue if grammar is supported
    let grammar = editor.getGrammar();
    if (!grammar) {
      return;
    }

    let rules = this.getRulesForScopeName(grammar.scopeName);
    if (!rules) {
      return;
    }

    // Clear existing decorations
    this.clearDecorations(editor);

    // Create new decorations
    for (let i = 0; i < rules.length; i++) {
      this.markLines(editor, rules[i]);
    }

  },

  clearDecorations (editor) {
    let decorations = editor.getLineDecorations();
    for (let i = 0; i < decorations.length; i++) {
      decorations[i].destroy();
    }
    // console.log(decorations);
  },

  getRulesForScopeName (scopeName) {
    if (rulesForScopeNames[scopeName]) {
      return rulesForScopeNames[scopeName];
    }
    return false;
  },

  // Per rule,
  // cycle through all lines,
  // detect a consecutive number of lines matching the rule,
  // and mark it with a decoration
  markLines (editor, rule) {
    // console.log("markLines", editor, rule);
    let begin = false;
    let end = false;
    let numberOfLines = editor.getLineCount();
    let className = "code-block";
    // NOTE and TODO
    // A space is apparently not a valid character for the className, so this is disabled for now
    // if (rule.name) {
    //   className += " " + rule.name;
    // }
    for (let i = 0; i < numberOfLines; i++) {
      let scopeDescriptor = editor.scopeDescriptorForBufferPosition([i, 0]);
      let lineIsClear = true;

      // Look for the start of an embedded-code section
      let scopes = scopeDescriptor.scopes;
      for (let j = 0; j < scopes.length; j++) {
        let scope = scopes[j];
        if (scope === rule.scope) {
          lineIsClear = false;
          if (begin === false) {
            begin = [i, 0];
          }
          end = [i, editor.buffer.lineForRow(i).length];
          break;
        }
      }

      // If the line is clear, and a begin and end have been found, create a new decoration for that section
      if (lineIsClear === true && begin !== false && end !== false) {
        let marker = editor.buffer.markRange([begin, end]);
        let decoration = editor.decorateMarker(marker, {
          type: "line",
          class: className
        });
        begin = false;
        end = false;
      }
    }
  }

};
