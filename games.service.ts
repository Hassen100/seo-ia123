import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Game } from './game.interface';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private games: Game[] = [
    {
      id: 1,
      title: 'Cyberpunk 2077',
      genre: 'Action RPG',
      platform: 'PC, PlayStation, Xbox',
      price: 59.99,
      rating: 8.2,
      releaseDate: '2020-12-10',
      image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/e9047d8ec47ae3d94bb8b464fb0fc9e9972b4ac7/header.jpg?t=1769690377',
      description: 'An open-world futuristic action RPG set in a power-laden metropolis.',
      publisher: 'CD Projekt Red',
      popularity: 95,
      tags: ['RPG', 'Cyberpunk', 'Action', 'Open-World']
    },
    {
      id: 2,
      title: 'Elden Ring',
      genre: 'Action RPG',
      platform: 'PC, PlayStation, Xbox',
      price: 54.99,
      rating: 9.0,
      releaseDate: '2022-02-25',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg',
      description: 'A challenging action RPG with expansive world exploration.',
      publisher: 'FromSoftware',
      popularity: 98,
      tags: ['RPG', 'Dark Fantasy', 'Souls-like', 'Adventure']
    },
    {
      id: 3,
      title: 'Hogwarts Legacy',
      genre: 'Action RPG',
      platform: 'PC, PlayStation, Xbox',
      price: 64.99,
      rating: 8.5,
      releaseDate: '2023-02-10',
      image: 'https://tse1.mm.bing.net/th/id/OIP.aZy1P-dLUVm_1kA8cv-8zgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3',
      description: 'Experience life as a student at Hogwarts School of Witchcraft and Wizardry.',
      publisher: 'Avalanche Software',
      popularity: 92,
      tags: ['Fantasy', 'RPG', 'Magic', 'Adventure']
    },
    {
      id: 4,
      title: 'Baldur\'s Gate 3',
      genre: 'Action RPG',
      platform: 'PC, PlayStation',
      price: 59.99,
      rating: 9.5,
      releaseDate: '2023-08-03',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg',
      description: 'A revolutionary turn-based RPG featuring deeply interactive storytelling.',
      publisher: 'Larian Studios',
      popularity: 97,
      tags: ['RPG', 'Fantasy', 'Turn-based', 'Story-driven']
    },
    {
      id: 5,
      title: 'Starfield',
      genre: 'Action RPG',
      platform: 'PC, Xbox',
      price: 69.99,
      rating: 8.8,
      releaseDate: '2023-09-06',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/header.jpg',
      description: 'Explore the vastness of space in this epic sci-fi RPG.',
      publisher: 'Bethesda Game Studios',
      popularity: 88,
      tags: ['Science Fiction', 'RPG', 'Space Exploration', 'Adventure']
    },
    {
      id: 6,
      title: 'The Legend of Zelda: Tears of the Kingdom',
      genre: 'Adventure',
      platform: 'Nintendo Switch',
      price: 59.99,
      rating: 9.4,
      releaseDate: '2023-05-12',
      image: 'https://tse4.mm.bing.net/th/id/OIP.kahiat9HgVMozJ2CtuPeOgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
      description: 'An epic adventure in Hyrule awaits in this sequel to Breath of the Wild.',
      publisher: 'Nintendo',
      popularity: 96,
      tags: ['Adventure', 'Puzzle', 'Fantasy', 'Action']
    },
    {
      id: 7,
      title: 'Final Fantasy XVI',
      genre: 'Action RPG',
      platform: 'PlayStation 5',
      price: 64.99,
      rating: 9.0,
      releaseDate: '2023-06-22',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1454200/header.jpg',
      description: 'The latest masterpiece in the legendary Final Fantasy series.',
      publisher: 'Square Enix',
      popularity: 91,
      tags: ['Fantasy', 'RPG', 'Action', 'Story-driven']
    },
    {
      id: 8,
      title: 'Helldivers 2',
      genre: 'Third-Person Shooter',
      platform: 'PC, PlayStation 5',
      price: 39.99,
      rating: 8.6,
      releaseDate: '2024-02-08',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1922190/header.jpg',
      description: 'Cooperative combat in an alien war setting.',
      publisher: 'Arrowhead Game Studios',
      popularity: 85,
      tags: ['Shooter', 'Co-op', 'Action', 'Sci-Fi']
    },
    {
      id: 9,
      title: 'Chants of Sennaar',
      genre: 'Adventure',
      platform: 'PC, Nintendo Switch',
      price: 19.99,
      rating: 8.3,
      releaseDate: '2023-10-19',
      image: 'https://tse2.mm.bing.net/th/id/OIP.MHC-wmMbuhpyzEXOV07h-gHaL_?rs=1&pid=ImgDetMain&o=7&rm=3',
      description: 'Ascend a mysterious tower and discover the secrets within.',
      publisher: 'Pixel Mobb',
      popularity: 72,
      tags: ['Adventure', 'Mystery', 'Puzzle', 'Indies']
    },
    {
      id: 10,
      title: 'Palworld',
      genre: 'Action Adventure',
      platform: 'PC, Xbox',
      price: 29.99,
      rating: 7.9,
      releaseDate: '2024-01-18',
      image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/2007200/header.jpg',
      description: 'Catch, train, and battle creatures in a vibrant open world.',
      publisher: 'Pocketpair',
      popularity: 92,
      tags: ['Action', 'Adventure', 'Monster Catching', 'Open-World']
    }
  ];

  constructor() {}

  getAllGames() {
    return signal(this.games);
  }

  getGameById(id: number): Game | undefined {
    return this.games.find(game => game.id === id);
  }

  getGamesByGenre(genre: string): Game[] {
    return this.games.filter(game => game.genre.toLowerCase().includes(genre.toLowerCase()));
  }

  getPopularGames(limit: number = 5): Game[] {
    return this.games
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit);
  }

  getTrendingGames(limit: number = 5): Game[] {
    return this.games
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  searchGames(query: string): Game[] {
    const searchTerm = query.toLowerCase();
    return this.games.filter(game =>
      game.title.toLowerCase().includes(searchTerm) ||
      game.genre.toLowerCase().includes(searchTerm) ||
      game.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  getGenres(): string[] {
    const genres = new Set(this.games.map(game => game.genre));
    return Array.from(genres).sort();
  }
}
