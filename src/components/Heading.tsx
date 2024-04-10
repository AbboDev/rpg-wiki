import { ElementType, ComponentProps } from 'react';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface Props extends ComponentProps<HeadingTag> {
  as?: ElementType<any, HeadingTag>;
}

export function Heading({ as: Tag = 'h1', className, ...otherProps }: Props) {
  let defaultClassName = `font-semibold ${className}`;

  switch (Tag) {
    case 'h1':
      defaultClassName += ' text-4xl';
      break;
    case 'h2':
      defaultClassName += ' text-3xl';
      break;
    case 'h3':
      defaultClassName += ' text-2xl';
      break;
    case 'h4':
      defaultClassName += ' text-xl';
      break;
    case 'h5':
      defaultClassName += ' text-lg';
      break;
    case 'h6':
    default:
      defaultClassName += ' text-md';
      break;
  }

  return <Tag className={defaultClassName} {...otherProps} />;
}
