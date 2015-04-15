var DarkGirl = cc.Sprite.extend({
    ctor: function(game) {
          this._super();
          this.initWithFile( 'res/images/Dark_Girl.png' );
       	  this.game = game;
          this.direction = Girl.DIR.UP;
          this.speed=10;
          //this.flow=10;
          this.flow=0;
    },
    update: function( dt ) {
	        var pos = this.getPosition();
          this.Move();
          this.setPosition( new cc.Point( pos.x, pos.y+this.flow ) );
          if ( pos.x > screenWidth ) {
            this.setPosition( new cc.Point( 0, pos.y+this.flow ) );
          }
          else if ( pos.x < 0 ) {
            this.setPosition( new cc.Point( screenWidth, pos.y+this.flow ) );
          }
          else if ( pos.y <= 0 ) {
            //this.flow=25;
            //this.Stand();
            //this.setPosition( new cc.Point( pos.x, pos.y+50 ) );
          }
          else {

            this.setPosition( new cc.Point( pos.x, pos.y+this.flow ) );
          }
          if ( this.direction == Girl.DIR.RIGHT||this.direction == Girl.DIR.LEFT ) {
              this.flow+=-1;
          }
     

    },
    Move: function(){
        var pos = this.getPosition();
       if ( this.direction == Girl.DIR.RIGHT ) {
            this.setPosition( new cc.Point( pos.x+this.speed, pos.y ) );
          }

          else if( this.direction == Girl.DIR.LEFT ) {
            this.setPosition( new cc.Point( pos.x-this.speed, pos.y ) ); 
          }
    },
   switchDirection: function() {
	
	       //if ( this.direction == Girl.DIR.RIGHT ) {
	           this.direction = Girl.DIR.LEFT;
             this.setFlippedX(true);




	       //}
        //var pos = this.getPosition();
        //this.flow=20;
        //this.setPosition( new cc.Point( pos.x-this.speed, pos.y ) );
      /*else if( this.direction == Girl.DIR.LEFT ) {
	     this.direction = Girl.DIR.RIGHT;
	    
	     }*/

       
    },
    
  switchDirection1: function() {
	       //if( this.direction == Girl.DIR.LEFT ) {
            this.direction = Girl.DIR.RIGHT;
           this.setFlippedX(false);
         // }
         // var pos = this.getPosition(); 
          // this.flow=20;
         // this.setPosition( new cc.Point( pos.x+this.speed, pos.y ) );
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
    Jump2: function(){
           
            var pos = this.getPosition();
            this.flow=40;
            this.setPosition( new cc.Point( pos.x, pos.y+80 ) );
          
    },
    RandomMove: function(){
      var ran = 1+Math.floor(Math.random() *100);
      if(ran>50){
        this.switchDirection();
      }
      else{
        this.switchDirection1(); 
      }
    },
    closeTo: function( obj ) {
       var myPos = this.getPosition();
       var oPos = obj.getPosition();
         return ( ( Math.abs( myPos.x - oPos.x ) <= 40 ) &&( Math.abs( myPos.y - oPos.y ) <= 50 ) );
    },
    BombAtt: function(){
           
            var pos = this.getPosition();
            var ran = 1+Math.floor(Math.random() *3);
            //this.flow=25;
            console.log( ran );
            if(ran==1){
              this.setPosition( new cc.Point( pos.x+200, pos.y ) );
            }
            else if(ran==2){
              this.setPosition( new cc.Point( pos.x-200, pos.y ) ); 
            }
            else if(ran==3){
              this.flow=50;
              this.setPosition( new cc.Point( pos.x, pos.y+100 ) ); 
            }
            /*else if(ran==4){
              this.flow=-50;
              this.setPosition( new cc.Point( pos.x, pos.y-100 ) ); 
            }*/
            /*else{
              this.flow=-50;
              this.setPosition( new cc.Point( pos.x, pos.y-100 ) ); 
            }*/
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