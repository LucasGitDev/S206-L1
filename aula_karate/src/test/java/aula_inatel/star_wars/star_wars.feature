Feature: Testando API StarWars.

  Scenario: Testando retorno people/1/.
        Given url 'https://swapi.dev/api/people/1/'
        When method get
        Then status 200

  Scenario: Testando retorno people/1/ com informações inválidas.
        Given url 'https://swapi.dev/api/people/1/1234'
        When method get
        Then status 404
        
  Scenario: Testando quais filmes existem.
        Given url 'https://swapi.dev/api/films/'
        When method get
        Then status 200
        Then match $.count == 6
        Then match $.results[0].title == 'A New Hope'
        Then match $.results[1].title == 'The Empire Strikes Back'
        Then match $.results[2].title == 'Return of the Jedi'
        Then match $.results[3].title == 'The Phantom Menace'
        Then match $.results[4].title == 'Attack of the Clones'
        Then match $.results[5].title == 'Revenge of the Sith'

      Scenario: Testando quais filmes existem com informações inválidas.
        Given url 'https://swapi.dev/api/films/1234'
        When method get
        Then status 404
        Then match $.detail == 'Not found'

      Scenario: Testando informações sobre o filme 1.
            Given url 'https://swapi.dev/api/films/1/'
            When method get
            Then status 200
            Then match $.title == 'A New Hope'
            Then match $.episode_id == 4
            Then match $.director == 'George Lucas'
            Then match $.producer == 'Gary Kurtz, Rick McCallum'
            Then match $.release_date == '1977-05-25'