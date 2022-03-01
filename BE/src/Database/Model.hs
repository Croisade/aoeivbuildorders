module Database.Model where

import Data.Function ((&))
import Data.Profunctor.Product.Default (Default)
import Data.Profunctor.Product.TH (makeAdaptorAndInstance)
import Data.Text (Text)
import Data.Time (UTCTime)
import Database.Base
    ( F,
      EntityField,
      EntityWriteField,
      Entity,
      pEntity,
      withTimestampFields )
import Opaleye
import Opaleye.Internal.Manipulation (Updater)

-------------------------------------------------------------------------------
data UserT a b c d
  = User
      { userId :: a,
        userEmail :: b,
        userPasswordHash :: c,
        userName :: d
      }

data BuildOrderT a b c d e f g h i j k
  = BuildOrder
    {
      buildOrderId :: a,
      uuid :: b,
      count :: c,
      action :: d,
      time :: e,
      population :: f,
      wood :: g,
      food :: h,
      gold :: i,
      stone :: j,
      builders :: k
    }

$(makeAdaptorAndInstance "pUser" ''UserT)
$(makeAdaptorAndInstance "pBuildOrder" ''BuildOrderT)

type BuildOrder =
  Entity
    ( BuildOrderT
      Int
      Text
      Int
      Text
      Text
      Text
      Text
      Text
      Text
      Text
      Text
    )

type BuildOrderWriteField =
  EntityWriteField
    ( BuildOrderT
        (Maybe (F SqlInt4))
        (F SqlText)
        (F SqlInt4)
        (F SqlText)
        (F SqlText)
        (F SqlText)
        (F SqlText)
        (F SqlText)
        (F SqlText)
        (F SqlText)
        (F SqlText)
    )

type BuildOrderField =
  EntityField
    (BuildOrderT (F SqlInt4)
        (F SqlText)
        (F SqlInt4)
        (F SqlText)
        (F SqlText)
        (F SqlText)
        (F SqlText)
        (F SqlText)
        (F SqlText)
        (F SqlText)
        (F SqlText)
    )

type User =
  Entity
    ( UserT
        Int
        Text
        Text
        Text
    )

type UserWriteField =
  EntityWriteField
    ( UserT
        (Maybe (F SqlInt4)) -- use Maybe because we don't need to specify id when inserting
        (F SqlText)
        (F SqlText)
        (F SqlText)
    )

type UserField =
  EntityField
    ( UserT (F SqlInt4)
        (F SqlText)
        (F SqlText)
        (F SqlText)
    )

userTable :: Table UserWriteField UserField
userTable =
  table "users" . pEntity . withTimestampFields $
    pUser
      User
        { userId = tableField "id",
          userEmail = tableField "email",
          userPasswordHash = tableField "password_hash",
          userName = tableField "name"
        }
-------------------------------------------------------------------------------
buildOrderTable :: Table BuildOrderWriteField BuildOrderField
buildOrderTable =
  table "buildOrders" . pEntity . withTimestampFields $
    pBuildOrder
     BuildOrder
        { buildOrderId = tableField "id",
          uuid = tableField "uuid",
          count = tableField "count",
          action = tableField "action",
          time = tableField "time",
          population = tableField "population",
          wood = tableField "wood",
          food = tableField "food",
          gold = tableField "gold",
          stone = tableField "stone",
          builders = tableField "builders"
        }