import axios from 'axios';

const api = axios.create({
  baseURL: '/api/mindbody',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface MindBodyClass {
  Id: number;
  ClassDescription: {
    Id: number;
    Name: string;
    Description: string;
  };
  Program: {
    Id: number;
    Name: string;
  };
  StartDateTime: string;
  EndDateTime: string;
  Location: {
    Id: number;
    Name: string;
  };
  Staff: {
    Id: number;
    Name: string;
    ImageUrl?: string;
  };
  MaxCapacity: number | null;
  TotalBooked: number | null;
  WebCapacity: number | null;
  IsAvailable: boolean;
}

export interface ClassesResponse {
  paginationResponse: {
    requestedLimit: number;
    requestedOffset: number;
    pageSize: number;
    totalResults: number;
  };
  classes: MindBodyClass[];
}

export async function getClasses(params: {
  startDateTime: string;
  endDateTime: string;
  locationIds?: number[];
  staffIds?: number[];
  programIds?: number[];
  hideCanceled?: boolean
}) {
  try {
    const response = await api.get('', {
      params: {
        path: '/class/classes',
        ...params,
        limit: 100,
      },
    });
    const classes = response.data.Classes || response.data.classes || [];
    const paginationResponse = response.data.PaginationResponse || response.data.paginationResponse || { totalResults: classes.length };
    return { classes, paginationResponse };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching classes:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    } else {
      console.error('Error fetching classes:', error);
    }
    return { classes: [], paginationResponse: { totalResults: 0, pageSize: 0, requestedLimit: 100, requestedOffset: 0 } };
  }
}

export async function getLocations() {
  try {
    const response = await api.get('', {
      params: {
        path: '/site/locations'
      }
    });
    return response.data.Locations || response.data.locations || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching locations:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    } else {
      console.error('Error fetching locations:', error);
    }
    return [];
  }
}

export async function getStaff() {
  try {
    const response = await api.get('', {
      params: {
        path: '/staff/staff',
        limit: 100,
        staffViewIncludeInactive: false,
      },
    });
    return response.data.StaffMembers || response.data.staffMembers || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching staff:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    } else {
      console.error('Error fetching staff:', error);
    }
    return [];
  }
}

export async function getClassTypes() {
  try {
    const response = await api.get('', {
      params: {
        path: '/class/programs',
        limit: 100,
      },
    });
    return response.data.Programs || response.data.programs || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching class types:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    } else {
      console.error('Error fetching class types:', error);
    }
    return [];
  }
} 