// CustomNode.js
import React,{memo} from 'react';
import { Handle } from 'reactflow';
//문자 `{}`를 사용해서 색깔이 안들어갔음.

//rgb색상의 보색을 계산하는 함수.



const CustomNode = ({ data}) => {
  
  // console.log("edgeCount:", data.edgeCount);

    const handleNode2Click = () => {
        if (data.link) {
            window.open(data.link, '_blank'); // 노드 클릭 시 링크로 이동, 새 창을 여는 형식임. 크롬에서 탭으로 열려서 원래 화면으로 돌아가야 하는 불편함 발생.
        }
      };
    // 노드의 크기를 엣지의 수에 따라 동적으로 설정합니다.
    const nodeSize = 100 + data.edgeCount * 20;

        
    

      
  return (//더블클릭 이벤트를 수집헤서 발생시 handleNodelClick을 작동
    <div key={data.id} className="customNode" onDoubleClick={handleNode2Click} 
         style={{position: 'relative', width: `${nodeSize}px`, height: `${nodeSize}px`,
                 borderRadius: '50%', background: data.color }}>


      <div draggable style={{
          position: 'absolute',
          width: '10%',
          height: '30%',
          borderRadius: '5px',
          backgroundColor: 'black', // 색상을 원하는 색으로 변경하세요
          transform: 'rotate(45deg)',
          top: '0',
          left: '15px',}}/>


        <Handle type='source' position='bottom' id={'[source]'}/>
        <Handle className='customhandle'type='target' position="top" id={'[target]'}/>
      <div style={{ position: 'absolute', top: '50%', left: '50%',transform: 'translate(-50%, -50%)', 
                    textAlign: 'center', fontSize:`${12+data.edgeCount*3}px`}}>

        {data.label}
      </div> 
    </div>
  );
};

export default memo(CustomNode);