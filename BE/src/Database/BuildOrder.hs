module Database.BuildOrder where

import GHC.Int (Int64)
import Opaleye
    ( toFields,
      rCount,
      (.==),
      restrict,
      sqlString,
      selectTable,
      Insert(..),
      Select )
import Database.Model
    ( BuildOrderT(BuildOrder, buildOrderId, count, action, time,
                  population, wood, food, gold, stone, builders, uuid),
      BuildOrderField,
      buildOrderTable )
import Data.Text(Text)
import Database.Base (withTimestamp, record)
import Control.Arrow (returnA)

-------------------------------------------------------------------------------
buildOrderSelect :: Select BuildOrderField
buildOrderSelect = selectTable buildOrderTable

-------------------------------------------------------------------------------
insertBuildOrder :: (Text, Int, Text, Text, Text, Text, Text, Text, Text, Text) -> Insert Int64
insertBuildOrder (uuid, count, action, time, population, wood, food, gold, stone, builders) =
  Insert
    { iTable = buildOrderTable,
      iRows =
        withTimestamp
          [BuildOrder
              { buildOrderId = Nothing,
                uuid = toFields uuid,
                count = toFields count,
                action = toFields action,
                time = toFields time,
                population = toFields population,
                wood = toFields wood,
                food = toFields food,
                gold = toFields gold,
                stone = toFields stone,
                builders = toFields builders
              }
          ],
      iReturning = rCount,
      iOnConflict = Nothing
    }
-------------------------------------------------------------------------------
findBuildOrderByID :: Text -> Select BuildOrderField
findBuildOrderByID uuid =
    proc () -> do
        buildOrder <- buildOrderSelect -< ()
        let buildOrderDetail = record buildOrder
        restrict -< Database.Model.uuid buildOrderDetail .== toFields uuid
        returnA -< buildOrder

-- findBuildOrderByID' :: Text -> Select BuildOrderField
-- findBuildOrderByID' reqId =
--   proc () -> do
--   row@(_, uuid, _, _, _, _, _, _, _, _, _) <- buildOrderSelect -< ()
--   restrict -< uuid .== sqlString reqId
--   returnA -< row
