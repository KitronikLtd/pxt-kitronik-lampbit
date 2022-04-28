forever(() => {
    const on = modules.kitronikLampBitLightLevel.lightLevel()
    if (on > 50) {
        led.plot(0,0)
        modules.kitronikLampBitLamp.setBrightness(0)
    }
    else {
        led.unplot(0, 0)
        modules.kitronikLampBitLamp.setBrightness(100)
    }
})