var Girl = cc.Sprite.extend({
    ctor: function(game) {
          this._super();
          this.initWithFile( 'res/images/Whip_Girl.png' );
       	  this.game = game;
          this.direction = Girl.DIR.RIGHT;
          this.speed=30;
          this.flow=10;
    },
    update: function( dt ) {
	        var pos = this.getPosition();
          this.setPosition( new cc.Point( pos.x, pos.y+this.flow ) );
          if ( pos.x > screenWidth ) {
            this.setPosition( new cc.Point( 0, pos.y+this.flow ) );
          }
          else if ( pos.x < 0 ) {
            this.setPosition( new cc.Point( screenWidth, pos.y+this.flow ) );
          }
          else if ( pos.y <= 0 ) {
            this.flow=25;
            this.setPosition( new cc.Point( pos.x, pos.y+50 ) );
          }
     
          /*else if(this.checkCollision(this.game.blockjump1)||this.checkCollision(this.game.blockjump)){
            this.flow=25;
            this.setPosition( new cc.Point( pos.x, pos.y+50 ) );
          }*/
          else {
            this.setPosition( new cc.Point( pos.x, pos.y+this.flow ) );
          }
          this.flow+=-1;
        /*if(pos.y==0){
            this.flow=20;
          } */

     

    },
    
   switchDirection: function() {
	
	       if ( this.direction == Girl.DIR.RIGHT ) {
	           this.direction = Girl.DIR.LEFT;
	   
	       }
        var pos = this.getPosition();
        //this.flow=20;
        this.setPosition( new cc.Point( pos.x-this.speed, pos.y ) );
      /*else if( this.direction == Girl.DIR.LEFT ) {
	     this.direction = Girl.DIR.RIGHT;
	    
	     }*/

       
    },
    
  switchDirection1: function() {
	       if( this.direction == Girl.DIR.LEFT ) {
            this.direction = Girl.DIR.RIGHT;
      
          }
          var pos = this.getPosition(); 
          // this.flow=20;
          this.setPosition( new cc.Point( pos.x+this.speed, pos.y ) );
    },
  closeTo: function( obj ) {
	       var myPos = this.getPosition();
	       var oPos = obj.getPosition();
  	     return ( ( Math.abs( myPos.x - oPos.x ) <= 16 ) &&( Math.abs( myPos.y - oPos.y ) <= 16 ) );
    },
  Speedup: function() {
        this.speed+=1;
    },
  checkCollision: function(obj){
          var posRect = this.getBoundingBoxToWorld();
         /* var pminx = cc.rectGetMinX(posRect);
          var pmaxx = cc.rectGetMaxX( posRect );
          var minx = cc.rectGetMinX( obj );
          var maxx = cc.rectGetMaxX( obj );
          return ( minx <= pmaxx ) && ( pminx <= maxx );*/
          var objPosRect = obj.getBoundingBoxToWorld();
          
          // return cc.rectIntersectsRect(posRect,objPosRect);
          return cc.rectIntersectsRect(posRect,objPosRect);
    },
    Jump: function(){
           
            var pos = this.getPosition();
            this.flow=25;
            this.setPosition( new cc.Point( pos.x, pos.y+50 ) );
          
    },
    Stand: function(){
            var pos = this.getPosition();
            this.flow=0;
            this.setPosition( new cc.Point( pos.x, pos.y ) );
    }
   
});
 
    Girl.DIR = {
            UP: 1,
            RIGHT: 2,
            DOWN: 3,
            LEFT:4
};