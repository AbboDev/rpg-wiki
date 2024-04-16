'use client';

import * as Puck from '@measured/puck';
import '@measured/puck/puck.css';
import { HeadingBlock } from './Components/HeadingBlock';
import { ComponentProps } from 'react';

interface Props extends Omit<ComponentProps<typeof Puck.Puck>, 'config'> {

}

const config: Puck.Config = {
  components: {
    HeadingBlock,
  },
};

// Render Puck editor
export function Editor({ ...editorProps }: Props) {
  return <Puck.Puck {...editorProps} config={config} />;
}
