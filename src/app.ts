import express, { type Application } from 'express';
import expressFileUpload from 'express-fileupload';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs, resolvers } from './graphql/schema.js';
import analysisRoutes from './routes/analysis.route.js';

const app: Application = express();
const apolloServer = new ApolloServer({ typeDefs, resolvers });

const createApp = async (): Promise<Application> => {
  app.use(
    expressFileUpload({
      createParentPath: true,
      limits: { fileSize: 30 * 1024 * 1024 }, // 30MB
    }),
  );

  app.use('/api/v1/analysis', analysisRoutes);

  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app as any, path: '/graphql' });

  return app;
};

export { createApp };
