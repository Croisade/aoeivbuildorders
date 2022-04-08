module Graphql.Resolver.Root where

import Data.Morpheus.Types ( RootResolver(..), Undefined(..) )
import Graphql
import Graphql.Resolver.User
import Graphql.Resolver.BuildOrder

rootResolver :: RootResolver Web () Query Mutation Undefined
rootResolver =
  RootResolver {queryResolver, mutationResolver, subscriptionResolver}
  where
    queryResolver = Query {login = loginResolver, myUserInfo = myUserInfoResolver, allUsers = allUsersResolver, buildOrder = buildOrderResolver}
    mutationResolver = Mutation {register = registerResolver, changePassword = changePasswordResolver, registerBuildOrder = registerBuildOrderResolver}
    subscriptionResolver = Undefined
