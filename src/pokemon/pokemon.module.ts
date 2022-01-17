import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import {
  CombinedSlugService,
  QueryParamSlugService,
  SubdomainSlugService,
} from './slug.service';

@Module({
  imports: [],
  controllers: [PokemonController],
  providers: [
    PokemonService,
    {
      provide: CombinedSlugService,
      useFactory: () =>
        new CombinedSlugService([
          new QueryParamSlugService(),
          new SubdomainSlugService(),
        ]),
    },
  ],
})
export class PokemonModule {}
