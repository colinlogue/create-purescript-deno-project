module Test.Main where

import Prelude

import Effect (Effect)
import Test.Spec (describe, it)
import Test.Spec.Assertions (shouldEqual)
import Test.Spec.Reporter (consoleReporter)
import Test.Spec.Runner.Deno (runSpecAndExitProcess)

main :: Effect Unit
main = runSpecAndExitProcess [ consoleReporter ] do
  describe "Sample tests" do
    it "should pass a basic test" do
      1 `shouldEqual` 1
    it "demonstrates testing is working" do
      "hello" `shouldEqual` "hello"

