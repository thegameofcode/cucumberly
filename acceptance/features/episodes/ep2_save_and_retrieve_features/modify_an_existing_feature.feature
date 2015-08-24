Feature: Save features
  In order to add changes to an existing feature
  As a $FRONT_END_APP
  I want to be able to modify it

  Scenario: Retrieve a saved feature
    Given $FRONT_END_APP has saved the following new feature
      | name     | beneficiary | motivation           | expected behaviour                |
      | Addition | math idiot  | avoid silly mistakes | to be told the sum of two numbers |
    And the feature has the id "id-alias-1"
    When I ask cucumberly to modify my feature with id "id-alias-1" with data
      | name             |
      | An ugly addition |
    Then the response code is 200
    And I ask cucumberly to give me my features
    And one of the features is
      | name             | beneficiary | motivation           | expected behaviour                |
      | An ugly addition | math idiot  | avoid silly mistakes | to be told the sum of two numbers |
