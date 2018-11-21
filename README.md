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

## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)


```package
pxt-kitronik-lampbit=github:KitronikLtd/pxt-kitronik-lampbit
```

