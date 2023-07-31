import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { PhaseModule } from './phase/phrase.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

@Module({
  imports: [
    PhaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      include: [PhaseModule],
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/hello-diary', {}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
