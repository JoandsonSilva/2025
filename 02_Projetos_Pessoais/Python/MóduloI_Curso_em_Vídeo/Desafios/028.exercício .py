enunciado = 'Escreva um programa que faça o computador "pensar em um número inteiro entre 0 e 5 e peça para o usuário tentar descobrir qual foi o número escolhido pelo computador' \
'O programa deverá escrever na tela se o usuário venceu ou perdeu'

from random import randint
from time import sleep
computador = randint(0,5) #Fz o computador "PENSAR"
print(' -=-' *20)
print('Vou pensar emum número entre 0 e 5. Tente adivinhar...')
print('-=-' *20)
jogador = int(input('Em que número eu pensei?' ))
print ('PROCESSANDO')
sleep(3)
if jogador == computador:
      print('PARABÉNS! Você conseguiiu me vender')
else:
      print('GANHEI! Eu pensei no número {} e não no  {}'.format(computador, jogador))
