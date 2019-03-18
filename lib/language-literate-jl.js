'use babel';

import LanguageLiterateJlView from './language-literate-jl-view';
import { CompositeDisposable } from 'atom';

export default {

  languageLiterateJlView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageLiterateJlView = new LanguageLiterateJlView(state.languageLiterateJlViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageLiterateJlView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-literate-jl:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageLiterateJlView.destroy();
  },

  serialize() {
    return {
      languageLiterateJlViewState: this.languageLiterateJlView.serialize()
    };
  },

  toggle() {
    console.log('LanguageLiterateJl was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
