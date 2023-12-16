import type { NextApiRequest, NextApiResponse } from 'next'
 
export type Item = {
  name: string;
  _id?: string,
}

export type ApiResponse = {
  items: Item[],
}

export const getData = async ({offset, limit}: {offset: number | string, limit: number | string}) => {
  const url = `https://the-one-api.dev/v2/character?limit=${limit}&offset=${offset}&sort=name:asc`;
  const init = {
      headers: {
          Authorization: `Bearer ${process.env.LOTR_TOKEN}`
      }
  };

  const result = await fetch(url, init);
  const json = await result.json();

  return json.docs;
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const {offset = 0, limit = 0} = req.query;

  if (Array.isArray(offset) || Array.isArray(limit)) {
    throw('Invalid query params');
  }

  return res.status(200).json({
      items: await getData({offset, limit}),
  })
}