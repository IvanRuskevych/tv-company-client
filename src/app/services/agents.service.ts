import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IAgent } from '../models';
import { AgentsApiService } from './agents-api.service';

@Injectable({
  providedIn: 'root',
})
export class AgentsService {
  private readonly _agents$: BehaviorSubject<IAgent[]> = new BehaviorSubject<IAgent[]>([]);
  public readonly agents$: Observable<IAgent[]> = this._agents$.asObservable();

  constructor(private agentsApiService: AgentsApiService) {}

  private get agents(): IAgent[] {
    return this._agents$.getValue();
  }

  private set agents(agents: IAgent[]) {
    this._agents$.next(agents);
  }

  public setAgents() {
    this.agentsApiService.getAgents().subscribe((agents: IAgent[]) => {
      this.agents = agents;
    });
  }

  public initialAgents() {
    this.agents = [];
  }

  // public setAgents() {
  //   this.agentsApiService.getAgents().subscribe((response: { data: IAgent[] }) => {
  //     this.agents = response.data;
  //   });
  // }

  public getAgentByID(id: string): IAgent | undefined {
    return this.agents.find(({ _id }) => _id === id);
  }
}
