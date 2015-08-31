Feature: Save scenario
  In order to not lose any of my work
  As a $FRONT_END_APP
  I want to be able to save the changes I make

  @pending
  Scenario: Save a new scenario
    Given $FRONT_END_APP has saved the following new feature
      | name     | beneficiary | motivation           | expected behaviour                |
      | Addition | math idiot  | avoid silly mistakes | to be told the sum of two numbers |
    And the feature has the id "id-alias-1"
    And \$FRONT_END_APP has created the following new scenario
      | name            | description             | given                      | when                  | then                |
      | Add two numbers | addition of two numbers | ["I have entered 2 and 3"] | ["I press calculate"] | ["the result is 5"] |
    When I request to save the scenario to cucumberly as part of feature "id-alias-1"
    Then the response code is 201
    And the body has a "id" field

  @pending
  Scenario: Save a new scenario with more than one 'given' step
    Given $FRONT_END_APP has saved the following new feature
      | name     | beneficiary | motivation           | expected behaviour                |
      | Addition | math idiot  | avoid silly mistakes | to be told the sum of two numbers |
    And the feature has the id "id-alias-1"
    And \$FRONT_END_APP has created the following new scenario
      | name            | description             | given                                                         | when                  | then                |
      | Add two numbers | addition of two numbers | ["I have forgotten all about math", "I have entered 2 and 3"] | ["I press calculate"] | ["the result is 5"] |
    When I request to save the scenario to cucumberly as part of feature "id-alias-1"
    Then the response code is 201
    And the body has a "id" field

  @pending
  Scenario: Save a new scenario with more than one 'when' step
    Given $FRONT_END_APP has saved the following new feature
      | name     | beneficiary | motivation           | expected behaviour                |
      | Addition | math idiot  | avoid silly mistakes | to be told the sum of two numbers |
    And the feature has the id "id-alias-1"
    And \$FRONT_END_APP has created the following new scenario
      | name            | description             | given                      | when                                         | then                |
      | Add two numbers | addition of two numbers | ["I have entered 2 and 3"] | ["I want to do the sum","I press calculate"] | ["the result is 5"] |
    When I request to save the scenario to cucumberly as part of feature "id-alias-1"
    Then the response code is 201
    And the body has a "id" field

  @pending
  Scenario: Save a new scenario with more than one 'then' step
    Given $FRONT_END_APP has saved the following new feature
      | name     | beneficiary | motivation           | expected behaviour                |
      | Addition | math idiot  | avoid silly mistakes | to be told the sum of two numbers |
    And the feature has the id "id-alias-1"
    And \$FRONT_END_APP has created the following new scenario
      | name            | description             | given                      | when                  | then                                                       |
      | Add two numbers | addition of two numbers | ["I have entered 2 and 3"] | ["I press calculate"] | ["the result is 5", "And I still have no idea about sums"] |
    When I request to save the scenario to cucumberly as part of feature "id-alias-1"
    Then the response code is 201
    And the body has a "id" field
