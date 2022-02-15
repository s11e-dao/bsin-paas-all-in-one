import styled from 'styled-components';
import { TitleColor } from '../../style/color';

export const TopBox = styled.div`
  .top_box {
    display: flex;
    justify-content: center;

    .top_decoration10 {
      position: relative;
      width: 33.3%;
      height: 0.0625rem;
    }

    .top_decoration10_reverse {
      transform: rotateY(180deg);
    }

    .title-box {
      display: flex;
      justify-content: center;

      .top_decoration8 {
        width: 2.5rem;
        height: 0.625rem;
      }

      .title {
        position: relative;
        width: 30vw;
        height: 50px;
        text-align: center;
        background-size: cover;
        background-repeat: no-repeat;

        .title-text {
          font-size: 1.5rem;
          position: absolute;
          bottom: -30px;
          left: 50%;
          color: #fff;
          transform: translate(-50%, 0%);
        }

        .top_decoration6 {
          width: 3.125rem;
          height: 0.2rem;
        }

        .title-bototm {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translate(-50%);
        }
      } // end title
    } // end title-box
  } // end top_box
`;

export const TimeBox = styled.div`
  position: absolute;
  right: 0.375rem;
  top: 0.5rem;
  text-align: right;
  color: #fff;
  h3 {
    font-size: 1rem;
    color: ${TitleColor};
  }
`;
