var React = require('react');
import {Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap, convertToRaw, convertFromRaw} from 'draft-js';
import editorStyles from '../styles/editorStyles';
import {Glyphicon} from 'react-bootstrap';
var FontAwesome = require('react-fontawesome');
import { SketchPicker } from 'react-color';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {Popover} from 'material-ui/Popover';
import {Map} from 'immutable'
import axios from 'axios';
import Mousetrap from 'mousetrap';
import io from 'socket.io-client';

const myBlockTypes = DefaultDraftBlockRenderMap.merge(new Map({
  'center': {
    element: 'center'
  },
  'right':{
    wrapper: <div style={{textAlign: 'right'}}/>
  }
}));

const styleMap = {
  'BLUE': {
    color: 'blue',
  },
};


class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'cheese',
      editorState: EditorState.createEmpty(),
      DocID: '',
      inlineStyles: {},
      currentFontSize: 12,
      color: '#000'
    };

    this.focus = () => this.refs.editor.focus();
    
}

  onChange(editorState) {
    const contentState = editorState.getCurrentContent();
    const stringContent = JSON.stringify(convertToRaw(contentState));
    this.socket.emit(('change', stringContent));
    this.setState({editorState})
  }

  _onToggleClick(e, style, block) {
    e.preventDefault();
    if(block){
      this.onChange(RichUtils.toggleBlockType(
        this.state.editorState,
        style
      ));
      return
    }
    if(style){
      this.onChange(RichUtils.toggleInlineStyle(
        this.state.editorState,
        style
      ));
    }
  }

  generateButton({icon, style, block}){
    return(
      <FlatButton
        onMouseDown={(e) => this._onToggleClick(e, style, block)}
        // backgroundColor={this.state.editorState.getInlineStyle().has(style) ? 'grey' : 'white'}
        style={{minWidth: '40px'}}
        icon={<FontIcon className='material-icons'>{icon}</FontIcon>}
      />
    );
  }

  generateFontButton(increased){
    return(
      <FlatButton
        onMouseDown={() => this.changeFontSize(increased)}
        // backgroundColor={this.state.editorState.getInlineStyle().has(style) ? 'grey' : 'white'}
        style={{minWidth: '40px'}}
        icon={<FontIcon className='material-icons'>{increased ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</FontIcon>}
      />
    );
  }

  changeFontSize(increaseFontSize){
    // console.log("The color is ", color.hex);
    var newFontSize = increaseFontSize ? this.state.currentFontSize + 4 : this.state.currentFontSize - 4;
    var newInlineStyle = Object.assign(
      {},
      this.state.inlineStyles,
      {
        [newFontSize]: {
          fontSize: `${newFontSize}px`
        }
      }
    )
    this.setState({
      inlineStyles: newInlineStyle,
      editorState: RichUtils.toggleInlineStyle(this.state.editorState, String(newFontSize)),
      currentFontSize: newFontSize
    })
  }


  openColorPicker(e){
    this.setState({
      colorPickerOpen: true,
      colorPickerButton: e.target
    });
  }

  closeColorPicker(e){
    this.setState({
      colorPickerOpen: false
    });
  }

  formatColor(color){
    console.log("The color is ", color.hex);
    var newInlineStyle = Object.assign(
      {},
      this.state.inlineStyles,
      {
        [color.hex]: {
          color: color.hex,
          // fontWeight: 'bold'
        }
      }
    )
    // console.log(e);
    // e.preventDefault();
    this.refs.editor.focus();
    this.setState({
      color,
      inlineStyles: newInlineStyle,
      editorState: RichUtils.toggleInlineStyle(this.state.editorState, color.hex)
    });
    this.closeColorPicker();
  }

  pickColor(){
    // To do: Implement color text that will work even if the user doesn't
    // highlight any text. I think we need to override the default behavior
    // in SketchPicker but I'm not sure how we would do so.

    return(
      <div style={{display: 'inline-block'}}>
        <FlatButton
          style={{minWidth: '40px'}}
          icon={<FontIcon className='material-icons'>format_color_text</FontIcon>}
          onClick={this.openColorPicker.bind(this)}
        />

        <Popover
          open={this.state.colorPickerOpen}
          // open={true}
          anchorEl={this.state.colorPickerButton}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.closeColorPicker.bind(this)}
        >
          <SketchPicker
            onChangeComplete={this.formatColor.bind(this)}
            color={this.state.color}
            // onMouseDown={(e) => this._onToggleClick(e)}
          />
        </Popover>
      </div>
    );
  }


  _saveButtonClick() {
    console.log('in save button click', this.state.editorState)
    if(this.state.editorState){
    var contentString = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    }
      axios.post('http://localhost:3000/saveFile', {
      content: contentString,
      id: this.state.DocID
    }, {
      //add some settings if needed
    })
    .then(function(resp){
      console.log('sent to server successfully');
    })
    .catch(function(err){
      console.log('did not sent to server', err);
    })
  }

  getDocInfo(resp){
    if (resp.data.document.rawText.trim().length < 1){
      this.setState({
        title: resp.data.document.title,
        DocID: resp.data.document._id,
      })
    } else {
      var newText = (convertFromRaw(JSON.parse(resp.data.document.rawText)))
      console.log('this is newText', newText)
      this.setState({
      title: resp.data.document.title,
      editorState: EditorState.createWithContent(newText),
      DocID: resp.data.document._id,
      })
    }
    console.log(this.state)
  }

  // onChange(editorState){
  //   const contentState = editorState.getCurrentContent();
  //   const stringContent = JSON.stringify(convertToRaw(contentState));
  //   this.socket.emit(('change', stringContent));
  //   this.setState({
  //     editorState
  //   })
  // }

  componentDidMount() {
    this.socket = io('http://localhost:3000/');
    this.socket.on('connect', () => {
      console.log('connected');
    });
      
    this.socket.on('globalChange', (data) => {
      const rawContentState = JSON.parse(data);
      const contentState = convertFromRaw(rawContentState);
      const newEditorState = EditorState.createWithContent(contentState);
      this.setState({
        editorState: newEditorState
      });
    });

    Mousetrap.bind(['command+s', 'ctrl+s'], () => { this._saveButtonClick() })

    // window.addEventListener('keyup', () => this._saveButtonClick(), true)

    axios.get(`http://localhost:3000/editDoc/${this.props.match.params.docId}`, {}
    )
    .then((resp) => (this.getDocInfo(resp)))
    .catch(error => console.log('BAD', error));
  }

  goBack(){
    return this.props.history.push("/home");
  }

  // componentDidMount(){
  //   axios.get('http://localhost:3000/docs', {}
  // )
  // .then((resp) => (this.userVerif(resp)))
  // .catch(error => console.log('BAD', error));
  // }
  changeTitle(e){
    this.setState({title: e.target.value})
  }
  updateTitle(){
    console.log("title: ", this.state.title)
    axios.post('http://localhost:3000/updateTitle',
     {newTitle: this.state.title, id: this.state.DocID})
  }


  render() {
    return (
      <div style={{padding: 25}}>
        <button onClick={() => this.goBack()}>Back to Documents Portal</button><br></br>
        <input value = {this.state.title} onChange={(e) => this.changeTitle(e)}>
        </input><button onClick={() =>this.updateTitle()}>Change Title</button>
        <p>Shareable Document ID: {this.state.DocID}</p>
        { /* <button onClick={() => this._saveButtonClick()}>Save Changes</button> */}
        <br>
        </br>
        <div>
          <center>
          {this.generateButton({icon: 'format_bold', style: 'BOLD'})}
          {this.generateButton({icon: 'format_italic', style: 'ITALIC'})}
          {this.generateButton({icon: 'format_underlined', style: 'UNDERLINE'})}
          {/* {this.generateButton({icon: 'format_color_text'})} */}
          {this.pickColor()}
          {/* {this.generateButton({icon: 'format_size'})} */}
          {this.generateFontButton(true)}
          {this.generateFontButton(false)}
          {this.generateButton({icon: 'format_align_left', style: 'unstyled', block: true})}
          {this.generateButton({icon: 'format_align_right', style: 'right', block: true})}
          {this.generateButton({icon: 'format_align_center', style: 'center', block: true})}
          {this.generateButton({icon: 'format_list_bulleted', style: 'unordered-list-item', block: true})}
          {this.generateButton({icon: 'format_list_numbered', style: 'ordered-list-item', block: true})}
          <FlatButton
          onMouseDown={() => this._saveButtonClick()}
          style={{minWidth: '40px'}}
          icon={<FontIcon className='material-icons'>{'save'}</FontIcon>}
        />
          {/* <SketchPicker/> */}
        </center>
        </div>
        <div>
          {/* <TextToolBox style={myStyles.toolBoxContainer}/> */}
          <div style={editorStyles.textContainer} onClick={this.focus}>
            <Editor
              ref="editor"
              blockRenderMap={myBlockTypes}
              className='testEditor'
              customStyleMap={this.state.inlineStyles}
              editorState={this.state.editorState}
              onChange={this.onChange.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}
export default MyEditor;
