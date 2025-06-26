Crie = 'um programa que leia o nome completo de uma pessoa e mostre - O nome com todos os letras maiúsculas, O nome com todas minúsculas. - Quantas letras ao todo( sem considerar os espaços). - Quantas letras tem o primeiro nome' 

nome = str(input('Digite seu nome completo: ')).strip()
print('Analisando seu nome...')
print('Seu nome em maíuscula é {}'.format(nome.upper()))
print('Seu nome em minúscula é {}'.format(nome.lower()))
print('Seu nome tem ao todo {}'.format(len(nome)-nome.count(' ')))
#print('Seu primeiro nome tem {} letras'.format(nome.find( ' ')))

separa = nome.split()
print('Seu primeiro nome é {} e ele tem {} letras'.format(separa[0], len(separa[0])))


