module Main where

import Prelude

import Data.String (stripPrefix)
import Data.String.Pattern (Pattern(..))
import Deno.HttpServer as HttpServer
import Effect (Effect)
import Effect.Class (liftEffect)
import Effect.Uncurried (EffectFn1, runEffectFn1)
import Web.Fetch.Request (Request, url)
import Web.Fetch.Response (Response)

foreign import htmlResponse :: EffectFn1 String Response
foreign import jsonResponse :: EffectFn1 String Response
foreign import notFoundResponse :: EffectFn1 String Response
foreign import readTextFileSync :: EffectFn1 String String
foreign import readJsonDbFile :: EffectFn1 String String

main :: Effect Unit
main = do
  let handler = handleRequest
  void $ HttpServer.serveNet handler

handleRequest :: Request -> Response -> Effect Response
handleRequest req _ = liftEffect do
  let pathname = url req
  
  case pathname of
    "/" -> do
      indexHtml <- pure $ runEffectFn1 readTextFileSync "html/index.html"
      runEffectFn1 htmlResponse indexHtml
    _ | isApiPath pathname -> do
      let apiPath = case stripPrefix (Pattern "/api/") pathname of
                      Just path -> path
                      Nothing -> ""
      jsonContent <- pure $ runEffectFn1 readJsonDbFile apiPath
      if jsonContent == ""
        then do
          notFoundHtml <- pure $ runEffectFn1 readTextFileSync "html/404.html"
          runEffectFn1 notFoundResponse notFoundHtml
        else runEffectFn1 jsonResponse jsonContent
    _ -> do
      notFoundHtml <- pure $ runEffectFn1 readTextFileSync "html/404.html"
      runEffectFn1 notFoundResponse notFoundHtml

isApiPath :: String -> Boolean
isApiPath path = 
  case stripPrefix (Pattern "/api/") path of
    Nothing -> false
    Just _ -> true
