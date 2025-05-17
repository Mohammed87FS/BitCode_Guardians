class BitGrid {
    constructor(rows, cols, renderer) {
        this.rows = rows;
        this.cols = cols;
        this.renderer = renderer;
        this.bits = [];
        this.bitObjects = [];
        this.group = new THREE.Group();
        
        this.materials = {
            on: new THREE.MeshStandardMaterial({
                color: 0x44aaff,
                emissive: 0x1155aa,
                metalness: 0.8,
                roughness: 0.2
            }),
            off: new THREE.MeshStandardMaterial({
                color: 0x333344,
                emissive: 0x111122,
                metalness: 0.8,
                roughness: 0.5
            }),
            highlight: new THREE.MeshStandardMaterial({
                color: 0xffaa22,
                emissive: 0xaa5500,
                metalness: 0.8,
                roughness: 0.2
            })
        };
        
        this.initGrid();
        this.renderer.scene.add(this.group);
    }
    
    initGrid() {
        const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.2);
        
        
        const gridWidth = this.cols;
        const gridHeight = this.rows;
        const startX = -(gridWidth / 2) + 0.5;
        const startY = (gridHeight / 2) - 0.5;
        
      
        for (let row = 0; row < this.rows; row++) {
            this.bits[row] = [];
            this.bitObjects[row] = [];
            
            for (let col = 0; col < this.cols; col++) {
                
                const bitValue = 0;
                this.bits[row][col] = bitValue;
                
               
                const bitMesh = new THREE.Mesh(
                    geometry,
                    bitValue ? this.materials.on : this.materials.off
                );
                
               
                bitMesh.position.x = startX + col;
                bitMesh.position.y = startY - row;
                
                
                bitMesh.userData = { row, col };
                
                this.bitObjects[row][col] = bitMesh;
                this.group.add(bitMesh);
            }
        }
    }
    
    flipBit(row, col) {
     
        this.bits[row][col] = 1 - this.bits[row][col];
        
        
        const bitObj = this.bitObjects[row][col];
        bitObj.material = this.bits[row][col] ? this.materials.on : this.materials.off;
        
       
        this.animateFlip(bitObj);
        
        return this.bits[row][col];
    }
    
    animateFlip(bitObj) {
       
        const startRotation = bitObj.rotation.x;
        const targetRotation = startRotation + Math.PI;
        
        const animateStep = () => {
            const progress = (bitObj.rotation.x - startRotation) / Math.PI;
            
            if (progress < 1) {
                bitObj.rotation.x += 0.15;
                requestAnimationFrame(animateStep);
            } else {
                bitObj.rotation.x = targetRotation % (Math.PI * 2);
            }
        };
        
        animateStep();
    }
    
    highlightBit(row, col, highlight = true) {
        const bitObj = this.bitObjects[row][col];
        bitObj.material = highlight ? this.materials.highlight : 
                        (this.bits[row][col] ? this.materials.on : this.materials.off);
    }
    
    resetHighlights() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.highlightBit(row, col, false);
            }
        }
    }
    
    calculateParity() {
        
        const rowParity = [];
        const colParity = [];
        
        
        for (let row = 0; row < this.rows; row++) {
            let parity = 0;
            for (let col = 0; col < this.cols; col++) {
                parity ^= this.bits[row][col]; 
            }
            rowParity[row] = parity;
        }
        
   
        for (let col = 0; col < this.cols; col++) {
            let parity = 0;
            for (let row = 0; row < this.rows; row++) {
                parity ^= this.bits[row][col]; 
            }
            colParity[col] = parity;
        }
        
        return { rowParity, colParity };
    }
}