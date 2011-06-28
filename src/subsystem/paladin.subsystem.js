(function (window, document, undefined, Paladin) {

  var subsystems = {};

  var Subsystem = Paladin.Subsystem = Paladin.prototype.Subsystem = new (function () {

    var that = this;

    this.register = function ( name, subsystem ) {
      subsystems[name] = subsystem;
    };

    this.unregister = function ( name ) {
      delete subsystems[name];
    };

    this.get = function ( name ) {
      return subsystems[name];
    };

    this.start = function ( name, options ) {
      var ss = that.get(name);
      if (ss) {
        if (ss.start(options) === false) {
          console.log("Error starting " + name + " subsystem");
        } //if
      } //if
      return ss;
    };

    this.stop = function ( name ) {
      var ss = that.get(name);
      if (ss) {
        ss.stop(options);
      } //if
      return ss;
    };

  })();

})(window, document, undefined, Paladin);
