import type { Content } from '@measured/puck';

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace PrismaJson {
    // eslint-disable-next-line no-unused-vars
    type DataContent = Content;
  }
}
