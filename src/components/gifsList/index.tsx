import React, {
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import { useUpdatingCallback } from 'use-updating-callbacks';
import api from '../../services/giphyApi';
import { GifsResult } from '@giphy/js-fetch-api';
import { DEFAULT_API_LIMIT } from '../../constants';
import GifGrid from './gifGrid';
import { BaseProps } from '../../interfaces';
import styled from 'styled-components';
import { IImages } from '@giphy/js-types/dist/images';

interface iGifsListState {
  data: GifsResult['data'];
  lastResponseId: string;
  loading: boolean;
  page: number;
  error: Error | null;
  hasMore: boolean;
}

const defaultState: iGifsListState = {
  data: [],
  lastResponseId: '',
  loading: false,
  page: 1,
  error: null,
  hasMore: true,
};

interface iGifsListProps extends BaseProps {
  setImages: Dispatch<SetStateAction<IImages | null>>;
}

const GifsList = ({ setImages, ...props }: iGifsListProps) => {
  const [{ data, loading, page, error, hasMore, lastResponseId }, setState] =
    useState<iGifsListState>(defaultState);

  const getList = useUpdatingCallback(() => {
    if (loading || !hasMore) {
      return;
    }
    setState((state) => ({
      ...state,
      loading: true,
      error: null,
    }));
    api
      .getDataPaginated(page)
      .catch((err) => {
        setState((state) => ({
          ...state,
          error: err,
          loading: false,
        }));
        throw err;
      })
      .then(({ data: newData, pagination, meta }) => {
        if (
          !newData ||
          !meta ||
          !pagination ||
          lastResponseId === meta.response_id
        ) {
          return;
        }
        if (!meta || meta.status >= 400) {
          return setState((state) => ({
            ...state,
            error: new Error(
              `Failed to get data with status ${meta?.status}: ${meta.msg} `
            ),
          }));
        }
        setState((state) => ({
          ...state,
          data: page === 1 ? newData : [...state.data, ...newData],
          page: page + 1,
          loading: false,
          hasMore: pagination?.total_count >= (page + 1) * DEFAULT_API_LIMIT,
          lastResponseId: meta.response_id,
        }));
      });
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getList();
  }, []);
  return (
    <div
      {...props}
      onScroll={(e) => {
        const { bottom } = ref.current?.getBoundingClientRect() || {};
        if (!bottom) {
          return;
        }
        const { height } = window.visualViewport;
        if (bottom <= height + 300 && !loading) {
          getList();
        }
      }}
    >
      <GifGrid data={data} columns={4} refObj={ref} setImages={setImages} />
    </div>
  );
};

export default styled(GifsList)`
  height: 100vh;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
