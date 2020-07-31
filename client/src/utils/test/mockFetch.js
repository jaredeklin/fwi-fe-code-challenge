import playerData from './players';

async function mockFetch(uri, config) {
  const url = uri.toString();

  switch (url) {
    case 'http://localhost:3001/players?sortBy=&sortOrder=': {
      const players = Object.values(playerData);
      return {
        ok: true,
        status: 200,
        json: async () => ({ total: players.length, players }),
      };
    }
    case 'http://localhost:3001/players': {
      const player = {
        id: '70629df2-571a-4899-b36a-8f36c909508a',
        name: 'Bob Bobbity',
        country: 'US',
        winnings: 93024,
        imageUrl:
          'https://i.pravatar.cc/40?u=70629df2-571a-4899-b36a-8f36c909508a',
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
    case 'http://localhost:3001/players/70629df2-571a-4899-b36a-8f36c909508a': {
      const player = {
        id: '70629df2-571a-4899-b36a-8f36c909508a',
        name: 'Bobby Bobbity',
        country: 'US',
        winnings: 93024,
        imageUrl:
          'https://i.pravatar.cc/40?u=70629df2-571a-4899-b36a-8f36c909508a',
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
