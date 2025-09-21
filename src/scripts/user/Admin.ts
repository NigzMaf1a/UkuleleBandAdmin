import classApiFetch from "../services/utils/classApiFetch";
import endpoints from "../services/utils/endpoints";
import link from "../services/utils/links";

// Interfaces
export interface User {
  RegID: number;
  RegType: string;
}

export default class Admin {
  private readonly regID: number;
  private readonly token: string;
  public url: string;

  constructor(regID: number, token: string, backendUrl: string = link) {
    if (!token || !regID) {
      console.error("Invalid Session");
      throw new Error("Unauthorized access. Please login");
    }

    this.regID = regID;
    this.token = token;
    this.url = backendUrl;
  }

  getToken(): string {
    return this.token;
  }

  getRegID(): number {
    return this.regID;
  }  

  private apiFetch = async <T = unknown>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    return classApiFetch<T>(this.url, this.token, endpoint, options);
  };

  async fetchPendingUsers(): Promise<User[]> {
    return this.apiFetch<User[]>(endpoints.fetchPendingUsers);
  }

  async approveUser(regID: number): Promise<void> {
    return this.apiFetch<void>(endpoints.approveUser, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regID),
    });
  }

  async deactivateUser(): Promise<void> {
    return this.apiFetch<void>(endpoints.deactivateUser);
  }

  async reactivateUser(): Promise<void> {
    return this.apiFetch<void>(endpoints.reactivateUser);
  }

  async fetchAllUsers(): Promise<User[]> {
    try {
      return await this.apiFetch<User[]>(endpoints.fetchAllUsers);
    } catch (err) {
      console.error("Error occurred while fetching users:", err);
      return [];
    }
  }

  async fetchFeedback() {
    return this.apiFetch(endpoints.fetchFeedback);
  }

  async fetchBookings() {
    return this.apiFetch(endpoints.fetchBookings);
  }

  async fetchLending() {
    return this.apiFetch(endpoints.fetchLending);
  }

  async fetchPenalty() {
    return this.apiFetch(endpoints.fetchPenalties);
  }

  async fetchInspections() {
    return this.apiFetch(endpoints.fetchInpections);
  }

  async fetchInventory() {
    return this.apiFetch(endpoints.fetchInventory);
  }

  async fetchTransactions() {
    return this.apiFetch(endpoints.fetchFinances);
  }

  async fetchSupplies() {
    return this.apiFetch(endpoints.fetchSupplies);
  }

  async addFeedbackResponse() {
    return this.apiFetch(endpoints.addFeedbackResponse);
  }
}
