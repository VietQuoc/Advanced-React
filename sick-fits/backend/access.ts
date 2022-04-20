/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// At it's simplest, return yes or no depend on user session

import { permissionList } from './schemas/fields';
import { ListAccessArgs } from './types';

export function isSignedIn({ session }: ListAccessArgs): boolean {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionList.map((per) => [
    per,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[per];
    },
  ])
);

// Permissions check if someone meets a criteria - yes or no.
export const permissions = {
  ...generatedPermissions,
  isAwesome({ session }: ListAccessArgs) {
    return session?.data?.name?.includes('whitebear');
  },
};

// Rule based on function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CAUD.
export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) return false;
    // 1. Do they have the permisssion
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // 2. If not do they own this item?
    return { user: { id: session.itemId } };
  },
  canOrder({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) return false;
    // 1. Do they have the permisssion
    if (permissions.canManageOrders({ session })) {
      return true;
    }
    // 2. If not do they own this item?
    return { user: { id: session.itemId } };
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) return false;
    // 1. Do they have the permisssion
    if (permissions.canManageOrders({ session })) {
      return true;
    }
    // 2. If not do they own this item?
    return { order: { user: { id: session.itemId } } };
  },
  canCreateProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) return false;
    if (permissions.canManageProducts({ session })) {
      return true; // They can read everything!
    }
    return false;
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (permissions.canManageProducts({ session })) {
      return true; // They can read everything!
    }
    // They should only see available products
    return { status: 'AVAILABLE' };
  },
  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) return false;
    // 1. Do they have the permisssion
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    // 2. otherwise they may only update themeselves
    return { id: session.itemId };
  },
};
