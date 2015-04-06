var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.addKeyboardHandlers();
        this.score =0;
        //
        this.player = new Girl(this);
        this.player.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( this.player, 1 );
        this.player.scheduleUpdate();
        
        this.blockjump = new Jumpblock();
        this.blockjump.randomPosition();
        this.addChild(this.blockjump,1);
        this.scheduleUpdate();
        
        this.ncoin1 = new Ncoin();
        //this.ncoin1.randomPosition();
        this.ncoin1.setPosition( new cc.Point( screenWidth /4, screenHeight / 4 ) );
        this.addChild(this.ncoin1,1);
        this.scheduleUpdate();
        //
         this.ncoin2 = new Ncoin();
        //this.ncoin1.randomPosition();
        this.ncoin2.setPosition( new cc.Point( screenWidth*3/4, screenHeight / 4 ) );
        this.addChild(this.ncoin2,1);
        this.createNcoin();
        this.scheduleUpdate();
        //
         this.blockjump1 = new Jumpblock();
         this.blockjump1.setPosition( new cc.Point( screenWidth / 2, screenHeight / 3 ) );
         this.addChild(this.blockjump1,1);
         this.scheduleUpdate();
        
         this.createScorebord();
        
         this.wall = new Wall();
         this.wall.setPosition( new cc.Point( screenWidth /2, screenHeight / 2) );
         this.addChild(this.wall,0);
         this.scheduleUpdate();
       // this.addKeyboardHandlers();
       //cocos run -p web
       //git push -u origin master
         this.state = GameLayer.STATES.FRONT;
 
        return true;
    },
    createNcoin : function(){
          this.blocks = [];
          for(var i=0;i<10;i++){
            this.blocks.push(new Ncoin());
            console.log( 'crey ' );
          }
          for(var j=0;j<this.blocks.length;j++){
            this.blocks[j].randomPosition();
            this.addChild(this.blocks[j],1);
            console.log( 'cre ' );
          }
            this.scheduleUpdate();
    },
    createScorebord : function(){
        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( screenWidth-50, screenHeight-50,1 ) );
        this.addChild(this.scoreLabel,1);
        
    },
    onKeyUp: function( e ) {
        console.log( 'Up: ' + e );
        PlayerMove.NON;
    },
    onKeyDown: function( e ) {
        if ( e == cc.KEY.right) {
        PlayerMove.RIGHT;
        }
        else if( e == cc.KEY.left){
        PlayerMove.LEFT;
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
        if(this.player.checkCollision(this.blockjump1)||this.player.checkCollision(this.blockjump)){
              if(this.player.flow<=0){
             this.player.Jump();
         }
            //this.player.Stand();
        }
        /*if(this.blockjump1.closeTo(this.player)||this.blockjump.closeTo(this.player)){
            this.player.Stand();
        }*///this.checkPlayerMove();
            this.checkcoinclash();

    },
    checkPlayerMove: function(){
        if(PlayerMove.RIGHT){
          this.player.switchDirection1();
        }
        else if(PlayerMove.LEFT){
          this.player.switchDirection();
        }
    },
    checkcoinclash: function(){
        if(this.ncoin1.closeTo(this.player)){
              this.player.Jump();
              this.ncoin1.randomPosition();
              this.scoreLabel.setString( ++this.score );
        }
        else if(this.ncoin2.closeTo(this.player)){
              this.player.Jump();
              this.ncoin2.randomPosition();
              this.scoreLabel.setString( ++this.score );
        }
         for(var j=0;j<this.blocks.length;j++){
            if(this.blocks[j].closeTo(this.player)){
                this.player.Jump();
                this.blocks[j].randomPosition();
                this.scoreLabel.setString( ++this.score );
            }
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
    PlayerMove.STATES = {
        LEFT: 1,
        RIGHT: 2,
        NON: 3
};
var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});