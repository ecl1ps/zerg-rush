import { Game } from "./engine/core/Game.js";
import { ZergScene, Teams } from "./scene/ZergScene.js";
import { spawnCargo } from "./entity/Cargo.js";
import { spawnZerg } from "./entity/Zerg.js";
import { ControlPanel } from "./engine/ui/ControlPanel.js";
const board = document.getElementById("game-board");
if (!board)
    throw new Error("Element #game-board not found in html page!");
const cp = document.getElementById("control-panel");
if (!cp)
    throw new Error("Element #control-panel not found in html page!");
const wm = document.getElementById("winner-message");
if (!wm)
    throw new Error("Element #winner-message not found in html page!");
const actions = [
    { title: "Start", action: () => {
            game.stop();
            scoreBoard.clearScore();
            wm.innerHTML = "";
            setTimeout(() => game.start(), 100);
        } },
    { title: "Stop", action: () => game.stop() }
];
const teams = [
    { type: Teams.player, title: "Player", plural: false },
    { type: Teams.zergs, title: "Zergs", plural: true }
];
const scoreBoard = new ControlPanel(cp, actions, teams, (team, score) => {
    if (score < 10)
        return;
    game.stop();
    const winningTeam = teams.find(data => data.type === team);
    showWinner(winningTeam.title, winningTeam.plural);
});
const game = new Game(new ZergScene(board, spawnCargo, spawnZerg, scoreBoard), 1);
game.start();
//setInterval(() => game.stop(), 30000);
function showWinner(winner, pluralForm) {
    if (wm.children.length > 0)
        return;
    const message = document.createElement("div");
    message.textContent = `${winner} ${pluralForm ? "win" : "wins"}!`;
    message.classList.add("winner-message");
    wm.appendChild(message);
    setTimeout(() => message.classList.add("animation"), 50);
}
//# sourceMappingURL=index.js.map