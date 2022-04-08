module Graphql.Resolver.BuildOrder where

import qualified Database.Model as DB
import Database.Model (BuildOrder, )
import Graphql
    ( Env(config),
      GraphQL,
      Value,
      BuildOrderArgs(..),
      BuildOrderGQL(..),
      runSelectOne, RegisterBuildOrderArgs(..), runInsert, runSelect, BuildOrderGQL )
import Database.BuildOrder (findBuildOrderByID, insertBuildOrder)
import Data.Morpheus.Types (MUTATION)
import Data.Morpheus.Types.Internal.AST (QUERY)
import Database.Base ( EntityT(record) )

exampleResolver :: GraphQL o => DB.BuildOrder-> Value o BuildOrderGQL
exampleResolver buildOrder =
    let DB.BuildOrder { buildOrderId, uuid, count, action, time, population, wood, food, gold, stone, builders} = record buildOrder
      in return
            BuildOrderGQL
            {
                uuid = pure uuid,
                count = pure count,
                action = pure action,
                time = pure time,
                population = pure population,
                wood = pure wood ,
                food = pure food,
                gold = pure gold,
                stone = pure stone,
                builders = pure builders
            }


buildOrderResolver :: GraphQL o => BuildOrderArgs-> Value o BuildOrderGQL
buildOrderResolver BuildOrderArgs {uuid} = do
    res :: [DB.BuildOrder] <- runSelect $ findBuildOrderByID uuid
    case res of
        [buildy] -> do
            exampleResolver buildy
        _ -> fail "no work"

registerBuildOrderResolver :: RegisterBuildOrderArgs -> Value MUTATION BuildOrderGQL
registerBuildOrderResolver RegisterBuildOrderArgs { uuid, count, action, time, population, wood, food, gold, stone, builders} = do
    runInsert $ insertBuildOrder (uuid, count, action, time, population, wood, food, gold, stone, builders)
    buildOrderResolver BuildOrderArgs {uuid}