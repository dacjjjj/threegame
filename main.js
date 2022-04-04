import * as THREE from 'https://unpkg.com/three@0.139.2/build/three.module.js';
import { OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';

var scene, camera, renderer, controls, composer, player;
function init() {
    scene = new THREE.Scene();
    // const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 )
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 10000)
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg')
    });

    renderer.setPixelRatio( window.devicePixelRatio);
    renderer.setSize( window.innerWidth, window.innerHeight);
    camera.position.y = 20;
    camera.position.z = 5;
    camera.position.x = 20;
    // controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableKeys = true
    // controls.target.set(20,0,20)
    // controls.enableRotate = false
    // controls.enableKeys = true
    // controls.maxPolarAngle = (35*Math.PI)/180
    // controls.minPolarAngle = (25*Math.PI)/180
    // controls.update()
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);
}



class playerController {
    constructor() {
        this._input = new playerControllerInput();
        this._stateMachine = new FiniteStateMachine(new playerControllerProxy(this));
        
        this._LoadModels();
    }
}

class playerControllerInput {
    constructor(){

    }
}

class FiniteStateMachine{}
// var moveForward = false;
  
// //define velocity as a vector3
// var velocity = new THREE.Vector3();
// var prevTime = performance.now();

// //moveforward is true when 'up' or 'w' is pressed
// var onKeyDown = function ( event ) {
//                   switch ( event.keyCode ) {
//                       case 38: // up
//                       case 87: // w
//                           moveForward = true;
//             console.log("onKeyDown! moveForward is now: " + moveForward)
//                           break;
//        }
//    }

// //moveforward is false when 'up' or 'w' is not pressed
// var onKeyUp = function ( event ) {
//     switch( event.keyCode ) {
//       case 38: // up
//       case 87: // w
//         moveForward = false;
//         console.log("onKeyUp! moveForward is now: " + moveForward)
//         break;
//       }
//   }

//       //make sure our document knows what functions to call when a key is pressed.    
//   document.addEventListener( 'keydown', onKeyDown, false );
//   document.addEventListener( 'keyup', onKeyUp, false );

//     //time to render the movement every frame.
//     //moving the camera
    
//     //lets make sure we can move camera smoothly based on user's performance. 
//     var time = performance.now();
//     var delta = ( time - prevTime ) / 1000;
    
//           //reset z velocity to be 0 always. But override it if user presses up or w. See next line...      
//                   velocity.z -= velocity.z * 10.0 * delta;
//     //if the user pressed 'up' or 'w', set velocity.z to a value > 0.  
//     if ( moveForward ) velocity.z -= 400.0 * delta;

//     camera.translateZ( velocity.z * delta );
      
//       	prevTime = time;


init()
characterGeneration()
generateTrees()
worldGeneration()
animate()

function worldGeneration() {
    const grassPlane = new THREE.BoxGeometry(1)
    const grassTextureLoader = new THREE.TextureLoader().load( "/textures/grasstexture.png" );
    const grassTexture = new THREE.MeshLambertMaterial({map: grassTextureLoader});

    const floor = new THREE.Group();
    for (let x = 0; x < 40; x++) {
        for (let z = 0; z < 40; z++) {
            let chunk;
            chunk = new THREE.Mesh(grassPlane, grassTexture)
            chunk.position.set(x, 0, z);
            floor.add(chunk)
        }
    }


    scene.add(floor);
}


function generateTrees() {
    const trunkGeometry = new THREE.BoxGeometry(1, 5, 1)
    const treeTrunkTextureLoad = new THREE.TextureLoader().load( "/textures/treetrunktexture.png" );
    const treetrunktexture = new THREE.MeshLambertMaterial({map: treeTrunkTextureLoad});
  
    const trees = new THREE.Group();
  
    for (let i = 0; i < 30; i++) {
      let xPos =  Math.floor(Math.random() * 32);
      let zPos =  Math.floor(Math.random() * 32);
      let yPos = Math.floor(Math.random() * 4);
      let trunk;
      trunk = new THREE.Mesh(trunkGeometry, treetrunktexture);
      trunk.position.set(xPos, yPos, zPos);
      trees.add(trunk);
    }
  
    console.log(trees);
    scene.add(trees);
  
  }
  
function characterGeneration() {
    // class Figure {
    //     constructor(params) {
    //         this.params = {
    //             x: 20,
    //             y: 10,
    //             z: 20,
    //             ry: 0,
    //             angle: 0,
    //             ...params
    //         }
            
    //         // Create group and add to scene
    //         this.group = new THREE.Group()
    //         scene.add(this.group)
            
    //         // Position according to params
    //         this.group.position.x = this.params.x
    //         this.group.position.y = this.params.y
    //         this.group.position.z = this.params.z
    //         this.group.rotation.y = this.params.ry
            
    //         this.arms = []
    //     }
        
    //     createBody() {
    //         const geometry = new THREE.BoxGeometry(1, 1.5, 1)
    //         const body = new THREE.Mesh(geometry, material)
    //         this.group.add(body)
    //     }
        
    //     createHead() {
    //         const geometry = new THREE.BoxGeometry(1.4, 1.4, 1.4)
    //         const head = new THREE.Mesh(geometry, material)
    //         this.group.add(head)
            
    //         head.position.y = 1.65
    //     }
        
    //     createArms() {
    //         const geometry = new THREE.BoxGeometry(0.25, 1, 0.25)
                
    //         let i
            
    //         for(i = 0; i < 2; i++) {
    //             const arm = new THREE.Mesh(geometry, material)
    //             const m = i % 2 === 0 ? 1 : -1
                
    //             this.group.add(arm)
    //             this.arms.push(arm)
    //             arm.position.x = m * 0.8
    //             arm.position.y = 0.17
    //         }
    //     }
        
    //     moveArms() {
    //         this.arms.forEach((arm, i) => {
    //             const m = i % 2 === 0 ? 1 : -1
    //             arm.rotation.z = degreesToRadians(this.params.angle * m)
    //         })
    //     }
        
    //     init() {
    //         this.createBody()
    //         this.createHead()
    //         this.createArms()
    //     }
    // }

    const playerGeometry = new THREE.BoxGeometry(1,1,1)
    const playerTextureLoader = new THREE.TextureLoader().load( "/textures/sartorius.png" );
    const playerTexture = new THREE.MeshLambertMaterial({map: playerTextureLoader});

    player = new THREE.Mesh(playerGeometry, playerTexture)
    scene.add(player);
    player.position.set(20, 1, 20)
    camera.lookAt((player.position))
}

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        player.position.z += 0.3;
        characterLocation.z += 0.3;
    } else if (keyCode == 83) {
        player.position.z -= 0.3;
        characterLocation.z -= 0.3;
    } else if (keyCode == 65) {
        player.position.x += 0.3;
        characterLocation.x += 0.3;
    } else if (keyCode == 68) {
        player.position.x -= 0.3;
        characterLocation.x -= 0.3;
    } else if (keyCode == 32) {
        player.position.set(20, 13, 20);
    } else if (keyCode == 220) {
        player.position.y = 1
    }
    updateCamera()

};

function updateCamera(){
    var offset = new THREE.Vector3(player.position.x + 5, player.position.y, player.position.z + 5);
            
    camera.position.lerp(offset, 0.01);
            
    camera.lookAt(player.position);
    camera.updateCamera()
}


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

