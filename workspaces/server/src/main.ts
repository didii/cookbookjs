import { run } from './server';

run()
  .then(() => console.log('Application shutdown'))
  .catch((err) => console.error(err));
