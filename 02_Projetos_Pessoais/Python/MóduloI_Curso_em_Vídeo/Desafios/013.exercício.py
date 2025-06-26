nome = input(' Digite o seu nome ')
sal = float(input(' Digite seu salário: R$ '))
aumento = sal+(sal*15)/100
print('Olá {} , o seu novo salário é R$ {:.2f}'.format(nome, aumento))