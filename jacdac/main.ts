//% deprecated
namespace Kitronik_LAMPbit {

}

namespace modules {
    /**
     * The ambient light level measured by Lamp:bit
     */
    //% fixedInstance whenUsed block="kitronik Lampbit light level"
    export const kitronikLampBitLightLevel = new LightLevelClient("kitronik light level?dev=self")

    /**
     * The lamp controller
     */
    //% fixedInstance whenUsed block="kitronik Lampbit lamp"
    export const kitronikLampBitLamp = new LightBulbClient("kitronik lamp?dev=self&dimmable=false")
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
        jacdac.productIdentifier = 0x3fee6f62
        jacdac.startSelfServers(() => {
            const servers = [
                jacdac.createSimpleSensorServer(
                    jacdac.SRV_LIGHT_LEVEL, jacdac.LightLevelRegPack.LightLevel,
                    () => {
                        const v = Kitronik_LAMPbit.lightLevel()
                        if (isNaN(v)) return undefined
                        return v / 1023
                    }, {
                    statusCode: jacdac.SystemStatusCodes.Initializing
                }),
                new LightBulbServer()
            ]

            control.inBackground(() => {
                while(isNaN(Kitronik_LAMPbit.lightLevel())) {
                    pause(500)
                }
                servers[0].setStatusCode(jacdac.SystemStatusCodes.Ready)
            })

            return servers
        })
    }
    start()
}
