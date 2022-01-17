import {
  Controller,
  Get,
  Render,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonGuard } from './pokemon.guard';
import { Request as ExpressRequest } from 'express';
import { PokemonDto } from './pokemon.dto';
import { CacheInterceptor } from './cache.interceptor';

@Controller()
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  @UseGuards(PokemonGuard)
  @UseInterceptors(CacheInterceptor)
  @Render('pokemon')
  getPokemon(@Request() request: ExpressRequest): Promise<PokemonDto> {
    return this.pokemonService.getPokemon(request.slug);
  }
}
