//Forever loop with reading the light level.
//Resulting in the lamp turning on and off depending on the light reading
basic.forever(function () {

    if (Kitronik_LAMPbit.lightLevel() >= 250) {
        Kitronik_LAMPbit.lampLightLED(Kitronik_LAMPbit.DisplayLamp.Off)
    } else {
        Kitronik_LAMPbit.lampLightLED(Kitronik_LAMPbit.DisplayLamp.On)
    }
})