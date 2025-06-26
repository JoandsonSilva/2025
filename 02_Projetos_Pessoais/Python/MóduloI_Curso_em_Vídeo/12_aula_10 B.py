nome = str(input('Qual é seu nome?'))
if nome =='Joandson':
    print('Que nome lindo você tem!')
else:
    print('Seu nome é tão normal!')
print('Bom dia, {}'.format(nome))


n1 = float(input('Digite a primeira nota'))
n2 = float(input('Digite a segunda nota'))
m= (n1+n2)/2
print ('A sua média foi {:.1f} '.format(m))

if m>=6.9:
    print(' Sua média foi boa" Parabéns!')
else:
    print(' Sua média foi ruim! Estude mais!)')


condicao = 'Aprendemos as condições simples, as condições compostas e as condições simplificadas'