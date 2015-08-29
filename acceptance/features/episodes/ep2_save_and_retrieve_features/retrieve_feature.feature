Feature: Retrieve features
  In order to resume my work
  As a $FRONT_END_APP
  I want to be able to retrieve my saved features

  Scenario: Retrieve a saved feature
    Given $FRONT_END_APP has saved the following new feature
      | name     | beneficiary | motivation           | expected behaviour                |
      | Addition | math idiot  | avoid silly mistakes | to be told the sum of two numbers |
    When I ask cucumberly to give me my book of features
    Then the response code is 200
    And one of the features is
      | name     | beneficiary | motivation           | expected behaviour                |
      | Addition | math idiot  | avoid silly mistakes | to be told the sum of two numbers |
