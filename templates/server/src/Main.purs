module Main where

import Prelude

import Deno.HttpServer as HttpServer
import Effect (Effect)
import Effect.Class (liftEffect)
import Effect.Uncurried (EffectFn1, runEffectFn1)
import Web.Fetch.Response (Response)

foreign import textResponse :: EffectFn1 String Response

main :: Effect Unit
main = do
  let handler = \_ _ -> liftEffect $ runEffectFn1 textResponse "🦕"
  void $ HttpServer.serveNet handler
