cadeira = 'Manipulando Cadeias de Texto'
explicacao = 'Toda cadeia de catactere está entre aspas simples ou aspas dupas - ' \
' atribuião de dados -  cada espaço recebe um indice, começando de 0 até o último caracteres - Ou seja x espaços na memória - ' \
'Operações:  Fatiamento: pegar pedaços dela' \
'Primeiro número de onde começa 0 - Segundo número final e tereceiro número, vai pulando de x em x a partir do número que você coloar - exemplo 3 - Regras [4:6:2]' \
'Análise de caractere' \
'Transformação: ' \
'Divisão entre os espaços: split()' \
'Junção: join'-'join.(frase)'


frase= 'Curso em vídeo Python'
print(frase[9::3])

print(len(frase))
print(frase.count('o',0,13))
print(frase.find('deo'))

print(frase.find('Android'))
print('Curso ' in frase)


print(frase.replace('Python','Android'))
print(frase.upper())
print(frase.lower())
print(frase.capitalize())
print(frase.title())
print(frase.strip())
print(frase.rstrip())
print(frase.lstrip())
print(frase.split())
print('-'.join(frase))