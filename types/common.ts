import { ReactNode } from 'react';

/**
 * Common component props that accept children
 */
export interface WithChildren {
  children: ReactNode;
}

/**
 * Props for layout components
 */
export interface LayoutProps extends WithChildren {
  params: Promise<{
    locale: string;
  }>;
}

/**
 * Props for components that support className
 */
export interface WithClassName {
  className?: string;
}

/**
 * Supported locale types
 */
export type Locale = 'en' | 'uk' | 'es';

/**
 * Banner component props
 */
export interface BannerProps extends WithClassName {
  // No additional props currently needed
}
