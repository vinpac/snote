import React from 'react'
import inlineButtons from '../../blocks/inlineButtons'
import blockButtons from '../../blocks/blockButtons'
import classNames from 'classnames';
import { getSelection, getSelectionRect } from '../../utils/editorUtils'
import ReactDOM from 'react-dom'

class EditorControls extends React.Component {

  state = {
    visible: false
  }

  clicked = false

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this)
    this.renderButton = this.renderButton.bind(this)
    this.handleBlockButtonClick = this.handleBlockButtonClick.bind(this)
    this.handleInlineStyleButtonClick = this.handleInlineStyleButtonClick.bind(this)
    this.handleSelectionStateChange = this.handleSelectionStateChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { editorState } = nextProps
    const selectionState = editorState.getSelection()
    const visible = !selectionState.isCollapsed() && selectionState.hasFocus

    setTimeout(this.handleSelectionStateChange.bind(this, visible), 0)


  }

  handleSelectionStateChange(visible) {
    if (!visible) {
      return this.setState({
        visible
      })
    }

    const nativeSelection = getSelection(window);

    if (!nativeSelection.rangeCount)
      return

    const selectionBoundary = getSelectionRect(nativeSelection)

    const controlsNode = ReactDOM.findDOMNode(this);
    const controlsBoundary = controlsNode.getBoundingClientRect();

    const style = {
      top: selectionBoundary.top - 45 - 8,
      left: selectionBoundary.left - (controlsBoundary.width / 2) + (selectionBoundary.width / 2)
    };

    if (style.left < 10) {
      style.left = 10
    } else if(style.left > window.innerWidth - controlsBoundary.width - 10) {
      style.left = window.innerWidth - controlsBoundary.width - 10
    }

    this.setState({ style })

    if( !this.state.visible || !this.state.stillVisible) {
      this.setState({
        visible,
        stillVisible: this.state.visible
      })
    }
  }

  handleClick() {
    this.clicked = true
  }

  handleInlineStyleButtonClick(label, evt) {
    evt.preventDefault()
    const { onToggleInlineStyle } = this.props
    if (onToggleInlineStyle)
      onToggleInlineStyle(label)
  }

  handleBlockButtonClick(label, evt) {
    evt.preventDefault()
    const { onToggleBlockType } = this.props
    if (onToggleBlockType)
      onToggleBlockType(label)
  }

  renderButton(button, fn) {
    return (
      <button
        key={button.label}
        className="btn btn-transparent"
        label={button.description}
        onMouseDown={fn.bind(this, button.label)}>
        {
          button.icon
          ? <i className={`fa fa-${button.icon}`} />
          : button.text
        }
      </button>
    )
  }

  render() {
    const { visible, style, stillVisible } = this.state
    return (
      <div
        className={classNames("editor-controls nav", { 'visible': visible, 'still-visible': stillVisible })}
        style={style}
        onMouseDown={this.handleClick}
      >
        { inlineButtons.map(button => this.renderButton(button, this.handleInlineStyleButtonClick)) }
        <div className="editor-controls-divisor" />
        { blockButtons.map(button => this.renderButton(button, this.handleBlockButtonClick)) }
      </div>
    );
  }
}

export default EditorControls
