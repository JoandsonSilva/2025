enunciado = "Escreva um programa que leia a velocidade de um carro. " \
"sE ELA ULTRAPASSAR 80KM/H. Mostre uma mensagem dizendo que ele foi multado. A multa vai custar R7,00 por cada KM rodado" \
"CONDIÇÃO SIMPLES IF"


velocidade = float(input('Qual é a velocidade atual do carro? '))
if velocidade > 80:
    print('Multado! Você excedeu o limite permitido que é de 80km/h')
    multa = (velocidade - 80) *7
    print('Você deve pagar uma multa de R${:.2f}!'.format(multa) )
print('Tenha um bom dia! Dirija com segurança!')