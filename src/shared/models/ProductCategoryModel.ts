import type { StrapiCategory } from '@/api/types';
import type { Option } from '@/components/MultiDropdown';

class ProductCategoryModel {
  id: number;
  documentId: string;
  title: string;

  constructor(data: StrapiCategory) {
    this.id = data.id;
    this.documentId = data.documentId;
    this.title = data.title;
  }

  get categoryOption(): Option {
    return { key: this.id.toString(), value: this.title };
  }
}

export default ProductCategoryModel;
