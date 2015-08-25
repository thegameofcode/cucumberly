Feature: Save features
  In order to add changes to an existing scenario
  As a $FRONT_END_APP
  I want to be able to modify it

  Scenario: Modify an existing scenario
    Given $FRONT_END_APP has saved the following new feature
      | name     | beneficiary | motivation           | expected behaviour                |
      | Addition | math idiot  | avoid silly mistakes | to be told the sum of two numbers |
    And the feature has the id "feature-id-alias-1"
    And \$FRONT_END_APP has saved the following new scenario as part of feature "feature-id-alias-1"
      | name            | description             | given                      | when                  | then                |
      | Add two numbers | addition of two numbers | ["I have entered 2 and 3"] | ["I press calculate"] | ["the result is 5"] |
    And the scenario has the id "scenario-id-alias-1"
    When I ask cucumberly to modify my scenario with id "scenario-id-alias-1" from feature "feature-id-alias-1" with data
      | name          | given                                                         |
      | add 2 numbers | ["I have forgotten all about math", "I have entered 2 and 3"] |
    Then the response code is 200
    When I ask cucumberly to give me my scenarios of feature "feature-id-alias-1"
    And one of the scenarios is
      | name          | description             | given                                                         | when                  | then                |
      | add 2 numbers | addition of two numbers | ["I have forgotten all about math", "I have entered 2 and 3"] | ["I press calculate"] | ["the result is 5"] |
