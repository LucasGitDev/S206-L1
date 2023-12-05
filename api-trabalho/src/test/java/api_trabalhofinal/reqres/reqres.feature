Feature: Testando a API REQRES

  Background:
    * def baseUrl = 'https://reqres.in/api/'

  Scenario: Tenta registrar mas não envia a senha
    Given url baseUrl
    And path 'register'
    And request { "email": "email@email.com"}
    When method post
    Then status 400
    And match $.error contains 'Missing password'

  Scenario: Tenta logar mas não envia o email
    Given url baseUrl
    And path 'login'
    And request { "password": "123456"}
    When method post
    Then status 400
    And match $.error contains 'Missing email or username'


  Scenario: Listar apenas um usuário específico
    Given url baseUrl
    And path 'users/2'
    When method get
    Then status 200
    And match $.data.id == 2
    And match $.data.first_name == 'Janet'
    And match $.data.last_name == 'Weaver'
    And match $.data.email == 'janet.weaver@reqres.in'
    And match $.data.avatar == 'https://reqres.in/img/faces/2-image.jpg'

  Scenario: Listar todos os usuários da página 2
    Given url baseUrl
    And path 'users?page=2'
    When method get
    Then status 200
    And match $.page == 2
    And match $.per_page == 6
    And match $.total == 12
    And match $.total_pages == 2
    And match $.data[0].id == 7

  Scenario: Buscar por um usuário não existente
    Given url baseUrl
    And path 'users/23'
    When method get
    Then status 404
    And match $ == {}

  Scenario: Criar um usuário
    Given url baseUrl
    And path 'users'
    And request { "name": "morpheus", "job": "leader"}
    When method post
    Then status 201
    And match $.name == 'morpheus'
    And match $.job == 'leader'
    And match $.id == '#string'
    And match $.createdAt == '#regex [0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z'


    # Perguntas:

    # 1. Quantas suítes de testes você desenvolveu?
    #R: 1 suíte de testes

    # 2. Os testes desenvolvidos são manuais ou automatizados?
    #R: Automatizados

    # 3. Onde os testes se localizam na pirâmide apresentada?
    #R: Na meio da pirâmide, pois são testes de serviços

    # 4. Os testes desenvolvidos são funcionais ou não-funcionais?
    #R: Funcionais

    # 5. Alguns dos testes desenvolvidos são testes Fim-a-Fim(End-To-End)?
    #R: Não, pois um teste Fim-a-Fim testa todo o fluxo de uma aplicação considerando o contexto de negócio, e os testes desenvolvidos testam apenas os serviços

    # 6. O que se deve fazer para que os testes desenvolvidos funcionem em modo regressão?
    #R: Rodar os testes novamente e verificar se os resultados são os mesmos