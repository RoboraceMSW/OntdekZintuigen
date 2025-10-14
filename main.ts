/**
 * Kennismakingsprogramma om sensoren en actuatoren te leren kennen
 */
function setLkleur () {
    Lkleur += 1
    Lkleur = Lkleur % 7
    if (Lkleur == 0) {
        Maqueen_V5.setRgblLed(Maqueen_V5.DirectionType.Left, Maqueen_V5.CarLightColors.Green)
    } else if (Lkleur == 1) {
        Maqueen_V5.setRgblLed(Maqueen_V5.DirectionType.Left, Maqueen_V5.CarLightColors.Yellow)
    } else if (Lkleur == 2) {
        Maqueen_V5.setRgblLed(Maqueen_V5.DirectionType.Left, Maqueen_V5.CarLightColors.Blue)
    } else if (Lkleur == 3) {
        Maqueen_V5.setRgblLed(Maqueen_V5.DirectionType.Left, Maqueen_V5.CarLightColors.Purple)
    } else if (Lkleur == 4) {
        Maqueen_V5.setRgblLed(Maqueen_V5.DirectionType.Left, Maqueen_V5.CarLightColors.Cyan)
    } else if (Lkleur == 5) {
        Maqueen_V5.setRgblLed(Maqueen_V5.DirectionType.Left, Maqueen_V5.CarLightColors.White)
    } else if (Lkleur == 6) {
        Maqueen_V5.setRgblLed(Maqueen_V5.DirectionType.Left, Maqueen_V5.CarLightColors.Black)
    }
}
function IR_Actie () {
    IRcode = IR.IR_read()
    leesknop()
    IRbuffer.pop()
    Bufstat.pop()
    CheckControlCode()
    ToonKnop()
}
function LichtLawaai () {
    music.setVolume(200)
    dB = input.soundLevel()
    Licht = Maqueen_V5.readLightIntensity(Maqueen_V5.DirectionType2.Left) + Maqueen_V5.readLightIntensity(Maqueen_V5.DirectionType2.Right)
    if (dB > 254) {
        music.play(music.builtinPlayableSoundEffect(soundExpression.soaring), music.PlaybackMode.UntilDone)
    } else if (dB > 240) {
        music.play(music.builtinPlayableSoundEffect(soundExpression.giggle), music.PlaybackMode.UntilDone)
    } else if (dB > 230) {
        music.play(music.builtinPlayableSoundEffect(soundExpression.twinkle), music.PlaybackMode.UntilDone)
    } else if (dB > 220) {
        music.play(music.builtinPlayableSoundEffect(soundExpression.yawn), music.PlaybackMode.UntilDone)
    } else {
    	
    }
    led.plotBarGraph(
    Licht,
    0
    )
    basic.pause(50)
}
function CheckControlCode () {
    Buf0 = Bufstat[0]
    Buf1 = Bufstat[1]
    Buf2 = Bufstat[2]
    Buf3 = Bufstat[3]
    if (Buf3 == "ster" && (Buf2 == "num" && (Buf1 == "num" && Buf0 == "hekje"))) {
        IsSwitchMode = 1
        ishashcode = 0
        isnum = 0
        iscontrolcode = 0
    } else if (Buf1 == "hekje" && Buf0 == "num") {
        ishashcode = 1
        IsSwitchMode = 0
        isnum = 0
        iscontrolcode = 0
    } else if (Buf0 == "num") {
        isnum = 1
        ishashcode = 0
        IsSwitchMode = 0
        iscontrolcode = 0
    } else if (Buf0 == "ctrl") {
        iscontrolcode = 1
        isnum = 0
        ishashcode = 0
        IsSwitchMode = 0
    }
    if (IsSwitchMode && (IRbuffer[1] == "1" && IRbuffer[2] == "1")) {
        mode = "verken"
        music.play(music.stringPlayable("C C E E G G C5 C5 ", 800), music.PlaybackMode.UntilDone)
        ClearBufStat()
        basic.showIcon(IconNames.SmallSquare)
        basic.showIcon(IconNames.Square)
    } else if (IsSwitchMode && (IRbuffer[1] == "2" && IRbuffer[2] == "2")) {
        mode = "rijden"
        ClearBufStat()
        music.play(music.stringPlayable("C5 C5 G G E E C C ", 800), music.PlaybackMode.UntilDone)
        basic.showIcon(IconNames.SmallDiamond)
        basic.showIcon(IconNames.Diamond)
    }
    IsSwitchMode = 0
}
function Splash () {
    music.play(music.tonePlayable(294, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
    basic.showLeds(`
        . # # . .
        . # . # .
        . # # . .
        . # . # .
        . # . # .
        `)
    music.play(music.tonePlayable(440, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
    basic.showLeds(`
        . . # . .
        . # . # .
        . # . # .
        . # . # .
        . . # . .
        `)
    music.play(music.tonePlayable(494, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
    basic.showLeds(`
        . # # . .
        . # . # .
        . # # . .
        . # . # .
        . # # . .
        `)
    music.play(music.tonePlayable(440, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
    basic.showLeds(`
        . . # . .
        . # . # .
        . # . # .
        . # . # .
        . . # . .
        `)
    music.play(music.tonePlayable(0 + 0, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
    basic.showLeds(`
        . # # . .
        . # . # .
        . # # . .
        . # . # .
        . # . # .
        `)
    music.play(music.tonePlayable(440, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
    basic.showLeds(`
        . . # . .
        . # . # .
        . # # # .
        . # . # .
        . # . # .
        `)
    music.play(music.tonePlayable(523, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
    basic.showLeds(`
        . . # # .
        . # . . .
        . # . . .
        . # . . .
        . . # # .
        `)
    music.play(music.tonePlayable(659, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
    basic.showLeds(`
        . # # # .
        . # . . .
        . # # . .
        . # . . .
        . # # # .
        `)
    music.play(music.tonePlayable(659, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
    basic.clearScreen()
    basic.pause(1000)
    music.play(music.stringPlayable("C C E E G G C5 C5 ", 800), music.PlaybackMode.UntilDone)
    basic.showIcon(IconNames.SmallSquare)
    basic.showIcon(IconNames.Square)
}
function wave () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        # # . . .
        . # . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        # # . . .
        . . # . .
        . . # . .
        `)
    basic.showLeds(`
        . . . . .
        # # . . .
        . . # . .
        . . . # .
        . . . # .
        `)
    basic.showLeds(`
        # # # . .
        . . . # .
        . . . . #
        . . . . #
        . . . . #
        `)
    basic.showLeds(`
        . . . # .
        . . . . #
        . . . . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        # . # . .
        # . # # #
        # # . # .
        . . . . #
        . . . # #
        `)
}
IR.IR_callbackUser(function () {
    IR_Actie()
})
function ToonKnop () {
    music.stopAllSounds()
    if (mode == "verken" && (isnum || iscontrolcode)) {
        Afstandmode = false
        LichtLawaaiMode = false
        if (IRcode == Afstandsbediening.een()) {
            basic.showNumber(1)
        } else if (IRcode == Afstandsbediening.twee()) {
            basic.showNumber(2)
        } else if (IRcode == Afstandsbediening.drie()) {
            basic.showNumber(3)
        } else if (IRcode == Afstandsbediening.vier()) {
            basic.showNumber(4)
        } else if (IRcode == Afstandsbediening.vijf()) {
            basic.showNumber(5)
        } else if (IRcode == Afstandsbediening.zes()) {
            basic.showNumber(6)
        } else if (IRcode == Afstandsbediening.zeven()) {
            basic.showNumber(7)
        } else if (IRcode == Afstandsbediening.acht()) {
            basic.showNumber(8)
        } else if (IRcode == Afstandsbediening.negen()) {
            basic.showNumber(9)
        } else if (IRcode == Afstandsbediening.nul()) {
            basic.showNumber(0)
        } else if (IRcode == Afstandsbediening.op()) {
            basic.showArrow(ArrowNames.North)
        } else if (IRcode == Afstandsbediening.neer()) {
            basic.showArrow(ArrowNames.South)
        } else if (IRcode == Afstandsbediening.links()) {
            basic.showArrow(ArrowNames.East)
        } else if (IRcode == Afstandsbediening.rechts()) {
            basic.showArrow(ArrowNames.West)
        } else if (IRcode == Afstandsbediening.ster()) {
        	
        } else if (IRcode == Afstandsbediening.hekje()) {
        	
        } else if (IRcode == Afstandsbediening.ok()) {
            basic.showIcon(IconNames.Yes)
        } else {
        	
        }
    } else if (mode == "verken" && ishashcode) {
        if (IRbuffer[0] == "1") {
            KoplampL = !(KoplampL)
            if (KoplampL) {
                Maqueen_V5.setRgblLed(Maqueen_V5.DirectionType.Left, Maqueen_V5.CarLightColors.Red)
            } else {
                Maqueen_V5.setRgbOff(Maqueen_V5.DirectionType.Left)
            }
        } else if (IRbuffer[0] == "2") {
            KoplampR = !(KoplampR)
            if (KoplampR) {
                Maqueen_V5.setRgblLed(Maqueen_V5.DirectionType.Right, Maqueen_V5.CarLightColors.Red)
            } else {
                Maqueen_V5.setRgbOff(Maqueen_V5.DirectionType.Right)
            }
        } else if (IRbuffer[0] == "3") {
            setLkleur()
        } else if (IRbuffer[0] == "4") {
            setRkleur()
        } else if (IRbuffer[0] == "5") {
            Koplampdisco = !(Koplampdisco)
            if (Koplampdisco) {
                Maqueen_V5.setRgbchange(Maqueen_V5.DirectionType.All, Maqueen_V5.SpeedGrade.speed5)
            } else {
                Maqueen_V5.setRgbOff(Maqueen_V5.DirectionType.All)
            }
        } else if (IRbuffer[0] == "6") {
            soundface()
        } else if (IRbuffer[0] == "7") {
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CW, 130)
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CCW, 130)
            basic.pause(1000)
            Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
        } else if (IRbuffer[0] == "8") {
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CCW, 130)
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CW, 130)
            basic.pause(1000)
            Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
        } else if (IRbuffer[0] == "9") {
            Afstandmode = !(Afstandmode)
            wave()
        } else if (IRbuffer[0] == "0") {
            LichtLawaaiMode = !(LichtLawaaiMode)
            basic.showLeds(`
                # . . . .
                # . . . .
                # # . # .
                . . . # .
                . . . # #
                `)
        }
    } else if (mode == "rijden") {
        if (IRbuffer[0] == "^") {
            vooruit = !(vooruit)
            if (vooruit) {
                Maqueen_V5.motorRun(Maqueen_V5.Motors.All, Maqueen_V5.Dir.CW, 70)
            } else {
                Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
            }
        }
        if (IRbuffer[0] == "v") {
            achteruit = !(achteruit)
            if (achteruit) {
                Maqueen_V5.motorRun(Maqueen_V5.Motors.All, Maqueen_V5.Dir.CCW, 70)
            } else {
                Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
            }
        }
        if (IRbuffer[0] == "<") {
            LinksAf = !(LinksAf)
            if (LinksAf) {
                Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CW, 20)
                Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CW, 100)
            } else {
                Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
            }
        }
        if (IRbuffer[0] == ">") {
            RechtsAf = !(RechtsAf)
            if (RechtsAf) {
                Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CW, 100)
                Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CW, 20)
            } else {
                Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
            }
        }
        if (IRbuffer[0] == "OK") {
            volglijn = !(volglijn)
            Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
            if (volglijn) {
                basic.showLeds(`
                    # . # . .
                    # . # . .
                    . # . # .
                    . . . # .
                    . . . # #
                    `)
                Maqueen_V5.patrolling(Maqueen_V5.Patrolling.ON)
            } else {
                Maqueen_V5.patrolling(Maqueen_V5.Patrolling.OFF)
                basic.clearScreen()
            }
        }
    } else {
    	
    }
}
function init () {
    Maqueen_V5.I2CInit()
    serial.redirectToUSB()
    IR.IR_init()
    strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
    Afstandsbediening.init_rc_hx1838()
    input.setAccelerometerRange(AcceleratorRange.OneG)
    IRbuffer = [
    "",
    "",
    "",
    ""
    ]
    Bufstat = [
    "",
    "",
    "",
    ""
    ]
    isnum = 0
    iscontrolcode = 0
    ishashcode = 0
    IsSwitchMode = 0
    mode = "verken"
    Splash()
}
function setRkleur () {
    Rkleur += 1
    Rkleur = Rkleur % 7
    if (Rkleur == 0) {
        Maqueen_V5.setRgblLed(Maqueen_V5.DirectionType.Right, Maqueen_V5.CarLightColors.Green)
    } else if (Rkleur == 1) {
        Maqueen_V5.setRgblLed(Maqueen_V5.DirectionType.Right, Maqueen_V5.CarLightColors.Yellow)
    } else if (Rkleur == 2) {
        Maqueen_V5.setRgblLed(Maqueen_V5.DirectionType.Right, Maqueen_V5.CarLightColors.Blue)
    } else if (Rkleur == 3) {
        Maqueen_V5.setRgblLed(Maqueen_V5.DirectionType.Right, Maqueen_V5.CarLightColors.Purple)
    } else if (Rkleur == 4) {
        Maqueen_V5.setRgblLed(Maqueen_V5.DirectionType.Right, Maqueen_V5.CarLightColors.Cyan)
    } else if (Rkleur == 5) {
        Maqueen_V5.setRgblLed(Maqueen_V5.DirectionType.Right, Maqueen_V5.CarLightColors.White)
    } else if (Rkleur == 6) {
        Maqueen_V5.setRgblLed(Maqueen_V5.DirectionType.Right, Maqueen_V5.CarLightColors.Black)
    }
}
function soundface () {
    SFcount = SFcount % 4
    if (SFcount == 0) {
        basic.showLeds(`
            # . . . #
            . . # . .
            . . # . .
            # . . . #
            . # # # .
            `)
        music.play(music.stringPlayable("C D E F G - - - ", 800), music.PlaybackMode.UntilDone)
    } else if (SFcount == 1) {
        basic.showLeds(`
            # . . . #
            . . # . .
            # . # . #
            # . . . #
            . # # # .
            `)
        music.play(music.stringPlayable("D E F G A B C5 - ", 800), music.PlaybackMode.UntilDone)
    } else if (SFcount == 2) {
        basic.showLeds(`
            # . . . #
            . . # . .
            . . . . .
            . # # # .
            # . . . #
            `)
        music.play(music.stringPlayable("A G F E D C - - ", 800), music.PlaybackMode.UntilDone)
    } else if (SFcount == 3) {
        basic.showLeds(`
            # . . . #
            . . . . .
            . # # # .
            # . . . #
            . # # # .
            `)
        music.play(music.stringPlayable("C C5 C C5 C C5 C - ", 300), music.PlaybackMode.UntilDone)
    }
    SFcount += 1
}
function AfstandToon () {
    afstand = Maqueen_V5.Ultrasonic()
    toon = 2000 - afstand * 75
    if (afstand < 20) {
        toon = 2000 - afstand * 75
        music.ringTone(toon)
    } else {
        music.stopAllSounds()
    }
}
function leesknop () {
    if (IRcode == Afstandsbediening.ster()) {
        IRbuffer.unshift("*")
        Bufstat.unshift("ster")
    } else if (IRcode == Afstandsbediening.hekje()) {
        IRbuffer.unshift("#")
        Bufstat.unshift("hekje")
    } else if (IRcode == Afstandsbediening.een()) {
        IRbuffer.unshift("1")
        Bufstat.unshift("num")
    } else if (IRcode == Afstandsbediening.twee()) {
        IRbuffer.unshift("2")
        Bufstat.unshift("num")
    } else if (IRcode == Afstandsbediening.drie()) {
        IRbuffer.unshift("3")
        Bufstat.unshift("num")
    } else if (IRcode == Afstandsbediening.vier()) {
        IRbuffer.unshift("4")
        Bufstat.unshift("num")
    } else if (IRcode == Afstandsbediening.vijf()) {
        IRbuffer.unshift("5")
        Bufstat.unshift("num")
    } else if (IRcode == Afstandsbediening.zes()) {
        IRbuffer.unshift("6")
        Bufstat.unshift("num")
    } else if (IRcode == Afstandsbediening.zeven()) {
        IRbuffer.unshift("7")
        Bufstat.unshift("num")
    } else if (IRcode == Afstandsbediening.acht()) {
        IRbuffer.unshift("8")
        Bufstat.unshift("num")
    } else if (IRcode == Afstandsbediening.negen()) {
        IRbuffer.unshift("9")
        Bufstat.unshift("num")
    } else if (IRcode == Afstandsbediening.nul()) {
        IRbuffer.unshift("0")
        Bufstat.unshift("num")
    } else if (IRcode == Afstandsbediening.op()) {
        IRbuffer.unshift("^")
        Bufstat.unshift("ctrl")
    } else if (IRcode == Afstandsbediening.neer()) {
        IRbuffer.unshift("v")
        Bufstat.unshift("ctrl")
    } else if (IRcode == Afstandsbediening.links()) {
        IRbuffer.unshift("<")
        Bufstat.unshift("ctrl")
    } else if (IRcode == Afstandsbediening.rechts()) {
        IRbuffer.unshift(">")
        Bufstat.unshift("ctrl")
    } else if (IRcode == Afstandsbediening.ok()) {
        IRbuffer.unshift("OK")
        Bufstat.unshift("ctrl")
    }
    music.play(music.tonePlayable(988, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
}
function average (afstand: number) {
    let lijst: number[] = []
    lijst.pop()
    lijst.unshift(toon)
    som = 0
    for (let index2 = 0; index2 <= 9; index2++) {
        som = som + lijst[index2]
    }
    avtone = som / 10
}
function ClearBufStat () {
    Bufstat[0] = ""
    Bufstat[1] = ""
    Bufstat[2] = ""
    Bufstat[3] = ""
}
let avtone = 0
let som = 0
let toon = 0
let afstand = 0
let SFcount = 0
let Rkleur = 0
let strip: neopixel.Strip = null
let volglijn = false
let RechtsAf = false
let LinksAf = false
let achteruit = false
let vooruit = false
let Koplampdisco = false
let KoplampR = false
let KoplampL = false
let LichtLawaaiMode = false
let Afstandmode = false
let mode = ""
let iscontrolcode = 0
let isnum = 0
let ishashcode = 0
let IsSwitchMode = 0
let Buf3 = ""
let Buf2 = ""
let Buf1 = ""
let Buf0 = ""
let Licht = 0
let dB = 0
let Bufstat: string[] = []
let IRbuffer: string[] = []
let IRcode = 0
let Lkleur = 0
init()
basic.forever(function () {
    while (mode == "verken" && Afstandmode) {
        AfstandToon()
    }
})
basic.forever(function () {
    while (mode == "verken" && LichtLawaaiMode) {
        LichtLawaai()
    }
})
basic.forever(function () {
    while (mode == "rijden" && volglijn) {
        if (Maqueen_V5.Ultrasonic() < 7) {
            volglijn = false
            Maqueen_V5.patrolling(Maqueen_V5.Patrolling.OFF)
            Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
        }
    }
})
