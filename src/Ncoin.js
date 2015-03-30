var Ncoin = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Normal_coin.png' );
    },
    
    randomPosition: function() {
        // --- your task is to write this method
        this.setPosition( new cc.Point( Math.random() * screenWidth,50+Math.random() * (screenHeight-50) ) );
    },
    closeTo: function( obj ) {
	     var myPos = this.getPosition();
	     var oPos = obj.getPosition();
         //return ((myPos.x == oPos.x)&&(myPos.y == oPos.y));
         return ( ( Math.abs( myPos.x - oPos.x ) <= 20 ) &&( Math.abs( myPos.y - oPos.y ) <= 20 ) );
    }
});