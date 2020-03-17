import React from "react";
import { TimelinePane } from "./TimelinePane";
const mockQuerySections = [
  {
    title: "Query",
    startOpen: true,
    subSections: [
      {
        code: {
          language: "graphql",
          code: `query { 
  todos(id: 1234) { 
    id 
    content 
  } 
}`
        }
      },
      {
        title: "Variables",
        code: {
          language: "graphql",
          code: `{
  "myVar": 1234
}`
        }
      }
    ]
  }
];

const mockDetailsSections = [
  {
    title: "Event",
    subSections: [
      {
        info: ["key1", "value1"] as [string, string]
      },
      {
        info: ["key2", "value2"] as [string, string]
      },
      {
        info: ["key3", "value3"] as [string, string]
      },
      {
        info: ["key4", "value4"] as [string, string]
      }
    ]
  }
];

export default {
  query: <TimelinePane sections={mockQuerySections} event={{}} />,
  event: <TimelinePane sections={mockDetailsSections} event={{}} />,
  combined: (
    <TimelinePane
      sections={[...mockQuerySections, ...mockDetailsSections]}
      event={{}}
    />
  )
};
