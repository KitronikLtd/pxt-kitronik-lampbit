forever(() => {
    console.logValue("light level", modules.kitronikLampBitLightLevel.lightLevel())
    const on = modules.kitronikLampBitLamp.brightness()
    if (on > 0)
        modules.kitronikLampBitLamp.setBrightness(0)
    else 
        modules.kitronikLampBitLamp.setBrightness(100)
    pause(1000)
})