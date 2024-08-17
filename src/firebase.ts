import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

export interface Devplate {
  name: string;
  url: string;
}

const firebaseConfig = {
  apiKey: "AIzaSyBp0P6mrbmEXHxy7nR9gWndXOqTekesNAE",
  databaseURL: "https://devplate-1cf7c-default-rtdb.firebaseio.com",
  projectId: "devplate-1cf7c",
  messagingSenderId: "413404523011",
  appId: "1:413404523011:web:080ceed868908f33c67c36",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const toGithubApIurl = (repoUrl: string): string | null => {
  const githubUrlRegex =
    /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)$/i;
  const match = repoUrl.match(githubUrlRegex);

  if (match && match.length === 3) {
    const owner = match[1];
    const repo = match[2];
    return `https://api.github.com/repos/${owner}/${repo}/contents`;
  } else {
    return null;
  }
};

export const getDevplates = async (): Promise<Devplate[]> => {
  const dbRef = ref(database, "repositories");
  const ret: Devplate[] = [];

  const snapshot = await get(dbRef);
  const urls = Object.values(snapshot.val()) as string[];

  for (const url of urls) {
    try {
      const fetchUrl = toGithubApIurl(url);

      if (!fetchUrl) {
        throw new Error("Failed to fetch data");
      }
      const response = await fetch(fetchUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();

      jsonData.forEach((devplate: any) => {
        ret.push({ url: url, name: devplate.name });
      });
    } catch (error) {
      console.error(error);
    }
  }

  return ret;
};
