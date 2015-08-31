Feature: Save a book
  In order to resume my work
  As a $FRONT_END_APP
  I want to be able to retrieve my book of features

  Scenario: Save a book
    Given $FRONT_END_APP has created the following new book
      | name       |
      | Cucumberly |
    When I request to save the book to cucumberly
    Then the response code is 201
    And the body has a "id" field
