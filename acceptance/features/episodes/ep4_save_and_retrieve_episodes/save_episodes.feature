Feature: Save an episode
  In order to resume my work
  As a $FRONT_END_APP
  I want to be able to retrieve my book of features with all episodes

  Scenario: Save an episode
    Given $FRONT_END_APP has saved the following new book
      | name       |
      | Cucumberly |
    And the book has the id "book-id-alias-1"
    And $FRONT_END_APP has created the following new episode
      | name                    |
      | The empire strikes back |
    When I request to save the episode as part of book "book-id-alias-1" to cucumberly
    Then the response code is 201
    And the body has a "id" field
