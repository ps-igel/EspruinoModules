var display;
var _spi;
var t1="Espruino";
var t2="rocks!!";

function draw(){
   SPI1.setup({mosi:A7,sck:A5});
   _spi = SPI1;
  
  display = require("IL91874").connect({ displayType:'GDEW027C44',
    cs1Pin : A4, dcPin : A0, busyPin : A1, resetPin : B0, spi:_spi  });
  
display.on();
  display.hwReset(function(){
    display.init(
      function(err){       
		//black buffer
		display.g.bw.clear(0x0);   
        display.g.bw.setRotation(1); 
		display.g.bw.setFontVector(25);
        display.g.bw.drawString(t1,50,25);       

		//red buffer
        display.g.rw.clear(0x0);   
        display.g.rw.setRotation(1);
        display.g.rw.setFontVector(25);
        display.g.rw.drawString(t2,150,50);  

        //flip writes both buffers ram (~5secs per buffer)
        display.g.flip(function(){                  
          //refreshScreen triggers display refresh (~15secs)
          display.refreshScreen(function(){         
			display.off();
          });
        });
      }
    );
  });
}

draw();