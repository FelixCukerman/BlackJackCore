export var GameState;
(function (GameState) {
    GameState[GameState["None"] = 0] = "None";
    GameState[GameState["StartRound"] = 1] = "StartRound";
    GameState[GameState["PeopleMove"] = 2] = "PeopleMove";
    GameState[GameState["BotsMove"] = 3] = "BotsMove";
    GameState[GameState["DealerMove"] = 4] = "DealerMove";
    GameState[GameState["GameIsOver"] = 5] = "GameIsOver";
})(GameState || (GameState = {}));
;
//# sourceMappingURL=game-state.js.map