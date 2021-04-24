# Simple example

```
<html>
	<head>
		<title>My first three.js app</title>
		<style>
			body { margin: 0; }
			canvas { width: 100%; height: 100% }
		</style>
	</head>
	<body>
		<script src="../../res/js/three.js"></script>
		<script>
			var clock = new THREE.Clock();
		
			var scene = new THREE.Scene();
			
			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
			camera.position.z = 20;

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			var geometry = new THREE.BoxGeometry( 1, 1, 1 );
			var material = new THREE.MeshLambertMaterial( { color: 0xff22aa } );
			var cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

			dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
			dirLight.color.setHSL( 0.1, 1, 0.95 );
			dirLight.position.set( -1, 1.75, 1 );
			dirLight.position.multiplyScalar( 50 );
			scene.add( dirLight );

			var forward = false;
			
			var render = function () {
			
				requestAnimationFrame( render );
				
				delta = clock.getDelta();
	
				// inc = inc + 0.01;
				cube.rotation.x += 1 * delta;
				cube.rotation.y += 1 * delta;
				if (forward) {
					camera.position.z -= 5 * delta;
				} else {
					camera.position.z += 5 * delta;
				}
				if (camera.position.z < 1) {
					forward = false;
				}
				if (camera.position.z > 10) {
					forward = true;
				}

				renderer.render(scene, camera);
			};

			render();
		</script>
	</body>
</html>	
```