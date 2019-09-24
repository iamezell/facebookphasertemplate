// https://www.facebook.com/embed/instantgames/1160421544157992/player?game_url=https://localhost:8080
FBInstant.initializeAsync().then(function() {

    FBInstant.setLoadingProgress(100);

    FBInstant.startGameAsync().then(function() {

        var config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            type: Phaser.WEBGL,
            backgroundColor: '#bfcc00',
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };
        
        new Phaser.Game(config);
        
        function preload ()
        {
            this.load.script('threejs', 'assets/three.min.js');
        }
        
        function create ()
        {
         // this.add.text(10, 10, 'Extern Test 1');

            var e = this.add.extern();

            // this.add.image(400, 300, 'logo');

            camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
            camera.position.z = 400;

            scene = new THREE.Scene();

            var texture = new THREE.TextureLoader().load('assets/tiles.jpg');

            var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
            var material = new THREE.MeshBasicMaterial( { map: texture } );

            mesh = new THREE.Mesh( geometry, material );
            scene.add( mesh );

            renderer = new THREE.WebGLRenderer( { canvas: this.game.canvas, context: this.game.context, antialias: true } );
            // renderer = new THREE.WebGLRenderer();
            // renderer.setSize(800, 600);

            e.render = function (prenderer, pcamera, pcalcMatrix)
            {
                renderer.state.reset();

                renderer.render(scene, camera);
            }

            renderer.autoClear = false;

            // document.body.appendChild( renderer.domElement );
        }
        
        function update (time, delta)
        {
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.02;
        }

    });

});
