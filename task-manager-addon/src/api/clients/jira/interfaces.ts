import { Nullable } from '../../../types/templates/Nullable';

/**
 * JiraProject
 */
export interface JiraProject {
  self: string;
  id: string;
  key: string;
  name: string;
  projectTypeKey: string;
  simplified: boolean;
  avatarUrls: any;
}

/**
 * JiraIssueType
 */
export interface JiraIssueType {
  self: string;
  id: string;
  description: string;
  iconUrl: string;
  name: string;
  subtask: boolean;
}

/**
 * JiraStatus
 */
export interface JiraStatus {
  self: string;
  description: string;
  iconUrl: string;
  name: string;
  id: string;
  statusCategory: {
    self: string;
    id: string;
    key: string;
    colorName: string;
    name: string;
  };
}

/**
 * JiraUser
 */
export interface JiraUser {
  self: string;
  accountId: string;
  emailAddress: string;
  avatarUrls: {
    '48x48': string;
    '24x24': string;
    '16x16': string;
    '32x32': string;
  };
  displayName: string;
  active: boolean;
  accountType: string;
  key: string;
}

/**
 * JiraPriority
 */
export interface JiraPriority {
  self: string;
  iconUrl: string;
  name: string;
  id: string;
}

/**
 * JiraIssue
 */
export interface JiraIssue {
  id: string;
  self: string;
  key: string;
  changelog?: {
    histories: {
      author: any;
      created: string;
      items: [
        {
          field: string;
          fieldId: string;
          fromString: string;
          toString: string;
        },
      ];
    }[];
  };
  fields: {
    reporter: JiraUser;
    creator: JiraUser;
    assignee: Nullable<JiraUser>;
    summary: string;
    description: string;
    created: string;
    updated: string;
    subtasks: JiraSubTask[];
    worklog?: { worklogs: JiraWorklog[] };
    issuetype: JiraIssueType;
    project: JiraProject;
    status: JiraStatus;
    priority: JiraPriority;
  };
}

/**
 * JiraSubTask
 */
export interface JiraSubTask {
  id: string;
  self: string;
  key: string;
  fields: {
    summary: string;
    description: string;
    issuetype: JiraIssueType;
    project: JiraProject;
    status: JiraStatus;
    priority: JiraPriority;
  };
}

/**
 * JiraWorklog
 */
export interface JiraWorklog {
  author: JiraUser;
  id: string;
  self: string;
  key: string;
  issueId: string;
  timeSpent: string;
  timeSpentSeconds: number;
  updated: string;
  fields: {};
}
