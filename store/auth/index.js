import create from 'zustand';

const defaultUser = {
  email: '',
  password: '',
};

const useAuth = create((set, get) => ({
  token: '',
  user: defaultUser,
  clearToken: () => set({ token: '' }),
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: {} }),
}));

export default useAuth;
