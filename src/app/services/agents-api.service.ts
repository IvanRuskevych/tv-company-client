import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAgent } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AgentsApiService {
  // private readonly apiUrl: string = 'https://tv-company-server.onrender.com/agents/';
  private readonly apiUrl: string = 'http://localhost:8080/agents';

  constructor(private http: HttpClient) {}

  public getAgents(): Observable<IAgent[]> {
    return this.http.get<IAgent[]>(this.apiUrl);
  }

  public getAgentByID(id: string): Observable<IAgent> {
    return this.http.get<IAgent>(`${this.apiUrl}/${id}`);
  }

  public addNewAgent(agent: IAgent): Observable<IAgent> {
    return this.http.post<IAgent>(this.apiUrl, agent);
  }

  // @ts-ignore
  public editAgent(id: string, agent: IAgent): Observable<void> {
    // this.http.put<void>(`${this.apiUrl}/${id}`, agent);
    return this.http.put<void>(`${this.apiUrl}/${id}`, agent);
  }

  // @ts-ignore
  public deleteAgent(agentId: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl, { body: { agentId } });
  }
}
