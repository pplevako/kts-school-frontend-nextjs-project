const routes = {
  main: {
    create: () => '/',
  },
  products: {
    create: () => '/products',
  },
  product: {
    create: (documentId: string) => `/products/${documentId}`,
  },
};

export default routes;
