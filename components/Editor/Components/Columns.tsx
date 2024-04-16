import { DropZone, type ComponentConfig } from '@measured/puck';

export const Columns: ComponentConfig = {
  fields: {
    size: {
      type: 'radio',
      options: [
        { label: 'Two', value: 2 },
        { label: 'Three', value: 3 },
        { label: 'Four', value: 4 },
      ],
    },
  },
  defaultProps: {
    size: 2,
  },
  render: ({ size: length }) => {
    return (
      <div className="flex">
        {Array.from({ length }, (_, i) => (
          <DropZone key={i} zone={`column-${i + 1}`} />
        ))}
      </div>
    );
  },
};
