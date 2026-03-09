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
};

export default routes;
