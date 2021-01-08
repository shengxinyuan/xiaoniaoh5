window["DiamondViewer"] = function DiamondViewer(url, scriptLoader, canvas, onLoad, onProgress) {

	var component3d;
	var requestId;
	var dispose_ = false;

	var scriptLoader_ = scriptLoader;

	if(!scriptLoader) {
		console.error("No scriptloader provided");
		return;
	}

	function loadDependencies() {
		let urls = [];

		urls.push('http://pixotronics.com/js/lib/three.js');
		urls.push('http://pixotronics.com/js/lib/Tween.js');

		let string1 = 'three' + url;
		let string2 = 'three-extra' + url;

		scriptLoader_(urls, string1);

		scriptLoader_.ready(string1, function() {

			scriptLoader_('http://pixotronics.com.s3-website.ap-south-1.amazonaws.com/js/jsfiles/EffectComposer.js', function() {

				let urls = [];
        urls.push('http://pixotronics.com.s3-website.ap-south-1.amazonaws.com/js/jsfiles/RGBELoader.js');
        urls.push('http://pixotronics.com.s3-website.ap-south-1.amazonaws.com/js/jsfiles/PMREMGenerator.js');
        urls.push('http://pixotronics.com.s3-website.ap-south-1.amazonaws.com/js/jsfiles/PMREMCubeUVPacker.js');
        urls.push('http://pixotronics.com.s3-website.ap-south-1.amazonaws.com/js/jsfiles/HDRCubeTextureLoader.js');
        urls.push('http://pixotronics.com.s3-website.ap-south-1.amazonaws.com/js/jsfiles/GLTFLoader.js');
        urls.push('http://pixotronics.com.s3-website.ap-south-1.amazonaws.com/js/jsfiles/OrbitControls.js');

        urls.push('http://pixotronics.com.s3-website.ap-south-1.amazonaws.com/js/jsfiles/RenderPass.js');
				urls.push('http://pixotronics.com.s3-website.ap-south-1.amazonaws.com/js/jsfiles/ShaderPass.js');
				urls.push('http://pixotronics.com.s3-website.ap-south-1.amazonaws.com/js/jsfiles/CopyShader.js');
				urls.push('http://pixotronics.com.s3-website.ap-south-1.amazonaws.com/js/jsfiles/LuminosityHighPassShader.js');
				urls.push('http://pixotronics.com.s3-website.ap-south-1.amazonaws.com/js/jsfiles/ConvolutionShader.js');

				scriptLoader_(urls, string2);
			})

		});

		scriptLoader_.ready(string2, function() {

        scriptLoader_('http://pixotronics.com/js/lib/pixotron.min.js', function() {

					scriptLoader_('http://pixotronics.com/js/lib/ijewel.min.js', function() {
						if(!dispose_) {
	  					component3d = new Component3d();
	  				}

	  				if(onLoad) {
	  					onLoad();
	  				}
					})

        })

		});

	}

	loadDependencies();

	function Component3d() {

    var isMouseDown;
    var camera, scene, renderer, controls;
    var renderScene, sceneSparkles, sparkleRenderPass;
		var loadingScene, loadingCamera;
    var pixotron;

    var bRotate = false;
    var rootNode = new THREE.Object3D();

    var bDrawSprkles = false;
		var numSparkles = 5;
		var sparkleScaleFactor = 2;
		var sparkleIntensityFactor = 1;
    var sparkleTexture = THREE.ImageUtils.loadTexture( 'http://pixotronics.com.s3-website.ap-south-1.amazonaws.com/js/assets/images/sparkle5.png' );
    var sparkleTexture1 = THREE.ImageUtils.loadTexture( 'http://pixotronics.com.s3-website.ap-south-1.amazonaws.com/js/assets/images/sparkle3.png' );
    var noiseTexture = THREE.ImageUtils.loadTexture( 'http://pixotronics.com.s3-website.ap-south-1.amazonaws.com/js/assets/images/noiseTexture.jpg' );
    var sparkle1 = new IJEWEL.Sparkle(sparkleTexture, noiseTexture);
    var sparkle2 = new IJEWEL.Sparkle(sparkleTexture1, noiseTexture);
    var sparkleArray = [];
		var orbitRadius = 2;
		var orbitRadiusFactor = 0.1;
		var cameraHeight = 1;
		var cameraHeightFactor = 0.57;

		var time = { t: 0};
		var tween1 = new TWEEN.Tween(time).to({ t: 1}, 25000);
		tween1.onUpdate(function(params) {
				let theta = 2 * Math.PI * params.t;
				let cs = Math.cos(theta);
				let sn = Math.sin(theta);
				let r = orbitRadius;
				let x = r * cs; let y = cameraHeight; let z = r * sn;
				camera.position.set(x, y, z);
				camera.lookAt(0, 0, 0);
				pixotron.needsUpdate = true;
		});
		tween1.repeat(Infinity);

    var params = {
      "Diamond": 0,
      "Model": 1,
      "Metal" : 0,
      "Bloom Strength": 0.6,
      "Bloom Threshold": 0.92,
      "Bloom Radius": 1,
      "Metal Roughness": 0.3,
      "Sparkles": false,
      "Rotate": true,
      "Scene": 0
    };

    var pmremGenerator, pmremCubeUVPacker;
    var genCubeUrls = function( prefix, postfix ) {
      return [
        prefix + 'px' + postfix, prefix + 'nx' + postfix,
        prefix + 'py' + postfix, prefix + 'ny' + postfix,
        prefix + 'pz' + postfix, prefix + 'nz' + postfix
      ];
    };
    var hdrUrls = genCubeUrls( "http://pixotronics.com.s3-website.ap-south-1.amazonaws.com/js/assets/images/cube/studio/", ".hdr" );

    var diamondLoader;
    var hdrTextureLoader = new THREE.HDRCubeTextureLoader();
    var envCubeMap = hdrTextureLoader.load( THREE.UnsignedByteType, hdrUrls, function ( hdrCubeMap ) {
      pmremGenerator = new THREE.PMREMGenerator( hdrCubeMap, 256 );
      pmremGenerator.update( renderer );
      pmremCubeUVPacker = new THREE.PMREMCubeUVPacker( pmremGenerator.cubeLods );
      pmremCubeUVPacker.update( renderer );
    } );

		var bMainSceneReady = false;

		new THREE.TextureLoader().load(
			'http://pixotronics.com.s3-website.ap-south-1.amazonaws.com/js/assets/images/pixel.png',
			function(texture) {
				initLoadingScene(texture);
			}
		);

    init();
		initSparkles();
    resizeCanvas();
    bindEventListeners();
    render();

    function initSparkles() {
      sceneSparkles = new THREE.Scene();

      for(var j=0; j<numSparkles; j++) {
        var copySparkle;
        if(j<3) {
					copySparkle = sparkle1.shallowCopy();
				}
        else {
					copySparkle = sparkle2.shallowCopy();
				}
        sparkleArray.push(copySparkle);
      }
    }

		function resetNode(node) {
			const center = new THREE.Vector3();
      const box = new THREE.Box3();
			if(node) {
				box.setFromObject(node);
			}
      box.getCenter(center);
      node.position.copy(center);
      node.position.multiplyScalar(-1);
			node.updateMatrixWorld();

			const size = new THREE.Vector3();
      box.getSize(size);
      camera.position.set(6.26, 3.76, -10.76);
			cameraHeight = 1.5 * size.z * cameraHeightFactor;
			orbitRadius = Math.max(Math.max(size.x, size.y), 1.5 * size.z) * orbitRadiusFactor;
		}

		function initLoadingScene(texture) {
			loadingScene = new THREE.Scene();
			loadingScene.background = new THREE.Color(0xffffff);
			loadingCamera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.05, 100);
      loadingCamera.position.z = 1;
      loadingCamera.position.y = 0.1;
			loadingCamera.lookAt(0, 0, 0);
			let geometry = new THREE.BoxBufferGeometry( 0.05, 0.05, 0.05 );
			let material = new THREE.MeshPhongMaterial( {color: 0xffffff, transparent: true} );
			let cube = new THREE.Mesh( geometry, material );
			cube.castShadow = true;
			cube.material.map = texture;
			cube.material.needsUpdate = true;
			loadingScene.add( cube );

			let dirLight = new THREE.DirectionalLight(0xffffff);
			dirLight.position.set(1, 1, 1);
			dirLight.castShadow = true;
			dirLight.shadow.camera.top = 0.05;
			dirLight.shadow.camera.bottom = -0.05;
			dirLight.shadow.camera.left = -0.05;
			dirLight.shadow.camera.right = 0.05;
			dirLight.shadow.bias = -0.00002;
			dirLight.shadow.camera.near = 0.001;
			dirLight.shadow.camera.far = 100;
			dirLight.shadow.mapSize = new THREE.Vector2(256, 256);
			loadingScene.add(dirLight);

			let planeGeometry = new THREE.PlaneGeometry( 1, 1 );
			planeGeometry.rotateX( - Math.PI / 2 );

			let planeMaterial = new THREE.ShadowMaterial();
			planeMaterial.opacity = 0.2;

			let plane = new THREE.Mesh( planeGeometry, planeMaterial );
			plane.position.y = -0.025;
			plane.receiveShadow = true;
			loadingScene.add( plane );

			let time = { t: 0};
			let tween = new TWEEN.Tween(time).to({ t: 1}, 1000);
			tween.onUpdate(function(params) {
					let theta = 2 * Math.PI * params.t;
					cube.rotation.y = theta;
			});
			tween.repeat(Infinity);
			tween.start();
		}

    function init() {
      camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.3, 100);
      camera.position.z = 8;
      camera.position.y = 0;
      controls = new THREE.OrbitControls(camera, canvas);
      controls.screenSpacePanning = true;
      // controls.minDistance = 6;
      // controls.maxDistance = 10;
      // controls.minPolarAngle = Math.PI/10;
      // controls.maxPolarAngle = Math.PI/2;

      // controls.addEventListener('change', render);
      // scene
      scene = new THREE.Scene();
      // scene.background = envCubeMap;
      scene.background = new THREE.Color(0.95, 0.95, 0.95);
      scene.add(rootNode);

      renderer = new THREE.WebGLRenderer({canvas: canvas});
      renderer.toneMapping = THREE.Uncharted2ToneMapping;
      renderer.toneMappingExposure = 2;
      renderer.toneMappingWhitePoint = 1;
      // renderer.toneMapping = THREE.ReinhardToneMapping;
      // renderer.toneMapping = THREE.CineonToneMapping;
      // renderer.setClearColor(0x999999);
      renderer.gammaInput = true;
      renderer.gammaOutput = true;
      // renderer.context.getExtension('OES_standard_derivatives');
      // var gl = renderer.domElement.getContext('webgl') ||
      //         renderer.domElement.getContext('experimental-webgl');
      // gl.getExtension('OES_standard_derivatives');
      renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( canvas.width, canvas.height );

      var needsUpdate = true,
      shadowsSmoothTransition = true,
      shadowsEnableAccumulation = true,
      shadowRadius = 3,
      autoSAOClear = true,
      autoShadowsClear = true,
      saoEnabled = true,
      saoSmoothTransition = true,
      saoWorldRadius = 0.952,
      saoIntensity = 0.5;
      numShadowSamples = 100;
      numSAOSamples = 600;
      shadowBiasMultiplier = 0.05;
      saoBias = 0.001;

      let pix_params = {
        saoparams: {
          intensity: saoIntensity,
          bias: saoBias,
          occlusionWorldRadius: saoWorldRadius,
          smoothTransition: saoSmoothTransition,
          samplesPerFrame: 4,
          numSamples: numSAOSamples,
          accumulative: false
        },
				groundShadow: {
          smoothTransition: true,
          numSamples: 500,
          numSamplesPerFrame: 2,
					shadowQuality:0,
					size:1.5,
					falloff:2.3,
					darkness:1.2,
          onComplete: (function() {
            pixotron.needsUpdate = true;
            const shadowPlane = pixotron.getShadowPlanePass().getShadowPlane();
            rootNode.add(shadowPlane);
          }),
          onProgress: (function(value) {
            // if(value > 0.75) {
            //   const shadowPlane = pixotron.getShadowPlanePass().getShadowPlane();
            //   rootNode.add(shadowPlane);
            // }
						// pixotron.needsUpdate = true;
          })
        }
      }

			let dirLight = new THREE.DirectionalLight(0x6699aa);
			dirLight.position.set(1, 2, -1);
			scene.add(dirLight);

      pixotron = new PIXOTRON.Pixotron(pix_params);
      // sparkle1.material.uniforms["screenTexture"].value = composer.renderTarget2.texture;
      // sparkle2.material.uniforms["screenTexture"].value = composer.renderTarget2.texture;

      diamondLoader = new IJEWEL.DiamondLoader(envCubeMap, renderer);

      var onGLTFLoad = function(node) {

        node.traverse( function(object) {
          if(object.isMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
            object.material.needsUpdate = true;
            if (pmremCubeUVPacker && object.name.toUpperCase().search('DIAMOND') === -1) {
              object.material.envMap = pmremCubeUVPacker.CubeUVRenderTarget.texture;
							object.material.color.convertLinearToGamma();
            }
          }
        });
				resetNode(node);
        rootNode.add(node);
        pixotron.updateShadowPlane(node);

        let diamonds = diamondLoader.diamonds;

        for(let j=0; j<diamonds.length; ++j) {

					let diamond = diamonds[j];

          for(let i=0; i<sparkleArray.length; ++i) {
						let sparkle = sparkleArray[i].shallowCopy();

						// sparkle.material.uniforms["screenTexture"].value = pixotron.composer_.renderTarget2.texture;

						sparkle.setIntensity(sparkleIntensityFactor);
						sceneSparkles.add(sparkle.mesh);

						sparkle.syncWithTransform(diamond.mesh.matrixWorld);

						var y = diamond.offset.y;
			      var x = diamond.offset.x + (Math.random() - 0.5) * diamond.boundingRadius;
			      var z = diamond.offset.z + (Math.random() - 0.5) * diamond.boundingRadius;
			      sparkle.setPositionOffset(x, y, z);
						let scale = sparkleScaleFactor * (Math.random()*diamond.boundingRadius/15 + diamond.boundingRadius/15);
			      sparkle.setScale(scale);
			      diamond.addSparkle(sparkle);
          }
        }
        bMainSceneReady = true;
				// tween1.start();
      }
      diamondLoader.load(url, onGLTFLoad, onProgress);

      document.addEventListener('mousemove', onDocumentMouseMove, false);
      document.addEventListener('mousedown', onDocumentMouseDown, false);
      document.addEventListener('mouseup', onDocumentMouseUp, false);
      renderer.domElement.addEventListener('wheel', onDocumentMouseWheel, false);
			renderer.domElement.addEventListener("touchstart", onDocumentMouseDown);
			renderer.domElement.addEventListener("touchend", onDocumentMouseUp);
			renderer.domElement.addEventListener("touchmove", onDocumentMouseMove);
    }

    function onDocumentMouseMove(event) {
      if (isMouseDown) {
        pixotron.needsUpdate = true;
      }
    }

    function onDocumentMouseWheel(event) {
      pixotron.needsUpdate = true;
    }

    function onDocumentMouseDown(e) {
      isMouseDown = true;
    }

    function onDocumentMouseUp(e) {
      isMouseDown = false;
    }

    function checkVisible(elm) {
		  var rect = elm.getBoundingClientRect();
		  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
		  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
		}

		function resize(width, height) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      pixotron.setSize(width, height);
		}

		function update() {
				// TWEEN.update();
        if ( bMainSceneReady ) {
          controls.update();
					// TWEEN.update();
          for(var i=0; i<diamondLoader.diamonds.length; i++) {
            diamondLoader.diamonds[i].update(camera);
          }
          if(bRotate) {
            pixotron.needsUpdate = true;
            rootNode.rotation.y += 0.00516;
          }
        }
		}

		function bindEventListeners() {
      window.onresize = resizeCanvas;
      resizeCanvas();
    }

    function resizeCanvas() {
      canvas.style.width = '100%';
      canvas.style.height= '100%';
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      resize(canvas.width,canvas.height);
    }

		function render() {
			if(checkVisible(canvas)) {

				if(bMainSceneReady) {
					update();

	        pixotron.render(renderer, scene, camera);

					if(!sparkleRenderPass) {
						// sparkleRenderPass = new THREE.RenderPass(sceneSparkles, camera);
						// sparkleRenderPass.clear = false;
						// pixotron.insertPass(sparkleRenderPass, 1);
					}

					pixotron.getSAOPass().enabled = true;

				} else {
					if(loadingScene) {
						TWEEN.update();
						renderer.render(loadingScene, loadingCamera);
					}
				}
        // pixotron.getBloomPass().enabled = true;

				requestId = requestAnimationFrame(render);
			}
		}

		this.dispose = function() {
			cancelAnimationFrame(requestId);
		}
  }

	this.dispose = function() {
		dispose_ = true;
		if(component3d) {
			component3d.dispose();
		}
	}
};
