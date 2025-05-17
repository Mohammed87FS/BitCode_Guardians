class BitCodeGame {
    constructor() {

        this.state = {
            currentLevel: 1,
            phase: 'encode',
            remainingBitFlips: 3,
            message: null,
            keyPosition: null,
            errorPositions: [],
            originalParity: null
        };

        this.renderer = new GameRenderer();
        this.level = new GameLevels();
        this.ui = new GameUI();
        this.setupLevel()
        this.animate();



    }

    setupLevel(levelNum) {
        const level = this.levels.getLevel(levelNum);


        this.grid = new BitGrid(level.rows, level.cols, this.renderer);


        this.state.remainingBitFlips = level.bitBudget;


        this.state.keyPosition = {
            row: Math.floor(Math.random() * level.rows),
            col: Math.floor(Math.random() * level.cols)
        };


        this.ui.updateLevelInfo(levelNum, level);
        this.ui.updateBitBudget(this.state.remainingBitFlips);
        this.ui.showTutorial(level.tutorial);
    }

    setupEventListeners() {

    }

    finishEncoding() { }

    introduceErrors() { }

    applyCorrection() { }

    checkLevelCompletion() { }

    animate() { }



}