Feature: Save features
  In order to not lose any of my work
  As a $FRONT_END_APP
  I want to be able to save the changes I make

  Background: Existing book and episode
    Given $FRONT_END_APP has saved the following new book
      | name       |
      | Cucumberly |
    And the book has the id "book-1"
    And $FRONT_END_APP has saved the following new episode as part of book "book-id-alias-1"
      | name                    |
      | The empire strikes back |
    And the episode has the id "episode-1"


  Scenario: Save a new feature
    Given $FRONT_END_APP has created the following new feature
      | name     | beneficiary | motivation           | expected behaviour                |
      | Addition | math idiot  | avoid silly mistakes | to be told the sum of two numbers |
    When I request to save the feature as part of book "book-1" and episode "episode-2"
    Then the response code is 201
    And the body has a "id" field


  Scenario: Cannot save a new feature - missing name
    Given $FRONT_END_APP has created the following new feature
      | beneficiary | motivation           | expected behaviour                |
      | math idiot  | avoid silly mistakes | to be told the sum of two numbers |
    When I request to save the feature as part of book "book-1" and episode "episode-1"
    Then the response code is 409
    And the body has a "error" field with data "missing name"
