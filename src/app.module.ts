import { Module, ValidationPipe } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { Neo4jModule } from './database/neo4j.module';
import { AppController } from './app.contoller';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      typePaths: ['./**/*.graphql'],
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    Neo4jModule.forRootAsync(),
    AuthModule,
  ],
  providers: [AppResolver, AppService],
  exports: [AppService],
  controllers: [AppController],
})
export class AppModule {}
