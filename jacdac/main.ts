//% deprecated
namespace Kitronik_LAMPbit {

}

namespace servers {
    class LightBulbServer extends jacdac.Server {
        brightness: number
        constructor() {
            super(jacdac.SRV_LIGHT_BULB)
            this.brightness = 0
        }

        handlePacket(pkt: jacdac.JDPacket) {
            this.handleRegBool(pkt, jacdac.LightBulbReg.Dimmable, false)
            const r = this.handleRegFormat(pkt, jacdac.LightBulbReg.Brightness, jacdac.LightBulbRegPack.Brightness, [this.brightness])
            this.brightness = Math.round(r[0])

            const display = this.brightness > 0 ? Kitronik_LAMPbit.DisplayLamp.On : Kitronik_LAMPbit.DisplayLamp.Off
            Kitronik_LAMPbit.lampLightLED(display)
        }
    }

    function start() {
        jacdac.startSelfServers(() => [
            jacdac.createSimpleSensorServer(
                jacdac.SRV_LIGHT_LEVEL, jacdac.LightLevelRegPack.LightLevel,
                () => {
                    let v = Kitronik_LAMPbit.lightLevel()
                    if (isNaN(v))
                        v = 0
                    return v / 1023
                }),
            new LightBulbServer()
        ])
    }
    start()
}

namespace modules {
    /**
     * The ambient light level measured by Lamp:bit
     */
    //% fixedInstance whenUsed block="kitronik Lampbit light level"
    export const kitronikLampBitLightLevel = new LightLevelClient("kitronik Lampbit light level?device=self")

    /**
     * The lamp controller
     */
    //% fixedInstance whenUsed block="kitronik Lampbit lamp"
    export const kitronikLampBitLamp = new LightBulbClient("kitronik Lampbit lamp?device=self")
}