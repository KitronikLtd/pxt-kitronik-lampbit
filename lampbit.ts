/**
 * Kitronik Lampbit Package
 */
//% weight=100 color=#00A654 icon="\uf0eb" block="LAMP:bit"
namespace Kitronik_LAMPbit {

    let deadbandValue = 0
    /**
     * Lamp on/off states
     */
    export enum DisplayLamp {
        //% block="On"
        On = 1,
        //% block="Off"
        Off = 0
    }

    /**
     * Read the ambient light level
     */
    //% blockId="kitronik_lampbit_read_light_level"
    //% block="Read Light level"
    //% weight=100 blockGap=8
    export function lightLevel(): number {
        let voltLevel = pins.analogReadPin(AnalogPin.P1)
        return voltLevel
    }

    /**
     * Turn the Lamp on or off
     * @param illumination
     */
    //% blockId="kitronik_lampbit_set_lamp_led" 
    //% block="Turn Lamp Light %illumination|"
    //% weight=90 blockGap=8
    export function lampLightLED(illumination: DisplayLamp): void {
        pins.digitalWritePin(DigitalPin.P0, illumination)
    }

    /**
     * Deadband of Lamp
     * @param deadbandPercent
     */
    //% blockId="kitronik_lampbit_deadband_input"
    //% block="Set Lamp deadband to %deadbandPercent| percent"
    //% deadbandPercent.min=0 deadbandPercent.max=50
    //% weight=80 blockGap=8
    export function deadbandInput(deadbandPercent: number): void {
		if (deadbandPercent >= 50)		//If user attempts to set higher than max value, set the number back to max limit
			deadbandPercent = 50
		
        deadbandValue = (1023/100) * deadbandPercent
    }
	
	/**
     * Deadband Value
     */
    //% blockId="kitronik_lampbit_deadband_value"
    //% block="Deadband Value"
    //% weight=100 blockGap=8
    export function deadband(): number {
        return deadbandValue
    }
}