export type RootStackParamList = {
  Welcome: undefined;
  Auth: undefined;
  MainTabs: undefined;
  Home: undefined;
  MyReports: undefined;
  ReportIssue: { category?: string };
  ReportDetails: { reportId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Nearby: undefined;
  MyReports: undefined;
  Profile: undefined;
};