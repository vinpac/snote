import React from 'react'
import classNames from 'classnames';
import { getSelectedBlockElement } from '../../utils/editorUtils'

class AddButton extends React.Component {

  state = {
    visible: false,
    isOpen: false,
    style: {}
  };

  blockKey = '';
  blockType = '';
  blockNode = null;

  constructor(props) {
    super(props)

    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.toggleButtons = this.toggleButtons.bind(this)
    this.findNodeAndShow = this.findNodeAndShow.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { editorState } = nextProps
    const contentState = editorState.getCurrentContent()
    const selection = editorState.getSelection()
    if (!selection.isCollapsed() || selection.anchorKey !== selection.focusKey) {
      this.hide();
      return;
    }
    const block = contentState.getBlockForKey(selection.anchorKey)
    const blockKey = block.getKey()
    const blockLength = block.getLength()

    if (blockLength > 0 || block.getType() !== 'unstyled')
      return this.hide();

    if (this.blockKey === blockKey)
      this.show()
    else
      setTimeout(this.findNodeAndShow, 0)

    this.blockKey = blockKey


  }

  findNodeAndShow() {
    const blockNode = getSelectedBlockElement()

    if (blockNode === this.blockNode)
      return

    if (!blockNode)
      return this.setState({
        visible: false,
        isOpen: false
      })

    this.blockNode = blockNode


    this.setState({
      visible: true,
      isOpen: false,
      style: {
        top: blockNode.offsetTop - 3,
        left: blockNode.offsetLeft - 52
      }
    })
  }

  show() {
    if (!this.state.visible) {
      this.setState({
        visible: true,
        isOpen: false
      })
    }
  }

  hide() {
    if (this.state.visible) {
      this.setState({
        visible: false,
        isOpen: false
      })
    }
  }

  toggleButtons() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  get className() {
    const state = this.state;
    return classNames("editor-add",
      {
        "visible": state.visible,
        "open": state.isOpen
      }
    )
  }

  render() {
    return (
      <div className={this.className} style={ this.state.style }>
        <button className="btn editor-add-btn btn-circle" onClick={this.toggleButtons}/>
        <button
          onClick={ () => this.props.onButtonClick('image') }
          className="btn btn-circle">
          <i className="fa fa-camera" />
        </button>
        <button
          onClick={ () => this.props.onButtonClick('image') }
          className="btn btn-circle">
          <i className="fa fa-code" />
        </button>
        <button
          onClick={ () => this.props.onButtonClick('image') }
          className="btn btn-circle">
          <i className="fa fa-link" />
        </button>
      </div>
    );
  }
}

export default AddButton
