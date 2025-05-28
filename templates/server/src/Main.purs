module Main where

import Prelude

import Deno.HttpServer as HttpServer
import Effect (Effect)
import Effect.Aff (launchAff_)
import Effect.Class (liftEffect)
import Web.Fetch.Response (Response)
import Web.Fetch.Response as Response

main :: Effect Unit
main = launchAff_ do
  let handler = \_ _ -> liftEffect $ Response.new "🍝"
  HttpServer.serveNet handler
