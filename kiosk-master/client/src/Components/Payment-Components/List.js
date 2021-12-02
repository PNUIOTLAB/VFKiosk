import React from 'react';
import styled from 'styled-components';
import Item from './Item';

const ListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function List() {
  return (
    <ListBlock>
      <Item text="프로젝트 생성하기" done={true} />
      <Item text="컴포넌트 스타일링 하기" done={true} />
      <Item text="Context 만들기" done={false} />
      <Item text="기능 구현하기" done={false} />
    </ListBlock>
  );
}

export default List;
