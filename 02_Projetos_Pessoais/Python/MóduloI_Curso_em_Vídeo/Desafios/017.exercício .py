enunciado = 'Faça um programa que leia o comprimento do cateto oposto e do cateto adjacente de um triângulo retângulo, calcule e mostre o comprimento da hipotenusa ( Dois angulos de 90º) O quadrado da hipotenusa é a raiz quadrada da soma dos quadrados dos catetos'

co = float(input('Comprimento do cateto oposto'))
ca = float(input('Comprimento do cateto adjacente'))
hi = (co ** 2 + ca ** 2) **(1/2)
print('A hipotenusa vai medir {}'.format(hi))



import math
co = float(input('Comprimento do cateto oposto: '))
ca = float(input('Comprimento do cateto adjacente: '))
hi = math.hypot(co,ca)
print('A hipotenua vai medir {:.2f} '.format(hi))