import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { IImages } from '@giphy/js-types/dist/images';
import { BaseProps } from '../interfaces';

interface iImagesViewProps extends BaseProps {
  images: IImages;
  hideView: () => void;
}

const ImagesView = ({ images, hideView, ...otherProps }: iImagesViewProps) => {
  const [currentIndex, setIndex] = useState(0);
  const keyArr = useMemo(
    () => Object.keys(images) as unknown as (keyof IImages)[],
    [images]
  );
  const currentObject = images[keyArr[currentIndex]];
  return (
    <div {...otherProps}>
      <div
        className={`nav-button${currentIndex <= 0 ? ' disabled' : ''}`}
        onClick={() => {
          if (currentIndex <= 0) {
            return;
          }
          setIndex((i) => i - 1);
        }}
      >
        {'<'}
      </div>
      {'url' in currentObject ? (
        <img src={currentObject.url} alt={keyArr[currentIndex]} />
      ) : (
        <ReactPlayer url={currentObject.mp4} loop={true} playing={true} />
      )}
      <div
        className={`nav-button${
          currentIndex >= keyArr.length - 1 ? ' disabled' : ''
        }`}
        onClick={() => {
          if (currentIndex >= keyArr.length - 1) {
            return;
          }
          setIndex((i) => i + 1);
        }}
      >
        {'>'}
      </div>
      <div className="close" onClick={hideView}>
        X
      </div>
    </div>
  );
};

export default styled(ImagesView)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: space-around;
  align-items: center;
  img {
    max-width: 80vw;
    max-height: 80vh;
  }
  .close {
    position: absolute;
    top: 50px;
    right: 50px;
    color: white;
    font-size: 3rem;
    cursor: grab;
    border: white 1px solid;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 3rem;
  }
  .nav-button {
    color: white;
    font-size: 3rem;
    cursor: grab;
    border: white 1px solid;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 2.75rem;
  }
  .disabled {
    cursor: not-allowed;
    color: gray;
    border: gray 1px solid;
  }
`;
