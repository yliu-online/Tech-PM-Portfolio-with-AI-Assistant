import { build } from 'vite';
await build({
  root: process.cwd(),
  define: {
    'process.env.TEST_VAR': JSON.stringify(undefined)
  }
});
