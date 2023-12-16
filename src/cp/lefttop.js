import { Panel } from "reactflow";
import React, { useState } from 'react';

const Lefttop = (
  { 
    handleNameChange, 
    handleLinkChange, 
    handleColorChange, 
    HandleButtonClick, 
    nameValue, 
    linkValue, 
  }
) => {

  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const defaultColors = ['#F94144', '#F3722C', '#F8961E', '#F9844A', '#43AA8B', '#577590', '#2B2D42'];

  return (
    <Panel position="top-left">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '10px',
          border: '3px solid black',
          padding: '10px',
          backgroundColor: 'pink',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <input
            onChange={handleNameChange}
            type='text'
            value={nameValue}
            placeholder='이름'
            style={{ border: '2px solid black' }}
          />

          <input
            onChange={handleLinkChange}
            value={linkValue}
            type='text'
            placeholder='링크를 입력하세요'
            style={{ border: '2px solid black' }}
          />

          <div style={{ display: 'flex', gap: '5px' }}>
            {defaultColors.map((btnColor, index) => (
              <button
                key={index}
                onClick={() => {
                  handleColorChange({ target: { value: btnColor } });
                  setSelectedButtonIndex(index);
                }}
                style={{
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  backgroundColor: btnColor,
                  border: selectedButtonIndex === index ? '2px solid black' : '2px solid white',
                }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={HandleButtonClick}
          style={{
            alignSelf: 'center',
            borderRadius: '20%',
            backgroundColor: 'white',
            color: 'black',
            border: '2px solid black',
          }}
        >
          create
        </button>
      </div>
    </Panel>
  );
};

export default Lefttop;
