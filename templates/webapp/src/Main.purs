module Main where

import Prelude

import Data.Argonaut.Decode.Decoders (decodeString)
import Data.Argonaut.Encode.Encoders (encodeString)
import Data.Maybe (Maybe(..))
import Data.String (stripPrefix)
import Data.String.Pattern (Pattern(..))
import Deno.FileSystem (readTextFileSync)
import Deno.HttpServer as HttpServer
import Effect (Effect)
import Effect.Aff (Aff)
import Effect.Class (liftEffect)
import Effect.Class.Console as Console
import Effect.Uncurried (EffectFn1, runEffectFn1)
import JsonDb.Database (createDatabase)
import JsonDb.Server (handleRequest) as JsonDb
import Options.Applicative.Internal.Utils as String
import Web.Fetch.Request (Request)
import Web.Fetch.Response (Response)
import Web.URL (URL)
import Web.URL as URL


foreign import _htmlResponse :: EffectFn1 String Response

htmlResponse :: String -> Effect Response
htmlResponse = runEffectFn1 _htmlResponse

foreign import _notFoundResponse :: EffectFn1 String Response

notFoundResponse :: String -> Effect Response
notFoundResponse = runEffectFn1 _notFoundResponse

foreign import requestUrl :: Request -> URL

main :: Effect Unit
main = void $ HttpServer.serveNet \_ -> handleRequest

handleRequest :: Request -> Aff Response
handleRequest req = do
  let pathname = URL.pathname $ requestUrl req

  let init = { encode: encodeString, decode: decodeString, root: ["db"] }

  let db = createDatabase init

  case pathname of
    "/" -> liftEffect do
      Console.debug "Serving index.html"
      indexHtml <- readTextFileSync "html/index.html"
      htmlResponse indexHtml
    s | String.startsWith (Pattern "/db/") s -> do
      liftEffect $ Console.debug $ "Handling API request: " <> s
      JsonDb.handleRequest db init req
    _ -> liftEffect do
      Console.debug $ "Handling non-API request: " <> pathname
      notFoundHtml <- readTextFileSync "html/404.html"
      htmlResponse notFoundHtml

isApiPath :: String -> Boolean
isApiPath path =
  case stripPrefix (Pattern "/api/") path of
    Nothing -> false
    Just _ -> true
