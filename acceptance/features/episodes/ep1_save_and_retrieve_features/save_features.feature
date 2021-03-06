Feature: Save features
  In order to not lose any of my work
  As a $FRONT_END_APP
  I want to be able to save the changes I make

  Scenario: Save a new feature
    Given $FRONT_END_APP has created the following new feature
      | name     | beneficiary | motivation           | expected behaviour                |
      | Addition | math idiot  | avoid silly mistakes | to be told the sum of two numbers |
    When I request to save the feature to cucumberly
    Then the response code is 201
    And the body has a "id" field

  Scenario: Cannot save a new feature - missing name
    Given $FRONT_END_APP has created the following new feature
      | beneficiary | motivation           | expected behaviour                |
      | math idiot  | avoid silly mistakes | to be told the sum of two numbers |
    When I request to save the feature to cucumberly
    Then the response code is 409
    And the body has a "error" field with data "missing name"
