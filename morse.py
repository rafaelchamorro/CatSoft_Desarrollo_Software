morse = {"a": ".-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".", "f": "..-.",
    "g": "--.", "h": "....", "i": "..", "j": "·---", "k": "-.-", "l": ".-..",
    "m": "--", "n": "-.", "ñ": "--.--", "o": "---", "p": ".__.", "q": "--.-",
    "r": ".-.", "s": "...", "t": "-", "u": "..-", "v": "...-", "w": ".--",
    "x": "-..-", "y": "-.--", "z": "--.."}
inv_morse = {v: k for k, v in morse.items()}
def mensaje_morse(mensaje_recibido):
    mensaje_recibido = mensaje_recibido.lower()
    mensaje = []

    for i in mensaje_recibido:
        if i == " ":
            mensaje.append("/")
        else:
            mensaje.append(morse[i])

    separator = " "
    mensaje_traducido = separator.join(mensaje)

    return mensaje_traducido

def morse_mensaje(mensaje_recibido):
    mensaje_recibido = mensaje_recibido.split(" ")
    mensaje = []
    for i in mensaje_recibido:
        if i == "/":
            mensaje.append(" ")
        elif i == " ":
            mensaje.append("")
        else:
            mensaje.append(inv_morse[i])

    separator = ""
    mensaje_traducido = separator.join(mensaje)

    return mensaje_traducido





