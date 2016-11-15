import {CompositeDisposable} from 'atom';

const rulesForScopes = {

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
      this.updateCurrentEditor(editor);
    }));
  },

  updateCurrentEditor (editor) {
    if (!editor || !editor.getLineCount()) {
      return;
    }

    console.log(editor);

    // TODO Continue if grammar is supported
    let grammar = editor.getGrammar();
    if (!grammar) {
      return;
    }

    let rules = this.getRulesForGrammar(grammar);
    if (!rules) {
      return;
    }

    // TODO Clear existing decorations
    this.clearDecorations(editor);

    // TODO Create new decorations
    // Per rule,
    // cycle through all lines,
    // detect a consecutive number of lines matching the rule,
    // and mark it with a decoration
    for (let i = 0; i < rules.length; i++) {
      this.markLines(editor, rules[i]);
    }

  },

  clearDecorations (editor) {
    let decorations = editor.getLineDecorations();
    console.log(decorations);
  },

  getRulesForGrammar (grammar) {
    // TODO Use {rulesForScopes}
    // if (grammar.name === 'Markdown') {
    //   return [{
    //     'scope': 'fenced.code.md'
    //   }];
    // } else if (grammar.name === "HTML") {
    //   return [{
    //     'scope': 'embedded script',
    //     'name': 'js'
    //   }, {
    //     'scope': 'embedded style',
    //     'name': 'css'
    //   }];
    // }
    return false;
  },

  markLines (editor, rule) {

  }

};
