import type { ComponentConfig } from "@measured/puck";
import { Heading as BaseHeading } from "@/components/Heading";

export const Heading: ComponentConfig = {
  fields: {
    text: {
      type: 'text',
      label: 'Text',
    },
    rank: {
      type: 'radio',
      label: 'Rank',
      options: [
        { label: 'H1', value: 1 },
        { label: 'H2', value: 2 },
        { label: 'H3', value: 3 },
        { label: 'H4', value: 4 },
        { label: 'H5', value: 5 },
        { label: 'H6', value: 6 },
      ],
    },
  },
  defaultProps: {
    text: 'Heading',
    size: 2,
  },
  render: ({ text, rank }) => {
    return <BaseHeading rank={rank}>{text}</BaseHeading>;
  },
};
