// src/queries.js
import { gql } from "@apollo/client";

export const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      code
      name
    }
  }
`;

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      capital
      emoji
      currency
      languages {
        code
        name
      }
      continent {
        code
        name
      }
      states {
        code
        name
      }
    }
  }
`;
