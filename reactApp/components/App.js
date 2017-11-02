// import React from 'react';
// import {Editor, EditorState, RichUtils} from 'draft-js';
// import AppStyle from '../styles/application';

// export default class App extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {editorState: EditorState.createEmpty()};
//     this.onChange = (editorState) => this.setState({editorState});
//   }
//   _onBoldClick() {
//     this.onChange(RichUtils.toggleInlineStyle(
//       this.state.editorState,
//       'BOLD'
//     ));
//   }

  render() {
    return (
      <div id='content'>
        <h1>Draft.js Editor</h1>
        <AppStyle />
        {/* <AppStyle /> */}
        <button onClick={() => this._onBoldClick(this)}>Bold</button>
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
