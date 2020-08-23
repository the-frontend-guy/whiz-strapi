/**
 *
 * WysiwygEditor
 *
 */

import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import PropTypes from 'prop-types';

class WysiwygEditor extends React.Component {
  constructor(props){
    super(props)
    const html = this.props.value;
    const contentBlock = html ? htmlToDraft(html) : null;

    if(contentBlock){
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    } else {
    this.state = {
      editorState: EditorState.createEmpty(),
    }
  }
  }
  

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.props.onChange({
        target: {
          value: draftToHtml(convertToRaw(editorState.getCurrentContent())),
          name: this.props.name,
        },
      })
  };

  onInputChange = (editorState) => {

  }

  render() {
    const { editorState } = this.state;
    console.log(this.props.value);
    return (
      <Editor 
      onEditorStateChange={this.onEditorStateChange}  
      editorState={editorState} />
    );
  }
}

WysiwygEditor.defaultProps = {
  setRef: () => {},
};

WysiwygEditor.propTypes = {
  setRef: PropTypes.func,
};

export default WysiwygEditor;
