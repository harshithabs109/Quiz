// src/App.styles.ts
import styled, { createGlobalStyle } from 'styled-components';
import BGImage from './images/image.png';

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    background-image: url(${BGImage});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
  }
  * {
    font-family: 'Catamaran', sans-serif;
    box-sizing: border-box;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
  }

  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }

  h1 {
    font-family: Fascinate Inline;
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    font-weight: 400;
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 70px;
    text-align: center;
    margin: 20px;
  }

  select {
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 8px;
    border: 2px solid #d38558;
    background: rgba(255, 255, 255, 0.9);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  select:hover {
    border-color: #ff8c42;
    transform: scale(1.05);
    background: rgba(255, 230, 200, 0.95);
  }
  select:active {
    transform: scale(0.95);
  }

  .start, .next {
    cursor: pointer;
    background: linear-gradient(180deg, #ffffff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 45px;
    margin: 20px 0;
    padding: 0 40px;
    font-size: 1rem;
    transition: all 0.2s ease;
  }
  .start:hover, .next:hover {
    transform: scale(1.08);
    background: linear-gradient(180deg, #fff3e0, #ffb74d);
  }
  .start:active, .next:active {
    transform: scale(0.92);
  }

  /* Added End button style */
  .end {
    cursor: pointer;
    background: linear-gradient(180deg, #ff6f61, #d43f3a);
    border: 2px solid #a72d26;
    box-shadow: 0px 5px 10px rgba(164, 44, 36, 0.6);
    border-radius: 10px;
    height: 40px;
    margin: 10px 0 30px;
    padding: 0 30px;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    transition: all 0.2s ease;
  }
  .end:hover {
    background: linear-gradient(180deg, #d43f3a, #a72d26);
    transform: scale(1.05);
  }
  .end:active {
    transform: scale(0.9);
  }
`;

export const ResultsWrapper = styled.div`
  background: rgba(255, 255, 255, 0.85);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  max-width: 700px;
  width: 100%;

  h2 {
    color: #333;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    color: #555;
    margin: 5px 0;
  }

  .summary {
    margin-top: 20px;
    text-align: left;
    max-height: 400px;
    overflow-y: auto;
    padding-right: 10px;
  }

  .summary-item {
    margin-bottom: 15px;
  }

  hr {
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
