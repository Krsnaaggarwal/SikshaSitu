// Provide a minimal JSX global so TS knows about intrinsic elements used in project
import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // common HTML elements used by the project
      div: any;
      span: any;
      input: any;
      textarea: any;
      table: any;
      thead: any;
      tbody: any;
      tfoot: any;
      tr: any;
      th: any;
      td: any;
      caption: any;
      a: any;
      img: any;
      section: any;
      header: any;
      main: any;
      footer: any;
      nav: any;
      form: any;
      button: any;
      label: any;
      svg: any;
      path: any;
      // fallback
      [elemName: string]: any;
    }
    type Element = React.ReactElement | any;
    type ElementClass = any;
    interface ElementAttributesProperty { props: any }
    interface IntrinsicAttributes { [key: string]: any }
  }
}

export {};
