import type { Option } from '@components/MultiDropdown';

class ProductCategoryModel {
  id: number;
  title: string;

  // TODO: add API type
  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
  }

  get categoryOption(): Option {
    return { key: this.id.toString(), value: this.title };
  }
}

export default ProductCategoryModel;
