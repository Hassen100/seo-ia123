import { Component } from '@angular/core';

export interface Game {
  id: number;
  name: string;
  price: number;
  image: string;
  officialLink: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  games: Game[] = [
    {
      id: 1,
      name: 'FC 24',
      price: 59,
      image: 'fifa24',
      officialLink: 'https://www.ea.com/games/ea-sports-fc/fc-24/media'
    },
    {
      id: 2,
      name: 'Call of Duty',
      price: 69,
      image: 'callduty',
      officialLink: 'https://www.callofduty.com/media'
    }
  ];

  acheterJeu(game: Game) {
    alert(`🛒 Achat de "${game.name}" confirmé !\n\nPrix: ${game.price}€\nRedirection vers la page de paiement...`);
    console.log(`Achat du jeu: ${game.name} - ${game.price}€`);
  }

  voirDetails(game: Game) {
    // Rediriger vers le site officiel du jeu
    window.open(game.officialLink, '_blank');
    console.log(`Redirection vers les détails officiels de: ${game.name}`);
  }
}
