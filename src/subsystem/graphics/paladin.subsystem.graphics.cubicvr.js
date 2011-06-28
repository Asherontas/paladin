(function (window, document, undefined, Paladin, CubicVR) {

  var mainCanvas, mainLoop;
  var scenes = {}, numScenes = 0, currentScenes = [];

  function addSceneToRenderList( scene ) {
    if ( currentScenes.indexOf(scene) === -1 ) {
      currentScenes.push(scene);
    } //if
  } //addSceneToRenderList

  function removeSceneFromRenderList( scene ) {
    var idx = currentScene.indexOf(scene);
    if ( idx > -1 ) {
      currentScenes.splice(idx, 1);
    } //if
  } //removeSceneFromRenderList

  function extend( obj, extra ) {
    for ( var prop in extra ) {
      if ( extra.hasOwnProperty(prop) ) {
        obj[prop] = extra[prop];
      } //if
    } //for
  } //extend

  var system = {
    start: function (options) {
      var gl = CubicVR.init();
      if (!gl) {
        console.log('CubicVR Error: Could not init GL');
        return false;
      } //if
      mainCanvas = CubicVR.getCanvas();

      var mainLoopFunc = options && options.mainLoop ? options.mainLoop : function ( timer, gl ) {
        var seconds = timer.getSeconds();
        for (var i=0, l=currentScenes.length; i<l; ++i) {
          currentScenes[i].render( seconds, gl );
        } //for
      };

      mainLoop = CubicVR.MainLoop(mainLoopFunc);
      
      return true;
    },

    stop: function () {
    },

    getScenes: function () {
      return scenes;
    },

    getScene: function ( name ) {
      return scenes[name];
    },

    enableScene: function ( scene ) {
      if ( typeof(scene) === "string" ) {
        scene = system.getScene(scene);
      } //if
      if ( scene ) {
        addSceneToRenderList(scene);
      } //if
      return scene;
    },

    disableScene: function ( scene ) {
      if ( typeof(scene) === "string" ) {
        scene = system.getScene(scene);
      } //if
      if ( scene ) {
        removeSceneFromRenderList(scene);
      } //if
      return scene;
    },

    Scene: function ( optoins ) {
      var that = this;

      var width = options.width || mainCanvas.width,
          height = options.height || mainCanvas.height,
          fov = options.fov || 45;

      this.name = options.name || "scene" + (numScenes++);

      scenes[this.name] = this;

      var scene = new CubicVR.Scene(width, height, fov);
      
      this.update = options.update || function () {};
      this.render = options.render || function ( timer, gl ) {
        var seconds = timer.getSeconds();
        that.update(seconds);
        scene.evaluate(seconds);    
        scene.updateShadows();
        scene.render();
      };
      
      this.bindLight = function ( light ) {
        scene.bindLight( light );
      };

      this.bindObject = function ( object ) {
        scene.bindSceneObject( object );
      };

      this.enable = function () {
        system.enableScene(that);
      };

      this.disable = function () {
        system.disableScene(that);
      };

      this.bindCamera = function ( camera ) {
        scene.camera = camera;
      };

      this.getNative = function () {
        return scene;
      };

      if ( options.setup ) {
        options.setup(scene);
      } //if

    }, //Scene

    SceneObject: CubicVR.SceneObject,
    Material: CubicVR.Material,
    Texture: CubicVR.Texture,
    Mesh: CubicVR.Mesh,
    Light: CubicVR.Light,
    SkyBox: CubicVR.SkyBox,

  }; //system

  // so both are accessible
  // if more graphics systems are added later
  Paladin.Subsystem.register( "graphics.cubicvr", system );
  Paladin.Subsystem.register( "graphics", system );

})(window, document, undefined, Paladin, CubicVR);
