def calcular_media(*numeros):
    suma = sum(numeros)
    candidata = len(numeros)
    media = suma /candidata
    return media

print("Media:" , calcular_media(10,20, 30, 40))

def sumar_3(x):
    return x + 3

sumar = lambda x: x+3

print("Somar 3 a um numero: " , sumar(5))