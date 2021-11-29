import { shield } from 'graphql-shield';

export const permissions = shield({
  // Query: {
  // },
  // Mutation: {
  // },
  // User: or(rules.canReadUser, rules.isCreateMyUser),
})
