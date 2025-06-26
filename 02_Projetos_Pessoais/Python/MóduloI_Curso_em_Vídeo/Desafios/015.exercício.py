km = float(input('Quantos KM você andou? '))
dias = int(input('Quantos dias ele foi alugado? '))
pago = (dias *60) + (km *0.15)
print('O total a pagar é de R${:.2f}'.format(pago))