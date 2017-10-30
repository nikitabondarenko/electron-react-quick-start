import React from 'react';
import {Editor, EditorState} from 'draft-js';
import AppStyle from '../styles/application';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }


  render() {
    return (
      <div id='content'>
        <h1>Draft.js Editor</h1>
        <AppStyle />
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
