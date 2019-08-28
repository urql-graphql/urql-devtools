export const operation = {
  key: 545079261,
  query: {
    kind: "Document",
    definitions: [
      {
        kind: "OperationDefinition",
        operation: "query",
        variableDefinitions: [
          {
            kind: "VariableDefinition",
            variable: {
              kind: "Variable",
              name: {
                kind: "Name",
                value: "initValue"
              }
            },
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "Boolean"
              }
            },
            directives: []
          }
        ],
        directives: [],
        selectionSet: {
          kind: "SelectionSet",
          selections: [
            {
              kind: "Field",
              name: {
                kind: "Name",
                value: "todos"
              },
              arguments: [
                {
                  kind: "Argument",
                  name: {
                    kind: "Name",
                    value: "initValue"
                  },
                  value: {
                    kind: "Variable",
                    name: {
                      kind: "Name",
                      value: "initValue"
                    }
                  }
                }
              ],
              directives: [],
              selectionSet: {
                kind: "SelectionSet",
                selections: [
                  {
                    kind: "Field",
                    name: {
                      kind: "Name",
                      value: "id"
                    },
                    arguments: [],
                    directives: [],
                    selectionSet: {
                      kind: "SelectionSet",
                      selections: [
                        {
                          kind: "Field",
                          name: {
                            kind: "Name",
                            value: "number"
                          }
                        }
                      ]
                    }
                  },
                  {
                    kind: "Field",
                    name: {
                      kind: "Name",
                      value: "complete"
                    },
                    arguments: [],
                    directives: []
                  },
                  {
                    kind: "FragmentSpread",
                    name: {
                      kind: "Name",
                      value: "TextField"
                    },
                    directives: []
                  },
                  {
                    kind: "Field",
                    name: {
                      kind: "Name",
                      value: "__typename"
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      {
        kind: "FragmentDefinition",
        name: {
          kind: "Name",
          value: "TextField"
        },
        typeCondition: {
          kind: "NamedType",
          name: {
            kind: "Name",
            value: "Todo"
          }
        },
        directives: [],
        selectionSet: {
          kind: "SelectionSet",
          selections: [
            {
              kind: "Field",
              name: {
                kind: "Name",
                value: "text"
              },
              arguments: [],
              directives: []
            }
          ]
        }
      }
    ],
    loc: {
      start: 0,
      end: 165
    },
    __key: 355711915
  },
  variables: {
    initValue: false
  },
  operationName: "query",
  context: {
    url: "http://localhost:3001/graphql",
    requestPolicy: "cache-first",
    meta: {
      source: "Home",
      startTime: 1566923254722,
      cacheOutcome: "miss",
      networkLatency: 132
    }
  }
};

export const mutationOperation = {
  key: 3315227479,
  query: {
    kind: "Document",
    definitions: [
      {
        kind: "OperationDefinition",
        operation: "mutation",
        variableDefinitions: [
          {
            kind: "VariableDefinition",
            variable: {
              kind: "Variable",
              name: {
                kind: "Name",
                value: "id",
                loc: {
                  start: 13,
                  end: 15
                }
              },
              loc: {
                start: 12,
                end: 15
              }
            },
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "ID",
                  loc: {
                    start: 17,
                    end: 19
                  }
                },
                loc: {
                  start: 17,
                  end: 19
                }
              },
              loc: {
                start: 17,
                end: 20
              }
            },
            directives: [],
            loc: {
              start: 12,
              end: 20
            }
          }
        ],
        directives: [],
        selectionSet: {
          kind: "SelectionSet",
          selections: [
            {
              kind: "Field",
              name: {
                kind: "Name",
                value: "toggleTodo",
                loc: {
                  start: 28,
                  end: 38
                }
              },
              arguments: [
                {
                  kind: "Argument",
                  name: {
                    kind: "Name",
                    value: "id",
                    loc: {
                      start: 39,
                      end: 41
                    }
                  },
                  value: {
                    kind: "Variable",
                    name: {
                      kind: "Name",
                      value: "id",
                      loc: {
                        start: 44,
                        end: 46
                      }
                    },
                    loc: {
                      start: 43,
                      end: 46
                    }
                  },
                  loc: {
                    start: 39,
                    end: 46
                  }
                }
              ],
              directives: [],
              selectionSet: {
                kind: "SelectionSet",
                selections: [
                  {
                    kind: "Field",
                    name: {
                      kind: "Name",
                      value: "id",
                      loc: {
                        start: 56,
                        end: 58
                      }
                    },
                    arguments: [],
                    directives: [],
                    loc: {
                      start: 56,
                      end: 58
                    }
                  },
                  {
                    kind: "Field",
                    name: {
                      kind: "Name",
                      value: "__typename"
                    }
                  }
                ],
                loc: {
                  start: 48,
                  end: 64
                }
              },
              loc: {
                start: 28,
                end: 64
              }
            }
          ],
          loc: {
            start: 22,
            end: 68
          }
        },
        loc: {
          start: 3,
          end: 68
        }
      }
    ],
    loc: {
      start: 0,
      end: 69
    },
    __key: 662234142
  },
  variables: {
    id: "2"
  },
  operationName: "mutation",
  context: {
    url: "http://localhost:3001/graphql",
    requestPolicy: "cache-first",
    meta: {
      source: "Component",
      startTime: 1566921895076,
      cacheOutcome: "miss",
      networkLatency: 44
    }
  }
};
