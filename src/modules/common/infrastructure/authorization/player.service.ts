import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { Game } from "src/models/game.model";
import { Player } from "src/models/player.model";
import { PlayerServer } from "src/modules/dal/infrastructure/player.server";
import { PlayerStatus } from "../consts/goTEnums";

@Injectable()
export class PlayerService {
  private playerToken: string;
  private currentPlayer: Player;

  constructor(private server: PlayerServer) {
    if (localStorage.getItem("player_id") !== null && localStorage.getItem("player_id") !== "") {
      this.server.getPlayer(parseInt(localStorage.getItem("player_id"), 10)).subscribe(serverData => {
        this.currentPlayer = serverData;
      });
    }
   }

  get token() {
    return this.playerToken;
  }

  get player() {
    return this.currentPlayer;
  }

  public changeStatus(playerStatus: string) {
    this.currentPlayer.status = PlayerStatus[playerStatus];
    this.updatePlayer(this.currentPlayer).subscribe(serverData => {
      this.setPlayer(serverData);
    });
  }

  public clearPlayer() {
    this.playerToken = "";
    this.currentPlayer = null;
    localStorage.setItem("player_id", undefined);
  }

  public deletePlayer(): Observable<any> {
    return this.server.deletePlayer(this.currentPlayer.id);
  }

  public joinGame(game: Game, newPlayer: Player) {
    this.playerToken = `${game.id}-${game.name}`;
    this.setPlayer(newPlayer);
  }

  public setPlayer(player: Player) {
    this.currentPlayer = player;
    localStorage.setItem("player_id", this.currentPlayer.id.toString());
  }

  public setPlayerById(playerId: number) {
    this.server.getPlayer(playerId).subscribe(serverData => {
      this.setPlayer(serverData);
    });
  }

  public updatePlayer(player: Player): Observable<Player> {
    return this.server.updatePlayer(player);
  }
}
