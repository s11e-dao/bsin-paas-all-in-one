import styled from 'styled-components';

export const CenterPage = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 40vw;
`;

export const CenterBottom = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-top: 10px;
  width: 50vw;
  height: 30vh;
  .detail-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: space-between;
    justify-content: space-around;
    width: 100%;
    &-item {
      display: flex;
      align-items: center;
      position: relative;
      height: 15vh;
      padding: 10px;
      width: 32%;
      border-radius: 5px;
      border: 1px solid #343f4b;
      background-color: rgba(19, 25, 47, 0.8);
      img {
        width: 100px;
        height: 100px;
      }
      .detail-item-text {
        margin-left: 10px;
        h3 {
          color: #bcdcff;
          font-size: 16px;
          margin-bottom: 10px;
        }
        span {
          font-weight: 500px;
          font-size: 10px;
          font-weight: bolder;
          background: linear-gradient(to bottom, #fff, #4db6e5);
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
        }
        .unit {
          font-size: 10px;
          margin-left: 10px;
        }
      }
    }
  }
`;
