import { GiphyFetch } from '@giphy/js-fetch-api';
import { DEFAULT_API_LIMIT } from '../constants';

class GiphyApi {
  service: GiphyFetch;
  constructor(apiToken?: string) {
    if (!apiToken) {
      throw new Error('Api service: No api token provided');
    }
    this.service = new GiphyFetch(apiToken);
  }

  async getDataPaginated(page: number = 1, limit: number = DEFAULT_API_LIMIT) {
    return this.service.trending({ limit, offset: (page - 1) * limit });
  }
}

export default new GiphyApi(process.env.REACT_APP_API_TOKEN);
