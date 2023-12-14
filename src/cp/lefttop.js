import { Panel } from "reactflow";
import React from 'react';

const Lefttop = (
    { 
        handleNameChange, 
        handleLinkChange, 
        handleColorChange, 
        HandleButtonClick, 
        nameValue, 
        linkValue, 
        colorValue }  ) =>

    ( <Panel position="top-left">
        <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '10px',
              border: '3px solid black',
              padding: '10px',
              backgroundColor: 'pink',
        }}>
            <div 
            style={{ 
                width: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-end' }}>

              <input onChange={handleNameChange} 
                     type='text' value={nameValue}
                     placeholder='이름' 
                     style={{border: '2px solid black'}}/>

              <input onChange={handleLinkChange}
                     value={linkValue} type='text' 
                     placeholder='링크를 입력하세요'
                     style={{border: '2px solid black'}}/>

              <input onChange={handleColorChange} 
                     value={colorValue} type='color' 
                     style={{width:'30px', height:'20px',padding:'-1',}} />
            </div>
            <button
              onClick={HandleButtonClick}
              style={{ alignSelf: 'center', borderRadius: '20%' }}
            >
              create
            </button>
        </div>
    </Panel>
);

export default Lefttop;