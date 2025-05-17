class GameLevels {
    constructor() {
        this.levels = [
            // Level 1: Simple parity introduction
            {
                rows: 4,
                cols: 4,
                bitBudget: 3,
                errorCount: 1,
                correctionMethod: 'simple-parity',
                tutorial: "Welcome to BitCode Guardians! You're Prisoner 1. Place your key by flipping bits. The system will detect the pattern using parity checks."
            },
            
            // Level 2: 2D parity correction
            {
                rows: 6,
                cols: 6,
                bitBudget: 4,
                errorCount: 1,
                correctionMethod: '2d-parity',
                tutorial: "Level 2: 2D Parity. Now you can detect AND correct single bit errors by using both row and column parity."
            },
            
            // Level 3: Multiple errors
            {
                rows: 8,
                cols: 8,
                bitBudget: 5,
                errorCount: 2,
                correctionMethod: '2d-parity',
                tutorial: "Level 3: Multiple Errors. Can you detect which bits are flipped when there are multiple errors?"
            },
            
            // Level 4: Hamming code introduction
            {
                rows: 8,
                cols: 8,
                bitBudget: 6,
                errorCount: 2,
                correctionMethod: 'hamming',
                tutorial: "Level 4: Hamming Codes. These advanced codes can correct single errors and detect double errors."
            },
            
            // Level 5: Advanced Hamming
            {
                rows: 8,
                cols: 8,
                bitBudget: 7,
                errorCount: 3,
                correctionMethod: 'hamming',
                tutorial: "Level 5: Channel Noise Challenge. Use Hamming codes to detect and correct errors in a noisy channel."
            }
        ];
    }
    
    getLevel(number) {
    
        const index = Math.min(number - 1, this.levels.length - 1);
        return this.levels[index];
    }
    
    getTotalLevels() {
        return this.levels.length;
    }
}