Feature: Delete all features
  In order to clean up my work space
  As a $FRONT_END_APP
  I want to be able to delete my features

  Scenario: Delete all saved features
    Given $FRONT_END_APP has saved the following new feature
      | name     | beneficiary | motivation           | expected behaviour                     |
      | Addition | math idiot  | avoid silly mistakes | to be told the sum of two numbers      |
    When I ask cucumberly to delete all feature with
    Then the response code is 204
    And there're no more features in cucumberly
