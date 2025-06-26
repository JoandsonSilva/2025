""" codigoCor= '\033[0;33;44m]'
estilos = '0 = None / 1 = Bold / 4 = Underline / 7 = Negative'
texto = '30, 31,32, 33, 34, 35, 36 ,37'
back = '40, 41, 42, 43, 44, 45, 46, 47'

print('\033[0;33;44mOlá, Mundo!\033[m')
  """

nome = 'Joandson'
cores = {'lista':'\033[m', 'azul':'\033[34m]','amarelo':'\033[33m]','pretoebranco':'\033[7;30m'}
print('Olá! Muito prazer em te conhecer, {} {} {}!!'.format(cores['pretoebranco'], nome, cores))