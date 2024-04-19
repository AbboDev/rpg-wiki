import type { ComponentConfig } from "@measured/puck";
import { Heading as BaseHeading } from "@/components/Heading";

export const Heading: ComponentConfig = {
  fields: {
    children: {
      type: 'text',
    },
  },
  render: ({ children }) => {
    return <BaseHeading rank={2}>{children}</BaseHeading>;
  },
};
