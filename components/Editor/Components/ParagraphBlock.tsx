import type { ComponentConfig } from "@measured/puck";

export const ParagraphBlock: ComponentConfig = {
  fields: {
    children: {
      type: 'text',
    },
  },
  render: ({ children }) => {
    return <p>{children}</p>;
  },
};
