import React, { Dispatch, RefObject, SetStateAction } from 'react';
import styled from 'styled-components';
import { GifsResult } from '@giphy/js-fetch-api';
import GridColumn from './gridColumn';
import { BaseProps } from '../../interfaces';
import { IImages } from '@giphy/js-types/dist/images';

interface iGifGridProps extends BaseProps {
  data: GifsResult['data'];
  columns: number;
  refObj: RefObject<HTMLDivElement>;
  setImages: Dispatch<SetStateAction<IImages | null>>;
}

const GifGrid = ({
  refObj,
  data,
  columns,
  setImages,
  ...otherProps
}: iGifGridProps) => {
  const columnsArr: GifsResult['data'][] = [];
  data.forEach((item, i) => {
    const colIndex = i % columns;
    if (!columnsArr[colIndex]) {
      columnsArr.push([]);
    }
    columnsArr[colIndex].push(item);
  });
  const { width } = window.visualViewport;
  return (
    <div ref={refObj} {...otherProps}>
      {columnsArr.map((dataArr, i) => (
        <GridColumn
          key={i}
          data={dataArr}
          width={width / columns}
          setImages={setImages}
        />
      ))}
    </div>
  );
};

export default styled(GifGrid)`
  display: flex;
  flex-direction: row;
`;
