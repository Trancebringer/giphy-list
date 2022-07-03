import React, { useState } from 'react';
import styled from 'styled-components';
import GifsList from './components/gifsList';
import ImagesView from './components/imagesView';
import { BaseProps } from './interfaces';
import { IImages } from '@giphy/js-types/dist/images';

function App(props: BaseProps) {
  const [imagesData, setImages] = useState<IImages | null>(null);
  return (
    <div {...props}>
      <GifsList setImages={setImages} />
      {imagesData && (
        <ImagesView images={imagesData} hideView={() => setImages(null)} />
      )}
    </div>
  );
}

export default styled(App)`
  overflow: hidden;
`;
