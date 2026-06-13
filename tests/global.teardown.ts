import {test as teardown} from '@playwright/test';
import * as fs from 'fs';

teardown('clear auth state', async () => {
  const authFile = '.auth/user.json';
  if (fs.existsSync(authFile)) {fs.unlinkSync(authFile);}
});
