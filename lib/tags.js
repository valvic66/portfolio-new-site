import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'posts');

export const getTags = () => {
  const fileNames = fs.readdirSync(postsDir);
  const postData = fileNames?.map((fileName) => {
    // const slug = fileName.replace(/.md/, '');

    const fullPath = path.join(postsDir, fileName);
    const fileContent = fs.readFileSync(fullPath, 'utf-8');
    const matterContent = matter(fileContent);

    return matterContent?.data?.tags;
  });

  const allPostSlugs = postData?.reduce((acc, post) => {
    acc = [...acc, ...post];

    return acc;
  }, []);

  const singleSlugs = new Set();
  allPostSlugs.map((slug) => singleSlugs.add(slug));

  return [...singleSlugs];
};
