export interface category {
    id: number;
    name: string;
    description: string | null;
    image: string;
    slug: string;
    children?: Array<category> | null;
    options?: Array<category> | null;
    circle_icon: string;
    disable_shipping: number;
  }