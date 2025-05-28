module Main where

import Prelude

import Deno.IO (stdout)
import Deno.IO.OutputStream as OutputStream
import Effect (Effect)
import Web.Encoding.TextEncoder as TextEncoder


main :: Effect Unit
main = do
  str <- TextEncoder.new <#> TextEncoder.encode "🦕\n"
  void $ OutputStream.writeSync str stdout