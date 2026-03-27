export type StrapiImage = {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
};

export type StrapiCategory = {
  id: number;
  documentId: string;
  title: string;
};

export type StrapiProduct = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  discountPercent: number;
  images?: StrapiImage[];
  productCategory?: StrapiCategory;
};

export type PaginationMeta = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    pagination: PaginationMeta;
  };
};

export type ProductsResponse = PaginatedResponse<StrapiProduct>;
export type CategoriesResponse = PaginatedResponse<StrapiCategory>;
