Feature: Retrieve book
  In order to resume my work
  As a $FRONT_END_APP
  I want to be able to retrieve my saved book

  Scenario: Retrieve a saved book
    Given $FRONT_END_APP has saved the following new book
      | name       |
      | Cucumberly |
    And the book has the id "book-id-alias-1"
    When I ask cucumberly to give me my book of features with id "book-id-alias-1"
    Then the response code is 200
    And the retrieved book is
      | name       |
      | Cucumberly |
