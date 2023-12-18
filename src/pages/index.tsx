import styles from '../app/page.module.css';
import {getData, Item} from './api/name';

const LIMIT: number = 1500;

type Data = [string, Item[]][];

type IndexProps = {
    data: Data,
    letters: string[],
}

export default function Index({data, letters}: IndexProps) {  
    return (
      <main className={styles.main}>
          <h1>
            LotR
          </h1>
          <ul className={styles.letterList}>
            {letters.map((letter: string) => (
              <li key={letter} className={styles.letterItem}>
                <a href={`#${letter}`}>{letter}</a></li>
            ))}
          </ul>
  
          <ul className={styles.letterGroup}>
            {data.map(pokemon => (
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

function normalize(items: Item[]) {
  const map = items.reduce((acc, item: Item) => {
      const letter = item.name[0];

      acc[letter] = [...(acc[letter] ?? []), {
          _id: item._id,
          name: item.name,
      }];

      return acc;
  }, {} as {[key: string]: Item[]});

  return Object.entries(map)
}

export async function getStaticProps() {
    const response = await getData({offset: 0, limit: LIMIT});
    const letters = response.reduce((acc: Set<string>, item: Item) => {
        const firstLetter = item.name[0];

        acc.add(firstLetter);

        return acc;
    }, new Set());

    return { props: { data: normalize(response), letters: Array.from(letters) } }
}