/*global stop,console,start,expect,ok,module,Paladin,test,window*/
(function (window, document, undefined, Paladin) {

    var game,
    task;

    module("tasker", {
        setup: function () {

            function Game() {
                var counter = 0;
                
                task = Paladin.tasker.add( {
                    callback: function() {        
                        if( ++ counter > 10 ) {
                            ok(true, "task counted to 10");
                            start();
                            return task.DONE;
                        } else {
                            console.log( counter );
                            ok(Paladin.tasker.hasTask(task),
                                    "task is scheduled to run" );
                            return task.CONTINUE;
                        }
                    }
                } );
            }

            game = new Game();
        },
        teardown: function () {
            Paladin.tasker.terminate();
        }
    } );

    test("task counts to 10 and terminates", function () {
        expect(0);
        stop();
        Paladin.run();
        
        ok(!Paladin.tasker.hasTask(task),
                "task is not scheduled to run");
    } ); 

})(window, document, undefined, Paladin);
