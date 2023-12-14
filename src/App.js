import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
} from 'reactflow';
 
import 'reactflow/dist/style.css';
import Lefttop from './cp/lefttop';
import { nanoid } from 'nanoid';
 
import CustomNode from './cp/cnode';
import CustomEdge from './cp/dedge';

const nodeTypes = {
  customNode: CustomNode
};
const edgeTypes = {
  CustomEdge: CustomEdge
}

const initialNodes = [];
const initialEdges = [];

 

export default function App() {

// edge와 노드를 다루는 함수 및 변수
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);


  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

// id 가져오기 위해 사용.
const getNodeId = (change) => {

  console.log("change:", change);

  const regex =  /reactflow__edge-([^[]+)\[source\]-([^[]+)\[target]/;
  const matches = change.match(regex);

  if (matches && matches.length === 3) {
    const [sourceNodeId, targetNodeId] = matches.slice(1);
    console.log("sourceNodeId:", sourceNodeId);
    console.log("targetNodeId:", targetNodeId);

    return { sourceNodeId, targetNodeId };
  }

  return null;
};


const onEdgesChange = useCallback(
  (changes) => {
    setEdges((eds) => {
      let updatedEdges = applyEdgeChanges(changes, eds);

      changes.forEach((change) => {
        if (change.type === 'remove') {
          const result = getNodeId(change.id);
          //console.log( result)
          //console.log(change)
   


          if (result !== null) {
            const { sourceNodeId, targetNodeId } = result;
            console.log("source:", sourceNodeId);
            console.log("target:", targetNodeId);
          
            const updatedNodes = nodes.map((node) => {
              if (node.id === sourceNodeId || node.id === targetNodeId) {
                // 해당하는 노드 데이터 수정
                return { ...node, data: { ...node.data, edgeCount: node.data.edgeCount - 1 } };
              }
              return node;
            });
          
          
            setNodes(updatedNodes);
          } else {
            console.error('getNodeid(...) returned null.');
          }

        }
      });

      return updatedEdges;
    });
  },
  [setEdges, setNodes, nodes]
);
  

    
  const onConnect = useCallback( (connection) => {
    const edge = { ...connection, type: 'CustomEdge' ,style:{strokeWidth:'5px'}};
    console.log(connection)
  setNodes((ns)=> ns.map((node)=>{
    if (node.id === connection.source || node.id === connection.target){
      return {...node, data:{...node.data, edgeCount: node.data.edgeCount + 1}};
    }
    return node;
  }));
    // 기존에 있는 edgs에 connect로 인해 생긴 edge 추가.
    setEdges((eds) => addEdge(edge, eds));
  },[setEdges, setNodes]); 



//left top에서 사용 하는 함수, 변수
   // 이벤트 발생시 동작할 것.
  const [nameValue, setNameValue] = useState(''); //버튼 눌렀을 때 동작하게 하기 위해.
  const [linkValue, setLinkValue] = useState('');
  const [colorValue, setColorValue] = useState('#ffc0cb'); 

  const handleNameChange = (event) => {
    setNameValue(event.target.value);};

  const handleLinkChange = (event) => {
    setLinkValue(event.target.value);};

  const handleColorChange = (event) => {
    setColorValue(event.target.value);};
    
  const HandleButtonClick = () => {
    const newNode = {
      id: nanoid(),// 값 중복 피하기
      position: { x: Math.random() * 100, y: Math.random() * 100 },
      data: { label: nameValue, link: linkValue, color: colorValue, edgeCount:0 }, // 노드에 color, link 커스텀 노드
      type: 'customNode'
        
    };
      // 작동후 원래대로 돌리는 과정.
      setNodes((ns) => [...ns, newNode]);
      setNameValue('');
      setLinkValue('');
    };

    

 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Lefttop
        handleNameChange={handleNameChange}
        handleLinkChange={handleLinkChange}
        handleColorChange={handleColorChange}
        HandleButtonClick={HandleButtonClick}
        nameValue={nameValue}
        linkValue={linkValue}
        colorValue={colorValue}
        />
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
