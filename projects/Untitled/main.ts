let deadband = 0
input.onButtonPressed(Button.A, () => {
    deadband += 5
    if (deadband == 45) {
        deadband = 40
    }
    basic.showNumber(deadband)
})
input.onButtonPressed(Button.B, () => {
    if (deadband != 0) {
        deadband += -5
    }
    basic.showNumber(deadband)
})
deadband = 1023 / 100 * 25
basic.forever(() => {
    if (pins.analogReadPin(AnalogPin.P1) < 512 - deadband) {
        pins.digitalWritePin(DigitalPin.P0, 1)
    } else if (pins.analogReadPin(AnalogPin.P1) > 512 + deadband) {
        pins.digitalWritePin(DigitalPin.P0, 0)
    }
})
