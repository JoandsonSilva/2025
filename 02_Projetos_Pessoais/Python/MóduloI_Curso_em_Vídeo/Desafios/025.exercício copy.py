enunciado = 'Crie um programa que leia o nome de uma pessoa e diga se ela tem Silva no seu nome'
    
nome = str(input('Qual o seu nome completo? ')).strip()
print('Seu nome tem Silva? {}'.format('SILVA' in nome.upper()))