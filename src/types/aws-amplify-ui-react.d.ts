declare module '@aws-amplify/ui-react' {
  import { ComponentType, ReactNode, CSSProperties } from 'react';

  // Common props
  interface BaseProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
    marginBottom?: string;
    marginTop?: string;
  }

  // Theme types
  export interface Theme {
    name: string;
    tokens: Record<string, any>;
    overrides?: Record<string, any>;
  }

  // Form Field Props
  interface FieldProps extends BaseProps {
    label?: string;
    name?: string;
    value?: string;
    required?: boolean;
    placeholder?: string;
    marginBottom?: string;
  }

  // UI Components
  export const Button: ComponentType<BaseProps & {
    variation?: 'primary' | 'secondary' | 'link';
    size?: 'small' | 'default' | 'large';
    isLoading?: boolean;
    loadingText?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
  }>;

  export const View: ComponentType<BaseProps & {
    as?: keyof JSX.IntrinsicElements;
    padding?: string;
    backgroundColor?: string;
    borderRadius?: string;
    boxShadow?: string;
  }>;

  export const Text: ComponentType<BaseProps & {
    as?: keyof JSX.IntrinsicElements;
    variation?: 'primary' | 'secondary' | 'tertiary' | 'error';
    fontSize?: string;
    fontWeight?: string | number;
    color?: string;
  }>;

  export const Flex: ComponentType<BaseProps & {
    direction?: 'row' | 'column';
    alignItems?: 'stretch' | 'center' | 'flex-start' | 'flex-end';
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
    wrap?: 'nowrap' | 'wrap';
    gap?: string | number;
  }>;

  export const Card: ComponentType<BaseProps & {
    variation?: 'elevated' | 'outlined';
    padding?: string;
  }>;

  export const Badge: ComponentType<BaseProps & {
    variation?: 'info' | 'warning' | 'error' | 'success';
  }>;

  export const Loader: ComponentType<BaseProps & {
    size?: 'small' | 'large';
    variation?: 'linear' | 'circular';
  }>;

  export const Alert: ComponentType<BaseProps & {
    variation?: 'info' | 'warning' | 'error' | 'success';
    isDismissible?: boolean;
    hasIcon?: boolean;
    heading?: string;
  }>;

  export const TextField: ComponentType<FieldProps & {
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }>;

  export const SelectField: ComponentType<FieldProps & {
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options?: Array<{ value: string; label: string }>;
  }>;

  export const TextAreaField: ComponentType<FieldProps & {
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  }>;

  export const Divider: ComponentType<BaseProps>;

  interface AuthenticatorComponent extends ComponentType<BaseProps & {
    socialProviders?: ('amazon' | 'apple' | 'facebook' | 'google')[];
    variation?: 'default' | 'modal';
    initialState?: 'signIn' | 'signUp';
  }> {
    Provider: ComponentType<{ children: ReactNode }>;
  }

  export const Authenticator: AuthenticatorComponent;

  export const Collection: ComponentType<BaseProps & {
    type?: 'list' | 'grid';
    items?: any[];
    gap?: string | number;
  }>;

  export const Grid: ComponentType<BaseProps & {
    templateColumns?: string;
    templateRows?: string;
    gap?: string | number;
  }>;

  export const Heading: ComponentType<BaseProps & {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
  }>;

  export const ThemeProvider: ComponentType<{
    theme?: Theme;
    children: ReactNode;
  }>;

  // Theme utilities
  export function createTheme(theme: Theme): Theme;
  export function defaultTheme(): Theme;
}
