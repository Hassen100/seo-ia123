import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GamesService } from './games.service';
import { AiRecommendationsService } from './ai-recommendations.service';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css'
})
export class RecommendationsComponent implements OnInit {
  personalizedGames: any[] = [];
  trendingGames: any[] = [];
  selectedGenres: string[] = ['RPG', 'Action'];
  allGenres: string[] = [];

  constructor(
    private gamesService: GamesService,
    private aiRecService: AiRecommendationsService
  ) {}

  ngOnInit() {
    this.allGenres = this.gamesService.getGenres();
    this.loadRecommendations();
  }

  loadRecommendations() {
    this.personalizedGames = this.aiRecService.getPersonalizedRecommendations(
      this.selectedGenres,
      8
    );
    this.trendingGames = this.aiRecService.getTrendingWithInsights();
  }

  toggleGenre(genre: string) {
    const index = this.selectedGenres.indexOf(genre);
    if (index > -1) {
      this.selectedGenres.splice(index, 1);
    } else {
      this.selectedGenres.push(genre);
    }
    this.loadRecommendations();
  }

  isGenreSelected(genre: string): boolean {
    return this.selectedGenres.includes(genre);
  }

  getRatingColor(rating: number): string {
    if (rating >= 9) return '#4CAF50';
    if (rating >= 8) return '#8BC34A';
    if (rating >= 7) return '#FFC107';
    return '#FF5722';
  }

  getScoreGradient(score: number): string {
    const hue = (score / 100) * 120;
    return `hsl(${hue}, 100%, 50%)`;
  }
}
