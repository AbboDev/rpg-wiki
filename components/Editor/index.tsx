'use client';

import * as Puck from '@measured/puck';
import '@measured/puck/puck.css';
import { ComponentProps } from 'react';
import * as components from './Components';
import { Heading } from '@/components/Heading';

interface Props extends Omit<ComponentProps<typeof Puck.Puck>, 'config'> {}

const config: Puck.Config = {
  components,

  root: {
    fields: {
      title: { type: 'text' },
      description: { type: 'textarea' },
    },
    render: ({ children, description, title }) => {
      return (
        <section className="space-y-2">
          <Heading>{title}</Heading>

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
