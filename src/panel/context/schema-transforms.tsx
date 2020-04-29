import { GraphQLSchema, extendSchema, parse } from "graphql";

const populateSchema = parse(`
  directive @populate on FIELD_DEFINITION
`);

export const appendPopulateDirective = (
  schema: GraphQLSchema
): GraphQLSchema => {
  try {
    return extendSchema(schema, populateSchema);
  } catch (err) {
    if (
      err.message.startsWith(
        'Directive "populate" already exists in the schema'
      )
    )
      return schema;
    throw err;
  }
};
