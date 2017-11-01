// var React = require('react');
// import {Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';
// //import TextToolBox from './TextToolBox';
// import editorStyles from '../styles/editorStyles';
// import axios from 'axios';

// class newDoc extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       editorState: EditorState.createEmpty(),
//       DocID: ''
//     };
//     this.onChange = (editorState) => this.setState({editorState});
//   }
//   _onToggleClick(style) {
//     this.onChange(RichUtils.toggleInlineStyle(
//       this.state.editorState,
//       style
//     ));
//   }
//   _saveButtonClick() {
//     var contentString = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
//     axios.post('http://localhost:3000/saveFile', {
//       content: contentString,
//       id: this.state.DocID
//     }, {
//       //add some settings if needed
//     })
//     .then(function(resp){
//       console.log('sent to server successfully');
//     })
//     .catch(function(err){
//       console.log('did not sent to server', err);
//     })
//   }

//   // componentDidMount(){
//   //   axios.get('http://localhost:3000/docs', {}
//   // )
//   // .then((resp) => (this.userVerif(resp)))
//   // .catch(error => console.log('BAD', error));
//   // }


//   render() {
//     return (
//       <div>
//         <button> Back to Documents Portal</button>
//         <h2>Sample Document</h2>
//         <p>Shareable Document ID: {this.state.DocID}</p>
//         <button onClick={() => this._saveButtonClick()}>Save Changes</button>
//         <br>
//         </br>
//         <button onClick={() => this._onToggleClick('BOLD')}>Bold</button>
//         <button onClick={() => this._onToggleClick('ITALIC')}>Italicize</button>
//         <button onClick={() => this._onToggleClick('UNDERLINE')}>Underline</button>
//         <div>
//           {/* <TextToolBox style={myStyles.toolBoxContainer}/> */}
//           <div style={editorStyles.textContainer}>
//           <Editor className='testEditor' editorState={this.state.editorState} onChange={this.onChange} />
//         </div>
//       </div>
//       // </div>
//     );
//   }
// }
// {/* <Editor style={{border: '2px solid black'}}/>; */}
// export default Editor;
