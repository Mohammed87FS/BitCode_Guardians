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
        this.infoTheory = new InfoTheory();
        this.levels = new GameLevels();
        this.ui = new GameUI(this);
        
 
        this.setupLevel(this.state.currentLevel);
        

        this.setupEventListeners();
        

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
     
        const canvas = document.getElementById('game-canvas');
        
        canvas.addEventListener('click', (event) => {
            
            if (this.state.phase !== 'encode' || this.state.remainingBitFlips <= 0) return;
            
        
            const rect = canvas.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
            const y = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
            
            
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera({ x, y }, this.renderer.camera);
            
            const intersects = raycaster.intersectObjects(this.grid.group.children);
            
            if (intersects.length > 0) {
                const bitObj = intersects[0].object;
                const { row, col } = bitObj.userData;
                
              
                this.grid.flipBit(row, col);
                
              
                this.state.remainingBitFlips--;
                this.ui.updateBitBudget(this.state.remainingBitFlips);
            }
        });
        
    
        document.getElementById('encode-btn').addEventListener('click', () => {
            this.finishEncoding();
        });
        
        document.getElementById('correct-btn').addEventListener('click', () => {
            this.applyCorrection();
        });
    }
    
    finishEncoding() {
     
        this.state.originalParity = this.grid.calculateParity();
        
       
        this.state.phase = 'corrupt';
        
       
        this.introduceErrors();
        
       
        this.state.phase = 'decode';
        
   
        this.ui.switchToDecodeMode();
    }
    
    introduceErrors() {
        const level = this.levels.getLevel(this.state.currentLevel);
        const errorCount = level.errorCount;
        
 
        this.state.errorPositions = [];
        
        for (let i = 0; i < errorCount; i++) {
            const row = Math.floor(Math.random() * this.grid.rows);
            const col = Math.floor(Math.random() * this.grid.cols);
            
            
            if (!this.state.errorPositions.some(pos => pos.row === row && pos.col === col)) {
                this.state.errorPositions.push({ row, col });
                
              
                this.grid.flipBit(row, col);
            } else {
                
                i--;
            }
        }
    }
    
    applyCorrection() {
     
        const currentParity = this.grid.calculateParity();
        
      
        const detectedErrors = this.infoTheory.findErrors(
            this.state.originalParity,
            currentParity
        );
        
   
        this.grid.resetHighlights();
        for (const error of detectedErrors) {
            this.grid.highlightBit(error.row, error.col, true);
        }
        
    
        const level = this.levels.getLevel(this.state.currentLevel);
        const canCorrect = this.infoTheory.canCorrectErrors(
            level.correctionMethod,
            this.state.errorPositions
        );
        
      
        this.ui.updateErrorCount(detectedErrors.length);
        
        
        if (canCorrect) {
         
            for (const error of detectedErrors) {
                setTimeout(() => {
                    this.grid.flipBit(error.row, error.col);
                    
                 
                    if (detectedErrors.indexOf(error) === detectedErrors.length - 1) {
                        setTimeout(() => {
                            this.checkLevelCompletion();
                        }, 1000);
                    }
                }, 500 + detectedErrors.indexOf(error) * 500);
            }
        } else {
            this.ui.showMessage("Cannot correct all errors with current method!");
        }
    }
    
    checkLevelCompletion() {
       
        const currentParity = this.grid.calculateParity();
        
        
        const rowParityMatch = currentParity.rowParity.every(
            (p, i) => p === this.state.originalParity.rowParity[i]
        );
        
        const colParityMatch = currentParity.colParity.every(
            (p, i) => p === this.state.originalParity.colParity[i]
        );
        
        if (rowParityMatch && colParityMatch) {
          
            this.ui.showSuccess("Message successfully decoded!");
            
          
            this.grid.resetHighlights();
            this.grid.highlightBit(this.state.keyPosition.row, this.state.keyPosition.col, true);
            
         
            setTimeout(() => {
                this.state.currentLevel++;
                this.state.phase = 'encode';
                
                
                this.renderer.scene.remove(this.grid.group);
                
             
                this.setupLevel(this.state.currentLevel);
                this.ui.switchToEncodeMode();
            }, 3000);
        } else {
            this.ui.showMessage("Message still contains errors!");
        }
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
       
        const time = Date.now() * 0.0005;
        this.renderer.camera.position.x = Math.sin(time) * 2;
        this.renderer.camera.position.y = Math.cos(time) * 2;
        this.renderer.camera.lookAt(0, 0, 0);
        
       
        this.renderer.render();
    }
}


window.addEventListener('load', () => {
    const game = new BitCodeGame();
});