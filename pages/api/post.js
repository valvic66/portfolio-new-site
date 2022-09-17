import NextCors from 'nextjs-cors';
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  // if (req.method !== 'POST') {
  //   // @ts-ignore
  //   const users = await prisma.user.findMany();
  //   return res.status(200).json({ users });
  // }

  if (req.method == 'POST') {
    const { title, userId } = req.body;

    const newPost = await prisma.post.create({
      data: {
        title,
        userId,
      },
    });

    res.status(200).json(newPost);
  }
}

// const result = await prisma.user.update({
//   where: {
//     id: userId,
//   },
//   data: {
//     post: {
//       create: {
//         title,
//       },
//     },
//   },
// });
