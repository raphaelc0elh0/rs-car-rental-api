# Carro

## Cadastro

### **RF** (Requisitos Funcionais)

- [x] Deve ser possível cadastrar um novo carro

### **RN** (Regras de Negócio)

- [x] Não deve ser possível cadastrar um carro com uma placa já existente
- [x] Deve ser cadastrado como disponível por padrão
- [ ] Somente administradores podem cadastrar carros (Controller)

## Alteração

### **RF** (Requisitos Funcionais)

- [ ] Deve ser possível alterar um novo carro

### **RN** (Regras de Negócio)

- [ ] Somente administradores podem alterar carros
- [ ] Não deve ser possível alterar a placa de um carro já cadastrado

## Listagem

### **RF** (Requisitos Funcionais)

- [ ] Deve ser possível listar todos os carros disponíveis
- [ ] Deve ser possível listar todos os carros disponíveis pelo nome da categoria
- [ ] Deve ser possível listar todos os carros disponíveis pelo nome da marca
- [ ] Deve ser possível listar todos os carros disponíveis pelo nome do carro

### **RN** (Regras de Negócio)

- [ ] Não é necessário estar logado no sistema para listar os carros

## Cadastro de especificações no carro

### **RF** (Requisitos Funcionais)

- [ ] Deve ser possível cadastrar uma especificação para um carro
- [ ] Deve ser possível listar todas as especificações
- [ ] Deve ser possível listar todos os carros

### **RN** (Regras de Negócio)

- [ ] Não deve ser possível cadastrar uma especificação para um carro não cadastrado
- [ ] Não deve ser possível cadastrar a mesma especificação para o mesmo carro
- [ ] Somente administradores podem cadastrar especificações

## Cadastro de imagens do carro

### **RF** (Requisitos Funcionais)

- [ ] Deve ser possível cadastrar imagens do carro
- [ ] Deve ser possível listar todos os carros

### **RNF** (Requisitos Não Funcionais)

- [ ] Utilizar o multer para upload de arquivos

### **RN** (Regras de Negócio)

- [ ] O usuário poderá cadastrar mais de uma imagem por carro
- [ ] Somente administradores podem cadastrar imagens dos carros

## Aluguel de carro

### **RF** (Requisitos Funcionais)

- [ ] Deve ser possível cadastrar um aluguel

### **RN** (Regras de Negócio)

- [ ] O aluguel deve ter duração minima de 24 horas
- [ ] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
- [ ] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
