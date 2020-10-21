import XCTest

import sgp4Tests

var tests = [XCTestCaseEntry]()
tests += sgp4Tests.allTests()
XCTMain(tests)
