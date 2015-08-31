Feature: Retrieve scenario
  In order to resume my work
  As a $FRONT_END_APP
  I want to be able to retrieve my saved scenarios

  Scenario: Retrieve a saved scenario
    Given $FRONT_END_APP has saved the following new feature
      | name     | beneficiary | motivation           | expected behaviour                |
      | Addition | math idiot  | avoid silly mistakes | to be told the sum of two numbers |
    And the feature has the id "id-alias-1"
    And \$FRONT_END_APP has saved the following new scenario as part of feature "id-alias-1"
      | name            | description             | given                      | when                  | then                |
      | Add two numbers | addition of two numbers | ["I have entered 2 and 3"] | ["I press calculate"] | ["the result is 5"] |
    When I ask cucumberly to give me my book of features
    Then the response code is 200
    And one of the scenarios for feature "id-alias-1" is
      | name            | description             | given                      | when                  | then                |
      | Add two numbers | addition of two numbers | ["I have entered 2 and 3"] | ["I press calculate"] | ["the result is 5"] |

