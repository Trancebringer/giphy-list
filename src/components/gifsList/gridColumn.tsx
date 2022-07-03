import { GifsResult } from '@giphy/js-fetch-api';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { BaseProps } from '../../interfaces';
import { IImages } from '@giphy/js-types/dist/images';

interface iGridColumnProps extends BaseProps {
  data: GifsResult['data'];
  width: number;
  setImages: Dispatch<SetStateAction<IImages | null>>;
}

const GridColumn = ({
  data,
  style,
  width,
  setImages,
  ...otherProps
}: iGridColumnProps) => {
  const computedWidth = width - 6;
  return (
    <div style={{ ...style, width: computedWidth }} {...otherProps}>
      {data.map((item, i) => (
        <div className="item-wrapper" key={`${item.id}${i}`}>
          <img
            style={{
              width: computedWidth,
            }}
            onClick={() => {
              setImages(item.images);
            }}
            className="item-image"
            src={item.images.original.url}
            alt={item.title}
          />
        </div>
      ))}
    </div>
  );
};

export default styled(GridColumn)`
  margin: 0 3px;
`;
