var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.addKeyboardHandlers();
        this.score =0;
        this.cont=0;
        this.continuecounter=0;
        this.Playerposition = PlayerMove.NON;
        this.state = GameLayer.STATES.FRONT;
        this.leftmove=false;
        this.rightmove=false;
        
        this.player = new Girl(this);
        this.player.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( this.player, 1 );
        this.player.scheduleUpdate();

        this.enemy = new DarkGirl(this);
        this.enemy.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( this.enemy, 1 );
        this.enemy.scheduleUpdate();
        
        this.blockjump = new Jumpblock();
        this.blockjump.randomPosition();
        this.addChild(this.blockjump,1);
        this.scheduleUpdate();
        
        this.createNcoin();
        this.createbomb();
        this.scheduleUpdate();
        
         this.blockjump1 = new Jumpblock();
         this.blockjump1.setPosition( new cc.Point( screenWidth / 2, screenHeight / 3 ) );
         this.addChild(this.blockjump1,1);
         this.scheduleUpdate();
        
         this.createScorebord();

         this.createContinuebord();

         this.createContinueball();
        
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
          for(var i=0;i<40;i++){
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
    createbomb : function(){
          this.bomb = [];
          for(var i=0;i<4;i++){
            this.bomb.push(new Xbomb());
            console.log( 'creyb ' );
          }
          for(var j=0;j<this.bomb.length;j++){
            this.bomb[j].randomPosition();
            this.addChild(this.bomb[j],1);
            console.log( 'creb ' );
          }
            this.scheduleUpdate();
    },
    createItem : function(){
      if(this.score%10 ==0&&this.score!=0){
          //for(var i=0;i<4;i++){
            var item = null;
            item =new Xbomb();
            item.randomPosition();
            this.addChild(item,1);
            this.bomb.push(item);
            console.log( 'creyb ' );
         // }
        }
            this.scheduleUpdate();
    },
    createScorebord : function(){
        this.scoreLabel = cc.LabelTTF.create( 'Score:'+this.score, 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( screenWidth-100, screenHeight-50,1 ) );
        this.addChild(this.scoreLabel,1);
        
    },
    createContinuebord : function(){
        this.continueLabel = cc.LabelTTF.create( 'Cont X'+this.cont+'/'+this.continuecounter, 'Arial', 40 );
        this.continueLabel.setPosition( new cc.Point( 100, screenHeight-50,1 ) );
        this.addChild(this.continueLabel,1);
        
    },
    createContinueball : function(){
        this.continueball = new Continueball();
        this.continueball.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild(this.continueball,1);
        this.scheduleUpdate();
        
    },
    onKeyUp: function( e ) {
        if ( e == cc.KEY.right||e == cc.KEY.left) {
       this.Playerpositinop=PlayerMove.NON;
       this.leftmove=false;
        this.rightmove=false;
     }
        console.log( 'Up: ' + e );
       
    },
    onKeyDown: function( e ) {
        if ( e == cc.KEY.right) {
          //this.Playerposition=PlayerMove.RIGHT;
            this.rightmove=true;
        }
        else if( e == cc.KEY.left){
          //this.Playerposition=PlayerMove.LEFT;
            this.leftmove=true;
        }
        else if( e == 13){
          if(this.state == GameLayer.STATES.FRONT){
              this.state = GameLayer.STATES.STARTED
          }
            this.ContinuePlayer();
            //window.location.reload();
        }
        //this.checkPlayerMove();
         console.log( 'down: ' + e );
    },
    ContinuePlayer: function(){
            //this.score =0;
          if(this.cont>=1){
            this.addScore(this.score);
            this.player.flow=10;
            this.player.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
            this.blockjump1.setPosition( new cc.Point( screenWidth / 2, screenHeight / 3 ) );
            this.cont-=1;
            this.addContinue();
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
        if(this.state == GameLayer.STATES.FRONT||this.state == GameLayer.STATES.DEAD){
          this.player.Stand();
        }
        else if(this.state == GameLayer.STATES.STARTED){
          if(this.player.checkCollision(this.blockjump1)||this.player.checkCollision(this.blockjump)){
                if(this.player.flow<=0){
                  this.player.Jump2();
              }
         }
         else if(this.enemy.checkCollision(this.blockjump1)||this.enemy.checkCollision(this.blockjump)){
                if(this.enemy.flow<=0){
                  this.enemy.Jump2();
                }
        }
                this.checkcontinueItem();
                this.checkPlayerMove();
                this.checkcoinclash();
                this.checkitemclash();
                this.checkEnemystatus()
        }
      
    },
    checkEnemystatus: function(){
      if(this.enemy.closeTo(this.player)){
        this.enemy.RandomMove();
      }
      for(var j=0;j<this.blocks.length;j++){
            if(this.blocks[j].closeTo(this.enemy)){
                this.enemy.Jump();
                this.blocks[j].randomPosition();
                this.score+=1;
                this.continuecounter+=1;
               this.itemAction();
            }
         }
         this.enemyMove();
    },
    enemyMove: function(){
        var pos = this.enemy.getPosition();
       if ( this.enemy.direction == Girl.DIR.RIGHT ) {
            this.enemy.setPosition( new cc.Point( pos.x+10, pos.y ) );
          }

          else if(this.enemy.direction == Girl.DIR.LEFT ) {
            this.enemy.setPosition( new cc.Point( pos.x-10, pos.y ) ); 
          }
          if(pos.y<0){
            this.enemy.direction =Girl.DIR.UP;
          }
    },
    checkPlayerMove: function(){
      if(this.leftmove==true){
        this.player.switchDirection();
      }
       if(this.rightmove==true){
        this.player.switchDirection1();
      }
    },
    checkcoinclash: function(){
         for(var j=0;j<this.blocks.length;j++){
            if(this.blocks[j].closeTo(this.player)){
                this.player.Jump();
                this.blocks[j].randomPosition();
                this.score+=1;
                this.continuecounter+=1;
               this.itemAction();
            }
         }

    },
    checkitemclash: function(){
       var pos = this.player.getPosition();
         for(var j=0;j<this.bomb.length;j++){
            if(this.bomb[j].closeTo(this.player)){
                //this.player.BombAtt();
                this.bomb[j].ItemAtt(this.player);
                this.bomb[j].randomPosition();
                this.score+=5;
                this.continuecounter+=1;
               this.itemAction();
            }
         }

    },
    checkcontinueItem: function(){
      if(this.continuecounter>=20){
        if(this.continueball.closeTo(this.player)){
          //this.continueball.randomPosition();
            this.cont+=1;
            this.continuecounter-=20;
            this.addContinue();
        }
        else if(this.continueball.closeTo(this.enemy)){
            this.cont+=1;
            this.continuecounter-=20;
            this.addContinue();
        }
      }
    },
    itemAction: function(){
                this.addScore(this.score);
                this.addContinue();
                this.randomBlock();
                this.createItem();

    },
    randomBlock: function(){
         if(this.score%10==0){
          this.blockjump1.randomPosition();
         }
         else if(this.score%20==0){
          this.blockjump.randomPosition();
         }
    },
    endGame: function() {
         this.player.stop();
        
    },
    addScore: function(score){
      this.scoreLabel.setString("Score:"+ score );
    },
    addContinue: function(){
      
      this.continueLabel.setString('Cont X'+this.cont +"/"+this.continuecounter);
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
    PlayerMove = {
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