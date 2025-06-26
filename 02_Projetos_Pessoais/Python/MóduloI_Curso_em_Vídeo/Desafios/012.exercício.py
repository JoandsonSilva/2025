produto = input('Qual o nome do produto?')
preco = float(input('Qual o preço do produto? R$'))
desconto = preco - (preco*5)/100 
print(' O produto {}, tem o valor de {:.2f}, com o desconto, o novo valor é R${:.2f}'.format(produto, preco, desconto))