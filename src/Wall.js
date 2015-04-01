var Wall = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Wall.png' );
    },
    
    randomPosition: function() {
        // --- your task is to write this method
        this.setPosition( new cc.Point( Math.random() * screenWidth,20+Math.random() * screenHeight-50 ) );
    },
    closeTo: function( obj ) {
	     var myPos = this.getPosition();
	     var oPos = obj.getPosition();
         //return ((myPos.x == oPos.x)&&(myPos.y == oPos.y));
         return ( ( Math.abs( myPos.x - oPos.x ) <= 20 ) &&( Math.abs( myPos.y - oPos.y ) <= 20 ) );
    }
});