var Maidsweeper = DarkGirl.extend({
    ctor: function(game) {
          this._super();
          this.initWithFile( 'res/images/Maidsweeper.png' );
       	 this.game = game;
         // this.direction = Girl.DIR.UP;
         this.direction = Girl.DIR.UP;
          this.speed=10;
          //this.flow=10;
          this.flow=0;
          this.fall=-1;
    }
   
});
 
    Girl.DIR = {
            UP: 1,
            RIGHT: 2,
            DOWN: 3,
            LEFT:4
};