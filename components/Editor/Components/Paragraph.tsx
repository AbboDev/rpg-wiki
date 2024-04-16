import type { ComponentConfig } from '@measured/puck';

export const Paragraph: ComponentConfig = {
  fields: {
    children: {
      type: 'text',
    },
  },
  render: ({ children }) => {
    return <p className="whitespace-pre-line">{children}</p>;
  },
};
