import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 300000, // 5 minutes (300 seconds)
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
  },
});

// Request interceptor for logging or adding auth tokens
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      // Server responded with error status
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Something else happened
      console.error('Error message:', error.message);
    }
    return Promise.reject(error);
  }
);

// CSR Protocol API instance
const csrApi = axios.create({
  baseURL: 'https://docgenai.dev8.lsacone.com',
  timeout: 300000, // 5 minutes
  headers: {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJXQ3BHa05fZ3J4MWZSU0JjXzhQMVhBUUVBVWlkQkduWVR3UGNWZjdid3pjIn0.eyJleHAiOjE3NTc3NjYxMjEsImlhdCI6MTc1NzczNzMyMSwiYXV0aF90aW1lIjoxNzU3NzM3MzE1LCJqdGkiOiIyODgxNmRiNy1kN2U5LTRhY2EtOGI3MS01OGQ3NDgxZTZiMWYiLCJpc3MiOiJodHRwczovL3NpZ25pbi5kZXY4LmxzYWNvbmUuY29tL2F1dGgvcmVhbG1zL2xzYWMiLCJhdWQiOiJtZWRpY2FsLXdyaXRpbmciLCJzdWIiOiIyNzI5NDQ2OC1mYWIzLTQ1NDktODQ2ZS02N2JlNTExMGVhOTMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJtZWRpY2FsLXdyaXRpbmciLCJzaWQiOiI4YTk2ZjZhOS02OTQwLTRkNzEtYjBmZC0yYzc1ZTIxOGJlODQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vZG9jZ2VuYWkuZGV2OC5sc2Fjb25lLmNvbSJdLCJzY29wZSI6InByb2ZpbGUgcGxhdGZvcm0tcm9sZXMgYWNjb3VudCBlbWFpbCBvcGVuaWQgYWNjb3VudC1jbGllbnQtcm9sZXMgbHNhYy1hcHBsaWNhdGlvbi12aXNpdC11cmwgY2xpZW50LWlkIGxzYWMtc2Vzc2lvbi1ub3RlcyBpZHAtdXNlci1uYW1lIiwiYWNjb3VudC1pZHAtZW5hYmxlZCI6Ik4iLCJhY2NvdW50LW5hbWUiOiJzY2gtZGV2MyIsImFjY291bnQtc2Vzc2lvbi10aW1lb3V0IjoiMTgwMCIsImZpcnN0bmFtZSI6Ikxva2VzaCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhY2NvdW50LWlkIjoiYzE2MGQ5ZTItNWViNC00NmQxLThmNjctNzc5OGExOGVkMWQwIiwicm9sZXMiOlsiQ1NSIFJldmlld2VyIiwiQ1NSIFVzZXIiLCJQcm90b2NvbCBSZXZpZXdlciIsIkNTUiBBZG1pbiIsIlByb3RvY29sIEFkbWluIiwiUHJvbXB0IE1hbmFnZXIiLCJST0xFX0FDQ0VTUyIsIlN0eWxlIEd1aWRlIEFkbWluIiwiQ1NSIFByb21wdCBNYW5hZ2VyIl0sImlkcC11c2VyLW5hbWUiOiIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJMb2tlc2ggS3VtYXIiLCJsYXN0bmFtZSI6Ikt1bWFyIiwiYWNjb3VudC10eXBlIjoiIiwibmFtZSI6Ikxva2VzaCBLdW1hciIsImNsaWVudC1pZCI6Im1lZGljYWwtd3JpdGluZyIsImFjY291bnQiOiJzY2gtZGV2MyIsImVtYWlsIjoibG9rZXNoLmt1bWFyQHNhYW1hLmNvbSJ9.nkcTSrrjOM5zdZGhNBCnNV1jPg_yatZkTiEmL6wKMIs2U-oLDByplRG-wfYHT74UC2scdsMdfSyApY1hhFBpvR5Nk6IH1hEo9xRiLa0a2IabGKZE2Y7n0Tbe8A0jsBwSjsUNg3oauRqKcCw5QXu0UhDqin9TzKreJhkwPXLhZynXMf4T5BZnXKZviW3CvAOmc2EYu_cky4RcKNS93z4bW27s4Bpd97cZzXnXeuec-5vFgiWS6Yt-ghhLwu1KKsLFeZOp6FZRLN2ZDoG6PZKLS_cHv7uDslBxx3f1KLXnV3d4oZZ_QWkuC6mjK5fnqnK5MjmnLvZl1b50b6i4WbXt3Q',
    'content-type': 'application/json',
    'origin': 'https://docgenai.dev8.lsacone.com',
    'referer': 'https://docgenai.dev8.lsacone.com/create-document?type=new&step=referenceDocuments',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
  },
});

// API service functions
export const chatService = {
  // Jira-specific chat endpoint
  sendJiraQuestion: async (question: string) => {
    const response = await api.post('/rag/api/v1/chat/jira', { question });
    return response.data;
  },

  // General chat endpoint
  sendGeneralQuestion: async (question: string) => {
    const response = await api.post('/rag/api/v1/chat/', { question });
    return response.data;
  },

  // CSR Protocol creation endpoint
  createCSRProtocol: async (protocolName: string) => {
    const payload = {
      template_id: "6808c97e-1c3a-462e-978c-8ee92ab14837",
      template: "6808c97e-1c3a-462e-978c-8ee92ab14837",
      protocol_num: protocolName,
      program: protocolName,
      title: protocolName,
      doc_type_id: "4ad26132-9013-4585-8d7d-27b46d6b0df9",
      asset: protocolName,
      indication: protocolName,
      therapeutic_area: protocolName,
      phase: protocolName,
      sources: [],
      binder_sources: [
        "6fd4bd08-20f8-4d36-8799-5c3d1a4e0b45",
        "1ee14e1d-4b5e-4801-a624-a2fcd8389f88",
        "a7a3d969-61d2-4721-9ca2-19912d379de8",
        "a416fe23-904d-4c8e-a6db-46ea90bebc53"
      ],
      binder_pa_favourites: [
        "6fd4bd08-20f8-4d36-8799-5c3d1a4e0b45",
        "a7a3d969-61d2-4721-9ca2-19912d379de8"
      ]
    };

    const response = await csrApi.post('/api/clinical_doc/creation/', payload);
    return response.data;
  },
};

export default api;
