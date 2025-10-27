import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Report {
  id: string;
  title: string;
  category: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  images: string[];
  voiceNote?: string;
  status: 'pending' | 'in-progress' | 'resolved';
  createdAt: string;
  resolutionProgress: {
    issueReported: boolean;
    departmentAssigned: boolean;
    workersAssigned: boolean;
    resolutionStarted: boolean;
    issueResolved: boolean;
  };
}

interface ReportsState {
  reports: Report[];
  addReport: (report: Omit<Report, 'id' | 'createdAt'>) => Promise<void>;
  deleteReport: (id: string) => Promise<void>;
  updateReportStatus: (id: string, status: Report['status']) => Promise<void>;
  initialize: () => Promise<void>;
}

export const useReportsStore = create<ReportsState>((set, get) => ({
  reports: [],

  addReport: async (reportData: Omit<Report, 'id' | 'createdAt'>) => {
    const newReport: Report = {
      ...reportData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    const updatedReports = [...get().reports, newReport];
    await AsyncStorage.setItem('reports', JSON.stringify(updatedReports));
    set({ reports: updatedReports });
  },

  deleteReport: async (id: string) => {
    const updatedReports = get().reports.filter(report => report.id !== id);
    await AsyncStorage.setItem('reports', JSON.stringify(updatedReports));
    set({ reports: updatedReports });
  },

  updateReportStatus: async (id: string, status: Report['status']) => {
    const updatedReports = get().reports.map(report =>
      report.id === id ? { ...report, status } : report
    );
    await AsyncStorage.setItem('reports', JSON.stringify(updatedReports));
    set({ reports: updatedReports });
  },

  initialize: async () => {
    const reportsString = await AsyncStorage.getItem('reports');
    if (reportsString) {
      set({ reports: JSON.parse(reportsString) });
    }
  },
}));