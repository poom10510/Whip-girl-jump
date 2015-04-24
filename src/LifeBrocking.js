var LifeBrocking = cc.Sprite.extend({
    ctor: function(game) {
          this._super();
          this.initWithFile( 'res/images/LifeBrocking.png' );
       	  this.game = game;
          this.direction = Girl.DIR.UP;
          this.speed=10;
          //this.flow=10;
          this.flow=0;
    },
    update: function( dt ) {
	        var pos = this.getPosition();
          if ( pos.x > screenWidth ) {
            this.setPosition( new cc.Point( 0, pos.y ) );
          }
          else if ( pos.x < 0 ) {
            this.setPosition( new cc.Point( screenWidth, pos.y) );
          }
          else {
            this.setPosition( new cc.Point( pos.x, pos.y+this.flow ) );
          }
         
           //   this.flow+=-1;
         // }

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