export function getSelectedBlockElement() {
  let selection = window.getSelection()
  if (selection.rangeCount === 0)
    return null

  let node = selection.getRangeAt(0).startContainer
  do {
    if (node.getAttribute && node.getAttribute('data-block') === 'true')
      return node
    node = node.parentNode
  } while (node != null)
  return null
}

export function getSelection(node) {
  return node.getSelection
    ? node.getSelection()
    : root.document.getSelection
      ? root.document.getSelection()
      : root.document.selection
        ? root.document.selection.createRange().text
        : null
}

export function getSelectionRect(selection) {
  let rect = selection.getRangeAt(0).getBoundingClientRect()
  if (!(rect && rect.top))
    rect = selection.getRangeAt(0).getClientRects()[0]

  if (!rect && (selection.anchorNode && selection.anchorNode.getBoundingClientRect)) {
    rect = selection.anchorNode.getBoundingClientRect()
    rect.isEmptline = true
  }

  return rect
}
