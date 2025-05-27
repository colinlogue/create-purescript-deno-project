module Main where

import Prelude

import Effect (Effect)


foreign import startServer :: String -> Effect Unit

main :: Effect Unit
main = startServer "🍝"
