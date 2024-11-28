def Media(nome):
    soma = 0
    # Abre o arquivo para leitura
    with open(nome, 'r') as arquivo:
        # Lê cada linha do arquivo
        for linha in arquivo:
            # Converte a linha para um número e adiciona à soma
            soma += float(linha.strip())  # Usando float para permitir valores decimais

    # Exibe o resultado
    print(f'A média dos valores de {nome} é: {soma/300}')


Media('tcp-experiment.txt')
Media('udp-experiment.txt')
Media('http-experiment.txt')

import pandas as pd
import matplotlib.pyplot as plt

def Csv_Generator(nome, protocol):
    with open(nome, 'r') as arquivo:
        # Lê todas as linhas e remove espaços em branco
        dados = [linha.strip() for linha in arquivo.readlines()]
    # Converte os dados para inteiros
    dados = list(map(int, dados))
    # Cria um novo DataFrame com duas colunas
    # As linhas são organizadas em pares (x, y)
    dados_formatados = [(i, dados[i]) for i in range(0, len(dados))]
    # Cria o DataFrame
    df = pd.DataFrame(dados_formatados, columns=['X', 'Y'])
    # Salva o DataFrame em um arquivo CSV
    df.to_csv(f'dados_convertidos_{protocol}.csv', index=False)

    print(f'Arquivo CSV {protocol} gerado com sucesso!')

#Csv_Generator('tcp-experiment.txt', 'tcp')
#Csv_Generator('udp-experiment.txt', 'udp')
#Csv_Generator('http-experiment.txt', 'http')


# Ler os dados de cada arquivo
data1 = pd.read_csv('dados_convertidos_tcp.csv')
data2 = pd.read_csv('dados_convertidos_udp.csv')
data3 = pd.read_csv('dados_convertidos_http.csv')

# Criar o gráfico
plt.figure(figsize=(10, 6))

# Plotar cada linha
plt.plot(data1['X'], data1['Y'], label='TCP', marker='o')
plt.plot(data2['X'], data2['Y'], label='UDP', marker='s')
plt.plot(data3['X'], data3['Y'], label='HTTP', marker='d')

# Adicionar rótulos e título
plt.xlabel('Eixo X')
plt.ylabel('Eixo Y')
plt.title('Gráfico de Linhas')
plt.legend()  # Adiciona a legenda
plt.grid()    # Adiciona grade para melhor visualização

# Exibir o gráfico
plt.tight_layout()
plt.show()

# Lê os dados do arquivo original
#with open('experiment-tcp.txt', 'r') as arquivo:
    # Lê todas as linhas e remove espaços em branco
#    dados = [linha.strip() for linha in arquivo.readlines()]

# Converte os dados para inteiros
#dados = list(map(int, dados))

# Cria um novo DataFrame com duas colunas
# As linhas são organizadas em pares (x, y)
#dados_formatados = [(dados[i], dados[i + 1]) for i in range(0, len(dados) - 1, 2)]

# Cria o DataFrame
#df = pd.DataFrame(dados_formatados, columns=['Coluna1', 'Coluna2'])

# Salva o DataFrame em um arquivo CSV
#df.to_csv('dados_convertidos_tcp.csv', index=False)

#print('Arquivo CSV gerado com sucesso!')