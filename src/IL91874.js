var C = {
  "GDEW027C44": { "bpp": 1, "displaySizeX": 176, "displaySizeY": 264, "useInternalLut": 1,
    "lutVcomDc": new Uint8Array([0, 0, 0, 26, 26, 0, 0, 1, 0, 10, 10, 0, 0, 8, 0, 14, 1, 14, 1, 16, 0, 10, 10, 0, 0, 8, 0, 4, 16, 0, 0, 5, 0, 3, 14, 0, 0, 10, 0, 35, 0, 0, 0, 1]),
    "lutW2W": new Uint8Array([144, 26, 26, 0, 0, 1, 64, 10, 10, 0, 0, 8, 132, 14, 1, 14, 1, 16, 128, 10, 10, 0, 0, 8, 0, 4, 16, 0, 0, 5, 0, 3, 14, 0, 0, 10, 0, 35, 0, 0, 0, 1]),
    "lutB2W": new Uint8Array([160, 26, 26, 0, 0, 1, 0, 10, 10, 0, 0, 8, 132, 14, 1, 14, 1, 16, 144, 10, 10, 0, 0, 8, 176, 4, 16, 0, 0, 5, 176, 3, 14, 0, 0, 10, 192, 35, 0, 0, 0, 1]),
    "lutB2B": new Uint8Array([144, 26, 26, 0, 0, 1, 64, 10, 10, 0, 0, 8, 132, 14, 1, 14, 1, 16, 128, 10, 10, 0, 0, 8, 0, 4, 16, 0, 0, 5, 0, 3, 14, 0, 0, 10, 0, 35, 0, 0, 0, 1]),
    "lutW2B": new Uint8Array([144, 26, 26, 0, 0, 1, 32, 10, 10, 0, 0, 8, 132, 14, 1, 14, 1, 16, 16, 10, 10, 0, 0, 8, 0, 4, 16, 0, 0, 5, 0, 3, 14, 0, 0, 10, 0, 35, 0, 0, 0, 1]),
    "maxScreenBytes": 5808, "ramXStartAddress": 0, "ramXEndAddress": 17, "ramYStartAddress": 0, "ramYEndAddress": 171,
    "CMD": {
      PANEL_SETTING:0x00,
      POWER_SETTING:0x01,
      POWER_OFF:0x02,
      POWER_OFF_SEQUENCE_SETTING:0x03,
      POWER_ON:0x04,
      POWER_ON_MEASURE:0x05,
      POWER_OPTIMIZATION:0xF8,
      BOOSTER_SOFT_START:0x06,
      DEEP_SLEEP:0x07,
      DATA_START_TRANSMISSION_1:0x10,
      DATA_STOP:0x11,
      DISPLAY_REFRESH:0x12,
      DATA_START_TRANSMISSION_2:0x13,
      PARTIAL_DATA_START_TRANSMISSION_1:0x14, 
      PARTIAL_DATA_START_TRANSMISSION_2:0x15, 
      PARTIAL_DISPLAY_REFRESH:0x16,
      LUT_FOR_VCOM:0x20, 
      LUT_WHITE_TO_WHITE:0x21,
      LUT_BLACK_TO_WHITE:0x22,
      LUT_WHITE_TO_BLACK:0x23,
      LUT_BLACK_TO_BLACK:0x24,
      PLL_CONTROL:0x30,
      TEMPERATURE_SENSOR_COMMAND:0x40,
      TEMPERATURE_SENSOR_CALIBRATION:0x41,
      TEMPERATURE_SENSOR_WRITE:0x42,
      TEMPERATURE_SENSOR_READ:0x43,
      VCOM_AND_DATA_INTERVAL_SETTING:0x50,
      LOW_POWER_DETECTION:0x51,
      TCON_SETTING:0x60,
      TCON_RESOLUTION:0x61,
      SOURCE_AND_GATE_START_SETTING:0x62,
      GET_STATUS:0x71,
      AUTO_MEASURE_VCOM:0x80,
      VCOM_VALUE:0x81,
      VCM_DC_SETTING_REGISTER:0x82,
      PROGRAM_MODE:0xA0,
      ACTIVE_PROGRAM:0xA1,
      READ_OTP_DATA:0xA2
      }
   }
 };
