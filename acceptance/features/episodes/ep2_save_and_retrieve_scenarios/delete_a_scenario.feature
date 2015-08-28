Feature: Delete a single scenario
  In order to clean up my work space
  As a $FRONT_END_APP
  I want to be able to delete a single scenario

@pending
  Scenario: Delete a saved scenario
    Given $FRONT_END_APP has saved the following new feature
      | name     | beneficiary | motivation           | expected behaviour                |
      | Addition | math idiot  | avoid silly mistakes | to be told the sum of two numbers |
    And the feature has the id "feature-id-alias-1"
    And \$FRONT_END_APP has saved the following new scenario as part of feature "feature-id-alias-1"
      | name            | description             | given                      | when                  | then                |
      | Add two numbers | addition of two numbers | ["I have entered 2 and 3"] | ["I press calculate"] | ["the result is 5"] |
    And the scenario has the id "scenario-id-alias-1"
    When I ask cucumberly to delete scenario with id "scenario-id-alias-1" from feature "feature-id-alias-1"
    Then the response code is 204
    And the scenario with id "scenario-id-alias-1" from feature "feature-id-alias-1" does not exist anymore
