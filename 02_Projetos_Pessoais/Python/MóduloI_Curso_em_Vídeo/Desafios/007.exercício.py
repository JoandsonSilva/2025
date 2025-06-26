nome = input('Digite seu nome')
nota1 = float(input('Digite sua primeira nota'))
nota2 = float(input('Digite sua segunda nota'))

resultado = (nota1 + nota2)/2

print('Olá {:.1f}, a média das suas notas será {:.1f}'.format(nome, resultado))