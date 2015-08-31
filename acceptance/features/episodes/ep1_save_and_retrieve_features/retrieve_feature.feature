Feature: Retrieve features
  In order to resume my work
  As a $FRONT_END_APP
  I want to be able to retrieve my saved features

  Background: Existing book and episode
    Given $FRONT_END_APP has saved the following new book
      | name       |
      | Cucumberly |
    And the book has the id "book-1"
    And $FRONT_END_APP has saved the following new episode as part of book "book-1"
      | name                    |
      | The empire strikes back |
    And the episode has the id "episode-1"


  Scenario: Retrieve a saved feature
    Given $FRONT_END_APP has saved the following new feature as part of book "book-1" and episode "episode-1"
      | name     | beneficiary | motivation           | expected behaviour                |
      | Addition | math idiot  | avoid silly mistakes | to be told the sum of two numbers |
    When I ask cucumberly to give me my book of features with id "book-1"
    Then the response code is 200
    And one of the features for episode "episode-1" is
      | name     | beneficiary | motivation           | expected behaviour                |
      | Addition | math idiot  | avoid silly mistakes | to be told the sum of two numbers |