function IL91874(config) {
  if (config.displayType === 'GDEW027C44') {
      this.display = C.GDEW027C44;
  } else {
      if(config.display) {
        this.display = config.display;
      } else {
        return new Error('Unknown display type "' + config.displayType + '"" and no display configuration provided!');
      }
  }
  this.spi        = config.spi;
  this.bs1Pin     = config.bs1Pin;
  this.cs1Pin     = config.cs1Pin;
  this.dcPin      = config.dcPin;
  this.busyPin    = config.busyPin;
  this.resetPin   = config.resetPin;
  this.powerPin   = config.powerPin;
  this.g          = { rw:this.grfxRedWhite(), bw:this.grfxBlackWhite(), flip:this.flip };
  if (config.clearScreenTimeOut) {
    this.csbTimeOut = config.clearScreenTimeOut;
  } else {
    this.csbTimeOut = 100;
  }
  if (config.clearScreenTimeOut) {
    this.hwResetTimeOut = config.hardwareResetTimeOut;
  } else {
    this.hwResetTimeOut = 100;
  }
}
IL91874.prototype.reset = function () {  
};
IL91874.prototype.setLut = function (){
 
    this.wCmd(this.display.CMD.LUT_FOR_VCOM);
    for (let count = 0; count < 44; count++)
    {
      this.wData(this.display.lutVcomDc[count]);
    }

  this.wCmd(this.display.CMD.LUT_WHITE_TO_WHITE);
    for (let count = 0; count < 42; count++)
    {
      this.wData(this.display.lutW2W[count]);
    }

  this.wCmd(this.display.CMD.LUT_BLACK_TO_WHITE);	
    for (let count = 0; count < 42; count++)
    {
      this.wData(this.display.lutB2W[count]);
    }

  this.wCmd(this.display.CMD.LUT_WHITE_TO_BLACK);
    for (let count = 0; count < 42; count++)
    {
      this.wData(this.display.lutW2B[count]);
    }
  
this.wCmd(this.display.CMD.LUT_BLACK_TO_BLACK);	
    for (let count = 0; count < 42; count++)
    {
      this.wData(this.display.lutB2B[count]);
    }    
};
IL91874.prototype.on = function () {
  if(this.powerPin) {
    digitalWrite(this.powerPin, HIGH);
  }
};
IL91874.prototype.off = function () {
  if(this.powerPin) {
    digitalWrite(this.powerPin, LOW);
  }
};
IL91874.prototype.refresh = function (callback) {
  this.wCmd(this.display.CMD.DISPLAY_REFRESH);
  this.waitBusy(callback);
};
IL91874.prototype.hwReset = function (callback) {
  digitalWrite(this.resetPin, LOW);
  digitalWrite(this.resetPin, HIGH);
  return setTimeout(callback, this.hwResetTimeOut);
};
IL91874.prototype.init = function (callback,options) {
  if(this.bs1Pin) {
    digitalWrite(this.bs1Pin, LOW);
  }
  _this=this;
  this.on(); //hardware on
  this.wCmd(this.display.CMD.POWER_ON);
  print("power on");
  this.waitBusy(function(){
    print("init display");
    _this.wCmdData(_this.display.CMD.PANEL_SETTING,_this.display.useInternalLut?0x8f:0xaf);
      _this.wCmdData(_this.display.CMD.PLL_CONTROL,0x3a);
      _this.wCmdData(_this.display.CMD.POWER_SETTING,[0x03,0x00,0x26,0x26,0x03]);
      _this.wCmdData(_this.display.CMD.BOOSTER_SOFT_START,[0x17,0x17,0x17]);
      _this.wCmdData(_this.display.CMD.POWER_OPTIMIZATION,[0x60,0xA5]);
      _this.wCmdData(_this.display.CMD.POWER_OPTIMIZATION,[0x89,0xA5]);
      _this.wCmdData(_this.display.CMD.POWER_OPTIMIZATION,[0x90,0x00]);
      _this.wCmdData(_this.display.CMD.POWER_OPTIMIZATION,[0x93,0x2A]);
      _this.wCmdData(_this.display.CMD.POWER_OPTIMIZATION,[0x73,0x41]);
      _this.wCmdData(_this.display.CMD.VCM_DC_SETTING_REGISTER,0x0);
      _this.wCmdData(_this.display.CMD.VCOM_AND_DATA_INTERVAL_SETTING, 0x87);
      if (!_this.display.useInternalLut) _this.setLut();      
      return callback();
  });
};
IL91874.prototype.wCmd = function (command) {
  digitalWrite(this.dcPin, 0);
  this.spi.write(command, this.cs1Pin);
  digitalWrite(this.dcPin, 1);
};
IL91874.prototype.wData = function (data) {
 this.spi.write(data, this.cs1Pin);
};
IL91874.prototype.wCmdData = function (command,data) {
  this.wCmd(command);  
  this.wData(data);
};
IL91874.prototype.waitBusy = function (callback) {
  print("busy..."); 
  while(digitalRead(this.busyPin)==0){}
  return callback();   
  //return setWatch(callback, this.busyPin, { repeat:false, edge:'rising' });
  //return setTimeout(callback,2000);
};
IL91874.prototype.csb = function (callback,clearScreenColor) {
  this.wCmdData(0x44, 0x00);
  this.wCmdData(0x45, 0x00);
  this.wCmd(0x24);
  this.prepWData();
  for (var i = 0; i < this.display.maxScreenBytes; i++) {
    this.wData(clearScreenColor);
  }
  this.wCmd(0xFF);
  return setTimeout(callback, this.csbTimeOut);
};
IL91874.prototype.refreshScreen = function (callback) {
  this.wCmd(this.display.CMD.DISPLAY_REFRESH);
  return this.waitBusy(callback);
};
IL91874.prototype.sxyc = function (xCount,yCount) {
  this.wCmdData(0x4E, xCount);
  this.wCmdData(0x4F, yCount);
};
IL91874.prototype.grfxBlackWhite = function () {  
  var _display = this;
  var g = Graphics.createArrayBuffer(
            this.display.displaySizeX,
            this.display.displaySizeY,
            this.display.bpp,
            {msb: true}
          );
  g.clear = function(clearColor){
    print("clear with "+clearColor);
    new Uint8Array(this.buffer).fill(clearColor);
  };
  g.flip = function(callback){    
    _display.wCmd(_display.display.CMD.DATA_START_TRANSMISSION_1);
    for (let i=0;i<this.buffer.length;i++) _display.wData(this.buffer[i]);
     
    _display.waitBusy(callback);
  };
  return g;
};

/*
 * flips both (rw/bw) graphics buffers
*/
IL91874.prototype.flip = function (callback){
  var _g = this;
  this.rw.flip(function(){
    _g.bw.flip(callback);
    }    
  );
};
IL91874.prototype.grfxRedWhite = function () {  
  var _display = this;
  var g = Graphics.createArrayBuffer(
            this.display.displaySizeX,
            this.display.displaySizeY,
            this.display.bpp,
            {msb: true}
          );
  g.clear = function(clearColor){
    print("clear with "+clearColor);
    new Uint8Array(this.buffer).fill(clearColor);
  };
  g.flip = function(callback){  
    _display.wCmd(_display.display.CMD.DATA_START_TRANSMISSION_2);
    for (let i=0;i<this.buffer.length;i++) _display.wData(this.buffer[i]);    
    _display.waitBusy(callback);
  };
  return g;
};

exports.connect = function(options) 
{
	return new IL91874(options);
};