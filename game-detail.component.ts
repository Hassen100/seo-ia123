import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GamesService } from './games.service';
import { AiRecommendationsService } from './ai-recommendations.service';
import { Game, Recommendation } from './game.interface';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.css'
})
export class GameDetailComponent implements OnInit {
  game: Game | null = null;
  recommendations: any[] = [];
  relatedGames: Game[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private gamesService: GamesService,
    private aiRecService: AiRecommendationsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = parseInt(params['id']);
      this.game = this.gamesService.getGameById(id) || null;

      if (this.game) {
        this.recommendations = this.aiRecService.getRecommendations(id);
        this.relatedGames = this.gamesService.getGamesByGenre(this.game.genre)
          .filter(g => g.id !== id)
          .slice(0, 4);
      }

      this.loading = false;
    });
  }

  getRecommendedGame(gameId: number): Game | undefined {
    return this.gamesService.getGameById(gameId);
  }

  getRatingColor(rating: number): string {
    if (rating >= 9) return '#4CAF50';
    if (rating >= 8) return '#8BC34A';
    if (rating >= 7) return '#FFC107';
    return '#FF5722';
  }

  getRecommendationBackground(score: number): string {
    if (score >= 80) return 'rgba(76, 175, 80, 0.1)';
    if (score >= 60) return 'rgba(255, 193, 7, 0.1)';
    return 'rgba(255, 152, 0, 0.1)';
  }
}
