class GameUI {
    constructor(game) {
        this.game = game;
    }
    
    updateLevelInfo(levelNum, level) {
        document.getElementById('level-num').textContent = levelNum;
    }
    
    updateBitBudget(remaining) {
        document.getElementById('bits-remaining').textContent = remaining;
    }
    
    updateErrorCount(count) {
        document.getElementById('error-count').textContent = count;
    }
    
    switchToEncodeMode() {
        document.getElementById('encoder-controls').classList.remove('hidden');
        document.getElementById('decoder-controls').classList.add('hidden');
    }
    
    switchToDecodeMode() {
        document.getElementById('encoder-controls').classList.add('hidden');
        document.getElementById('decoder-controls').classList.remove('hidden');
    }
    
    showMessage(message) {
        const status = document.getElementById('game-status');
        status.textContent = message;
        status.classList.add('visible');
        
        setTimeout(() => {
            status.classList.remove('visible');
        }, 3000);
    }
    
    showSuccess(message) {
        const status = document.getElementById('game-status');
        status.textContent = message;
        status.classList.add('visible');
        status.classList.add('success');
        
        setTimeout(() => {
            status.classList.remove('visible');
            status.classList.remove('success');
        }, 3000);
    }
    
    showTutorial(message) {
        const tip = document.getElementById('tutorial-tip');
        tip.textContent = message;
        tip.classList.add('visible');
        
        setTimeout(() => {
            tip.classList.remove('visible');
        }, 10000);
    }
}