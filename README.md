# GSW
Teste de seleção Angular + Java

## Teste GSW 

Desenvolva uma aplicação que simule a entrega de notas quando um cliente efetuar um saque em um caixa eletrônico. Os requisitos básicos são os seguintes:

Entregar o menor número de notas;

É possível sacar o valor solicitado com as notas disponíveis; Saldo do cliente será cadastro; Quantidade de notas infinito Notas disponíveis de R$ 100,00; R$ 50,00; R$ 20,00 e R$ 10,00 O Cliente não poderá entrar no negativo

**Exemplos:**

Valor do Saque: R$ 30,00 – Resultado Esperado: Entregar 1 nota de R$20,00 e 1 nota de R$ 10,00.

Valor do Saque: R$ 80,00 – Resultado Esperado: Entregar 1 nota de R$50,00 1 nota de R$ 20,00 e 1 nota de R$ 10,00

**Observações:**

Cadastro , Edição e Exclusão de Clientes ( saldo de cada cliente será cadastrado junto ) Saque garantir que apenas que no máximo 5 usuário realizem o saque ao mesmo tempo.


O sistema se baseia em dois formularios principais, administrativa e saque.

## Formulário Administrativo
Ao entrar com o login de administrador o sistema redireciona para a tela administrativa, onde o usuário poderá incluir, alterar ou excluir um cliente.

**Senha padrão**
```bash
login admin
senha root
```
## Formulário Saque
Após os clientes serem cadastrados na área administrativa, o usuario deverá entrar com o login do cliente, onde será redirecionado para a tela de Saque.

## Ferramentas utilizadas no Projeto
* Angular 4
* Materialize CSS
* Spring-boot
* (JWT) JSON Web Token
* PostgreSQL
* TDD

## PostgreSQL

```bash
username postgres
password teste123
```
## Angular
Inicializar o projeto com o comando **npm start** para rodar as configuração do arquivo proxy.conf.json  
