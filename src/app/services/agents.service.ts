import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IAgent } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AgentsService {
  private readonly _agents$: BehaviorSubject<IAgent[]> = new BehaviorSubject<IAgent[]>([]);
  public agents$: Observable<IAgent[]> = this._agents$.asObservable();

  constructor() {}

  private get agents(): IAgent[] {
    return this._agents$.getValue();
  }

  private set agents(value: IAgent[]) {
    this._agents$.next(value);
  }

  public setAgents(agents: IAgent[]) {
    this.agents = agents;
  }

  public getAgentByID(id: string): IAgent | undefined {
    return this.agents.find(({ _id }) => _id === id);
  }
}
