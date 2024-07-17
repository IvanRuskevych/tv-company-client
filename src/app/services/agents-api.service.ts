import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAgent } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AgentsApiService {
  private readonly apiUrl: string = environment.apiUrl + '/agents';

  constructor(private http: HttpClient) {}

  public getAgents(): Observable<IAgent[]> {
    return this.http.get<IAgent[]>(this.apiUrl);
  }

  public addNewAgent(agent: IAgent): Observable<IAgent> {
    return this.http.post<IAgent>(this.apiUrl, agent);
  }

  public editAgent(id: string, agent: IAgent): Observable<IAgent> {
    return this.http.put<IAgent>(`${this.apiUrl}/${id}`, agent);
  }

  public deleteAgent(agentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${agentId}`);
  }
}
