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
import Data.Time (UTCTime)
import Data.Time.Calendar (Day, fromGregorian)
import Data.UUID
import GHC.Generics (Generic)
import Lucid
import Network.HTTP.Media ((//), (/:))
import Network.Wai (Application)
import Network.Wai.Handler.Warp (run)
import Prelude.Compat
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
import Database.PostgreSQL.Simple
    ( close, connectPostgreSQL, execute_, Connection, execute, Only (Only, fromOnly), query_ )
import Db (DBConnectionString, Message)
import Servant.API.ContentTypes (NoContent)
import Servant.Client.Internal.HttpClient (ClientM)
import Data.Pool ( withResource, Pool, createPool )
import Control.Monad.IO.Class ( MonadIO(liftIO) )
import Control.Concurrent (killThread, forkIO)

import Control.Exception (bracket)
import Network.HTTP.Client (newManager, defaultManagerSettings)
import Servant
    ( type (:<|>) ((:<|>)),
      JSON,
      NoContent (NoContent),
      PlainText,
      ReqBody,
      type (:>),
      Get,
      Post, Proxy (Proxy), Handler, Server, serve )
import Servant.Client
    ( client,
      mkClientEnv,
      runClientM,
      ClientM,
      BaseUrl(BaseUrl),
      Scheme(Http) )

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



-- server :: Server API
-- server =
--   createBuildOrder
--     :<|> getBuildOrder

start :: a
start = undefined

api :: Proxy API
api = Proxy

initDB :: DBConnectionString -> IO ()
initDB connstr = bracket (connectPostgreSQL connstr) close $ \conn -> do
  execute_ conn "CREATE TABLE IF NOT EXISTS buildOrders (msg text not null)"
  return ()

-- server :: Pool Connection -> Server API
-- server conns = createBuildOrder :<|> getBuildOrder

--   where createBuildOrder :: BuildOrder -> Handler NoContent
--         createBuildOrder bo = do
--           liftIO . withResource conns $ \conn ->
--             execute conn
--                       "INSERT INTO buildOrders VALUES (?)"
--                       (Only bo)
--             return NoContent

        -- getBuildOrder :: UUID -> Handler BuildOrder
        -- getBuildOrder = return undefined

-- postMessage :: Message -> Handler NoContent
-- postMessage msg = do
--   liftIO . withResource conns $ \conn ->
--     execute conn
--             "INSERT INTO messages VALUES (?)"
--             (Only msg)
--   return NoContent

-- getMessages :: Handler [Message]
-- getMessages = fmap (map fromOnly) . liftIO $
--   withResource conns $ \conn ->
--     query_ conn "SELECT msg FROM messages"

-- runApp :: Pool Connection -> IO ()
-- runApp conns = run 8080 (serve api $ server conns)

initConnectionPool :: DBConnectionString -> IO (Pool Connection)
initConnectionPool connStr =
  createPool (connectPostgreSQL connStr)
             close
             2 -- stripes
             60 -- unused connections are kept open for a minute
             10 -- max. 10 connections open per stripe

-- postMsg :: BuildOrder-> ClientM NoContent
-- getMsgs :: ClientM [BuildOrder]
-- postMsg :<|> getMsgs = client api

-- dontuse :: IO ()
-- dontuse = do
--   -- you could read this from some configuration file,
--   -- environment variable or somewhere else instead.
--   -- you will need to either change this connection string OR
--   -- set some environment variables (see
--   -- https://www.postgresql.org/docs/9.5/static/libpq-envars.html)
--   -- to point to a running PostgreSQL server for this example to work.
--   let connStr = ""
--   pool <- initConnectionPool connStr
--   initDB connStr
--   mgr <- newManager defaultManagerSettings
--   bracket (forkIO $ runApp pool) killThread $ \_ -> do
--     ms <- flip runClientM (mkClientEnv mgr (BaseUrl Http "localhost" 8080 "")) $ do
--       postMsg "hello"
--       postMsg "world"
--       getMsgs
--     print ms