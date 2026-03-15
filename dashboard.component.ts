import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GamesService } from './games.service';
import { AiRecommendationsService } from './ai-recommendations.service';
import { Game } from './game.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  popularGames: Game[] = [];
  trendingGames: any[] = [];
  stats = {
    totalGames: 0,
    averageRating: 0,
    totalGenres: 0
  };

  constructor(
    private gamesService: GamesService,
    private aiRecService: AiRecommendationsService
  ) {}

  ngOnInit() {
    const allGames = this.gamesService.getAllGames()();
    this.popularGames = this.gamesService.getPopularGames(6);
    this.trendingGames = this.aiRecService.getTrendingWithInsights();

    this.stats.totalGames = allGames.length;
    this.stats.averageRating = (
      allGames.reduce((sum, g) => sum + g.rating, 0) / allGames.length
    ).toFixed(1) as any;
    this.stats.totalGenres = this.gamesService.getGenres().length;
  }

  getRatingColor(rating: number): string {
    if (rating >= 9) return '#4CAF50';
    if (rating >= 8) return '#8BC34A';
    if (rating >= 7) return '#FFC107';
    return '#FF5722';
  }
}
