Feature: EP1 File features generator
  As $CUKE_GENERATOR
  I will retrieve data about a book of features stored in a database
  In order to convert this data into cucumber files

  Scenario: $CUKE_GENERATOR retrieves data of a concrete scenario and convert it into file.feature
    Given $CUKE_GENERATOR already has a concrete scenario defined
    And this scenario is already stored in my database
    When I retrieve a concrete scenario data from my database
    And and convert it into a file.feature
    Then I will have a file like the following "./resources/cuke_generator_example_feature.txt"
