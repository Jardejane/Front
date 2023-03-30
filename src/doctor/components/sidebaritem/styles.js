import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #1a202c;
  font-size: 20px;
  color: white;
  padding: 6px;
  cursor: pointer;
  border-radius: 10px;
  margin: 0 15px 15px;

  > svg {
    margin: 0 20px;
  }

  &:hover {
    background-color: #000046;
  }
`;
