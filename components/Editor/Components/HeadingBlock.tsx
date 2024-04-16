import type { ComponentConfig } from "@measured/puck";

export const HeadingBlock: ComponentConfig = {
  fields: {
    children: {
      type: 'text',
    },
  },
  render: ({ children }) => {
    return <h1>{children}</h1>;
  },
};
