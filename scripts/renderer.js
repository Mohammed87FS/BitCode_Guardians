class GameRenderer {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('game-canvas'),
            antialias: true
        });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x0a0a1a);
        
        this.setupLights();
    
        this.camera.position.z = 10;
        
        window.addEventListener('resize', () => this.onWindowResize());
    
        this.addGridHelper();
    }
    
    setupLights() {
        const ambient = new THREE.AmbientLight(0x222244);
        this.scene.add(ambient);
        
        const main = new THREE.DirectionalLight(0xffffff, 1);
        main.position.set(10, 10, 10);
        this.scene.add(main);
        
        const blue = new THREE.PointLight(0x4444ff, 1, 20);
        blue.position.set(-5, 2, 3);
        this.scene.add(blue);
        
        const cyan = new THREE.PointLight(0x44ffff, 1, 20);
        cyan.position.set(5, -2, 3);
        this.scene.add(cyan);
    }
    
    addGridHelper() {
        const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
        gridHelper.position.y = -5;
        this.scene.add(gridHelper);
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    render() {
        this.renderer.render(this.scene, this.camera);
    }
}