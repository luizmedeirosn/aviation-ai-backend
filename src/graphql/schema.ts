import { gql } from 'apollo-server-express';

import organizationResolvers from './resolvers/organization.resolver.js';
import analysisResolvers from './resolvers/analysis.resolver.js';
import pilotResolvers from './resolvers/pilot.resolver.js';

const baseTypeDefs = gql`
  #####################
  # ENUMS
  #####################

  enum PilotRole {
    COMMANDER
    COPILOT
  }

  #####################
  # INPUT TYPES
  #####################

  input ChecklistItemInput {
    name: String!
  }

  input SecurityPatternInput {
    title: String!
    checklists: [ChecklistItemInput!]!
  }

  input OpenAiInput {
    apiKey: String
  }

  input OrganizationCredentialsInput {
    openai: OpenAiInput
  }

  input CreateOrganizationInput {
    name: String!
    pilotCount: Int!
    avgFlightHours: Float!
    fleetSize: Int!
    aiPrompt: String!
    securityPatterns: [SecurityPatternInput!]!
    credentials: OrganizationCredentialsInput
  }

  input UpdateOrganizationInput {
    name: String
    pilotCount: Int
    avgFlightHours: Float
    fleetSize: Int
    aiPrompt: String
    securityPatterns: [SecurityPatternInput!]
    credentials: OrganizationCredentialsInput
  }

  input CreatePilotInput {
    organizationId: ID!
    name: String!
    flightHours: Int!
    role: PilotRole!
  }

  input UpdatePilotInput {
    organizationId: ID!
    name: String
    flightHours: Int
    role: PilotRole
  }

  #####################
  # OUTPUT TYPES
  #####################

  type ChecklistItem {
    name: String!
    passed: Boolean!
  }

  type PatternFeedback {
    title: String!
    feedback: String!
    checklists: [ChecklistItem!]!
  }

  type Organization {
    id: ID!
    name: String!
    pilotCount: Int!
    avgFlightHours: Float!
    fleetSize: Int!
    aiPrompt: String!
    securityPatterns: [PatternFeedback!]
  }

  type Pilot {
    organization: Organization!
    id: ID!
    name: String!
    flightHours: Float!
    role: PilotRole!
  }

  type Analysis {
    id: ID!
    organization: Organization!
    pilot: Pilot!
    status: String!
    patterns: [PatternFeedback!]
    updatedAt: String!
    createdAt: String!
    s3Key: String
    downloadUrl: String
  }

  #####################
  # QUERIES
  #####################

  type Query {
    organizations: [Organization!]!
    organization(id: ID!): Organization
    analysis(id: ID!): Analysis
    analyses(organizationId: ID): [Analysis!]!
    pilots(organizationId: ID!): [Pilot!]!
    pilot(id: ID!): Pilot
  }

  #####################
  # MUTATIONS
  #####################

  type Mutation {
    createOrganization(input: CreateOrganizationInput!): Organization!
    updateOrganization(id: ID!, input: UpdateOrganizationInput!): Organization!

    createPilot(organizationId: ID!, name: String!, flightHours: Float!): Pilot!
    createPilots(input: [CreatePilotInput!]!): [Pilot!]!
  }
`;

export const typeDefs = [baseTypeDefs];
export const resolvers = [organizationResolvers, analysisResolvers, pilotResolvers];
