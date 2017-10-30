var React = require('react');
import {Editor, EditorState,RichUtils} from 'draft-js';
//import TextToolBox from './TextToolBox';
import editorStyles from '../styles/editorStyles';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      DocID: 132132132132132
    };
    this.onChange = (editorState) => this.setState({editorState});
  }
  _onToggleClick(style) {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      style
    ));
  }


  render() {
    return (
      <div>
        <button> Back to Documents Portal</button>
        <h2>Sample Document</h2>
        <p>Shareable Document ID: {this.state.DocID}</p>
        <button>Save Changes</button>
        <br>
        </br>
        <button onClick={() => this._onToggleClick('BOLD')}>Bold</button>
        <button onClick={() => this._onToggleClick('ITALIC')}>Italicize</button>
        <button onClick={() => this._onToggleClick('UNDERLINE')}>Underline</button>
        <div>
          {/* <TextToolBox style={myStyles.toolBoxContainer}/> */}
          <div style={editorStyles.textContainer}>
          <Editor className='testEditor' editorState={this.state.editorState} onChange={this.onChange} />
        </div>
      </div>
      // </div>
    );
  }
}
{/* <Editor style={{border: '2px solid black'}}/>; */}
export default MyEditor;
