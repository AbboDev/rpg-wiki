import { forwardRef, HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLHeadingElement> {
  rank?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Heading = forwardRef<HTMLHeadingElement, Props>(function Heading(
  { rank, className, ...otherProps },
  ref,
) {
  let defaultClassName = `font-semibold ${className || ''}`;
  const Tag: any = rank ? `h${rank}` : 'span';

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

  return <Tag className={defaultClassName} {...otherProps} ref={ref} />;
});

export { Heading };
