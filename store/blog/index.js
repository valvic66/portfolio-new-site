import create from 'zustand';

const defaultPosts = [
  {
    data: {
      title: '',
      description: '',
      date: '',
    },
  },
];

const usePosts = create((set, get) => ({
  posts: defaultPosts,
  setPosts: (posts) => set({ posts }),

  clearToken: () => set({ token: '' }),
  clearUser: () => set({ user: {} }),
}));

export default usePosts;
