import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GamesService } from './games.service';
import { Game } from './game.interface';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css'
})
export class CatalogueComponent implements OnInit {
  games: Game[] = [];
  filteredGames: Game[] = [];
  genres: string[] = [];
  selectedGenre: string = '';
  searchQuery: string = '';
  sortBy: string = 'popularity';
  viewMode: 'grid' | 'list' = 'grid';

  constructor(private gamesService: GamesService) {}

  ngOnInit() {
    this.games = this.gamesService.getAllGames()();
    this.genres = this.gamesService.getGenres();
    this.filteredGames = [...this.games];
    this.sortGames();
  }

  onSearchChange() {
    this.filterGames();
  }

  onGenreChange() {
    this.filterGames();
  }

  filterGames() {
    this.filteredGames = this.games.filter(game => {
      const matchesGenre = !this.selectedGenre || game.genre === this.selectedGenre;
      const matchesSearch = !this.searchQuery ||
        game.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        game.genre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        game.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase()));

      return matchesGenre && matchesSearch;
    });
    this.sortGames();
  }

  sortGames() {
    this.filteredGames.sort((a, b) => {
      switch (this.sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popularity':
        default:
          return b.popularity - a.popularity;
      }
    });
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }

  getRatingColor(rating: number): string {
    if (rating >= 9) return '#4CAF50';
    if (rating >= 8) return '#8BC34A';
    if (rating >= 7) return '#FFC107';
    return '#FF5722';
  }
}
