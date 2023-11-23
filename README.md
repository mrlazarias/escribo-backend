1. Configuração Inicial:
Node.js e npm:
Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixá-lo em https://nodejs.org/, e o npm (gerenciador de pacotes do Node.js) será instalado automaticamente.

MongoDB Atlas:
Você deve ter uma conta no MongoDB Atlas e um cluster configurado. Obtenha a string de conexão para o seu cluster.

2. Clone o Repositório:
bash
Copy code
git clone https://github.com/mrlazarias/escribo-backend.git
cd autenticacao-api
3. Instale as Dependências:
bash
Copy code
npm install
4. Configuração do MongoDB Atlas:
Substitua 'SUA_STRING_DE_CONEXAO' no arquivo index.js pela string de conexão do seu cluster no MongoDB = mongodb+srv://escribo:vzpjVPFphK4oGfWC@cluster0.f4baenk.mongodb.net/?retryWrites=true&w=majority.

5. Executar a Aplicação Localmente:
bash
Copy code
npm start
A aplicação estará acessível em http://localhost:3000.

6. Uso da API:
Você pode usar uma ferramenta como o Postman, cURL ou até mesmo o navegador para testar os endpoints da API.

Endpoints:
Sign Up (Criação de Cadastro):

URL: http://localhost:3000/auth/signup
Método: POST
Corpo (JSON):
json
Copy code
{
  "nome": "Seu Nome",
  "email": "seu@email.com",
  "senha": "sua_senha",
  "telefones": [{"numero": "123456789", "ddd": "11"}]
}
Sign In (Autenticação):

URL: http://localhost:3000/auth/signin
Método: POST
Corpo (JSON):
json
Copy code
{
  "email": "seu@email.com",
  "senha": "sua_senha"
}
Buscar Usuário:

URL: http://localhost:3000/auth/usuario
Método: GET
Header: Authorization: Bearer SEU_TOKEN_JWT
