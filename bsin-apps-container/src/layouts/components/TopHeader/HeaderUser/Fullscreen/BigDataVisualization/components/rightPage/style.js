import styled from 'styled-components';

export const RightPage = styled.div`
  width: 25vw;
  height: auto;
  padding: 0px 0.2rem;
`;

export const RightTopBox = styled.div`
  position: relative;
  height: 20vh;
  width: 100%;
  margin-bottom: 0.25rem;
  .right-top {
    &-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.1875rem;
    }
    .earth-gif {
      width: 12vw;
      height: auto;
      border-radius: 50%;
      overflow: hidden;
    }
  }
`;

export const RightCenterBox = styled.div`
  position: relative;
  height: 22vh;
  width: 100%;
  margin-bottom: 0.25rem;
`;

export const RightBottomBox = styled.div`
  position: relative;
  height: 50vh;
  width: 100%;
  .right-bottom-borderBox13 {
    padding: 0.25rem 0.1875rem 0.1875rem;
    .right-bottom {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: rgba(19, 25, 47, 0.6);
      .feedback-box {
        margin-top: 0.1rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        &-item {
          display: flex;
          align-items: center;
          flex-direction: column;
          height: 10vh;
          .dis-text {
            height: 2vh;
            line-height: 2vh;
            font-weight: bold;
            margin-top: 0.0625rem;
            color: #b2cfee;
            font-size: 0.2rem;
            background: linear-gradient(to bottom, #fff, #6176f4);
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
          }
        }
      }
      .offline-portal-box {
        margin-top: 0.125rem;
      }
    }
  }
`;
