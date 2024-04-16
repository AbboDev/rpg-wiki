import type { ComponentConfig } from "@measured/puck";
import { Heading } from "@/components/Heading";

export const HeadingBlock: ComponentConfig = {
  fields: {
    children: {
      type: 'text',
    },
  },
  render: ({ children }) => {
    return <Heading>{children}</Heading>;
  },
};
