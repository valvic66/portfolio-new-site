import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'posts');

export const getPosts = () => {
  const fileNames = fs.readdirSync(postsDir);
  const postData = fileNames?.map((fileName) => {
    const slug = fileName.replace(/.md/, '');

    const fullPath = path.join(postsDir, fileName);
    const fileContent = fs.readFileSync(fullPath, 'utf-8');
    const matterContent = matter(fileContent);

    return {
      slug,
      ...matterContent.data,
      content: matterContent?.content,
    };
  });

  return postData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
};
