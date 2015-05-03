var Xbomb = Ncoin.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'res/images/Xbomb_1.png' );
    },
    ItemAtt: function(obj){
           
            var pos = obj.getPosition();
            var ran = 1+Math.floor(Math.random() *4);
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
            else if(ran==4){
              //obj.flow=-50;
              obj.setPosition( new cc.Point( pos.x, pos.y-100 ) ); 
            }
            /*else{
              this.flow=-50;
              this.setPosition( new cc.Point( pos.x, pos.y-100 ) ); 
            }*/
    },
});