var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.addKeyboardHandlers();
        //
        this.player = new Girl(this);
        this.player.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( this.player, 1 );
        this.player.scheduleUpdate();
        //
        this.blockjump = new Jumpblock();
        this.blockjump.randomPosition();
        this.addChild(this.blockjump,1);
        this.scheduleUpdate();
        //
        this.ncoin1 = new Ncoin();
        //this.ncoin1.randomPosition();
        this.ncoin1.setPosition( new cc.Point( screenWidth /4, screenHeight / 4 ) );
        this.addChild(this.ncoin1,1);
        this.scheduleUpdate();
        //
         this.blockjump1 = new Jumpblock();
        this.blockjump1.setPosition( new cc.Point( screenWidth / 2, screenHeight / 3 ) );
        this.addChild(this.blockjump1,1);
        this.scheduleUpdate();
        //
         this.wall = new Wall();
        //this.ncoin1.randomPosition();
        this.wall.setPosition( new cc.Point( screenWidth /2, screenHeight / 2) );
        this.addChild(this.wall,0);
        this.scheduleUpdate();
       // this.addKeyboardHandlers();
       //cocos run -p web
       //git push -u origin master
        this.state = GameLayer.STATES.FRONT;
 
        return true;
    },
    onKeyUp: function( e ) {
        console.log( 'Up: ' + e );
    },
    onKeyDown: function( e ) {
        if ( e == cc.KEY.right) {
        this.player.switchDirection1();
        }
        else if( e == cc.KEY.left){
        this.player.switchDirection();
        }
    },
    addKeyboardHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed : function( e ) {
                self.onKeyDown( e );
            },
            onKeyReleased: function( e ) {
                self.onKeyUp( e );
            }
        }, this);
    },
     startGame: function() {
        this.player.start();
    },
     update: function( dt ) {
       //console.log("gamelayer update \n");
        if(this.player.checkCollision(this.blockjump1)||this.player.checkCollision(this.blockjump)){
             this.player.Jump();
        }
        else if(this.ncoin1.closeTo(this.player)){
              this.player.Jump();
              this.ncoin1.randomPosition();
        }
    },
    endGame: function() {
        this.player.stop();
        
    },
    stop: function() {
       this.started = false;
    }
   
});
 GameLayer.STATES = {
    FRONT: 1,
    STARTED: 2,
    DEAD: 3
};
var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});