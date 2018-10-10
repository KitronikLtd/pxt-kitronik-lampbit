# pxt-kitronik-lampbit

# Kitronik blocks for micro:bit

Blocks that support [Kitronik kits and shields for the micro:bit](https://www.kitronik.co.uk/microbit.html)
This package is for the [Kitronik LAMP:bit] (hhtp://www.kitronik.co.uk/5643)

## LAMP:bit

* read the light level

```blocks
LightVoltage = Kitronik_LAMPbit.lightLevel()
```

* turn on and off the lamp LED

```blocks
    if (LightVoltage <= 350) {
        
	Kitronik_LAMPbit.lampLightLED(Kitronik_LAMPbit.DisplayLamp.On)
    
    } 
    else {
        
	Kitronik_LAMPbit.lampLightLED(Kitronik_LAMPbit.DisplayLamp.Off)
    
    }
```
```

