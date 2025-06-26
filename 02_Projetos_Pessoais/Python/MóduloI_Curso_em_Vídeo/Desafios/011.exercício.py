larg = float(input('Digite a largura da parede'))
alt = float(input('Digite a altura da parede'))

area = larg * alt
litros = area/2

print('Sua parede possuí {}m², então irá precisar de {} litros'.format(area, litros))