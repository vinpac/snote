import React from 'react'
import { Entity } from 'draft-js';

const AtomicBlock = ({ block }) => {
  const entity = Entity.get(block.getEntityAt(0))
  const data = entity.getData()
  const type = entity.getType()

  if (type === 'image') {
    return (
      <div className="note-block-atomic note-block-image">
        <img src={data.src} alt=""/>
      </div>
    )
  }

  return (
    <p>No supported block for {type}</p>
  );
};

AtomicBlock.displayName = 'AtomicBlock';

export default AtomicBlock;
