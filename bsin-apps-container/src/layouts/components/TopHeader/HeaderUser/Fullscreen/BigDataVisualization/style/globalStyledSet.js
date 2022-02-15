import styled from 'styled-components';
import { TitleColor } from './color';

//  标题a
export const ModuleTitle = styled.h3`
  padding: 10px 10px;
  color: ${TitleColor};
  font-size: 1rem;
  font-weight: bold;
  height: 2rem;
  line-height: 2rem;
  text-align: left;
  .iconfont {
    font-size: 0.175rem;
    margin-right: 0.125rem;
    color: #89e5ff;
    font-weight: 400;
    display: none;
  }
`;
