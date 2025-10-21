import 'dotenv/config';
import { createApp } from './app.js';
import { connectDatabase } from './config/database.config.js';

const startProject = async (): Promise<void> => {
  await connectDatabase();
  const app = await createApp();

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.info(`[startProject] - GraphQL ready at http://localhost:${PORT}/graphql`);
    console.info(`[startProject] - REST API ready at http://localhost:${PORT}/api/v1`);
  });
};

startProject();
