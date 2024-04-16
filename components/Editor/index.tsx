'use client';

import * as Puck from '@measured/puck';
import '@measured/puck/puck.css';
import { ComponentProps } from 'react';
import * as components from './Components';

interface Props extends Omit<ComponentProps<typeof Puck.Puck>, 'config'> {}

const config: Puck.Config = {
  components,
};

// Render Puck editor
export function Editor({ ...editorProps }: Props) {
  return <Puck.Puck {...editorProps} config={config} />;
}
