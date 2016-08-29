import React, { Component } from 'react';
import { Editor, EditorState, SelectionState, ContentState, RichUtils } from 'draft-js'
import AddButton from './AddButton'
import EditorControls from './EditorControls'
import AtomicBlock from './blocks/AtomicBlock'
import addImage from '../../editor/modifiers/addImage';

class NoteEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(ContentState.createFromText('We’re now eight months into building Medium, having started in earnest in February of this year. In August, we launched what I call the “preview” version—which included viewing content publicly and creation for a small whitelist of folks. No real homepage, discovery, profiles, or many other important features.'))
    };

    this.focus = () => this.refs.editor.focus();
    this.blur = () => this.refs.editor.blur();
    this.onChange = (editorState, fn) => this.setState({ editorState }, fn);
    this.getEditorState = () => this.state.editorState;

    this.onBlur = this.onBlur.bind(this)
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this)
    this.toggleBlockType = this.toggleBlockType.bind(this)
    this.getBlockStyle = this.getBlockStyle.bind(this)
    this.moveFocusIfNotCollapsed = this.moveFocusIfNotCollapsed.bind(this)
    this.blockRenderer = this.blockRenderer.bind(this)
    this.onAddButtonClick = this.onAddButtonClick.bind(this)
  }

  onAddButtonClick(label) {
    const src = "https://66.media.tumblr.com/e2472d6f8e3619c19aea724928c7c87e/tumblr_ockt0cRt9h1qz7t0xo1_540.jpg"
    const editorState = addImage(
      this.state.editorState,
      src
    )

    this.onChange(editorState)

  }

  blockRenderer(contentBlock) {
    switch (contentBlock.getType()) {
      case 'atomic': return {
        component: AtomicBlock,
        editable: false,
      }
      default: return null
    }
  }

  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  getBlockStyle(block) {
    switch (block.getType()) {
      case 'header-one': return 'note-block note-block-header'
      default: return 'note-block note-block-text'
    }
  }

  onBlur(e) {
    setTimeout(this.moveFocusIfNotCollapsed, 0)
  }

  moveFocusIfNotCollapsed() {
    const { editorState } = this.state
    const selection = editorState.getSelection()
    //const content = editorState.getCurrentContent();

    if (!selection.isCollapsed()) {
      this.setState({
        editorState: EditorState.acceptSelection(
          editorState,
          new SelectionState({
            anchorKey: selection.anchorKey,
            anchorOffset: selection.anchorOffset,
            focusKey: selection.focusKey,
            focusOffset: selection.anchorOffset,
            isBackward: false,
          })

        )
      }, this.blur)
    }
  }


  render() {
    const { editorState } = this.state;
    return (
      <div className="note-editor">
        <Editor
          ref="editor"
          blockRendererFn={this.blockRenderer}
          blockStyleFn={this.getBlockStyle}
          editorState={editorState}
          onBlur={this.onBlur}
          onChange={this.onChange}
        />
        <AddButton
          onButtonClick={ this.onAddButtonClick }
          editorState={editorState}
          focus={this.focus}
        />
        <EditorControls
          onToggleBlockType={this.toggleBlockType}
          onToggleInlineStyle={this.toggleInlineStyle}
          editorState={editorState}
        />
      </div>
    );
  }
}

export default NoteEditor;
