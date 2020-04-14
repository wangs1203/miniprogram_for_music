import { CSSProperties } from 'react';

export interface JAComponent {
  className?: string | string[] | { [key: string]: boolean };

  customStyle?: string | CSSProperties;
}

// eslint-disable-next-line no-undef
export default JAComponent;
