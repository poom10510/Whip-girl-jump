var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.addKeyboardHandlers();
        //
        this.player = new Girl();
        this.player.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( this.player, 1 );
        this.player.scheduleUpdate();
        //
       // this.addKeyboardHandlers();
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