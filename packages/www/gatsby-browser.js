const React = require("react");
const {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache
} = require("@apollo/client");
const { setContext } = require("apollo-link-context");
const netlifyIdentity = require("netlify-identity-widget");
const fetch = require("cross-fetch")
const wrapRootElement = require("./wrap-root-element");

const authLink = setContext((_, { headers,request, previousContext }) => {
  
  
  netlifyIdentity.init({})
  const user = netlifyIdentity.currentUser();
  
  const token = user.token.access_token;
  
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const httpLink = new HttpLink({
  uri: "/.netlify/functions/todo",
  fetch,
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

exports.wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      {wrapRootElement({ element })}
    </ApolloProvider>
  );
};