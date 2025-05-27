module Main where

import Prelude

import Effect (Effect)


foreign import logMessage :: String -> Effect Unit

main :: Effect Unit
main = logMessage "Hello from PureScript CLI! 🎉"