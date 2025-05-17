class InfoTheory {
    constructor() {
   
        this.ERROR_DETECTION_SIMPLE = 'simple-parity';
        this.ERROR_CORRECTION_2D = '2d-parity';
        this.ERROR_CORRECTION_HAMMING = 'hamming';
    }
    

    calculateEntropy(probabilities) {
        return probabilities.reduce((entropy, p) => {
            if (p === 0) return entropy; 
            return entropy - p * Math.log2(p);
        }, 0);
    }
    
   
    canCorrectErrors(method, errors) {
        switch(method) {
            case this.ERROR_DETECTION_SIMPLE:
               
                return errors.length % 2 === 1;
                
            case this.ERROR_CORRECTION_2D:
               
                return errors.length === 1;
                
            case this.ERROR_CORRECTION_HAMMING:
             
                return errors.length <= 2;
                
            default:
                return false;
        }
    }
    

    findErrors(originalParity, currentParity) {
        const { rowParity: origRowParity, colParity: origColParity } = originalParity;
        const { rowParity: currRowParity, colParity: currColParity } = currentParity;
        
        const errorRows = [];
        const errorCols = [];
        
 
        for (let row = 0; row < origRowParity.length; row++) {
            if (origRowParity[row] !== currRowParity[row]) {
                errorRows.push(row);
            }
        }
    
        for (let col = 0; col < origColParity.length; col++) {
            if (origColParity[col] !== currColParity[col]) {
                errorCols.push(col);
            }
        }
        
      
        const errorPositions = [];
        for (const row of errorRows) {
            for (const col of errorCols) {
                errorPositions.push({ row, col });
            }
        }
        
        return errorPositions;
    }
    
   
    applyHammingCorrection(data, syndrome) {
      
        if (syndrome === 0) {
            return { corrected: data, errorPosition: -1 };
        }
        

        const errorPosition = syndrome - 1;
        const corrected = [...data];
        
        if (errorPosition >= 0 && errorPosition < corrected.length) {
            corrected[errorPosition] = 1 - corrected[errorPosition];
        }
        
        return { corrected, errorPosition };
    }
}