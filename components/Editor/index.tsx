'use client';

import * as Puck from '@measured/puck';
import '@measured/puck/puck.css';
import { ComponentProps } from 'react';
import * as components from './Components';
import { Heading } from '@/components/Heading';
import { Date as DateField } from './Fields/Date';

interface Props extends Omit<ComponentProps<typeof Puck.Puck>, 'config'> {}

type RootProps = {
  title?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const config: Puck.Config<{}, RootProps> = {
  components,

  root: {
    fields: {
      title: { type: 'text' },
      description: { type: 'textarea' },
      createdAt: {
        ...DateField,
        label: 'Created at',
      },
      updatedAt: {
        ...DateField,
        label: 'Last update',
      },
    },
    render: ({ children, description, title }) => {
      return (
        <section className="space-y-2">
          <Heading rank={1}>{title}</Heading>

          {description && <p className="whitespace-pre-line">{description}</p>}

          {children}
        </section>
      );
    },
  },
};

// Render Puck editor
export function Editor({ ...editorProps }: Props) {
  return <Puck.Puck {...editorProps} config={config} />;
}
