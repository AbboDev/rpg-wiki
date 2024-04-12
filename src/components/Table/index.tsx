import { ComponentProps, ReactNode } from 'react';

interface Props extends ComponentProps<'table'> {
  head?: ReactNode;
  footer?: ReactNode;
}

export const HEADING_CLASS_NAME = 'py-3 px-2';

export function Table({ head, footer, children, ...otherProps }: Props) {
  const className = `${otherProps.className} w-full table-auto text-wrap text-start border border-slate-400`;

  return (
    <table {...otherProps} className={className}>
      {head && <thead>{head}</thead>}
      <tbody>{children}</tbody>
      {footer && <tfoot>{footer}</tfoot>}
    </table>
  );
}
