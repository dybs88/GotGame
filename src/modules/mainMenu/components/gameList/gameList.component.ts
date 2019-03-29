import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { GameRepository } from "./../../../dal/infrastructure/repositories/game.repository";
import { Game } from "src/models/game.model";
import { LocalizationService } from "src/modules/common/infrastructure/locale/localization.service";
import { GotBaseComponent } from "./../../../common/components/gotBase.component";
import { PlayerService } from "src/modules/common/infrastructure/authorization/player.service";
import { Player } from "src/models/player.model";
import { UserService } from "src/modules/common/infrastructure/authorization/user.service";
import { GameRules } from "src/models/gameRules.model";
import { GameRulesService } from "src/modules/common/infrastructure/services/gameRules.service";

@Component({
  templateUrl: "gameList.component.html"
})

export class GameListComponent extends GotBaseComponent {
  private player: Player;
  games: Game[];
  selectedGame: Game;
  showRejoingMsg: boolean = false;
  rejoiningGameId: number;

  constructor(private gameRepository: GameRepository,
    private router: Router,
    private playerService: PlayerService,
    private gameRulesService: GameRulesService,
    userService: UserService,
    localizationService: LocalizationService) {
    super(localizationService, userService);
    this.gameRepository.getGames().subscribe(serverData => {
      this.games = serverData;
    });
   }

  createGame() {
    this.gameRulesService.setGameRules(new GameRules());
    this.router.navigate(["/newgame"]);
  }

  getGame(gameId: number) {
    return this.games.find(g => g.id === gameId);
  }

  joinGame(gameId: number) {
    if (this.playerService.player !== undefined && this.playerService.player !== null) {
      if (this.playerService.player.gameId === gameId) {
        if (this.playerService.player.status === "Joining") {
          this.router.navigate(["/joingame", gameId]);
        } else {
          this.router.navigate(["/readyforgame", gameId]);
        }
      } else {
        this.rejoiningGameId = gameId;
        this.toggleShowRejoiningMsg();
      }
    } else {
      this.gameRepository.joinGame(gameId).subscribe(serverData => {
        if (serverData.playerAdded) {
          this.player = serverData.newPlayer;
          this.playerService.joinGame(this.getGame(gameId), this.player);
          this.router.navigate(["/joingame", gameId]);
        }
      });
    }
  }

  leaveGame() {
    this.playerService.deletePlayer().subscribe(serverData => {
      this.playerService.clearPlayer();
      this.joinGame(this.rejoiningGameId);
    });
  }

  refreshGames() {
    this.gameRepository.refreshGames().subscribe(serverData => {
      this.games = serverData;
    });
  }

  selectGame(gameId: number) {
    this.selectedGame = this.games.find(g => g.id === gameId);
  }

  toggleShowRejoiningMsg() {
    this.showRejoingMsg = !this.showRejoingMsg;
  }
}
