# PHP

```
// visit page, get view variable
$response = $this->route('GET', 'ownerGetOverview', ['trunkId' => $trunkId]);
$view = $response->original;
$actualValue = $view['dataset']['trunk'][$confKey];

// alias user in test case
$this->be($User);

// assertions
$this->assertEquals($a, $b, $msg);
$this->assertTrue($ok, $msg);
$this->assertFalse($ok, $msg);
$this->assertSame($a, $b, $msg);
$this->assertResponseStatus(404, $msg);

// grouping methods
/**
* @group x
* @group y
* @group z
*/
public function groupedMethod() { }

// set up and tear down
public function setUp() {}
public function tearDown() {}
public static function setUpBeforeClass() {}
public static function tearDownAfterClass() {}
```

# CLI

```
// run all tests
phpunit

// only run tests from the groups foo, bar and baz
phpunit --group foo bar baz

// only run tests that are not in the groups foo, bar and baz
phpunit --exclude-group foo bar baz

// list all available test groups
phpunit --list-groups

// run tests from class
phpunit --filter 'MyClassName'
```