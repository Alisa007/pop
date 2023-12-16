import styles from '../app/page.module.css';
import { useMemo } from 'react';
import useSWR from 'swr';
import {getData, Item, ApiResponse} from './api/name';

const LIMIT: number = 1500;

type IndexProps = {
    items: Item[],
    letters: string[],
}

async function getRecords({offset, limit}: {offset: number, limit: number}): Promise<ApiResponse> {
    const url = `/api/name?limit=${limit}&offset=${offset}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw(`${res.status}: ${res.statusText}`);
    }

    return res.json();
}

function normalize(items: Item[]) {
    return items.reduce((acc, item: Item) => {
        const letter = item.name[0];

        acc[letter] = [...(acc[letter] ?? []), {
            _id: item._id,
            name: item.name,
        }];

        return acc;
    }, {} as {[key: string]: Item[]});
}

export default function Index({items, letters}: IndexProps) {
    const { data, isLoading } = useSWR('/api/named', async () => [...items, ...(await getRecords({offset: items.length, limit: LIMIT})).items], {fallbackData: items});

    const normalizedPokemons: [letter: string, items: Item[]][] = useMemo(() => {
      const res = normalize(data);
  
      return Object.entries(res);
    }, [data]);
  
    return (
      <main className={styles.main}>
          <h1>
            LotR
          </h1>
          <ul className={styles.letterList}>
            {letters.map((letter: string) => (
              <li key={letter} className={styles.letterItem}>
                <a className={isLoading ? styles.letterLinkDisabled : ''} href={`#${letter}`}>{letter}</a></li>
            ))}
          </ul>
  
          <ul className={styles.letterGroup}>
            {normalizedPokemons.map(pokemon => (
              <li key={pokemon[0]} id={pokemon[0]}>
                <h2>
                  {pokemon[0]}
                </h2>
                <ul className={styles.letterGroup}>
                  {pokemon[1].map(({_id, name}) => (
                    <li key={_id ?? name} className={styles.name}>{name}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
      </main>
    )
}

export async function getStaticProps() {
    const response = await getData({offset: 0, limit: LIMIT});
    const letters = response.reduce((acc: Set<string>, item: Item) => {
        const firstLetter = item.name[0];

        acc.add(firstLetter);

        return acc;
    }, new Set());

    return { props: { items: response.slice(0, 40), letters: Array.from(letters) } }
}