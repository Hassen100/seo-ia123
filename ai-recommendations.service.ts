import { Injectable } from '@angular/core';
import { Recommendation } from './game.interface';
import { GamesService } from './games.service';

@Injectable({
  providedIn: 'root'
})
export class AiRecommendationsService {
  constructor(private gamesService: GamesService) {}

  // Simulated AI recommendations based on game characteristics
  getRecommendations(gameId: number): Recommendation[] {
    const selectedGame = this.gamesService.getGameById(gameId);
    if (!selectedGame) return [];

    const allGames = this.gamesService.getAllGames()();
    const recommendations: Recommendation[] = [];

    allGames.forEach(game => {
      if (game.id === gameId) return;

      let score = 0;
      let reason = [];

      // Same genre
      if (game.genre === selectedGame.genre) {
        score += 25;
        reason.push('Same genre');
      }

      // Similar rating
      if (Math.abs(game.rating - selectedGame.rating) < 0.5) {
        score += 20;
        reason.push('Similar quality');
      }

      // Similar tags
      const commonTags = game.tags.filter(tag => selectedGame.tags.includes(tag));
      if (commonTags.length > 0) {
        score += commonTags.length * 15;
        reason.push(`${commonTags.length} shared theme(s)`);
      }

      // Popular games get bonus
      if (game.popularity > 90) {
        score += 10;
      }

      // Same platform
      const commonPlatforms = game.platform.split(',').filter(p =>
        selectedGame.platform.includes(p.trim())
      );
      if (commonPlatforms.length > 0) {
        score += 15;
        reason.push('Available on your platform');
      }

      if (score > 0) {
        recommendations.push({
          gameId: game.id,
          score: Math.min(100, score),
          reason: reason.join(' | ')
        });
      }
    });

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }

  // AI-powered personalized recommendations based on preferences
  getPersonalizedRecommendations(favoriteGenres: string[], maxGames: number = 5): any[] {
    const allGames = this.gamesService.getAllGames()();
    const recommendations: any[] = [];

    allGames.forEach(game => {
      let score = 0;

      // Match favorite genres
      favoriteGenres.forEach(genre => {
        if (game.genre.toLowerCase().includes(genre.toLowerCase())) {
          score += 30;
        }
      });

      // High rating bonus
      if (game.rating >= 9.0) {
        score += 25;
      } else if (game.rating >= 8.5) {
        score += 15;
      } else if (game.rating >= 8.0) {
        score += 10;
      }

      // Popularity bonus
      score += (game.popularity / 100) * 20;

      if (score > 0) {
        recommendations.push({
          ...game,
          aiScore: Math.min(100, score)
        });
      }
    });

    return recommendations
      .sort((a, b) => b.aiScore - a.aiScore)
      .slice(0, maxGames);
  }

  // Get trending games with AI insights
  getTrendingWithInsights() {
    const trending = this.gamesService.getTrendingGames(6);
    return trending.map(game => ({
      ...game,
      insight: this.generateInsight(game)
    }));
  }

  private generateInsight(game: any): string {
    const insights = [
      `${game.title} is dominating with a ${game.rating}/10 rating!`,
      `Players love ${game.title} - ${game.popularity}% popularity score!`,
      `Hot pick: ${game.title} has won hearts with its ${game.genre} gameplay.`,
      `${game.title} is trending: ${game.tags[0]} at its finest!`,
      `Community favorite: ${game.title} delivers exceptional ${game.genre} experience.`
    ];
    return insights[Math.floor(Math.random() * insights.length)];
  }
}
