import classApiFetch from "../services/utils/classApiFetch";
import endpoints from "../services/utils/endpoints";
import link from "../services/utils/links";

// Interfaces
import type { UserPayload } from "../../interfaces/user";
import type User from "../../interfaces/user";
import type About from "../../interfaces/about";
import type Inventory from "../../interfaces/inventory";
import type Feedback from "../../interfaces/feedback";

interface RegisterResponse {
  RegID?: number;
  message?: string;
  error?: string;
}

interface FeedbackResponseUpdate {
  feedID: number;
  Response: string;
}

interface Contact{
    PhoneNo?:string;
    EmailAddress?:string;
    Instagram?:string;
    Facebook?:string;
    PoBox?:string;
}


export default class Admin {
  private readonly regID: number;
  private readonly token: string;
  public url: string;

  constructor(regid: number, token: string, backendUrl: string = link) {
    // if (!token || !regid) {
    //   console.error("Invalid Session");
    //   throw new Error("Unauthorized access. Please login");
    // }

    this.regID = regid;
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

  async fetchApprovedUsers(): Promise<User[]> {
    return this.apiFetch<User[]>(endpoints.fetchApprovedUsers);
  }

  async fetchInactiveUsers(): Promise<User[]> {
    return this.apiFetch<User[]>(endpoints.fetchInactiveUsers);
  }

  async approveUser(regID: number): Promise<void> {
    return this.apiFetch<void>(`${endpoints.approveUser}/${regID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
  }


  async deactivateUser(regID: number): Promise<void> {
    return this.apiFetch<void>(`${endpoints.deactivateUser}/${regID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
  }


  async reactivateUser(regID: number): Promise<void> {
    return this.apiFetch<void>(`${endpoints.reactivateUser}/${regID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
  }


  async fetchAllUsers(): Promise<User[]> {
    try {
      return await this.apiFetch<User[]>(endpoints.fetchAllUsers);
    } catch (err) {
      console.error("Error occurred while fetching users:", err);
      return [];
    }
  }

  async fetchFeedback() :Promise<Feedback[]> {
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

  async fetchInventory():Promise<Inventory[]>{
    return this.apiFetch(endpoints.fetchInventory);
  }

  async fetchTransactions() {
    return this.apiFetch(endpoints.fetchFinances);
  }

  async fetchSupplies() {
    return this.apiFetch(endpoints.fetchSupplies);
  }

  async addFeedbackResponse(data: FeedbackResponseUpdate): Promise<void> {
    return this.apiFetch<void>(endpoints.addFeedbackResponse, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }

  async registerUser(user:UserPayload){
    try{
      const result = await this.apiFetch<RegisterResponse>(endpoints.addUser, {
        method: 'POST',
        body: JSON.stringify(user),
      });

      if (result.error) {
        throw new Error(result.error);
      }

      console.log('User registered successfully:', result);
      return result;
    } catch(err){
      console.error('Error occurred while registering the user:', err);
      throw err;
    }
  }

  async fetchAbout():Promise<About>{
    return this.apiFetch(endpoints.fetchAbout);
  }

  async editAbout(detail:string){
    return await this.apiFetch(endpoints.updateAbout, {
      method:'PUT',
      body:JSON.stringify({Detail:detail})
    });
  }

  async editContacts(contact:Contact){
    return await this.apiFetch(endpoints.updateContacts, {
      method:'POST',
      body:JSON.stringify(contact)
    });
  }

  async loggedInAdmin(userID:number):Promise<User[]>{
    return this.apiFetch<User[]>(`${endpoints.loggedUser}/${userID}`, {
      headers: { "Content-Type": "application/json" },
    });
  }

  async updateAdmin(admin:UserPayload){
    return await this.apiFetch(endpoints.updateUser, {
      method:'PATCH',
      body:JSON.stringify(admin)
    })
  }
}
