import { Component } from '@angular/core';

export interface Game {
  id: number;
  name: string;
  price: number;
  image: string;
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
      name: 'FIFA 24',
      price: 59,
      image: 'fifa24'
    },
    {
      id: 2,
      name: 'Call of Duty',
      price: 69,
      image: 'callduty'
    }
  ];

  acheterJeu(game: Game) {
    alert(`🛒 Achat de "${game.name}" confirmé !\n\nPrix: ${game.price}€\nRedirection vers la page de paiement...`);
    console.log(`Achat du jeu: ${game.name} - ${game.price}€`);
  }

  voirDetails(game: Game) {
    alert(`👁️ Détails du jeu "${game.name}"\n\n• Graphismes HD\n• Multijoueur en ligne\n• Mises à jour gratuites\n• Compatible PC/Console\n\nPrix: ${game.price}€`);
    console.log(`Voir détails du jeu: ${game.name} - ${game.price}€`);
  }
}
