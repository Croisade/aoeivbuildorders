{-# LANGUAGE DataKinds #-}
{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE GeneralizedNewtypeDeriving #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE RankNTypes #-}
{-# LANGUAGE ScopedTypeVariables #-}
{-# LANGUAGE TypeOperators #-}

module Lib (start) where

import Control.Monad.Except
import Control.Monad.Reader
import Data.Aeson
import qualified Data.Aeson.Parser
import Data.Aeson.Types
import Data.Attoparsec.ByteString
import Data.ByteString (ByteString)
import Data.List
import Data.Maybe ()
import Data.String.Conversions
import Data.Text
import Data.Time (UTCTime)
import Data.Time.Calendar (Day, fromGregorian)
import Data.UUID
import GHC.Generics (Generic)
import Lucid
import Network.HTTP.Media ((//), (/:))
import Network.Wai (Application)
import Network.Wai.Handler.Warp (run)
import Prelude.Compat
import Prelude.Compat
  ( Eq,
    IO,
    Int,
    Integer,
    Monad (return),
    Show,
    String,
  )
import Servant
  ( Capture,
    DeleteNoContent,
    Get,
    JSON,
    Proxy (..),
    Server,
    serve,
    type (:<|>),
    type (:>),
  )
import Servant.API
  ( Capture,
    DeleteNoContent,
    Get,
    JSON,
    Post,
    type (:<|>) ((:<|>)),
    type (:>),
  )
import Servant.Server (Handler)
import Servant.Types.SourceT (source)
import System.Directory
import Text.Blaze
import qualified Text.Blaze.Html
import Text.Blaze.Html.Renderer.Utf8

type API =
  "buildOrder" :> Post '[JSON] BuildOrder
    :<|> "buildOrder" :> Capture "id" UUID :> Get '[JSON] BuildOrder

data BuildOrder = BuildOrder
  { id :: UUID,
    description :: String,
    difficulty :: Int,
    civ :: String,
    buildOrderRowAge1 :: BuildOrderTable,
    buildOrderRowAge2 :: BuildOrderTable,
    buildOrderRowAge3 :: BuildOrderTable,
    buildOrderRowAge4 :: BuildOrderTable
  }
  deriving (Show, Eq, Generic)

data BuildOrderTable = BuildOrderTable
  { count :: Int,
    action :: String,
    time :: String,
    population :: String,
    wood :: String,
    food :: String,
    gold :: String,
    stone :: String,
    builders :: String
  }
  deriving (Show, Eq, Generic)

createBuildOrder :: BuildOrder -> Handler BuildOrder
createBuildOrder = return undefined

getBuildORder :: UUID -> Handler BuildOrder
getBuildORder = return undefined

server :: Server API
server =
  createBuildOrder
    :<|> getBuildOrder

start :: a
start = undefined