var GameLayer = cc.LayerColor.extend({
    init: function() {
       this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.addKeyboardHandlers();

       this.creatVar();
         
       this.createPlayer();

        this.creatblock();

        this.createnemy();

        this.createmaid();

        this.lifeblock = new LifeBrocking();
        this.lifeblock.setPosition( new cc.Point( screenWidth / 2, screenHeight-100 ) );
        this.addChild( this.lifeblock, 1 );
        this.lifeblock.scheduleUpdate();
        
        
        
        this.createNcoin();
        this.createbomb();
        this.scheduleUpdate();
        
        this.createWall();
        
         this.createScorebord();

         this.createContinuebord();

         this.createContinueball();

         
       // this.addKeyboardHandlers();
       //cocos run -p web
       //git push -u origin master
         this.state = GameLayer.STATES.FRONT;
 
        return true;
    },
    createPlayer:function(){
       this.player = new Girl(this);
        this.player.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( this.player, 1 );
        this.player.scheduleUpdate();
    },
    creatVar: function(){
       
        this.score =0;
        this.cont=0;
        this.contlimit=20;
        this.speed = 10;
        this.continuecounter=0;
        this.Playerposition = PlayerMove.NON;
        this.state = GameLayer.STATES.FRONT;
        this.startstate = GameLayer.STATES.FRONT;
        this.leftmove=false;
        this.rightmove=false;
        this.alive = true;
        this.tu = false;
        this.statespeddup=false;
        this.openbonue=false;
        this.dead = [];
    },
    createWall: function(){
        this.wall = new Wall();
        this.wall.setPosition( new cc.Point( screenWidth /2, screenHeight / 2) );
        this.wall2 = new Wall2();
        this.wall2.setPosition( new cc.Point( screenWidth /2, screenHeight / 2) );
        this.addChild(this.wall,0);
        this.statewall=1;
         
        this.startscreen = new WallStart();
        this.startscreen.setPosition( new cc.Point( screenWidth /2, screenHeight / 2) );
        this.addChild(this.startscreen,3);

        this.tutorialwall = new Tutorial();
        this.tutorialwall.setPosition( new cc.Point( screenWidth /2, screenHeight / 2) );

        this.bonuswall = new WallBonus();
        this.bonuswall.setPosition( new cc.Point( screenWidth /2, screenHeight / 2) );

        this.endscreen = new WallEnded();
        this.scheduleUpdate();
    },
    createnemy: function(){

        this.enemy = new DarkGirl(this);
        this.enemy.randomPosition();
        this.addChild( this.enemy, 1 );
        this.enemy.scheduleUpdate();
    },
    createmaid: function(){
        this.maid = new Maidsweeper(this);
        this.maid.randomPosition();
        this.addChild(this.maid,1);
        this.maid.scheduleUpdate();
    },
    creatblock: function(){
        this.blockjump = new Jumpblock();
        this.blockjump.randomPosition();
        this.addChild(this.blockjump,1);
        this.blockjump1 = new Jumpblock();
        this.blockjump1.setPosition( new cc.Point( screenWidth / 2, screenHeight / 3 ) );
        this.addChild(this.blockjump1,1);
        this.scheduleUpdate();
    },
    createNcoin : function(){
        this.blocks = [];
        for(var i=0;i<40;i++){
            this.blocks.push(new Ncoin());
            console.log( '1crey ' );
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
        if(this.score%20 ==0&&this.score!=0){
          //for(var i=0;i<4;i++){
            var item = null;
            item =new Xbomb();
            item.randomPosition();
            this.addChild(item,1);
            this.bomb.push(item);
            console.log( 'creyb ' );
         // }
        }
        var chance = 1+Math.floor(Math.random() *50);
        if(chance==1){
              var bonus = null;
              bonus = new Bonusball();
              bonus.randomPosition();
              this.addChild(bonus,1);
             this.bomb.push(bonus);

          }
          this.scheduleUpdate();
    },
    createmoreNcoin : function(){
          if(this.score%100 ==0&&this.score!=0){
          for(var i=0;i<5;i++){
            
            var coin = null;
            coin = new Ncoin();
            coin.randomPosition();
            this.addChild(coin,1);
            this.blocks.push(coin);
          }
          this.scheduleUpdate();
        }
    },
    createDeadball : function(){
          
          if(this.score%100 ==0&&this.score!=0){
            var ball = null;
            ball = new Deadball();
            ball.randomPosition();
            this.addChild(ball,1);
            this.dead.push(ball);
            this.scheduleUpdate();
        }
    },
    createScorebord : function(){
          this.scoreLabel = cc.LabelTTF.create( 'Score:'+this.score, 'Arial', 40 );
          this.scoreLabel.setPosition( new cc.Point( screenWidth-300, screenHeight-50,1 ) );
          this.addChild(this.scoreLabel,2);
          this.scoreLabel2 = cc.LabelTTF.create( 'Score:'+this.score, 'Arial', 40 );
        
    },
    createContinuebord : function(){
          this.continueLabel = cc.LabelTTF.create( 'Cont X'+this.cont+'/'+this.continuecounter+'/'+this.contlimit, 'Arial', 40 );
          this.continueLabel.setPosition( new cc.Point( 200, screenHeight-50,1 ) );
          this.addChild(this.continueLabel,2);
        
    },
    createContinueball : function(){
          this.continueball=[];
          var con=new Continueball();
          con.randomPosition();
          this.addChild(con,2);
          this.continueball.push(con);
          this.scheduleUpdate();
        
    },
    onKeyUp: function( e ) {
          if ( e == cc.KEY.right||e == cc.KEY.left) {
            this.Playerpositinop=PlayerMove.NON;
            this.leftmove=false;
            this.rightmove=false;
          }
         if( e == 32){
            this.statespeddup=false;
          }
          console.log( 'Up: ' + e );
       
    },
    onKeyDown: function( e ) {
      if(this.startstate == GameLayer.STATES.FRONT){
        if( e == 71){
            this.startstate = GameLayer.STATES.STARTED;
            this.ChangeScreen();
        }
      }
      else if(this.startstate == GameLayer.STATES.DEAD){
        if(e ==82){
          cc.game.restart();
        }
      }
      else{
        if ( e == cc.KEY.right) {
            this.rightmove=true;
        }
        else if( e == cc.KEY.left){
            this.leftmove=true;
        }
        else if( e == 13){
          if(this.state == GameLayer.STATES.FRONT){
              this.state = GameLayer.STATES.STARTED
          }
            this.ContinuePlayer();
            //window.location.reload();
        }
        else if(e == 77){
            this.ContinueMaid();
        }
        else if(e == 78){
            this.ContinueEnemy();
        }
        else if( e == 67){
            this.createmoreContinueball();
        }
        else if( e == 71){
          if(this.statewall==2){
            this.startstate = GameLayer.STATES.DEAD;
            this.Gameend();
          }
        }
        else if( e == 84){
            this.OpenTutorial();
        }
        else if( e == 32){
             this.statespeddup=true;
        }
      }
        if(e == 83){
          this.OpenBonus();
        }
         console.log( 'down: ' + e );
    },
    OpenTutorial: function(){
      if(this.tu){
        this.removeChild(this.tutorialwall);
        this.tu=false;
      }
      else{
        this.addChild(this.tutorialwall,4);
        this.tu=true;
      }
    },
    OpenBonus: function(){
      if(this.score>1000){
         if(this.openbonue){
            this.removeChild(this.bonuswall);
            this.openbonue=false;
         }
         else{
            this.addChild(this.bonuswall,5); 
            this.openbonue=true;
         }
         
        }
    },
    ChangeScreen: function(){
      if(this.startstate == GameLayer.STATES.STARTED){
        this.removeChild(this.startscreen);
      }
    },
    Gameend: function(){
      if(this.startstate == GameLayer.STATES.DEAD){
        if(this.alive){
          this.endscreen.setPosition( new cc.Point( screenWidth /2, screenHeight / 2) );
          this.addChild(this.endscreen,3);
          var score = this.score;
          this.scoreLabel2.setString("Score:"+ score );
          this.scoreLabel2.setPosition( new cc.Point( 200, 200) );
          this.addChild(this.scoreLabel2,3);
          this.alive = false;
        }
      }
    },
    ContinuePlayer: function(){
           var pos1 = this.lifeblock.getPosition();
          if(this.cont>=1){
            this.addScore(this.score);
            this.player.flow=10;
            this.player.setPosition( new cc.Point( pos1.x, pos1.y ) );
            this.cont-=1;
            this.addContinue();
          }
    },
    ContinueMaid: function(){
        var pos1 = this.lifeblock.getPosition();
          if(this.cont>=1){
            this.addScore(this.score);
            this.maid.flow=10;
            this.maid.setPosition( new cc.Point( pos1.x, pos1.y ) );
            this.maid.RandomMove();
            this.cont-=1;
            this.addContinue();
          }
        },
    ContinueEnemy: function(){
        var pos1 = this.lifeblock.getPosition();
          if(this.cont>=1){
            this.addScore(this.score);
            this.enemy.flow=10;
            this.enemy.setPosition( new cc.Point( pos1.x, pos1.y ) );
            this.enemy.RandomMove();
            this.cont-=1;
            this.addContinue();
          }
    },
     createmoreContinueball : function(){
        if(this.cont>=1){
          var con=new Continueball();
          con.randomPosition();
          this.addChild(con,2);
          this.continueball.push(con);
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
                this.checkEnemystatus();
                this.checkmaidstatus();
                this.lifeblockstocking();
                this.maidandenemyfight();
                this.Changewall();
                this.checkDeadclose();
                this.Speedup();
               
        }
      
    },
    lifeblockstocking: function(){
      var pos = this.player.getPosition();
      var pos1 = this.lifeblock.getPosition();
      this.lifeblock.setPosition( new cc.Point( pos.x, pos1.y ) );
    },
    checkEnemystatus: function(){
      if(this.enemy.closeTo(this.player)){
        this.player.Jump();
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
            this.enemy.setPosition( new cc.Point( pos.x+this.speed, pos.y ) );
        }
        else if(this.enemy.direction == Girl.DIR.LEFT ) {
            this.enemy.setPosition( new cc.Point( pos.x-this.speed, pos.y ) ); 
        }
        if(pos.y<0){
            this.enemy.direction =Girl.DIR.UP;
        }
    },
    checkmaidstatus: function(){
      if(this.maid.closeTo(this.player)){
        this.player.Jump();
        this.maid.RandomMove();
      }
      for(var j=0;j<this.bomb.length;j++){
            if(this.bomb[j].closeTo(this.maid)){
                this.maid.Jump();
                this.bomb[j].randomPosition();
                this.score+=1;
                this.continuecounter+=1;
               this.itemAction();
            }
         }
      for(var i =0;i<this.blocks.length;i++){
        if(this.blocks[i].closeTo(this.maid)){
                this.maid.Jump();
            }
         }
         this.maidMove();
    },
    maidMove: function(){
        var pos = this.maid.getPosition();
        if ( this.maid.direction == Girl.DIR.RIGHT ) {
            this.maid.setPosition( new cc.Point( pos.x+this.speed, pos.y ) );
        }
        else if(this.maid.direction == Girl.DIR.LEFT ) {
            this.maid.setPosition( new cc.Point( pos.x-this.speed, pos.y ) ); 
        }
        if(pos.y<0){
            this.maid.direction =Girl.DIR.UP;
        }
    },
    maidandenemyfight: function(){
      if(this.enemy.closeTo(this.maid)){
        this.maid.Jump();
        this.enemy.RandomMove();
      }
      else if(this.maid.closeTo(this.enemy)){
        this.enemy.Jump();
        this.maid.RandomMove();
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
                this.randomAllitem();
            }
         }

    },
    checkitemclash: function(){
       var pos = this.player.getPosition();
         for(var j=0;j<this.bomb.length;j++){
            if(this.bomb[j].closeTo(this.player)){
                this.bomb[j].ItemAtt(this.player);
                this.bomb[j].randomPosition();
                this.score+=5;
                this.continuecounter+=1;
               this.itemAction();
            }
         }

    },
    checkcontinueItem: function(){
      if(this.continuecounter>=this.contlimit){
        for(var i = 0; i<this.continueball.length;i++){
          if(this.continueball[i].closeTo(this.player)){
              this.continueball[i].randomPosition();
              this.player.Jump();
              this.cont+=1;
              this.continuecounter-=this.contlimit;
              this.addContinue();
              this.contlimit+=5;
          }
          else if(this.continueball[i].closeTo(this.enemy)){
              this.cont+=1;
              this.continueball[i].randomPosition();
              this.continuecounter-=this.contlimit;
              this.addContinue();
              this.contlimit+=5;
          }
          else if(this.continueball[i].closeTo(this.maid)){
              this.maid.Jump();
              this.continueball[i].randomPosition();
              this.cont+=1;
              this.continuecounter-=this.contlimit;
              this.addContinue();
              this.contlimit+=5;
          }
        
      }
    }
    },
    checkDeadclose: function(){
      for (var i = 0; i < this.dead.length; i++) {
          if(this.dead[i].closeTo(this.player)){
            if(this.cont>=1){
              this.cont-=1;
              this.player.Jump();
              this.dead[i].randomPosition();  
              this.addContinue();
            }
            else{
              this.startstate = GameLayer.STATES.DEAD;
              this.Gameend();
            }            
          }
      }
    },
    randomAllitem: function(){
      if(this.score%50==0){
        for(var j=0;j<this.bomb.length;j++){
                this.bomb[j].randomPosition();
            }

      }
      if(this.score%100==0){
         for(var i=0;i<this.blocks.length;i++){
                this.blocks[i].randomPosition();
            }
          for(var k = 0; k<this.continueball.length;k++){
                this.continueball[k].randomPosition();
          }
       }
    },
    itemAction: function(){
                this.addScore(this.score);
                this.addContinue();
                this.randomBlock();
                this.createItem();
                this.createmoreNcoin();
                this.createDeadball();

    },
    randomBlock: function(){
         if(this.score%10==0){
          this.blockjump1.randomPosition();
         }
         else if(this.score%20==0){
          this.blockjump.randomPosition();
         }
    },
    Speedup: function(){
      if(this.statespeddup==true){
        this.speed=20;
        this.player.speed=20;
      }
      else{
        this.speed=10;
        this.player.speed=10;
      }
    },
    Changewall: function(){
      var pos1 = this.player.getPosition();
      if(pos1.y<0){
        if(this.statewall==1){
           this.removeChild(this.wall);
            this.addChild(this.wall2,0);
            this.statewall=2;
        }
      }
      else{
        if(this.statewall==2){
           this.removeChild(this.wall2);
            this.addChild(this.wall,0);
            this.statewall=1;
        }
      }
    },
    endGame: function() {
         this.player.stop();
        
    },
    addScore: function(score){
      this.scoreLabel.setString("Score:"+ score );
    },
    addContinue: function(){
      
      this.continueLabel.setString('Cont X'+this.cont +"/"+this.continuecounter+"/"+this.contlimit);
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