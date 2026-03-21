import { build } from 'vite';
import fs from 'fs';

fs.writeFileSync('src/test-file.js', 'console.log(process.env.TEST_VAR);');

await build({
  root: process.cwd(),
  logLevel: 'info',
  define: {
    'process.env.TEST_VAR': JSON.stringify(undefined)
  }
});
