var Xbomb = Ncoin.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Xbomb_1.png' );
    },
    
    /*randomPosition: function() {
        // --- your task is to write this method
        this.setPosition( new cc.Point( 50+Math.random() * (screenWidth-100),50+Math.random() * (screenHeight-100) ) );
    },
    closeTo: function( obj ) {
	     var myPos = this.getPosition();
	     var oPos = obj.getPosition();
         return ( ( Math.abs( myPos.x - oPos.x ) <= 16 ) &&( Math.abs( myPos.y - oPos.y ) <= 90 ) );
    }*/
    ItemAtt: function(obj){
           
            var pos = obj.getPosition();
            var ran = 1+Math.floor(Math.random() *3);
            //this.flow=25;
            console.log( ran );
            if(ran==1){
              obj.setPosition( new cc.Point( pos.x+200, pos.y ) );
            }
            else if(ran==2){
              obj.setPosition( new cc.Point( pos.x-200, pos.y ) ); 
            }
            else if(ran==3){
              obj.flow=45;
              obj.setPosition( new cc.Point( pos.x, pos.y+100 ) ); 
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
});