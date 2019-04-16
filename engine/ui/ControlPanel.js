export class ControlPanel {
    constructor(root, actions, teams, scoreChangedFunc) {
        this._scores = new Map();
        this._scoreChangedFunc = scoreChangedFunc;
        root.classList.add("scoreboard");
        const scoreContainer = document.createElement("div");
        for (const t of teams) {
            const teamEl = document.createElement("div");
            teamEl.classList.add("team");
            const teamTitle = document.createElement("div");
            teamTitle.classList.add("title");
            teamTitle.textContent = t.title;
            const teamScore = document.createElement("div");
            teamScore.classList.add("score");
            teamScore.textContent = "0";
            this._scores.set(t.type, { score: 0, element: teamScore });
            teamEl.appendChild(teamTitle);
            teamEl.appendChild(teamScore);
            scoreContainer.appendChild(teamEl);
        }
        root.appendChild(scoreContainer);
        const actionContainer = document.createElement("div");
        for (const a of actions) {
            const actionEl = document.createElement("button");
            actionEl.classList.add("action");
            actionEl.textContent = a.title;
            actionEl.addEventListener("click", () => a.action());
            actionContainer.appendChild(actionEl);
        }
        root.appendChild(actionContainer);
    }
    adjustScore(team, adjustment) {
        const scoreData = this._scores.get(team);
        scoreData.score += adjustment;
        scoreData.element.textContent = scoreData.score.toFixed(0);
        if (this._scoreChangedFunc)
            this._scoreChangedFunc(team, scoreData.score);
        return scoreData.score;
    }
    clearScore() {
        for (const scoreData of this._scores.values()) {
            scoreData.score = 0;
            scoreData.element.textContent = scoreData.score.toFixed(0);
        }
    }
}
//# sourceMappingURL=ControlPanel.js.map