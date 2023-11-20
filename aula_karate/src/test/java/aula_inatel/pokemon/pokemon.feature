Feature: Testando API Pokemon.

  Background: Executa antes de cada teste
    * def url_base = 'https://pokeapi.co/api/v2/'
    * def pokemon_versions = 43
    * def how_many_pokemons = 1292
    * def how_many_pokemon_species = 1017
    

  Scenario: Testando retorno.
    Given url 'https://pokeapi.co/api/v2/pokemon/pikachu'
    When method get
    Then status 200

  Scenario: Testando retorno people/1/ com informações inválidas.
    Given url 'https://pokeapi.co/api/v2/pokemon/chocolate'
    When method get
    Then status 404

  Scenario: Testando retorno pikachu e verificando o JSON.
    Given url url_base
    And path 'pokemon/pikachu'
    When method get
    Then status 200
    And match response.name == 'pikachu'
    And match $.name == 'pikachu'
    And match $.id == 25

  Scenario: Testando retorno pokemon red e entrando em um dos elementos do array de idiomas e testando retorno JSON
    Given url url_base
    And path 'version/1'
    When method get
    Then status 200
    And def idioma = $.names[5].language.url
    And print idioma
    And url idioma
    When method get
    Then status 200
    Then match $.name == 'es'
    And match $.id == 7

  Scenario: Testando quantas versões existem e testando nome de cada versão
    Given url url_base
    And path 'version?limit=43'
    When method get
    Then status 200
    And match $.count == pokemon_versions
    And match $.results[0].name == 'red'
    And match $.results[1].name == 'blue'
    And match $.results[2].name == 'yellow'
    And match $.results[3].name == 'gold'
    And match $.results[4].name == 'silver'
    And match $.results[5].name == 'crystal'
    And match $.results[6].name == 'ruby'
    And match $.results[7].name == 'sapphire'
    And match $.results[8].name == 'emerald'
    And match $.results[9].name == 'firered'
    And match $.results[10].name == 'leafgreen'
    And match $.results[11].name == 'diamond'
    And match $.results[12].name == 'pearl'
    And match $.results[13].name == 'platinum'
    And match $.results[14].name == 'heartgold'
    And match $.results[15].name == 'soulsilver'
    And match $.results[16].name == 'black'
    And match $.results[17].name == 'white'
    And match $.results[18].name == 'colosseum'
    And match $.results[19].name == 'xd'
    And match $.results[20].name == 'black-2'
    And match $.results[21].name == 'white-2'
    And match $.results[22].name == 'x'
    And match $.results[23].name == 'y'
    And match $.results[24].name == 'omega-ruby'
    And match $.results[25].name == 'alpha-sapphire'
    And match $.results[26].name == 'sun'
    And match $.results[27].name == 'moon'
    And match $.results[28].name == 'ultra-sun'
    And match $.results[29].name == 'ultra-moon'
    And match $.results[30].name == 'lets-go-pikachu'
    And match $.results[31].name == 'lets-go-eevee'
    And match $.results[32].name == 'sword'
    And match $.results[33].name == 'shield'
    And match $.results[34].name == 'the-isle-of-armor'
    And match $.results[35].name == 'the-crown-tundra'
    And match $.results[36].name == 'brilliant-diamond'
    And match $.results[37].name == 'shining-pearl'
    And match $.results[38].name == 'legends-arceus'
    And match $.results[39].name == 'scarlet'
    And match $.results[40].name == 'violet'
    And match $.results[41].name == 'the-teal-mask'
    And match $.results[42].name == 'the-indigo-disk'
    

  Scenario: Testando quantos pokemons existem e testando o nome do primeiro
    Given url url_base
    And path 'pokemon?limit=1'
    When method get
    Then status 200
    And match $.count == how_many_pokemons
    And match $.results[0].name == 'bulbasaur'


  Scenario: Testando quantos pokemon species existem e testando o nome do primeiro
    Given url url_base
    And path 'pokemon-species?limit=1'
    When method get
    Then status 200
    And match $.count == how_many_pokemon_species
    And match $.results[0].name == 'bulbasaur'