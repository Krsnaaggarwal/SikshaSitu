declare module '@wix/data' {
  export namespace items {
    interface WixDataItem { [key: string]: any }
    interface WixDataResult<T> { items: T[] }
  }
  export const items: typeof items;
}

declare module '@wix/members' {
  export namespace members {
    type GetMyMemberResponse = any;
  }
  export const members: typeof members;
}

declare module '@wix/image-kit' {
  export const sdk: any;
  export const STATIC_MEDIA_URL: string;
  export type FittingType = string;
  export function getPlaceholder(...args: any[]): any;
}
