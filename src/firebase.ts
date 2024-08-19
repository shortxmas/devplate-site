import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

export interface Devplate {
  name: string;
  author: string;
  url: string;
  tags: string[];
  pullCommand: string;
}

interface DevplateRepoInfo {
  url: string;
  author: string;
  repository: string;
}

const firebaseConfig = {
  projectId: "devplate-1cf7c",
  appId: "1:413404523011:web:080ceed868908f33c67c36",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const toDevplateRepoInfo = (repoUrl: string): DevplateRepoInfo | null => {
  const githubUrlRegex =
    /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)$/i;
  const match = repoUrl.match(githubUrlRegex);

  if (match && match.length === 3) {
    const owner = match[1];
    const repo = match[2];
    return {
      url: `https://api.github.com/repos/${owner}/${repo}/contents`,
      author: owner,
      repository: repo,
    };
  } else {
    return null;
  }
};

const keywords = [
  "React",
  "Angular",
  "Vue",
  "Svelte",
  "Node.js",
  "Express",
  "Python",
  "Django",
  "Flask",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "Java",
  "Spring",
  "Ruby",
  "Rails",
  "Go",
  "Rust",
  "C#",
  "ASP.NET",
  "SQL",
  "NoSQL",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Docker",
  "Kubernetes",
  "GraphQL",
  "REST",
  "Jest",
  "Mocha",
  "Cypress",
  "Webpack",
  "Babel",
  "Gulp",
  "Grunt",
  "Bootstrap",
  "Tailwind",
  "Sass",
  "Less",
  "Node",
];

const extractKeywords = (input: string): string[] => {
  const normalizedInput = input.toLowerCase().replace(/-/g, " ");
  const inputWords = normalizedInput.split(/\s+/);
  const matches = keywords.filter((keyword) => {
    const lowerKeyword = keyword.toLowerCase();
    return inputWords.some((word) => word.includes(lowerKeyword));
  });
  return matches;
};

export const getDevplates = async (): Promise<Devplate[]> => {
  const dbRef = ref(database, "repositories");
  const ret: Devplate[] = [];

  const snapshot = await get(dbRef);
  const urls = Object.values(snapshot.val()) as string[];

  for (const url of urls) {
    try {
      const repoInfo = toDevplateRepoInfo(url);
      const fetchUrl = repoInfo.url;
      const author = repoInfo.author;
      const repo = repoInfo.repository;

      if (!fetchUrl) {
        throw new Error("Failed to fetch data");
      }
      const response = await fetch(fetchUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();

      jsonData.forEach((devplate: Devplate) => {
        const tags: string[] = extractKeywords(devplate.name);
        ret.push({
          url: url,
          name: devplate.name,
          tags: tags,
          author: author,
          pullCommand: `dp pull ${author}/${repo}/${devplate.name}`,
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  return ret;
};
