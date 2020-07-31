import playerData from './players';
import { DEFAULT_QUERY_SIZE } from '../../constants';

const BASE_URL = 'http://localhost:3001/players';
const PLAYER_ID = '70629df2-571a-4899-b36a-8f36c909508a';

async function mockFetch(url, config) {
  switch (url) {
    case `${BASE_URL}?sortBy=&sortOrder=&size=${DEFAULT_QUERY_SIZE}&from=0`: {
      const players = Object.values(playerData);
      return {
        ok: true,
        status: 200,
        json: async () => ({ total: players.length, players }),
      };
    }
    case BASE_URL: {
      const player = {
        id: PLAYER_ID,
        name: 'Bob Bobbity',
        country: 'US',
        winnings: 93024,
        imageUrl: `https://i.pravatar.cc/40?u=${PLAYER_ID}`,
      };

      if (config.method === 'POST') {
        return {
          ok: true,
          status: 201,
          json: async () => player,
        };
      }

      return;
    }
    case `${BASE_URL}/${PLAYER_ID}`: {
      const player = {
        id: PLAYER_ID,
        name: 'Bobby Bobbity',
        country: 'US',
        winnings: 93024,
        imageUrl: `https://i.pravatar.cc/40?u=${PLAYER_ID}`,
      };

      if (config.method === 'PATCH') {
        return {
          ok: true,
          status: 200,
          json: async () => player,
        };
      }

      if (config.method === 'DELETE') {
        return {
          ok: true,
          status: 204,
        };
      }

      return;
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
}

export default mockFetch;
