Enunciado = 'Faça um programa que leia um número de 0 a 9999 e mostre a tela cada um dos dígitos separados.' \
'Ex: Digite um número 1834 - Unidade 4, dezena: 3 e centena: 8 milhar1'

num = int(input('Informe um número: '))
u = num // 1 % 10
d = num //10 % 10
c = num // 100 % 10
m = num //1000 %10
print( 'Analisando número{}'.format(num))
print('Unidade: {}'.format(u))
print('Dezena: {}'.format(d))
print( 'Centena: {}'.format(c))
print('Milhar: {}'.format(m))