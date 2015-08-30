Feature: Delete a single feature
  In order to clean up my work space
  As a $FRONT_END_APP
  I want to be able to delete my features

  Scenario: Delete a saved feature
    Given $FRONT_END_APP has saved the following new feature
      | name     | beneficiary | motivation           | expected behaviour                |
      | Addition | math idiot  | avoid silly mistakes | to be told the sum of two numbers |
    And the feature has the id "id-alias-1"
    When I ask cucumberly to delete feature with id "id-alias-1"
    Then the response code is 204
    And the feature with id "id-alias-1" does not exist anymore
