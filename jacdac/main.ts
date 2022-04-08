//% deprecated
namespace Kitronik_LAMPbit {

}

namespace servers {
    class LightBulbServer extends jacdac.Server {
        brightness: number
        constructor() {
            super("", jacdac.SRV_LIGHT_BULB)
            this.brightness = 0
        }

        handlePacket(pkt: jacdac.JDPacket) {
            this.handleRegBool(pkt, jacdac.LightBulbReg.Dimmable, false)
            const r = this.handleRegFormat(pkt, jacdac.LightBulbReg.Brightness, "u0.16", [this.brightness])
            this.brightness = Math.round(r[0])

            const display = this.brightness > 0 ? Kitronik_LAMPbit.DisplayLamp.On : Kitronik_LAMPbit.DisplayLamp.Off
            Kitronik_LAMPbit.lampLightLED(display)
        }
    }

    jacdac.startSelfServers(() => [
        jacdac.createSimpleSensorServer("",
            jacdac.SRV_LIGHT_LEVEL, "u0.16",
            () => Kitronik_LAMPbit.lightLevel() / 1023),
        new LightBulbServer()
    ])
}

namespace modules {
    /**
     * The ambient light level measured by Lamp:bit
     */
    //% fixedInstance block="kitronik Lamp:bit light level"
    export const kitronikLampBitLightLevel = new LightLevelClient("kitronik Lamp:bit light level?device=self")

    /**
     * The lamp controller
     */
    //% fixedInstance block="kitronik lamp:bit lamp"
    export const kitronikLampBitLamp = new LightBulbClient("kitronik lamp:bit lamp?device=self")
}