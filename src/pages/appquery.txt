import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";

export const testconnect = gql`
              query Ships($offset: Int, $limit: Int,$find: ShipsFind) {
                            ships(offset: $offset, limit: $limit,find: $find) {
                              image
                              name
                              roles
                              status
                              active
                              class
                              url
                            }
                          }
                    `;

export const shipresultconnect = gql`
                        query shipsresult{
                          shipsResult {
                                   result {
                                     totalCount
                                   }
                                 }
     }
                    `;
  