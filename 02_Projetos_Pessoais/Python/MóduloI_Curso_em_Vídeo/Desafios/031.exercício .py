enunciado = 'Desenvolva um program a que pergunte a distância de uma viagem em Km. Calcule o preço da passagem, cobrando 0,50 por Km para viagens de até 200km e R$0,45 para viagens mais longas'

distancia = float(input('Qual é a distância da sua viagem? '))
print('Você está prestes a começar uma viagem de {}km'.format(distancia))
if distancia <= 200:
    preco = distancia * 0.50
else:
    preco = distancia *0.45
print('E o preço da sua passagem seá de R${:.2f}'.format(preco))


distancia = float(input('Qual é a distância de sua viagem? '))
print('Você está presetes a começar uma viagem de {}km'.format(distancia))
preco = distancia * 0.50 if distancia <=200 else distancia * 0.45
print('E o preço da sua passagem será de R${:.2f}'.format(preco))