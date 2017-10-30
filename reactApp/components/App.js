import React from 'react';
<<<<<<< HEAD
import {Editor, EditorState} from 'draft-js';
=======
import {Editor, EditorState, RichUtils} from 'draft-js';
>>>>>>> e7d21ee5b89553b1c14a14c497d2a638b2e7a6d4
import AppStyle from '../styles/application';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'BOLD'
    ));
  }

  render() {
    return (
      <div id='content'>
        <h1>Draft.js Editor</h1>
<<<<<<< HEAD
        <AppStyle />
=======
        {/* <AppStyle /> */}
        <button onClick={() => this._onBoldClick(this)}>Bold</button>
>>>>>>> e7d21ee5b89553b1c14a14c497d2a638b2e7a6d4
        <div className='editor'>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}
