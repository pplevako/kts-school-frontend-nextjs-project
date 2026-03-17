const routes = {
  home: {
    create: () => '/',
  },
  products: {
    create: () => '/products',
  },
  product: {
    create: (documentId: string) => `/products/${documentId}`,
  },
  about: {
    create: () => '/about',
  },
  login: {
    create: () => '/login',
  },
  register: {
    create: () => '/register',
  },
  profile: {
    create: () => '/profile',
  },
};

export default routes;
