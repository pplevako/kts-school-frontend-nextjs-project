import ProductCategoryModel from '../ProductCategoryModel';

type ImageFormat = {
  url: string;
  width: number;
  height: number;
};

type ImageFormatKey = 'large' | 'medium' | 'small' | 'thumbnail';

type ProductImage = {
  url: string;
  width: number;
  height: number;
  formats: Record<ImageFormatKey, ImageFormat>;
};

class ProductModel {
  id: number;
  documentId: string;
  title: string;
  description: string;
  price: number;
  category: ProductCategoryModel | null = null;
  images: ProductImage[] = [];

  // TODO: add API type
  constructor(data: any) {
    this.id = data.documentId;
    this.documentId = data.documentId;
    this.title = data.title;
    this.description = data.description;
    this.price = data.price;

    if (data.productCategory) {
      this.category = new ProductCategoryModel(data.productCategory);
    }

    if (Array.isArray(data.images)) {
      this.images = data.images.map((image: unknown) => this.transformImage(image));
    }
  }

  // TODO: add API type
  private transformImage(image: any): ProductImage {
    const formats: Record<string, ImageFormat> = {};
    if (image.formats && typeof image.formats === 'object') {
      Object.entries(image.formats).forEach(([format, img]: [string, any]) => {
        formats[format] = {
          url: img.url,
          width: img.width,
          height: img.height,
        };
      });
    }

    return {
      url: image.url,
      width: image.width,
      height: image.height,
      formats,
    };
  }

  getImageUrl({ index = 0, format }: { index?: number; format: ImageFormatKey }): string {
    return this.images[index]?.formats[format]?.url || '';
  }

  get cardImageUrl(): string {
    return this.getImageUrl({ format: 'small' });
  }

  get categoryTitle(): string | undefined {
    return this.category?.title;
  }
}

export default ProductModel;
