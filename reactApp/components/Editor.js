var React = require('react');
import {Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap} from 'draft-js';
//import TextToolBox from './TextToolBox';
import editorStyles from '../styles/editorStyles';
import {Glyphicon} from 'react-bootstrap';
var FontAwesome = require('react-fontawesome');
import { SketchPicker } from 'react-color';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {Popover} from 'material-ui/Popover';
import {Map} from 'immutable'

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
      editorState: EditorState.createEmpty(),
      DocID: 132132132132132,
      inlineStyles: {},
      currentFontSize: 12
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
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
    this.setState({
      inlineStyles: newInlineStyle,
      editorState: RichUtils.toggleInlineStyle(this.state.editorState, color.hex)
    })
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
            // onMouseDown={(e) => this._onToggleClick(e)}
          />
        </Popover>
      </div>
    );
  }


  render() {
    return (
      <div>
        <button> Back to Documents Portal</button>
        <h2>Sample Document</h2>
        <p>Shareable Document ID: {this.state.DocID}</p>
        <button>Save Changes</button>
        {/* {this.state.pickedOpen ? <SketchPicker /> : null} */}
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
          {this.generateButton({icon: 'save'})}
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
              onChange={this.onChange} />
          </div>
        </div>
      </div>
    );
  }
}
{/* <Editor style={{border: '2px solid black'}}/>; */}
export default MyEditor;
