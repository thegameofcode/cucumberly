Feature: Retrieve episode
  In order to resume my work
  As a $FRONT_END_APP
  I want to be able to retrieve my saved episodes

  Scenario: Retrieve a saved scenario
    Given $FRONT_END_APP has saved the following new book
      | name       |
      | Cucumberly |
    And the book has the id "book-id-alias-1"
    And $FRONT_END_APP has saved the following new episode as part of book "book-id-alias-1"
      | name                    |
      | The empire strikes back |
    And the episode has the id "episode-id-alias-1"
    When I ask cucumberly to give me my book of features with id "book-id-alias-1"
    Then the response code is 200
    And the episode with id "episode-id-alias-1" is
      | name                    |
      | The empire strikes back |
