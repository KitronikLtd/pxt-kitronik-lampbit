### @activities true
### @explicitHints true

# LAMP:bit Traffic Light Sequence

## Introduction
### Introduction @unplugged
Learn how to use the Kitronik LAMP:bit and code for the light to turn on and off depending on light levels with a BBC micro:bit. 

![Lampbit switched on](https://KitronikLtd.github.io/pxt-kitronik-lampbit/assets/lamp-bit-light-on.png)

## Assembly
### Step 1 @unplugged
If not already done, attach the BBC micro:bit onto LAMP:bit.  Click [Here](https://resources.kitronik.co.uk/pdf/5643-kitronik-lamp-bit-microbit-datasheet.pdf) is a link to the datasheet to guide you. 


### Step 2
To make sure the LAMP:bit and BBC micro:bit are working.  The first part of code creating will turn all the lights on and off on buttons presses.  Add ``||input:onButtonA||`` and a Add ``||input:onButtonB||``

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
	
})

input.onButtonPressed(Button.B, function () {
	
})
```

### Step 3
From the LAMP:bit blocks, add into the ``||input:onButtonA||`` bracket a ``||Kitronik_LAMPbit.turn lamp light||`` block and set it to "on". Add into the ``||input:onButtonB||`` bracket a ``||Kitronik_LAMPbit.turn lamp light||`` block and set it to "off".
#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    Kitronik_LAMPbit.lampLightLED(Kitronik_LAMPbit.DisplayLamp.On)
})
input.onButtonPressed(Button.B, function () {
    Kitronik_LAMPbit.lampLightLED(Kitronik_LAMPbit.DisplayLamp.Off)
})
```

### Step 4
Connect your BBC micro:bit and click ``|Download|``.  Once programmed, power the BBC micro:bit and press button A and B to see if the lights turn on and off.


### Lights are working @unplugged
Our lights and assembly are working. Great! Lets start the next step to coding the light to respond to light levels using the Analogue to Digital Converter (ADC) from the BBC micro:bit.
The ADC converts analogue voltages to numbers. This number can range from 0 to 1023, and the voltage from the phototransistor (located at the top of the LAMP:bit) goes from 0V to 3V. 
For example when mapped across, a value of 3V from the phototransistor goes through the ADC and becomes 1023 in your code.


### Step 5
To continously read the light level, our code will be using the ``||basic:forever||`` bracket.  The previously used code in the ``||input:onButtonA||`` and ``||input:onButtonB||`` can be removed.
#### ~ tutorialhint
```blocks
basic.forever(function () {

})
```

### Step 6
Insert an ``||logic:if else||`` into the ``||basic:forever||`` bracket.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (true) {
    	
    } else {
    	
    }
})
```

### Step 7
Withing the if statement brackets we want to the light to turn on when the condition is met, else to turn off.condition. Insert a ``||Kitronik_LAMPbit.turn lamp light||`` in to each bracket, set the top block to "on" the other to "off"
#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (true) {
    	Kitronik_LAMPbit.lampLightLED(Kitronik_LAMPbit.DisplayLamp.On)
    } else {
    	Kitronik_LAMPbit.lampLightLED(Kitronik_LAMPbit.DisplayLamp.Off)
    }
})
```

### Step 8
Now we need to make the condition statement for our if statement.  This will need a compare block, insert the ``||logic:less than||`` into the ``||logic:if||`` block
#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (0 < 0) {
        Kitronik_LAMPbit.lampLightLED(Kitronik_LAMPbit.DisplayLamp.On)
    } else {
        Kitronik_LAMPbit.lampLightLED(Kitronik_LAMPbit.DisplayLamp.Off)
    }
})
```

### Step 9
Next will need to read the light level and compare it to a set level. Place in the first half of the if condition ``||Kitronik_LAMPbit.read light level||``.  
This read light level block will take an ADC reading and give us a number between 0 and 1023.  To begin with we will set our compare value to half of this range at 512.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (Kitronik_LAMPbit.lightLevel() < 512) {
        Kitronik_LAMPbit.lampLightLED(Kitronik_LAMPbit.DisplayLamp.On)
    } else {
        Kitronik_LAMPbit.lampLightLED(Kitronik_LAMPbit.DisplayLamp.Off)
    }
})
```

### Step 10
Connect your BBC micro:bit and click ``|Download|`` and try out the code.  Once programmed cover the phototransistor and see if the lamp turns on and off.


### Light responding to phototransistor @unplugged
So the light is switching on and off with changing of light levels.  That is awesome! 
Try this, if you hold your hand over the phototransistor in a certain distance away can you get the LED flash rapidly?  This is where the ADC reading is switching between 511 and 512 creating this effect.
![Question](https://KitronikLtd.github.io/pxt-kitronik-stopbit/assets/question-mark.png)

### Introduction to dead band @unplugged
So how can we stop this flashing/flickering of the LED when it turns on and off?  The best way around this is to have the LED turn on and turn off at different light levels.
For example the lights will turn on at an ADC reading of 550 but will not turn off till an ADC reading of 475.  This band between 475 to 550 so whats known as a deadband where nothing happens. Sometimes also known as a dead zone or neutral zone.
  
### Step 11
To implement the deadband we require an ``||logic:if else if||`` block will be used (from the ``||logic:Logic||`` category) to compare the reading with some preset temperature boundaries.
Add in an ``||logic:if||`` block to the ``||basic:forever||`` loop and press the ``||logic:+||`` icon at the bottom of the block 3 times. This will add 2 ``||logic:else if||`` statements and an ``||logic:else||`` statement - remove the ``||logic:else||`` by pressing the ``||logic:-||``.
Place the ``||Kitronik_LAMPbit.turn lamp light||`` into the ``||logic:else if||`` bracket.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (Kitronik_LAMPbit.lightLevel() < 512) {
        Kitronik_LAMPbit.lampLightLED(Kitronik_LAMPbit.DisplayLamp.On)
    } else if (false) {
        Kitronik_LAMPbit.lampLightLED(Kitronik_LAMPbit.DisplayLamp.Off)
    }
})
```

### Step 12
Copy the same if condition and place into the ``||logic:else if||``.  This time we need the condition to be ``||logic:greater than||``
#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (Kitronik_LAMPbit.lightLevel() < 512) {
        Kitronik_LAMPbit.lampLightLED(Kitronik_LAMPbit.DisplayLamp.On)
    } else if (Kitronik_LAMPbit.lightLevel() > 512) {
        Kitronik_LAMPbit.lampLightLED(Kitronik_LAMPbit.DisplayLamp.Off)
    }
})
```

### Step 13
Currently we have the same value to compare against.  Lets decrease the value when the light turns on to 475.  Now increase the value the light turns off to 550.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (Kitronik_LAMPbit.lightLevel() < 512) {
        Kitronik_LAMPbit.lampLightLED(Kitronik_LAMPbit.DisplayLamp.On)
    } else if (Kitronik_LAMPbit.lightLevel() > 512) {
        Kitronik_LAMPbit.lampLightLED(Kitronik_LAMPbit.DisplayLamp.Off)
    }
})
```

### Step 14
Connect your BBC micro:bit and click ``|Download|``.  Once programmed, see if you can make the light flicker.

### LAMP:bit Tutorial Complete @unplugged
Was there any flickering? We have been successful added a deadband and reading light levels within our code. We have completed the tutorial.  If you wish to know more on the Kitronik LAMP:bit visit
http://www.kitronik.co.uk/5643