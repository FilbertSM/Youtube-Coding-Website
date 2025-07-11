import axios from "axios";
const API_BASE = "http://localhost:5001/api";

export const fetchGuides = async (page = 1, limit = 12, search = "") => {
  const params: any = { page, limit };
  if (search) params.title = search;
  const res = await axios.get(`${API_BASE}/cards`, { params });
  return res.data.cards;
};

export const fetchGuideById = async (id: string) => {
  const res = await axios.get(`${API_BASE}/cards/${id}`);
  return res.data;
};

export const createGuide = async (guide: any) => {
  const res = await axios.post(`${API_BASE}/cards`, guide);
  return res.data;
};

export const updateGuide = async (id: string, guide: any) => {
  const res = await axios.put(`${API_BASE}/cards/${id}`, guide);
  return res.data;
};

export const deleteGuide = async (id: string) => {
  const res = await axios.delete(`${API_BASE}/cards/${id}`);
  return res.data;
};