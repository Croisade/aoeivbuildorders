module Graphql.Resolver.Root where

import Data.Morpheus.Types
import Graphql
import Graphql.Resolver.User
import Graphql.Resolver.BuildOrder

rootResolver :: RootResolver Web () Query Mutation Undefined
rootResolver =
  RootResolver {queryResolver, mutationResolver, subscriptionResolver}
  where
    queryResolver = Query {login = loginResolver, myUserInfo = myUserInfoResolver, allUsers = allUsersResolver}
    mutationResolver = Mutation {register = registerResolver, changePassword = changePasswordResolver}
    subscriptionResolver = Undefined
