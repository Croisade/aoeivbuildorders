module Graphql.Resolver.BuildOrder where

import Graphql (GraphQL, Value)
import qualified Database.Model as DB
import Database.Model (BuildOrder)

buildOrderResolver :: GraphQL o => DB.BuildOrder -> Value o BuildOrder
buildOrderResolver = undefined