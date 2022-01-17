import { HttpException, Injectable } from '@nestjs/common';
import { create } from 'apisauce';
import { PokemonDto } from './pokemon.dto';

const { get } = create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon',
});

@Injectable()
export class PokemonService {
  async getPokemon(slug: string): Promise<PokemonDto> {
    const { data, ok, originalError, status } = await get<{
      name: string;
      sprites: { other: { home: { front_default: string } } };
    }>(slug);
    if (!ok) {
      throw new HttpException(originalError, status);
    }
    return {
      name: data.name,
      avatarUrl: data.sprites.other.home.front_default,
    };
  }
}
