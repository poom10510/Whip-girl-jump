var Girl = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Whip_Girl.png' );
       	this.direction = Girl.DIR.RIGHT;
        this.speed=10;
    },
    update: function( dt ) {
	var pos = this.getPosition();
     /*  if(this.direction == 1 ) {
	   if ( pos.y < screenHeight ) {
           this.setPosition( new cc.Point( pos.x, pos.y + this.speed ) );
	   } else {
           this.setPosition( new cc.Point( pos.x, 0 ) );
       }
       }else if(this.direction == 2){
       if ( pos.x < screenWidth ) {
           this.setPosition( new cc.Point( pos.x+this.speed, pos.y ) );
	   } else {
           this.setPosition( new cc.Point( 0, pos.y ) );
       }
        }else if(this.direction == 3){
       if ( pos.y > 0 ) {
           this.setPosition( new cc.Point( pos.x, pos.y - this.speed ) );
	   } else {
           this.setPosition( new cc.Point( pos.x, screenHeight ) );
       }
       }else if(this.direction == 4){
       if ( pos.x > 0 ) {
           this.setPosition( new cc.Point( pos.x-this.speed, pos.y ) );
	   } else {
           this.setPosition( new cc.Point( screenWidth, pos.y ) );
       }
       }*/
        if ( pos.x > screenWidth ) {
           this.setPosition( new cc.Point( 0, pos.y ) );
       }
        else if ( pos.x < 0 ) {
           this.setPosition( new cc.Point( screenWidth, pos.y ) );
     } 
    },
    
   switchDirection: function() {
	
	if ( this.direction == Girl.DIR.RIGHT ) {
	    this.direction = Girl.DIR.LEFT;
	   
	}
  var pos = this.getPosition();
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
       this.setPosition( new cc.Point( pos.x+this.speed, pos.y ) );
    },
     closeTo: function( obj ) {
	var myPos = this.getPosition();
	var oPos = obj.getPosition();
  	return ( ( Math.abs( myPos.x - oPos.x ) <= 16 ) &&
		 ( Math.abs( myPos.y - oPos.y ) <= 16 ) );
    },
    Speedup: function() {
    this.speed+=1;
    }
   
});
 
Girl.DIR = {
        UP: 1,
        RIGHT: 2,
        DOWN: 3,
        LEFT:4
};