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
 