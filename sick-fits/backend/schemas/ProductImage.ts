import { cloudinaryImage } from '@keystone-next/cloudinary';
import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import { permissions, rules } from '../access';

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: 'ProductImage',
};

export const ProductImage = list({
  access: {
    create: rules.canCreateProducts,
    read: () => true,
    update: rules.canCreateProducts,
    delete: rules.canCreateProducts,
  },
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    altText: text(),
    product: relationship({ ref: 'Product.photo' }),
  },
  ui: {
    hideCreate: (args) => !permissions.canManageProducts(args),
    listView: {
      initialColumns: ['image', 'altText', 'image'],
    },
  },
});
