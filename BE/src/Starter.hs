{-# LANGUAGE DataKinds #-}
{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE GeneralizedNewtypeDeriving #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE RankNTypes #-}
{-# LANGUAGE ScopedTypeVariables #-}
{-# LANGUAGE TypeOperators #-}

module Starter (start) where

import Control.Monad.Except
import Control.Monad.Reader
import Data.Aeson
import qualified Data.Aeson.Parser
import Data.Aeson.Types
import Data.Attoparsec.ByteString
import Data.ByteString (ByteString)
import Data.List
import Data.Maybe
import Data.String.Conversions
import Data.Text
import Data.Time (UTCTime)
import Data.Time.Calendar (Day, fromGregorian)
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
    type (:<|>) ((:<|>)),
    type (:>),
  )
import Servant.Types.SourceT (source)
import System.Directory
import Text.Blaze
import qualified Text.Blaze.Html
import Text.Blaze.Html.Renderer.Utf8

-- The endpoint at /users expects a GET request with query string parameter sortby
-- whose value can be one of age or name and returns a list/array of JSON objects describing users,
-- with fields age, name, email, registration_date”.

-- type UserAPI = "users" :> QueryParam "sortby" SortBy :> Get '[JSON] [User]
-- data SortBy = Age | Name

type UserAPI1 = "users" :> Get '[JSON] [User]

type UserAPI2 =
  "users" :> Get '[JSON] [User]
    :<|> "albert" :> Get '[JSON] User
    :<|> "isaac" :> Get '[JSON] User

data User = User
  { name :: String,
    age :: Int,
    email :: String,
    registration_date :: Day
  }
  deriving (Eq, Show, Generic)

isaac :: User
isaac = User "Isaac Newton" 372 "Isaac@newton.co.uk" (fromGregorian 1683 3 1)

albert :: User
albert = User "Albert Einstein" 372 "ae@mc2.org" (fromGregorian 1905 12 1)

users1 :: [User]
users1 = [isaac, albert]

instance ToJSON User

type UserAPI5 =
  "user" :> Capture "userid" Integer :> Get '[JSON] User
    -- equivalent to 'GET /user/:userid'
    -- except that we explicitly say that "userid"
    -- must be an integer

    :<|> "user" :> Capture "userid" Integer :> DeleteNoContent

-- equivalent to 'DELETE /user/:userid'

server1 :: Server UserAPI1
server1 = return users1

server2 :: Server UserAPI2
server2 =
  return users1
    :<|> return albert
    :<|> return isaac

userAPI :: Proxy UserAPI1
userAPI = Proxy

userAPI2 :: Proxy UserAPI2
userAPI2 = Proxy

-- 'serve' comes from servant and hands you a WAI Application,
-- which you can think of as an "abstract" web application,
-- not yet a webserver.
app1 :: Application
app1 = serve userAPI2 server2

start :: IO ()
start = run 8081 app1