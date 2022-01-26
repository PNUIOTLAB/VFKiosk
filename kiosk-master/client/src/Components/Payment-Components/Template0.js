import React from 'react';
import styled from 'styled-components';

const TemplateBlock0 = styled.div`
  width: 595px;
  height: 100px;
  @media only screen and (max-width: 768px){
    width:100%;
    position:fixed;
    bottom:15%;
  }
  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
  margin-top:5px;
  display: flex;
  flex-direction: column;
`; 

function Template0({ children }) {
  return <TemplateBlock0>{children}</TemplateBlock0>;
}

export default Template0;
