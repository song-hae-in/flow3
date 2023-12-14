import React, {useCallback} from 'react';
import { useStore, getStraightPath, MarkerType } from 'reactflow';
import {nanoid} from 'nanoid';
import { getEdgeParams } from './util';

function CustomEdge({
  id = nanoid(),
  source,
  target,
  style = {width:20,
           height: 20,},
  markerEnd = {
    type: MarkerType.Arrow,
  },
}) {
console.log('edge')
const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));
console.log(sourceNode)
console.log(targetNode)

if (!sourceNode || !targetNode) {
    return null;
}

const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);
const [edgePath] = getStraightPath({
  sourceX: sx,
  sourceY: sy,
  targetX: tx,
  targetY: ty,
});


  return (
    <path
    id={id}
    d={edgePath}
    markerEnd={markerEnd}
    style={{...style, stroke: 'black'}}/>
  );
}

export default CustomEdge;